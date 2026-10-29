(() => {
  const cfg = window.SITE_CONFIG || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const vnd = (n) => new Intl.NumberFormat('vi-VN').format(n) + ' đ';
  const hasPrice = cfg.priceVnd > 0;
  const bank = cfg.bank || {};
  const hasBank = Boolean(bank.bankId && bank.accountNo);
  const fill = (text) => `<span class="fill">${text}</span>`;

  // Price everywhere it is shown
  $$('[data-price]').forEach((el) => { el.innerHTML = hasPrice ? vnd(cfg.priceVnd) : fill('Giá đang cập nhật'); });
  $$('[data-price-short]').forEach((el) => { el.innerHTML = hasPrice ? vnd(cfg.priceVnd) + '/năm' : fill('Đang cập nhật'); });
  // Struck-through list price and the discount, only when both prices are set
  const hasDiscount = hasPrice && cfg.listPriceVnd > cfg.priceVnd;
  $$('[data-list-price]').forEach((el) => { el.textContent = hasDiscount ? vnd(cfg.listPriceVnd) : ''; });
  $$('[data-discount]').forEach((el) => { el.textContent = hasDiscount ? '-' + Math.round((1 - cfg.priceVnd / cfg.listPriceVnd) * 100) + '%' : ''; });
  $$('[data-was]').forEach((el) => { el.hidden = !hasDiscount; });
  if (!cfg.endpoint) $('[data-demo]').hidden = false;

  // Registration code: PRO + 6 chars, no 0/O/1/I so it survives bank transfer notes
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 32 chars, so byte % 32 is unbiased
  const newCode = () => 'PRO' + [...crypto.getRandomValues(new Uint8Array(6))].map((b) => ALPHABET[b % 32]).join('');

  // Validation
  const form = $('#reg-form');
  const vatBox = $('#f-vat');
  const vatFields = $('#vat-fields');
  const rules = {
    fullName: (v) => v.trim().length >= 2 || 'Thầy Cô nhập họ và tên.',
    school: (v) => v.trim().length >= 5 || 'Thầy Cô nhập tên đầy đủ của trường.',
    schoolAddress: (v) => v.trim().length >= 5 || 'Thầy Cô nhập địa chỉ của trường.',
    phone: (v) => /^0\d{9}$/.test(v.replace(/[\s.-]/g, '')) || 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Email chưa đúng dạng, ví dụ ten@hcmdoet.edu.vn.',
    taxCode: (v) => !vatBox.checked || /^\d{10}(-?\d{3})?$/.test(v.trim()) || 'Mã số thuế gồm 10 hoặc 13 chữ số.',
    invoiceName: (v) => !vatBox.checked || v.trim().length >= 3 || 'Thầy Cô nhập tên đơn vị xuất hóa đơn.',
    invoiceAddress: (v) => !vatBox.checked || v.trim().length >= 5 || 'Thầy Cô nhập địa chỉ đơn vị.',
  };
  const defaultHelp = {};
  $$('.help', form).forEach((h) => { defaultHelp[h.id] = h.textContent; });

  const showError = (input, helpEl, msg) => {
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      helpEl.textContent = msg;
      helpEl.classList.add('is-error');
    } else {
      input.removeAttribute('aria-invalid');
      helpEl.textContent = defaultHelp[helpEl.id] || '';
      helpEl.classList.remove('is-error');
    }
  };

  const checkField = (input) => {
    const rule = rules[input.name];
    if (!rule) return true;
    const res = rule(input.value);
    showError(input, $('#' + input.getAttribute('aria-describedby')), res === true ? '' : res);
    return res === true;
  };

  const checkPosition = () => {
    const ok = Boolean(form.position.value);
    showError(form.position, $('#h-position'), ok ? '' : 'Thầy Cô chọn chức vụ.');
    return ok;
  };

  const checkConsent = () => {
    const box = $('#f-consent');
    showError(box, $('#h-consent'), box.checked ? '' : 'Cần đồng ý để AI EDU cấp tài khoản cho Thầy Cô.');
    return box.checked;
  };

  $$('input[name], textarea[name]', form).forEach((input) => {
    if (rules[input.name]) input.addEventListener('blur', () => { if (input.value || input.hasAttribute('aria-invalid')) checkField(input); });
  });
  form.position.addEventListener('change', checkPosition);
  $('#f-consent').addEventListener('change', checkConsent);

  vatBox.addEventListener('change', () => {
    vatFields.hidden = !vatBox.checked;
    vatBox.setAttribute('aria-expanded', String(vatBox.checked));
    if (!vatBox.checked) $$('input', vatFields).forEach((i) => showError(i, $('#' + i.getAttribute('aria-describedby')), ''));
  });

  // Sending to Apps Script: text/plain keeps it a simple request, so the browser sends no CORS preflight
  const send = async (payload) => {
    const res = await fetch(cfg.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'failed');
    return data;
  };

  // Steps
  let current = null;
  const showStep = (step) => {
    $$('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== step; });
    const order = ['form', 'pay', 'done'];
    $$('.progress li').forEach((li) => {
      const i = order.indexOf(li.dataset.step), at = order.indexOf(step);
      li.classList.toggle('is-done', i < at);
      if (i === at) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    const panel = $(`[data-panel="${step}"]`);
    if (step !== 'form') panel.focus({ preventScroll: true });
    $('.progress').scrollIntoView({ block: 'start' });
  };

  const renderPayment = (code) => {
    $$('[data-code]').forEach((el) => { el.textContent = code; });
    $('[data-amount]').innerHTML = hasPrice ? vnd(cfg.priceVnd) : fill('Đang cập nhật');
    $('[data-bank]').innerHTML = bank.bankName || bank.bankId ? (bank.bankName || bank.bankId) : fill('Đang cập nhật');
    $('[data-account]').innerHTML = bank.accountNo ? bank.accountNo : fill('Đang cập nhật');
    $('[data-copy="account"]').hidden = !bank.accountNo;
    $('[data-holder]').innerHTML = bank.accountName ? bank.accountName : fill('Đang cập nhật');
    const qr = $('[data-qr]');
    if (hasBank) {
      const q = new URLSearchParams({ addInfo: code, accountName: bank.accountName || '' });
      if (hasPrice) q.set('amount', String(cfg.priceVnd));
      qr.innerHTML = `<img src="https://img.vietqr.io/image/${encodeURIComponent(bank.bankId)}-${encodeURIComponent(bank.accountNo)}-compact2.png?${q}" width="540" height="640" alt="Mã QR chuyển khoản, nội dung ${code}">`;
    } else {
      qr.textContent = 'Mã QR sẽ hiện khi có thông tin tài khoản nhận tiền.';
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = $('[data-status]');
    status.textContent = '';
    if (form.website.value) return; // bot filled the hidden trap

    const inputs = $$('input[name], textarea[name]', form).filter((i) => rules[i.name]);
    const results = inputs.map(checkField);
    const posOk = checkPosition();
    const consentOk = checkConsent();
    if (!results.every(Boolean) || !posOk || !consentOk) {
      const firstBad = $('[aria-invalid="true"]', form);
      status.textContent = 'Phiếu còn thông tin chưa đúng, Thầy Cô xem lại các ô được đánh dấu.';
      if (firstBad) firstBad.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    data.phone = data.phone.replace(/[\s.-]/g, '');
    data.email = data.email.trim().toLowerCase();
    data.needVat = vatBox.checked;
    data.consent = true;
    data.code = newCode(); // demo only: Apps Script issues the real code
    delete data.website;

    const btn = $('button[type="submit"]', form);
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    try {
      if (cfg.endpoint) {
        const res = await send({ action: 'register', ...data });
        if (res.code) data.code = res.code;
      }
      current = data;
      renderPayment(data.code);
      showStep('pay');
    } catch (err) {
      const support = cfg.supportEmail || 'product@futureskills.edu.vn';
      status.textContent = err.message === 'too_many'
        ? 'Email này đã gửi nhiều phiếu trong một giờ. Thầy Cô thử lại sau, hoặc liên hệ ' + support + '.'
        : 'Chưa gửi được phiếu. Thầy Cô kiểm tra kết nối mạng rồi thử lại, hoặc liên hệ ' + support + '.';
    } finally {
      btn.removeAttribute('aria-busy');
      btn.disabled = false;
    }
  });

  $('[data-back]').addEventListener('click', () => showStep('form'));

  $('[data-paid]').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const status = $('[data-pay-status]');
    status.textContent = '';
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    try {
      if (cfg.endpoint) await send({ action: 'paid', code: current.code, email: current.email });
      showStep('done');
      $('[data-bar]').hidden = true; // registered: no more calls to register
    } catch (err) {
      status.textContent = 'Chưa ghi nhận được. Thầy Cô thử lại sau ít phút.';
    } finally {
      btn.removeAttribute('aria-busy');
      btn.disabled = false;
    }
  });

  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const text = b.dataset.copy === 'code' ? current.code : bank.accountNo;
    try {
      await navigator.clipboard.writeText(text);
      b.textContent = 'Đã chép';
      setTimeout(() => { b.textContent = 'Sao chép'; }, 2000);
    } catch { /* clipboard blocked: the value stays visible to copy by hand */ }
  }));

  // Mobile action bar steps aside while the hero action or the form is on screen
  const bar = $('[data-bar]');
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
    bar.classList.toggle('is-away', seen.size > 0);
  });
  [$('.hero'), $('#dang-ky')].forEach((el) => io.observe(el));

  // Gemini inside an app: the Gemini button is pressed, the side panel opens,
  // the prompt is typed, then the file itself changes
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const play = (app) => {
    if (!app) return;
    const typed = $('.side__typed', app);
    const text = app.dataset.prompt;
    $$('[data-new]', app).forEach((el, i) => el.style.setProperty('--i', i));
    clearTimeout(app.timer);
    app.dataset.started = 'yes';
    if (still) { typed.textContent = ''; app.dataset.state = 'done'; return; }
    const at = (ms, fn) => { app.timer = setTimeout(fn, ms); };
    let n = 0;
    const type = () => {
      typed.textContent = text.slice(0, ++n);
      if (n < text.length) return at(30, type);
      at(400, () => {
        typed.textContent = '';
        app.dataset.state = 'working';
        at(1300, () => { app.dataset.state = 'done'; });
      });
    };
    typed.textContent = '';
    app.dataset.state = 'start';
    at(500, () => {
      app.dataset.state = 'press';
      at(450, () => { app.dataset.state = 'open'; at(500, type); });
    });
  };
  const replay = $('.ws__replay');
  if (replay) replay.addEventListener('click', () => play($('.ws__panel.is-active .app')));

  // Workspace tabs: click or arrow keys switch the panel
  const tabs = $$('[role="tab"]');
  const selectTab = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).classList.toggle('is-active', on);
    });
    play($('.app', $('#' + tab.getAttribute('aria-controls'))));
  };
  const ws = $('.ws');
  if (ws) {
    const firstPlay = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      firstPlay.disconnect();
      const app = $('.ws__panel.is-active .app');
      if (!app.dataset.started) play(app); // a tab click already played it
    }, { threshold: 0.5 });
    firstPlay.observe($('.ws__panels', ws));
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // Tagline: words light up in reading order as they cross 65% of the viewport
  const tagline = $('[data-reveal]');
  if (tagline) {
    tagline.innerHTML = tagline.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    const words = $$('.w', tagline);
    let queued = false;
    const update = () => {
      queued = false;
      const line = innerHeight * 0.65;
      words.forEach((w) => { if (w.getBoundingClientRect().top < line) w.classList.add('is-on'); });
      if (words.every((w) => w.classList.contains('is-on'))) removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    if (still) words.forEach((w) => w.classList.add('is-on'));
    else { addEventListener('scroll', onScroll, { passive: true }); update(); }
  }
})();
