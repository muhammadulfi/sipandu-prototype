/* ==========================================================================
   SIPANDU PRIMA — Form input rekap (SKM & SPAK)
   Matriks hidup: total baris, NRR, dan indeks dihitung ulang setiap ketikan.
   Tersedia tiga cara mengisi: ketik manual, tempel dari spreadsheet,
   dan impor berkas Excel / CSV.
   ========================================================================== */

(function () {

  let MODE = 'skm';          // 'skm' | 'spak'
  let ROWS = [];             // [{kode, nama, freq:[...] }]
  let COLS = 6;
  let TOTAL = 38;

  function cfg() {
    return MODE === 'skm'
      ? {
          judul: 'Matriks rekap SKM — 9 unsur × skala 1 sampai 6',
          sub: 'Masukkan jumlah responden untuk setiap kombinasi unsur dan skala',
          kolom: DATA.SKALA.map(function (s) { return { head: String(s.n), lab: s.label, bobot: s.bobot, warna: s.warna }; }),
          nrrLab: '1 – 4', idxLab: 'IKM'
        }
      : {
          judul: 'Matriks rekap SPAK — 4 unsur × 3 pilihan jawaban',
          sub: 'Masukkan jumlah responden untuk tiap pilihan jawaban',
          kolom: DATA.OPSI_SPAK.map(function (o) { return { head: o.label, lab: 'skor ' + o.skor, bobot: o.skor, warna: o.warna }; }),
          nrrLab: '0 – 4', idxLab: 'IPAK'
        };
  }

  function nrrOf(freq) { return MODE === 'skm' ? SP.nrrSkm(freq) : SP.nrrSpak(freq); }

  /* ---------------- Matriks ---------------- */

  function buildMatrix() {
    const c = cfg();
    const w = MODE === 'skm' ? 'minmax(58px,1fr)' : 'minmax(100px,1fr)';

    let head = '<div class="mx-row mx-head">' +
      '<div class="mx-nm" style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.03em">' +
      (MODE === 'skm' ? 'UNSUR PELAYANAN' : 'UNSUR PERSEPSI ANTI KORUPSI') + '</div>' +
      '<div class="mx-cells">' +
      c.kolom.map(function (k) {
        return '<div><div class="sc" style="background:' + k.warna + '">' + k.head + '</div>' +
          '<div class="sc-lab">' + k.lab + '</div>' +
          '<div class="sc-bob">bobot ' + String(k.bobot).replace('.', ',') + '</div></div>';
      }).join('') +
      '</div>' +
      '<div class="mx-tot" style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.03em">TOTAL</div>' +
      '<div class="mx-nrr" style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.03em">NRR</div>' +
      '</div>';

    let body = ROWS.map(function (r, ri) {
      const cells = r.freq.map(function (v, ci) {
        return '<input class="cellin" type="number" min="0" step="1" value="' + v +
          '" data-r="' + ri + '" data-c="' + ci + '" aria-label="' + r.nama + ', ' + c.kolom[ci].head + '">';
      }).join('');
      return '<div class="mx-row">' +
        '<div class="mx-nm"><span class="mx-kode">' + r.kode + '</span><span>' + r.nama + '</span></div>' +
        '<div class="mx-cells">' + cells + '</div>' +
        '<div class="mx-tot" id="tot-' + ri + '"></div>' +
        '<div class="mx-nrr" id="nrr-' + ri + '"></div>' +
        '</div>';
    }).join('');

    let foot = '<div class="mx-row mx-foot">' +
      '<div class="mx-nm" style="font-weight:700">Jumlah jawaban</div>' +
      '<div class="mx-cells">' +
      c.kolom.map(function (_, i) { return '<div class="mx-cs" id="cs-' + i + '"></div>'; }).join('') +
      '</div>' +
      '<div class="mx-tot" id="grand"></div>' +
      '<div class="mx-nrr" id="nrrt"></div>' +
      '</div>';

    SP.el('matrix').innerHTML =
      '<style>' +
      '.mx-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border-2)}' +
      '.mx-head{align-items:flex-end;border-bottom:1px solid var(--border);padding-bottom:9px}' +
      '.mx-foot{border-bottom:none;padding-top:11px;font-weight:800}' +
      '.mx-nm{width:196px;flex-shrink:0;display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;line-height:1.25}' +
      '.mx-kode{font-size:10.5px;font-weight:700;color:var(--muted-2);width:28px;flex-shrink:0}' +
      '.mx-cells{flex-grow:1;display:grid;grid-template-columns:repeat(' + COLS + ',' + w + ');gap:8px;min-width:0}' +
      '.mx-tot{width:82px;flex-shrink:0;text-align:center;font-size:13.5px;font-weight:700;font-variant-numeric:tabular-nums}' +
      '.mx-nrr{width:64px;flex-shrink:0;text-align:right;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}' +
      '.mx-cs{text-align:center;font-size:13px;font-weight:700;color:var(--slate-500);font-variant-numeric:tabular-nums}' +
      '</style>' + head + body + foot;

    SP.el('matrix').querySelectorAll('.cellin').forEach(function (inp) {
      inp.addEventListener('input', function () {
        const v = parseInt(inp.value, 10);
        ROWS[+inp.dataset.r].freq[+inp.dataset.c] = isNaN(v) || v < 0 ? 0 : v;
        recalc();
      });
      inp.addEventListener('focus', function () { inp.select(); });
    });

    recalc();
  }

  /* ---------------- Hitung ulang ---------------- */

  function recalc() {
    const c = cfg();
    const colSum = new Array(COLS).fill(0);
    let grand = 0, nrrSum = 0, semuaPas = true;

    ROWS.forEach(function (r, ri) {
      const tot = r.freq.reduce(function (a, b) { return a + b; }, 0);
      const pas = tot === TOTAL;
      if (!pas) semuaPas = false;
      r.freq.forEach(function (v, i) { colSum[i] += v; });
      grand += tot;

      const nrr = nrrOf(r.freq);
      nrrSum += nrr;

      SP.el('tot-' + ri).innerHTML = pas
        ? '<span style="display:inline-flex;align-items:center;gap:5px;color:var(--up)">' + SP.ICON.ok + tot + '</span>'
        : '<span style="display:inline-flex;align-items:center;gap:5px;color:var(--down)">' + SP.ICON.bad + tot + '</span>';
      SP.el('nrr-' + ri).textContent = SP.id3(nrr);

      SP.el('matrix').querySelectorAll('[data-r="' + ri + '"]').forEach(function (inp) {
        inp.classList.toggle('err', !pas);
      });
    });

    colSum.forEach(function (v, i) { SP.el('cs-' + i).textContent = v; });
    SP.el('grand').textContent = grand;

    const nrrt = ROWS.length ? nrrSum / ROWS.length : 0;
    const idx = nrrt * 25;
    SP.el('nrrt').textContent = SP.id3(nrrt);

    /* pratinjau */
    SP.el('pv-val').textContent = SP.id1(idx);
    SP.el('pv-chip').innerHTML = SP.chip(idx, { label: 'Mutu ' + SP.gradeUp(idx) });
    SP.el('pv-rumus').textContent = 'NRRT ' + SP.id3(nrrt) + ' · ' + c.idxLab +
      ' = Σ(NRR × 1/' + ROWS.length + ') × 25';

    /* komposisi */
    const pct = colSum.map(function (v) { return grand ? Math.round(v / grand * 100) : 0; });
    SP.el('pv-stack').innerHTML = MODE === 'skm' ? SP.stackSkm(pct) : SP.stackSpak(pct);

    /* pemeriksaan */
    const cek = SP.el('cek');
    let html = '';
    html += cekItem(semuaPas, 'Seluruh ' + ROWS.length + ' baris unsur berjumlah ' + TOTAL,
      'Ada baris yang jumlahnya tidak sama dengan ' + TOTAL);
    html += cekItem(true, 'Pekan 39 belum pernah diisi untuk unit ini', '');
    html += cekItem(true, 'Periode tidak tumpang tindih dengan entri lain', '');
    if (MODE === 'spak') {
      const ada = colSum[2] || 0;
      html += cekItem(ada < 5, 'Jawaban "Ada" di bawah ambang eskalasi (5)',
        ada + ' jawaban "Ada" melampaui ambang — akan dieskalasi ke Kasipropam dan Kasiwas', true);
    } else {
      html += cekItem(false, '', 'Responden 21% lebih rendah dari rata-rata 4 pekan terakhir', true);
    }
    cek.innerHTML = html;

    /* tombol kirim */
    SP.el('btn-kirim').disabled = !semuaPas;
    SP.el('btn-kirim').style.opacity = semuaPas ? '1' : '.5';
    SP.el('btn-kirim').style.cursor = semuaPas ? 'pointer' : 'not-allowed';
  }

  function cekItem(ok, okText, badText, warnOnly) {
    const icon = ok ? SP.ICON.ok : (warnOnly ? SP.ICON.warn : SP.ICON.bad);
    const text = ok ? okText : badText;
    return '<div style="display:flex;gap:9px;align-items:flex-start;padding:4px 0">' + icon +
      '<span style="font-size:12.5px;color:var(--slate-500);line-height:1.45">' + text + '</span></div>';
  }

  /* ---------------- Isi dari array ---------------- */

  function applyRows(parsed) {
    let n = Math.min(parsed.length, ROWS.length);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < COLS; j++) ROWS[i].freq[j] = parsed[i][j] || 0;
    }
    buildMatrix();
    return n;
  }

  /* ---------------- Tempel dari spreadsheet ---------------- */

  function doPaste() {
    const raw = SP.el('paste-area').value;
    if (!raw.trim()) { SP.toast('Kotak tempel masih kosong.', 'warn'); return; }
    const res = SP.parsePaste(raw, COLS);
    if (!res.rows.length) {
      SP.toast('Tidak ada baris angka yang terbaca. Pastikan tiap baris berisi ' + COLS + ' angka.', 'bad');
      return;
    }
    const n = applyRows(res.rows);
    SP.closeModal('m-paste');
    SP.toast(n + ' baris berhasil dimuat' + (res.skipped ? ' · ' + res.skipped + ' baris dilewati' : '') + '.');
  }

  function previewPaste() {
    const raw = SP.el('paste-area').value;
    const box = SP.el('paste-preview');
    if (!raw.trim()) { box.innerHTML = '<span style="color:var(--muted-2)">Hasil pembacaan akan muncul di sini.</span>'; return; }
    const res = SP.parsePaste(raw, COLS);
    if (!res.rows.length) {
      box.innerHTML = '<span style="color:var(--down);font-weight:600">Tidak ada baris yang terbaca.</span> ' +
        'Tiap baris harus memuat ' + COLS + ' angka, dipisah TAB, koma, atau titik koma.';
      return;
    }
    const lines = res.rows.map(function (r, i) {
      const sum = r.reduce(function (a, b) { return a + b; }, 0);
      const nm = ROWS[i] ? ROWS[i].kode + ' ' + ROWS[i].nama : '(baris berlebih)';
      const ok = sum === TOTAL;
      return '<div style="display:flex;gap:10px;padding:3px 0;font-family:ui-monospace,monospace;font-size:11.5px">' +
        '<span style="width:150px;flex-shrink:0;color:var(--slate-500)">' + nm + '</span>' +
        '<span style="flex-grow:1">' + r.join('  ·  ') + '</span>' +
        '<span style="font-weight:700;color:' + (ok ? 'var(--up)' : 'var(--down)') + '">= ' + sum + '</span></div>';
    }).join('');
    box.innerHTML = '<div style="font-size:11.5px;font-weight:700;color:var(--slate-500);margin-bottom:6px">' +
      res.rows.length + ' baris terbaca, butuh ' + ROWS.length +
      (res.skipped ? ' · ' + res.skipped + ' baris dilewati' : '') + '</div>' + lines;
  }

  /* ---------------- Impor Excel / CSV ---------------- */

  function handleFile(file) {
    if (!file) return;
    const nama = file.name.toLowerCase();

    if (nama.endsWith('.csv') || nama.endsWith('.txt') || nama.endsWith('.tsv')) {
      const fr = new FileReader();
      fr.onload = function () {
        const res = SP.parsePaste(fr.result, COLS);
        finishImport(res, file.name);
      };
      fr.readAsText(file);
      return;
    }

    if (typeof XLSX === 'undefined') {
      SP.toast('Pustaka pembaca Excel belum termuat. Periksa koneksi internet, atau simpan berkas sebagai CSV.', 'bad');
      return;
    }

    const fr = new FileReader();
    fr.onload = function (e) {
      try {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const sh = wb.Sheets[wb.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json(sh, { header: 1, blankrows: false });
        const text = aoa.map(function (r) { return r.join('\t'); }).join('\n');
        finishImport(SP.parsePaste(text, COLS), file.name);
      } catch (err) {
        SP.toast('Berkas tidak dapat dibaca: ' + err.message, 'bad');
      }
    };
    fr.readAsArrayBuffer(file);
  }

  function finishImport(res, nama) {
    if (!res.rows.length) {
      SP.toast('Tidak ada baris angka yang terbaca dari ' + nama + '.', 'bad');
      return;
    }
    const n = applyRows(res.rows);
    SP.closeModal('m-import');
    SP.toast(n + ' baris dimuat dari ' + nama + '.');
  }

  /* ---------------- Unduh template ---------------- */

  function unduhTemplate(fmt) {
    const c = cfg();
    const head = ['Kode', 'Unsur'].concat(c.kolom.map(function (k) { return k.head; }));
    const body = ROWS.map(function (r) { return [r.kode, r.nama].concat(new Array(COLS).fill(0)); });
    const aoa = [head].concat(body);

    if (fmt === 'csv' || typeof XLSX === 'undefined') {
      const csv = aoa.map(function (r) { return r.join(','); }).join('\n');
      const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
      unduh(blob, 'template-rekap-' + MODE + '.csv');
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols'] = [{ wch: 6 }, { wch: 26 }].concat(new Array(COLS).fill({ wch: 12 }));
    XLSX.utils.book_append_sheet(wb, ws, MODE.toUpperCase());
    XLSX.writeFile(wb, 'template-rekap-' + MODE + '.xlsx');
  }

  function unduh(blob, nama) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nama;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ---------------- Init ---------------- */

  window.initInput = function (mode) {
    MODE = mode;
    COLS = mode === 'skm' ? 6 : 3;

    ROWS = mode === 'skm'
      ? DATA.ENTRI_SKM.map(function (r) { return { kode: r[0], nama: r[1], freq: r[2].slice() }; })
      : DATA.ENTRI_SPAK.map(function (r, i) {
          return { kode: r[0], nama: DATA.UNSUR_SPAK[i].nama, freq: [r[1], r[2], r[3]] };
        });

    const c = cfg();
    SP.el('mx-title').textContent = c.judul;
    SP.el('mx-sub').textContent = c.sub;

    buildMatrix();

    /* tombol */
    SP.el('btn-paste').addEventListener('click', function () {
      SP.el('paste-area').value = '';
      previewPaste();
      SP.openModal('m-paste');
      setTimeout(function () { SP.el('paste-area').focus(); }, 60);
    });
    SP.el('paste-area').addEventListener('input', previewPaste);
    SP.el('btn-paste-go').addEventListener('click', doPaste);
    SP.el('btn-paste-demo').addEventListener('click', function () {
      SP.el('paste-area').value = ROWS.map(function (r) { return r.freq.join('\t'); }).join('\n');
      previewPaste();
    });

    SP.el('btn-import').addEventListener('click', function () { SP.openModal('m-import'); });
    SP.el('file-input').addEventListener('change', function (e) { handleFile(e.target.files[0]); e.target.value = ''; });
    SP.el('btn-tpl-xlsx').addEventListener('click', function () { unduhTemplate('xlsx'); });
    SP.el('btn-tpl-csv').addEventListener('click', function () { unduhTemplate('csv'); });

    const dz = SP.el('dropzone');
    ['dragenter', 'dragover'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.style.borderColor = 'var(--navy-700)'; dz.style.background = '#F5F8FC'; });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.style.borderColor = '#CFC7B8'; dz.style.background = ''; });
    });
    dz.addEventListener('drop', function (e) { handleFile(e.dataTransfer.files[0]); });
    dz.addEventListener('click', function () { SP.el('file-input').click(); });

    SP.el('f-total').addEventListener('input', function () {
      const v = parseInt(this.value, 10);
      TOTAL = isNaN(v) || v < 0 ? 0 : v;
      SP.el('tot-hint').textContent = 'Setiap baris unsur harus berjumlah tepat ' + TOTAL + '.';
      recalc();
    });

    SP.el('btn-kirim').addEventListener('click', function () {
      if (this.disabled) return;
      SP.toast('Prototipe: entri akan masuk antrean validasi Kanit Regident.');
    });
  };
})();
