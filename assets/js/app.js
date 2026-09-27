/* ==========================================================================
   SIPANDU PRIMA — Helper tampilan
   Tanpa framework, tanpa build step. Cukup dibuka dari GitHub Pages.
   ========================================================================== */

window.SP = (function () {

  const LOGO = 'assets/img/logo.png';

  /* ---------------- Angka & mutu ---------------- */

  /** Kategori mutu Permenpan-RB 14/2017 */
  function grade(v) {
    if (v === null || v === undefined || isNaN(v)) return 'x';
    if (v >= 88.31) return 'a';
    if (v >= 76.61) return 'b';
    if (v >= 65)    return 'c';
    return 'd';
  }
  function gradeUp(v) { return grade(v).toUpperCase(); }

  /** 83.8 -> "83,8" */
  function id1(v) { return v === null || v === undefined ? '–' : v.toFixed(1).replace('.', ','); }
  /** 3.2404 -> "3,240" */
  function id3(v) { return v === null || v === undefined ? '–' : v.toFixed(3).replace('.', ','); }
  /** 14382 -> "14.382" */
  function idn(v) { return v === null || v === undefined ? '–' : v.toLocaleString('id-ID'); }

  /** NRR SKM dari frekuensi skala 1..6 memakai bobot 1 / 1,6 / 2,2 / 2,8 / 3,4 / 4 */
  function nrrSkm(freq) {
    let s = 0, n = 0;
    freq.forEach(function (f, i) { s += DATA.BOBOT[i] * f; n += f; });
    return n ? s / n : 0;
  }
  /** NRR SPAK dari [tidakAda, ragu, ada] memakai skor 4 / 2 / 0 */
  function nrrSpak(f) {
    const n = f[0] + f[1] + f[2];
    return n ? (f[0] * 4 + f[1] * 2) / n : 0;
  }
  /** IKM = rata-rata NRR seluruh unsur x 25 */
  function indeks(nrrList) {
    if (!nrrList.length) return 0;
    return (nrrList.reduce(function (a, b) { return a + b; }, 0) / nrrList.length) * 25;
  }

  function chip(v, opts) {
    opts = opts || {};
    const g = grade(v);
    const label = opts.label || (g === 'x' ? '–' : g.toUpperCase());
    return '<span class="chip m-' + g + (opts.ctr ? ' ctr' : '') + '"><i></i>' + label + '</span>';
  }

  /* ---------------- Bilah atas ---------------- */

  const NAV = [
    ['dashboard-polda.html',      'Dashboard'],
    ['strategi.html',             'Strategi &amp; Evaluasi'],
    ['notifikasi.html',           'Notifikasi'],
    ['flyer.html',                'Publikasi'],
    ['bank-strategi.html',        'Master Data']
  ];

  /**
   * Menyuntikkan bilah atas.
   * @param {object} o  { sub, nav, who, role, ini }
   */
  function topbar(o) {
    o = o || {};
    const nav = NAV.map(function (n) {
      const on = o.nav === n[0] ? ' class="on"' : '';
      return '<a href="' + n[0] + '"' + on + '>' + n[1] + '</a>';
    }).join('');

    return '' +
      '<header class="topbar">' +
        '<a href="index.html" style="display:flex;align-items:center;gap:12px;flex-shrink:0">' +
          '<img class="logo" src="' + LOGO + '" alt="">' +
          '<span><span class="brand-name">SIPANDU PRIMA</span>' +
          '<span class="brand-sub">' + (o.sub || 'Polda Kalimantan Tengah') + '</span></span>' +
        '</a>' +
        '<nav class="topnav">' + nav + '</nav>' +
        '<span class="grow"></span>' +
        '<span class="badge-demo">DATA CONTOH</span>' +
        '<span class="topdiv"></span>' +
        '<span class="who"><b>' + (o.who || '[NAMA PEJABAT]') + '</b><span>' + (o.role || '') + '</span></span>' +
        '<span class="avatar">' + (o.ini || 'SP') + '</span>' +
      '</header>';
  }

  function mount(html) { document.getElementById('app-topbar').innerHTML = html; }

  /* ---------------- Ikon ---------------- */

  const ICON = {
    chev: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="#445D7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lock: '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="3" y="6.2" width="8" height="5.6" rx="1.2" stroke="#6B7C93" stroke-width="1.4"/><path d="M5 6.2V4.6a2 2 0 0 1 4 0v1.6" stroke="#6B7C93" stroke-width="1.4" stroke-linecap="round"/></svg>',
    img:  '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="11" height="11" rx="1.6" stroke="#445D7A" stroke-width="1.4"/><circle cx="6" cy="6.2" r="1.1" fill="#445D7A"/><path d="M3.2 11.4l3-3 2.4 2.4 2-1.8 2.2 2.2" stroke="#445D7A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    xls:  '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9.2 2H4.4A1.4 1.4 0 0 0 3 3.4v9.2A1.4 1.4 0 0 0 4.4 14h7.2a1.4 1.4 0 0 0 1.4-1.4V5.8L9.2 2Z" stroke="#445D7A" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.2 2v3.8H13" stroke="#445D7A" stroke-width="1.3" stroke-linejoin="round"/><path d="M5.9 8.4l3 3.4M8.9 8.4l-3 3.4" stroke="#445D7A" stroke-width="1.3" stroke-linecap="round"/></svg>',
    paste:'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3.2" y="3.4" width="9.6" height="10.2" rx="1.4" stroke="#445D7A" stroke-width="1.3"/><path d="M6 3.4V2.8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.6" stroke="#445D7A" stroke-width="1.3"/><path d="M5.8 7.6h4.4M5.8 10.2h3" stroke="#445D7A" stroke-width="1.3" stroke-linecap="round"/></svg>',
    ok:   '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="#DCFCE7"/><path d="M5.2 8.2l2 2 3.6-4" stroke="#15803D" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    warn: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="#FDF3C7"/><path d="M8 4.6v4.1" stroke="#B45309" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.1" r=".95" fill="#B45309"/></svg>',
    bad:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.8 15 14H1L8 1.8Z" stroke="#B91C1C" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6.2v3.4" stroke="#B91C1C" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.6" r=".9" fill="#B91C1C"/></svg>',
    info: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.6" stroke="#18385F" stroke-width="1.3"/><path d="M8 7.2v4" stroke="#18385F" stroke-width="1.6" stroke-linecap="round"/><circle cx="8" cy="4.9" r=".9" fill="#18385F"/></svg>',
    dl:   '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2.6v7.6M4.8 7.4 8 10.6l3.2-3.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.8 12.4h10.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };

  /* ---------------- Grafik garis ---------------- */

  /**
   * @param {object} o { data, labels, min, max, refs:[{v,label,color,align}], label }
   */
  function trend(o) {
    const W = 600, H = 236, L = 40, R = 580, T = 20, B = 190;
    const min = o.min, max = o.max, span = max - min;
    const step = (R - L) / (o.data.length - 1);
    const y = function (v) { return T + ((max - v) / span) * (B - T); };
    const x = function (i) { return L + i * step; };

    let g = '', ticks = '';
    for (let k = 0; k <= 4; k++) {
      const val = max - (span / 4) * k;
      const yy = T + ((B - T) / 4) * k;
      g += '<line x1="' + L + '" y1="' + yy + '" x2="' + R + '" y2="' + yy + '" stroke="' + (k === 4 ? '#DFE4EB' : '#ECEFF3') + '" stroke-width="1"/>';
      ticks += '<text x="' + (L - 8) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="11" fill="#94A3B8">' + Math.round(val) + '</text>';
    }

    let refs = '';
    (o.refs || []).forEach(function (r) {
      const yy = y(r.v);
      if (yy < T || yy > B) return;
      const right = r.align !== 'left';
      refs += '<line x1="' + L + '" y1="' + yy + '" x2="' + R + '" y2="' + yy + '" stroke="' + r.color + '" stroke-width="2"/>' +
        '<text x="' + (right ? R - 4 : L + 6) + '" y="' + (yy - 5) + '" text-anchor="' + (right ? 'end' : 'start') +
        '" font-size="10.5" font-weight="600" fill="' + (r.text || r.color) + '">' + r.label + '</text>';
    });

    const pts = o.data.map(function (v, i) { return x(i) + ',' + y(v).toFixed(1); }).join(' ');
    const area = 'M' + o.data.map(function (v, i) { return x(i) + ' ' + y(v).toFixed(1); }).join(' ') +
      ' ' + R + ' ' + B + ' ' + L + ' ' + B + 'Z';

    let dots = '', xlab = '';
    o.data.forEach(function (v, i) {
      const last = i === o.data.length - 1;
      dots += '<circle cx="' + x(i) + '" cy="' + y(v).toFixed(1) + '" r="' + (last ? 5.5 : 4) +
        '" fill="#18385F" stroke="#fff" stroke-width="' + (last ? 2.5 : 2) + '"/>';
      xlab += '<text x="' + x(i) + '" y="212" text-anchor="middle" font-size="11" ' +
        (last ? 'font-weight="700" fill="#18385F"' : 'fill="#94A3B8"') + '>' + o.labels[i] + '</text>';
    });

    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="236" fill="none" role="img" aria-label="' +
      (o.label || 'Grafik tren') + '" font-family="Plus Jakarta Sans">' +
      g + ticks + refs +
      '<path d="' + area + '" fill="#18385F" fill-opacity=".10"/>' +
      '<polyline points="' + pts + '" stroke="#18385F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots + xlab + '</svg>';
  }

  /* ---------------- Bar per unsur ---------------- */

  /** rows = [[kode, nama, nrr]] ; nrr pada skala 0-4, indeks = nrr x 25 */
  function unsurBars(rows) {
    const head = '<div class="ub" style="padding-bottom:6px;border-bottom:1px solid #F1EDE3">' +
      '<span class="nm" style="font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:.04em">UNSUR</span>' +
      '<span class="grow"></span>' +
      '<span class="v" style="font-size:10px;color:#94A3B8;letter-spacing:.04em">INDEKS</span>' +
      '<span class="n" style="font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:.04em">NRR</span>' +
      '<span style="width:40px;text-align:center;font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:.04em">MUTU</span>' +
      '</div>';

    const body = rows.map(function (r) {
      const v = r[2] * 25, g = grade(v);
      return '<div class="ub">' +
        '<span class="nm">' + r[0] + ' · ' + r[1] + '</span>' +
        '<span class="track"><i class="f-' + g + '" style="width:' + v.toFixed(1) + '%"></i></span>' +
        '<span class="v">' + id1(v) + '</span>' +
        '<span class="n">' + id3(r[2]) + '</span>' +
        chip(v, { ctr: true }) +
        '</div>';
    }).join('');

    return head + '<div style="display:flex;flex-direction:column;gap:11px;margin-top:12px">' + body + '</div>';
  }

  /* ---------------- Komposisi ---------------- */

  function stackSkm(pct) {
    const c = ['--s1', '--s2', '--s3', '--s4', '--s5', '--s6'];
    const bar = pct.map(function (p, i) {
      return '<i style="flex-grow:' + p + ';background:var(' + c[i] + ')"></i>';
    }).join('');
    const leg = pct.map(function (p, i) {
      return '<div><span class="sw" style="background:var(' + c[i] + ')"></span>' +
        (i + 1) + ' · ' + DATA.SKALA[i].label + ' <b>' + p + '%</b></div>';
    }).join('');
    return '<div class="stack">' + bar + '</div><div class="legend">' + leg + '</div>';
  }

  function stackSpak(pct) {
    const o = DATA.OPSI_SPAK;
    const bar = pct.map(function (p, i) {
      return '<i style="flex-grow:' + p + ';background:' + o[i].warna + '"></i>';
    }).join('');
    const leg = pct.map(function (p, i) {
      return '<div><span class="sw" style="background:' + o[i].warna + '"></span>' +
        o[i].label + ' (skor ' + o[i].skor + ') <b>' + p + '%</b></div>';
    }).join('');
    return '<div class="stack">' + bar + '</div><div class="legend">' + leg + '</div>';
  }

  /* ---------------- Modal ---------------- */

  function openModal(id) { document.getElementById(id).classList.add('open'); }
  function closeModal(id) { document.getElementById(id).classList.remove('open'); }

  function wireModals() {
    document.querySelectorAll('.modal-bg').forEach(function (bg) {
      bg.addEventListener('click', function (e) { if (e.target === bg) bg.classList.remove('open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.querySelectorAll('.modal-bg.open').forEach(function (m) { m.classList.remove('open'); });
    });
  }

  /* ---------------- Tempel dari spreadsheet ---------------- */

  /**
   * Mengurai teks tempelan dari Excel / Google Sheets.
   * Excel menyalin sel sebagai teks dipisah TAB, baris dipisah baris baru.
   * Fungsi ini juga menerima pemisah koma dan titik koma, serta melewati
   * baris judul dan kolom label di kiri.
   *
   * @param {string} text  isi papan klip
   * @param {number} cols  jumlah kolom angka yang diharapkan (6 untuk SKM, 3 untuk SPAK)
   * @returns {{rows:number[][], skipped:number}}
   */
  function parsePaste(text, cols) {
    const out = [];
    let skipped = 0;
    const lines = String(text).replace(/\r/g, '').split('\n');

    /** baris judul yang angkanya persis 1,2,3,…,cols — misal "Kode  Unsur  1 2 3 4 5 6" */
    function isHeaderRun(nums) {
      if (nums.length !== cols) return false;
      for (let i = 0; i < cols; i++) if (nums[i] !== i + 1) return false;
      return true;
    }

    lines.forEach(function (line) {
      if (!line.trim()) return;
      // pisahkan dengan TAB, titik koma, atau koma
      let cells = line.split(/\t|;|,/).map(function (c) { return c.trim(); });
      // buang sel kosong di ujung
      while (cells.length && cells[cells.length - 1] === '') cells.pop();
      // ambil hanya sel yang berupa angka bulat
      const nums = cells.filter(function (c) { return /^\d+$/.test(c); }).map(Number);

      if (nums.length >= cols) {
        const take = nums.slice(nums.length - cols); // kolom paling kanan
        // baris pertama yang berisi 1..cols dianggap judul kolom, bukan data
        if (out.length === 0 && isHeaderRun(take)) { skipped++; return; }
        out.push(take);
      } else if (cells.length) {
        skipped++;
      }
    });

    return { rows: out, skipped: skipped };
  }

  /* ---------------- Utilitas ---------------- */

  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function toast(msg, kind) {
    let t = document.getElementById('sp-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'sp-toast';
      t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:200;' +
        'padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;' +
        'box-shadow:0 10px 30px rgba(7,26,53,.25);transition:opacity .2s;max-width:calc(100vw - 32px)';
      document.body.appendChild(t);
    }
    const c = kind === 'bad' ? ['#FEE2E2', '#7F1D1D'] : kind === 'warn' ? ['#FDF3C7', '#713F12'] : ['#071A35', '#FFFFFF'];
    t.style.background = c[0]; t.style.color = c[1];
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.opacity = '0'; }, 3200);
  }

  return {
    LOGO: LOGO, ICON: ICON,
    grade: grade, gradeUp: gradeUp, chip: chip,
    id1: id1, id3: id3, idn: idn,
    nrrSkm: nrrSkm, nrrSpak: nrrSpak, indeks: indeks,
    topbar: topbar, mount: mount,
    trend: trend, unsurBars: unsurBars,
    stackSkm: stackSkm, stackSpak: stackSpak,
    openModal: openModal, closeModal: closeModal, wireModals: wireModals,
    parsePaste: parsePaste,
    el: el, esc: esc, toast: toast
  };
})();

document.addEventListener('DOMContentLoaded', function () { SP.wireModals(); });
