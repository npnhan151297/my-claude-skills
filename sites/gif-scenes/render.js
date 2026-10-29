// Render một cảnh HTML thành GIF: node render.js <canh.html> <out.gif> [fps]
// Ví dụ: node render.js forms.html ../gemini-nanglucso/assets/gemini-forms.gif
// Cần Playwright (Chromium) và ffmpeg.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'); const path = require('path'); const os = require('os');

(async () => {
  const scene = path.resolve(process.argv[2]);
  const out = path.resolve(process.argv[3] || 'out.gif');
  const fps = Number(process.argv[4] || 15);
  const only = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : null; // chụp thử vài mốc thời gian
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frames-'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1272, height: 788 } });
  await page.goto('file://' + scene, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  const times = only || Array.from({ length: Math.round(total / 1000 * fps) }, (_, i) => i * 1000 / fps);
  for (const [i, t] of times.entries()) {
    await page.evaluate((t) => window.render(t), t);
    await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
  }
  await browser.close();
  if (only) { console.log('frames in', dir); return; }
  const filter = `[0:v]split[a][b];[a]palettegen=max_colors=200:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle`;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'f%04d.png'), '-filter_complex', filter, '-loop', '0', out]);
  fs.rmSync(dir, { recursive: true });
  console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(2) + ' MB');
})();
