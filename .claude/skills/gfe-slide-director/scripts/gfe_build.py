#!/usr/bin/env python3
"""Sinh lệnh batchUpdate cho Google Slides từ Dàn ý (deck.json) và thư viện layout.

Dùng:
  python3 gfe_build.py --spec deck.json --deck-read read.json [--layouts layouts.json] [--config config.json] > requests.json

  deck.json   : Dàn ý đã chuyển sang JSON (xem gfe-slide-director/SKILL.md).
  read.json   : kết quả read_presentation của BẢN SAO VỪA TẠO, mask "revisionId,slides.objectId".
In ra {"requests": [...], "writeControl": {...}}. Cảnh báo (chữ quá dài, thiếu nội dung) in ra stderr.

Thứ tự lệnh trong batch: nhân bản slide mẫu -> điền chữ, thay ảnh bằng Khung chèn ảnh,
xoá phần thừa -> xếp slide mới lên đầu -> xoá toàn bộ slide mẫu còn lại trong bản sao.
Script chỉ sinh lệnh cho file bản sao; không bao giờ đụng tới Bản gốc hay file khác trên Drive.
"""
import argparse, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
EMU = 12700
WARN = []


def warn(msg):
    WARN.append(msg)


def rgb(hexcolor):
    h = hexcolor.lstrip('#')
    return {"rgbColor": {"red": round(int(h[0:2], 16) / 255, 4), "green": round(int(h[2:4], 16) / 255, 4), "blue": round(int(h[4:6], 16) / 255, 4)}}


def text_style(style):
    st, fields = {"fontFamily": "Google Sans"}, ["fontFamily"]
    if "size" in style:
        st["fontSize"] = {"magnitude": style["size"], "unit": "PT"}; fields.append("fontSize")
    if "color" in style:
        c = style["color"]
        st["foregroundColor"] = {"opaqueColor": {"themeColor": c[6:]} if c.startswith("theme:") else rgb(c)}
        fields.append("foregroundColor")
    if "bold" in style:
        st["bold"] = style["bold"]; fields.append("bold")
    return st, ",".join(fields)


class Builder:
    def __init__(self, layouts, config):
        self.L = layouts["layouts"]
        self.styles = layouts["styles"]
        self.cfg = config
        self.dup, self.fill, self.moves = [], [], []

    # ---------- helpers ----------
    def nid(self, n, orig):
        return f"s{n:02d}_{orig}"

    def set_text(self, oid, text, parts_style=None, parts=None, sep="\n", head_style=None):
        """Thay toàn bộ chữ trong ô. parts: danh sách chuỗi.
        Sau deleteText ALL, chữ chèn vào nhận kiểu của đoạn CUỐI trong mẫu, nên ô nhiều phần
        phải áp kiểu rõ ràng cho cả phần đầu (head_style) lẫn các phần sau (parts_style)."""
        if parts is None:
            parts = [text]
        parts = [p for p in parts if p not in (None, "")]
        if not parts:
            return False
        full = sep.join(parts)
        self.fill.append({"deleteText": {"objectId": oid, "textRange": {"type": "ALL"}}})
        self.fill.append({"insertText": {"objectId": oid, "insertionIndex": 0, "text": full}})
        if head_style:
            st, f = text_style(self.styles[head_style])
            self.fill.append({"updateTextStyle": {"objectId": oid, "textRange": {"type": "FIXED_RANGE", "startIndex": 0, "endIndex": len(parts[0])}, "style": st, "fields": f}})
        pos = len(parts[0])
        for i, p in enumerate(parts[1:]):
            pos += len(sep)
            sname = (parts_style or [])[min(i, len(parts_style or []) - 1)] if parts_style else None
            if sname:
                st, f = text_style(self.styles[sname])
                self.fill.append({"updateTextStyle": {"objectId": oid, "textRange": {"type": "FIXED_RANGE", "startIndex": pos, "endIndex": pos + len(p)}, "style": st, "fields": f}})
            pos += len(p)
        return True

    def fit_size(self, value, f):
        """Cỡ chữ theo quy tắc 'fit' của ô; None = giữ cỡ của mẫu."""
        for limit, size in f.get("fit", []):
            if len(value) <= limit:
                return size
        return f["fit"][-1][1] if f.get("fit") else None

    def estimate(self, value, size, box, where):
        """Ước lượng số dòng (Google Sans ~0.55em/ký tự, giãn dòng 1.2) so với chiều cao ô."""
        if not (value and size and box):
            return
        import math
        per_line = max(1, int(box[2] / (size * 0.55)))
        lines = sum(max(1, math.ceil(len(p) / per_line)) for p in value.split("\n"))
        need = lines * size * 1.05
        if lines > 1 and need > box[3] * 1.25:
            warn(f"{where}: cần khoảng {lines} dòng ({need:.0f}pt) trong ô cao {box[3]}pt — có thể tràn, rút gọn chữ.")

    def check(self, value, limit, where):
        if value and limit and len(value) > limit:
            warn(f"{where}: {len(value)} ký tự, vượt giới hạn {limit} — rút gọn hoặc đổi layout.")

    def placeholder(self, slide_id, ph_id, box, desc, shape="ROUND_RECTANGLE"):
        x, y, w, h = box
        self.fill += [
            {"createShape": {"objectId": ph_id, "shapeType": shape, "elementProperties": {
                "pageObjectId": slide_id,
                "size": {"width": {"magnitude": w * EMU, "unit": "EMU"}, "height": {"magnitude": h * EMU, "unit": "EMU"}},
                "transform": {"scaleX": 1, "scaleY": 1, "shearX": 0, "shearY": 0, "translateX": x * EMU, "translateY": y * EMU, "unit": "EMU"}}}},
            {"updateShapeProperties": {"objectId": ph_id, "shapeProperties": {
                "shapeBackgroundFill": {"solidFill": {"color": rgb("#E8EAED")}},
                "outline": {"propertyState": "NOT_RENDERED"}, "contentAlignment": "MIDDLE"},
                "fields": "shapeBackgroundFill.solidFill.color,outline.propertyState,contentAlignment"}},
            {"insertText": {"objectId": ph_id, "text": f"Chèn ảnh: {desc}" if desc else "Chèn ảnh"}},
        ]
        st, f = text_style({"size": 11, "color": "#5F6368"})
        self.fill.append({"updateTextStyle": {"objectId": ph_id, "textRange": {"type": "ALL"}, "style": st, "fields": f}})
        self.fill.append({"updateParagraphStyle": {"objectId": ph_id, "textRange": {"type": "ALL"}, "style": {"alignment": "CENTER"}, "fields": "alignment"}})

    def widen(self, oid, w):
        """Nới ngang ô chữ, giữ nguyên mép trái (x_emu = mép trái hiện tại của ô)."""
        k, x0 = w["scaleX"], w["x_emu"]
        self.fill.append({"updatePageElementTransform": {"objectId": oid, "applyMode": "RELATIVE", "transform": {
            "scaleX": k, "scaleY": 1, "shearX": 0, "shearY": 0, "translateX": x0 * (1 - k), "translateY": 0, "unit": "EMU"}}})

    def delete(self, oid):
        self.fill.append({"deleteObject": {"objectId": oid}})

    # ---------- per slide ----------
    def slide(self, n, spec):
        key = spec.get("layout")
        if key not in self.L:
            raise SystemExit(f"Slide {n}: layout '{key}' không có trong layouts.json")
        lay = self.L[key]
        src = lay["slide"]
        ids = self.collect_ids(lay)
        new_slide = self.nid(n, src)
        mapping = {src: new_slide}
        mapping.update({i: self.nid(n, i) for i in ids})
        self.dup.append({"duplicateObject": {"objectId": src, "objectIds": mapping}})
        self.moves.append(new_slide)
        M = lambda i: mapping[i]
        where = f"Slide {n} ({key})"

        for fname, f in lay.get("fields", {}).items():
            val = spec.get(fname, f.get("default"))
            if f["type"] == "text":
                if val:
                    self.check(val, f.get("max"), f"{where} · {fname}")
                    self.set_text(M(f["id"]), val)
                    size = self.fit_size(val, f)
                    if size:
                        # chỉ đổi cỡ chữ; gán lại fontFamily sẽ làm mất độ đậm của tiêu đề mẫu
                        self.fill.append({"updateTextStyle": {"objectId": M(f["id"]), "textRange": {"type": "ALL"},
                                                              "style": {"fontSize": {"magnitude": size, "unit": "PT"}}, "fields": "fontSize"}})
                    self.estimate(val, size or f.get("size"), f.get("box"), f"{where} · {fname}")
                    if f.get("widen"):
                        self.widen(M(f["id"]), f["widen"])
                elif f.get("optional"):
                    self.delete(M(f["id"]))
                else:
                    warn(f"{where}: thiếu '{fname}'.")
            elif f["type"] == "parts":
                vals = val if isinstance(val, list) else ([val.get(p) for p in f["parts"]] if isinstance(val, dict) else [val])
                for v, lim in zip(vals, f.get("max", [])):
                    self.check(v, lim, f"{where} · {fname}")
                if not self.set_text(M(f["id"]), None, f.get("parts_style"), vals, f.get("sep", "\n"), f.get("head_style")):
                    warn(f"{where}: thiếu '{fname}'.")

        if "list" in lay:
            self.fill_list(n, lay, spec, M, where, new_slide)
        if "dots" in lay:
            self.dots(lay["dots"], spec, M)
        if "cta" in lay:
            cta = spec.get("cta")
            if cta:
                self.check(cta, lay["cta"]["max"], f"{where} · cta")
                self.set_text(M(lay["cta"]["text"]), cta)
            else:
                self.delete(M(lay["cta"]["group"]))
        for k, im in enumerate(lay.get("images", [])):
            self.placeholder(new_slide, f"{new_slide}_ph{k}", im["box"], spec.get(im["key"]), im.get("shape", "ROUND_RECTANGLE"))
            self.delete(M(im["id"]))
        for rid in lay.get("remove", []):
            self.delete(M(rid))
        for t in lay.get("transforms", []):
            s = t["scale"]; ox, oy = t["origin"]
            for oid in t["ids"]:
                self.fill.append({"updatePageElementTransform": {"objectId": M(oid), "applyMode": "RELATIVE", "transform": {
                    "scaleX": s, "scaleY": s, "shearX": 0, "shearY": 0, "translateX": ox * EMU * (1 - s), "translateY": oy * EMU * (1 - s), "unit": "EMU"}}})
        if "table" in lay:
            self.table(lay["table"], spec.get("bang") or [], M, where)

    def collect_ids(self, lay):
        ids = set()
        for f in lay.get("fields", {}).values():
            ids.add(f["id"])
        for im in lay.get("images", []):
            ids.add(im["id"])
        ids |= set(lay.get("remove", []))
        for t in lay.get("transforms", []):
            ids |= set(t["ids"])
        if "cta" in lay:
            ids |= {lay["cta"]["group"], lay["cta"]["text"]}
        if "dots" in lay:
            ids |= set(lay["dots"]["ids"])
            if lay["dots"].get("ring"):
                ids.add(lay["dots"]["ring"])
        if "list" in lay:
            for s in lay["list"]["slots"]:
                ids |= {v for k, v in s.items()}
            ids |= set(lay["list"].get("image_ids", []))
        if "table" in lay:
            ids.add(lay["table"]["id"])
        return ids

    def fill_list(self, n, lay, spec, M, where, new_slide):
        L = lay["list"]
        items = spec.get(L["key"]) or []
        if not (L["min"] <= len(items) <= L["max"]):
            warn(f"{where}: cần {L['min']}–{L['max']} mục '{L['key']}', đang có {len(items)}.")
        items = items[:L["max"]]
        shift = (L["max"] - len(items)) * L["center_pitch"] / 2 if L.get("center_pitch") and items else 0
        for i, slot in enumerate(L["slots"]):
            if i < len(items):
                it = items[i]
                if isinstance(it, str):
                    self.check(it, L.get("item_max"), f"{where} · {L['key']} {i + 1}")
                    self.set_text(M(slot["text"]), it)
                else:
                    parts = [it.get("dau"), it.get("than"), it.get("lien_ket")]
                    self.check(parts[0], L.get("head_max"), f"{where} · {L['key']} {i + 1} · dau")
                    self.check(parts[1], L.get("body_max"), f"{where} · {L['key']} {i + 1} · than")
                    self.set_text(M(slot["text"]), None, L.get("parts_style"), parts, L.get("sep", "\n"), L.get("head_style"))
                if slot.get("arrow"):
                    # mũi tên của mẫu nằm cố định, không chạy theo dòng đường dẫn mới -> luôn bỏ
                    self.delete(M(slot["arrow"]))
                if "widen" in L:
                    self.widen(M(slot["text"]), L["widen"])
                img_box = (L.get("image_box") or [None] * 9)[i]
                img_id = slot.get("image") or (L.get("image_ids") or [None] * 9)[i]
                if shift:
                    for k in ("text", "card", "circle"):
                        if slot.get(k):
                            self.fill.append({"updatePageElementTransform": {"objectId": M(slot[k]), "applyMode": "RELATIVE", "transform": {
                                "scaleX": 1, "scaleY": 1, "shearX": 0, "shearY": 0, "translateX": shift * EMU, "translateY": 0, "unit": "EMU"}}})
                    if img_box:
                        img_box = [img_box[0] + shift] + list(img_box[1:])
                if img_id and img_box:
                    desc = it.get("anh") if isinstance(it, dict) else None
                    self.placeholder(new_slide, f"{new_slide}_ph{i}", img_box, desc, L.get("image_shape", "ROUND_RECTANGLE"))
                    self.delete(M(img_id))
            else:
                for k in ("text", "num", "image", "card", "circle", "dot", "arrow"):
                    if slot.get(k):
                        self.delete(M(slot[k]))
                if L.get("image_ids"):
                    self.delete(M(L["image_ids"][i]))

    def dots(self, D, spec, M):
        so, tong = spec.get("so"), spec.get("tong")
        if D.get("ring"):
            self.delete(M(D["ring"]))
        if not so or not tong:
            for d in D["ids"]:
                self.delete(M(d))
            return
        for i, d in enumerate(D["ids"]):
            if i >= tong:
                self.delete(M(d)); continue
            active = (i == so - 1)
            fill = {"themeColor": "ACCENT1"} if active else rgb("#FFFFFF")
            self.fill.append({"updateShapeProperties": {"objectId": M(d), "shapeProperties": {"shapeBackgroundFill": {"solidFill": {"color": fill}}}, "fields": "shapeBackgroundFill.solidFill.color"}})
            st, f = text_style({"color": "#FFFFFF" if active else "#202124"})
            self.fill.append({"updateTextStyle": {"objectId": M(d), "textRange": {"type": "ALL"}, "style": st, "fields": f}})

    def table(self, T, rows, M, where):
        tid = M(T["id"])
        if not rows:
            warn(f"{where}: thiếu 'bang'."); return
        nr, nc = min(len(rows), T["rows"]), min(max(len(r) for r in rows), T["cols"])
        for r in range(nr):
            for c in range(nc):
                v = rows[r][c] if c < len(rows[r]) else ""
                self.check(v, T.get("cell_max"), f"{where} · ô ({r + 1},{c + 1})")
                self.fill.append({"deleteText": {"objectId": tid, "cellLocation": {"rowIndex": r, "columnIndex": c}, "textRange": {"type": "ALL"}}})
                if v:
                    self.fill.append({"insertText": {"objectId": tid, "cellLocation": {"rowIndex": r, "columnIndex": c}, "text": v, "insertionIndex": 0}})
        for r in range(T["rows"] - 1, nr - 1, -1):
            self.fill.append({"deleteTableRow": {"tableObjectId": tid, "cellLocation": {"rowIndex": r, "columnIndex": 0}}})
        for c in range(T["cols"] - 1, nc - 1, -1):
            self.fill.append({"deleteTableColumn": {"tableObjectId": tid, "cellLocation": {"rowIndex": 0, "columnIndex": c}}})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec", required=True)
    ap.add_argument("--deck-read", required=True, help="read_presentation của bản sao mới (revisionId, slides.objectId)")
    ap.add_argument("--layouts", default=os.path.join(HERE, "..", "..", "gfe-slide-layouts", "layouts.json"))
    ap.add_argument("--config", default=os.path.join(HERE, "..", "config.json"))
    a = ap.parse_args()
    layouts = json.load(open(a.layouts, encoding="utf-8"))
    cfg = json.load(open(a.config, encoding="utf-8"))
    spec = json.load(open(a.spec, encoding="utf-8"))
    rd = json.load(open(a.deck_read, encoding="utf-8"))
    rd = rd.get("content", rd)
    existing = [s["objectId"] for s in rd["slides"]]
    b = Builder(layouts, cfg)
    for n, s in enumerate(spec["slides"], 1):
        b.slide(n, s)
    missing = {lay["slide"] for lay in layouts["layouts"].values()} - set(existing)
    if missing:
        raise SystemExit(f"Bản sao thiếu slide mẫu {sorted(missing)} — có thể đã sao chép nhầm file, không phải Bản gốc.")
    reqs = b.dup + b.fill
    for i, sid in enumerate(b.moves):
        reqs.append({"updateSlidesPosition": {"slideObjectIds": [sid], "insertionIndex": i}})
    reqs += [{"deleteObject": {"objectId": sid}} for sid in existing]
    for w in WARN:
        print("CẢNH BÁO:", w, file=sys.stderr)
    json.dump({"requests": reqs, "writeControl": {"requiredRevisionId": rd["revisionId"]}}, sys.stdout, ensure_ascii=False)
    print(f"\n{len(spec['slides'])} slide, {len(reqs)} lệnh, {len(WARN)} cảnh báo.", file=sys.stderr)


if __name__ == "__main__":
    main()
