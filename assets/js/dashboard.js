/* ==========================================================================
   SIPANDU PRIMA — Dashboard berjenjang (Polda / Polres / Unit)
   Satu berkas untuk tiga jenjang, dengan pengalih SKM dan SPAK yang berfungsi.
   ========================================================================== */

(function () {

  const CFG = {
    polda: {
      sub: 'Polda Kalimantan Tengah',
      who: '[NAMA PEJABAT]', role: 'Kapolda Kalteng · Pimpinan Polda', ini: 'KP',
      d: null, // diisi saat render
      scope: 'Polda Kalteng — Semua Satwil (14)', locked: false,
      periode: 'Tahun 2026 (s.d. September)',
      xlabels: 'BULAN'
    },
    polres: {
      sub: 'Polres Kotawaringin Timur · Sampit',
      who: '[NAMA PEJABAT]', role: 'Kabag Ren · Pimpinan Polres', ini: 'BR',
      scope: 'Polres Kotawaringin Timur — terkunci pada satwil Anda', locked: true,
      periode: 'Triwulan III 2026',
      xlabels: 'BULAN'
    },
    unit: {
      sub: 'Pelayanan SIM (Satpas) · Polres Kotim',
      who: '[NAMA PEJABAT]', role: 'Kanit Regident · Kepala Unit Layanan', ini: 'KR',
      scope: 'Pelayanan SIM (Satpas) — terkunci pada unit Anda', locked: true,
      periode: 'Triwulan III 2026',
      xlabels: 'PEKAN'
    }
  };

  let LEVEL = 'polda';
  let SURVEI = 'skm';

  function D() {
    return LEVEL === 'polda' ? DATA.POLDA : LEVEL === 'polres' ? DATA.POLRES : DATA.UNITX;
  }

  /* ---------------- KPI ---------------- */

  function kpis() {
    const d = D(), skm = SURVEI === 'skm';
    const heroVal = skm ? d.ikm : d.ipak;
    const heroLab = skm ? 'Indeks Kepuasan Masyarakat' : 'Indeks Persepsi Anti Korupsi';
    const heroDelta = skm ? d.deltaIkm : d.deltaIpak;
    const otherVal = skm ? d.ipak : d.ikm;
    const otherLab = skm ? 'Indeks Persepsi Anti Korupsi' : 'Indeks Kepuasan Masyarakat';
    const otherDelta = skm ? d.deltaIpak : d.deltaIkm;

    const dcls = function (s) { return s.indexOf('-') === 0 ? 'down' : 'up'; };
    const darr = function (s) { return (s.indexOf('-') === 0 ? '▼ ' : '▲ ') + s; };

    let out = '';

    out += '<div class="card kpi">' +
      '<div class="lab">' + heroLab + '</div>' +
      '<div style="display:flex;align-items:flex-end;gap:10px;margin-top:8px">' +
        '<div class="hero">' + SP.id1(heroVal) + '</div>' +
        '<span style="margin-bottom:8px">' + SP.chip(heroVal) + '</span>' +
      '</div>' +
      '<div class="' + dcls(heroDelta) + '" style="font-size:12px;font-weight:600;margin-top:12px">' +
        darr(heroDelta) + ' <span class="note" style="font-weight:500">vs periode lalu</span></div>' +
      '</div>';

    out += '<div class="card kpi">' +
      '<div class="lab">' + otherLab + '</div>' +
      '<div style="display:flex;align-items:flex-end;gap:10px;margin-top:8px">' +
        '<div class="big" style="margin-bottom:4px">' + SP.id1(otherVal) + '</div>' +
        '<span style="margin-bottom:8px">' + SP.chip(otherVal) + '</span>' +
      '</div>' +
      '<div class="' + dcls(otherDelta) + '" style="font-size:12px;font-weight:600;margin-top:16px">' +
        darr(otherDelta) + ' <span class="note" style="font-weight:500">vs periode lalu</span></div>' +
      '</div>';

    out += '<div class="card kpi">' +
      '<div class="lab">Total responden</div>' +
      '<div class="big" style="margin-top:12px">' + SP.idn(skm ? d.responden : d.respondenSpak) + '</div>' +
      '<div class="note" style="margin-top:10px">SKM ' + SP.idn(d.responden) + ' · SPAK ' + SP.idn(d.respondenSpak) + '</div>' +
      '</div>';

    if (LEVEL === 'unit') {
      const pct = (d.entriTerisi / d.entriTotal * 100).toFixed(1);
      out += '<div class="card kpi">' +
        '<div class="lab">Entri rekap mingguan</div>' +
        '<div style="display:flex;align-items:baseline;gap:6px;margin-top:12px">' +
          '<div class="big">' + d.entriTerisi + '</div>' +
          '<div style="font-size:16px;font-weight:600;color:#94A3B8">/ ' + d.entriTotal + ' pekan</div></div>' +
        '<div class="meter" style="margin-top:14px"><i style="width:' + pct + '%;background:var(--c)"></i></div>' +
        '<div class="note" style="margin-top:8px;color:#1E3A8A;font-weight:600">1 entri menunggu validasi</div>' +
        '</div>';
      out += '<div class="card kpi">' +
        '<div class="lab">Strategi unit ini</div>' +
        '<div style="display:flex;align-items:baseline;gap:6px;margin-top:12px">' +
          '<div class="big">' + d.strategi.total + '</div>' +
          '<div style="font-size:16px;font-weight:600;color:#94A3B8">berjalan</div></div>' +
        '<div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;font-size:11.5px;font-weight:700">' +
          '<span style="color:var(--a-tx)">' + d.strategi.efektif + ' efektif</span>' +
          '<span style="color:var(--c-tx)">' + d.strategi.belum + ' belum terlihat</span>' +
          '<span style="color:var(--muted)">' + d.strategi.baru + ' baru</span></div>' +
        '</div>';
    } else {
      const pct = (d.unitLapor / d.unitTotal * 100).toFixed(1);
      const full = d.unitLapor === d.unitTotal;
      out += '<div class="card kpi">' +
        '<div class="lab">Kepatuhan pelaporan</div>' +
        '<div style="display:flex;align-items:baseline;gap:6px;margin-top:12px">' +
          '<div class="big">' + d.unitLapor + '</div>' +
          '<div style="font-size:16px;font-weight:600;color:#94A3B8">/ ' + d.unitTotal + ' unit</div></div>' +
        '<div class="meter" style="margin-top:14px"><i style="width:' + pct + '%;background:' + (full ? 'var(--a)' : 'var(--c)') + '"></i></div>' +
        '<div class="note" style="margin-top:8px">' + (d.unitTotal - d.unitLapor) + ' unit belum melapor</div>' +
        '</div>';
      out += '<div class="card kpi">' +
        '<div class="lab">Tindak lanjut berjalan</div>' +
        '<div style="display:flex;align-items:baseline;gap:6px;margin-top:12px">' +
          '<div class="big">' + d.strategi.total + '</div>' +
          '<div style="font-size:16px;font-weight:600;color:#94A3B8">strategi</div></div>' +
        '<div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;font-size:11.5px;font-weight:700">' +
          '<span style="color:var(--a-tx)">' + d.strategi.efektif + ' efektif</span>' +
          '<span style="color:var(--c-tx)">' + d.strategi.belum + ' belum terlihat</span>' +
          '<span style="color:var(--d-tx)">' + d.strategi.tidak + ' tidak efektif</span></div>' +
        '</div>';
    }
    return out;
  }

  /* ---------------- Tren ---------------- */

  function trendCard() {
    const d = D(), skm = SURVEI === 'skm';
    const data = skm ? d.trenIkm : d.trenIpak;
    const labels = LEVEL === 'unit' ? DATA.PEKAN : DATA.BULAN;
    const lo = Math.floor((Math.min.apply(null, data) - 4) / 5) * 5;
    const hi = lo + 20;

    const refs = [];
    if (skm) {
      if (88.3 <= hi && 88.3 >= lo) refs.push({ v: 88.3, label: 'Batas mutu A · 88,3', color: '#BBF7D0', text: '#15803D' });
      if (76.6 <= hi && 76.6 >= lo) refs.push({ v: 76.6, label: 'Batas mutu B · 76,6', color: '#D9F99D', text: '#3F6212' });
      if (LEVEL === 'polres' && 83.8 <= hi) refs.push({ v: 83.8, label: 'Rata-rata Polda · 83,8', color: '#C7D3E2', text: '#18385F', align: 'left' });
    } else {
      if (88.3 <= hi && 88.3 >= lo) refs.push({ v: 88.3, label: 'Batas mutu A · 88,3', color: '#BBF7D0', text: '#15803D' });
      if (76.6 <= hi && 76.6 >= lo) refs.push({ v: 76.6, label: 'Batas mutu B · 76,6', color: '#D9F99D', text: '#3F6212' });
    }

    return '<div class="card pad" style="width:640px;flex-shrink:0">' +
      '<div class="card-title">Tren ' + (skm ? 'indeks kepuasan' : 'indeks persepsi anti korupsi') + '</div>' +
      '<div class="card-sub">' + d.nama + ' · ' + (LEVEL === 'unit' ? 'pekan 31 – 39 tahun 2026' : 'Januari – September 2026') + '</div>' +
      '<div style="margin-top:12px">' + SP.trend({
        data: data, labels: labels, min: lo, max: hi, refs: refs,
        label: 'Grafik tren ' + (skm ? 'IKM' : 'IPAK') + ' ' + d.nama
      }) + '</div></div>';
  }

  /* ---------------- Unsur ---------------- */

  function unsurCard() {
    const d = D(), skm = SURVEI === 'skm';
    const rows = skm ? d.unsur : d.spak;
    const low = rows[0];
    const lowIdx = low[2] * 25;

    let alert = '';
    if (skm) {
      alert = '<div class="note ' + (lowIdx < 65 ? 'bad' : 'warn') + '" style="margin-top:14px">' +
        (lowIdx < 65 ? SP.ICON.bad : SP.ICON.warn) +
        '<div class="grow"><b>' + low[1] + '</b> berada pada mutu ' + SP.gradeUp(lowIdx) +
        ' dan menjadi unsur terendah. Unsur ini wajib masuk rencana tindak lanjut.</div>' +
        '<a href="strategi.html" style="font-weight:700;white-space:nowrap">Lihat strategi →</a></div>';
    } else {
      alert = '<div class="note info" style="margin-top:14px">' + SP.ICON.info +
        '<div>Skor jawaban: Ada 0 · Ragu-ragu 2 · Tidak ada 4. Nilai tinggi berarti praktik korupsi <b>tidak</b> dirasakan responden. IPAK = rata-rata NRR 4 unsur × 25.</div></div>';
    }

    return '<div class="card pad grow" style="display:flex;flex-direction:column">' +
      '<div class="card-title">Indeks per unsur ' + (skm ? 'SKM · 9 unsur' : 'SPAK · 4 unsur') + '</div>' +
      '<div class="card-sub">Diurutkan dari nilai terendah — unsur teratas adalah prioritas perbaikan</div>' +
      '<div style="margin-top:14px">' + SP.unsurBars(rows) + '</div>' +
      '<span class="grow"></span>' + alert + '</div>';
  }

  /* ---------------- Komposisi ---------------- */

  function komposisiCard() {
    const d = D(), skm = SURVEI === 'skm';
    if (skm) {
      const nrrt = d.unsur.reduce(function (a, r) { return a + r[2]; }, 0) / d.unsur.length;
      return '<div class="card pad">' +
        '<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">' +
          '<div class="card-title">Komposisi jawaban SKM skala 1 – 6</div>' +
          '<div class="card-sub" style="margin:0">' + SP.idn(d.totalJawabanSkm) + ' jawaban · rata-rata bobot ' + nrrt.toFixed(2).replace('.', ',') + ' dari 4</div>' +
        '</div>' +
        '<div style="margin-top:14px">' + SP.stackSkm(d.komposisiSkm) + '</div>' +
        '<div class="note" style="margin-top:14px;padding-top:12px;border-top:1px solid #F1EDE3;background:none;border-left:none;border-right:none;border-bottom:none;font-size:11.5px;color:var(--muted)">' +
        'Bobot konversi: 1→1,0 · 2→1,6 · 3→2,2 · 4→2,8 · 5→3,4 · 6→4,0. NRR unsur = Σ(frekuensi × bobot) ÷ n, lalu IKM = Σ(NRR × 1/9) × 25.</div>' +
        '</div>';
    }
    return '<div class="card pad">' +
      '<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">' +
        '<div class="card-title">Komposisi jawaban SPAK</div>' +
        '<div class="card-sub" style="margin:0">' + SP.idn(d.respondenSpak * 4) + ' jawaban dari 4 unsur</div>' +
      '</div>' +
      '<div style="margin-top:14px">' + SP.stackSpak(d.komposisiSpak) + '</div>' +
      '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #F1EDE3;font-size:11.5px;color:var(--muted)">' +
      'Proporsi jawaban "Ada" yang melewati ambang memicu eskalasi otomatis ke Kasipropam dan Kasiwas.</div>' +
      '</div>';
  }

  /* ---------------- Tabel per jenjang ---------------- */

  function tablePolda() {
    const skm = SURVEI === 'skm';
    const rows = DATA.SATWIL.slice().sort(function (a, b) {
      return (skm ? b[3] - a[3] : b[4] - a[4]);
    });
    const body = rows.map(function (r, i) {
      const dn = r[8].indexOf('-') === 0;
      return '<tr>' +
        '<td style="color:#A8AFB9;font-weight:600">' + (i + 1) + '</td>' +
        '<td style="font-weight:600">' + r[1] + '</td>' +
        '<td style="color:var(--muted)">' + r[2] + '</td>' +
        '<td class="r b">' + SP.id1(r[3]) + '</td>' +
        '<td>' + SP.chip(r[3]) + '</td>' +
        '<td class="r b">' + SP.id1(r[4]) + '</td>' +
        '<td>' + SP.chip(r[4]) + '</td>' +
        '<td class="r num" style="color:var(--slate-500)">' + SP.idn(r[5]) + '</td>' +
        '<td class="r num" style="color:var(--slate-500)">' + r[6] + '</td>' +
        '<td class="r num" style="color:var(--slate-500)">' + (r[7] || '–') + '</td>' +
        '<td class="r num ' + (dn ? 'down' : 'up') + '" style="font-weight:600">' + (dn ? '▼ ' : '▲ ') + r[8] + '</td>' +
        '</tr>';
    }).join('');

    return '<div class="card">' +
      '<div class="card-head"><div><div class="card-title">Rincian per satuan kewilayahan</div>' +
      '<div class="card-sub">Peringkat antar-Polres hanya tersedia pada jenjang Polda</div></div>' +
      '<span class="grow"></span>' +
      '<button type="button" class="btn">Urutkan: ' + (skm ? 'IKM' : 'IPAK') + ' tertinggi</button></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      '<th style="width:44px">#</th><th>SATUAN KEWILAYAHAN</th><th>KEDUDUKAN</th>' +
      '<th class="r">IKM</th><th>MUTU</th><th class="r">IPAK</th><th>MUTU</th>' +
      '<th class="r">RESPONDEN</th><th class="r">LAPOR</th><th class="r">STRATEGI</th><th class="r">TREN</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div></div>';
  }

  function tablePolres() {
    const skm = SURVEI === 'skm';
    const cols = skm
      ? ['Info', 'Syarat', 'Alur', 'Waktu', 'Biaya', 'Fasilitas', 'Komp.', 'Perilaku', 'Aduan']
      : ['Prosedur', 'Imbalan', 'Pungli', 'Calo'];

    const body = DATA.UNIT.map(function (u) {
      const cells = (skm ? u[2] : u[3]).map(function (v) {
        return '<td style="padding:4px 3px"><div class="hm hm-' + SP.grade(v) + '">' +
          (v === null ? '–' : String(v).replace('.', ',')) + '</div></td>';
      }).join('');
      const strat = u[7] === null ? '<span class="tag warn">Belum lapor</span>'
        : u[7] === 0 ? '<span style="color:var(--muted-2)">–</span>'
        : '<span class="tag">' + u[7] + ' aktif</span>';
      return '<tr>' +
        '<td><div style="font-weight:600">' + u[0] + '</div><div class="t2">' + u[1] + '</div></td>' +
        cells +
        '<td class="r b">' + (u[4] === null ? '–' : SP.id1(u[4])) + '</td>' +
        '<td class="r b" style="color:var(--slate-500)">' + (u[5] === null ? '–' : SP.id1(u[5])) + '</td>' +
        '<td class="r num" style="color:var(--slate-500)">' + (u[6] === null ? '–' : SP.idn(u[6])) + '</td>' +
        '<td class="r">' + strat + '</td>' +
        '</tr>';
    }).join('');

    return '<div class="card">' +
      '<div class="card-head"><div><div class="card-title">Matriks unit layanan × unsur ' + (skm ? 'SKM' : 'SPAK') + '</div>' +
      '<div class="card-sub">Sel diwarnai menurut kategori mutu — memetakan titik lemah lintas unit dalam satu tatapan</div></div>' +
      '<span class="grow"></span>' +
      '<div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">' +
        SP.chip(92) + SP.chip(80) + SP.chip(70) + SP.chip(50) +
        '<span class="chip m-x"><i></i>Belum lapor</span></div></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      '<th style="min-width:220px">UNIT LAYANAN</th>' +
      cols.map(function (c) { return '<th class="c" style="min-width:58px">' + c + '</th>'; }).join('') +
      '<th class="r">IKM</th><th class="r">IPAK</th><th class="r">RESPONDEN</th><th class="r">STRATEGI</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      '<div style="padding:11px 18px;background:#FBF7EF;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center;border-radius:0 0 12px 12px">' +
      SP.ICON.lock + '<span style="font-size:12px;color:var(--muted)">Data Polres lain tidak tersedia pada jenjang ini. Perbandingan antar-satwil hanya dapat diakses dari jenjang Polda.</span></div>' +
      '</div>';
  }

  function tableUnit() {
    const body = DATA.RIWAYAT.map(function (r) {
      const st = r[5].indexOf('Ditolak') === 0 ? 'p-fail' : r[5] === 'Tervalidasi' ? 'p-act' : 'p-wait';
      return '<tr>' +
        '<td style="font-weight:700;color:var(--slate-500)">' + r[0] + '</td>' +
        '<td>' + r[1] + '</td>' +
        '<td class="r num" style="color:var(--slate-500)">' + r[2] + '</td>' +
        '<td class="r b">' + SP.id1(r[3]) + '</td>' +
        '<td class="r b" style="color:var(--slate-500)">' + SP.id1(r[4]) + '</td>' +
        '<td>' + SP.chip(SURVEI === 'skm' ? r[3] : r[4]) + '</td>' +
        '<td><span class="pill ' + st + '"><i></i>' + r[5] + '</span></td>' +
        '</tr>';
    }).join('');

    const tbl = '<div class="card grow">' +
      '<div class="card-head"><div><div class="card-title">Riwayat entri rekap mingguan</div>' +
      '<div class="card-sub">Hanya entri tervalidasi yang masuk ke dashboard dan laporan</div></div>' +
      '<span class="grow"></span><button type="button" class="btn">Lihat semua 12 entri</button></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      '<th style="width:70px">PEKAN</th><th>PERIODE</th><th class="r">RESPONDEN</th>' +
      '<th class="r">IKM</th><th class="r">IPAK</th><th>MUTU</th><th>STATUS</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div></div>';

    const empty = '<div class="card" style="width:330px;flex-shrink:0;padding:20px;border-style:dashed;border-color:#CFC7B8;display:flex;flex-direction:column;justify-content:center">' +
      '<div style="width:38px;height:38px;border-radius:10px;background:#F1EDE3;display:flex;align-items:center;justify-content:center">' + SP.ICON.lock + '</div>' +
      '<div style="font-size:13.5px;font-weight:700;margin-top:12px">Perbandingan antar unit tidak tersedia</div>' +
      '<div style="font-size:12px;color:var(--muted);line-height:1.55;margin-top:8px">Jenjang unit layanan adalah batas terbawah cakupan data. Nilai unit lain di Polres Kotawaringin Timur tidak dapat diakses dari sini, termasuk unit di bawah satfung yang sama.</div>' +
      '<div style="font-size:12px;color:var(--muted);line-height:1.55;margin-top:9px">Rekap seluruh unit dilihat oleh Kasiwas, Kabag Ren, dan Kapolres pada jenjang Polres.</div>' +
      '</div>';

    return '<div class="row">' + tbl + empty + '</div>';
  }

  /* ---------------- Render ---------------- */

  function render() {
    const c = CFG[LEVEL];

    SP.mount(SP.topbar({ sub: c.sub, nav: 'dashboard-polda.html', who: c.who, role: c.role, ini: c.ini }));

    /* bilah filter */
    const scopeBtn = c.locked
      ? '<span class="btn lock">' + SP.ICON.lock + c.scope + '</span>'
      : '<button type="button" class="btn">' + c.scope + SP.ICON.chev + '</button>';

    SP.el('filterbar').innerHTML =
      '<div class="seg" role="group" aria-label="Jenis survei">' +
        '<button type="button" data-s="skm"' + (SURVEI === 'skm' ? ' class="on"' : '') + '>SKM</button>' +
        '<button type="button" data-s="spak"' + (SURVEI === 'spak' ? ' class="on"' : '') + '>SPAK</button>' +
      '</div>' +
      '<span style="width:1px;height:24px;background:var(--border)"></span>' +
      scopeBtn +
      '<button type="button" class="btn">' + c.periode + SP.ICON.chev + '</button>' +
      '<span class="grow"></span>' +
      '<button type="button" class="btn">Ekspor XLSX</button>' +
      '<a class="btn" href="flyer.html">' + SP.ICON.img + 'Generate Flyer</a>' +
      '<button type="button" class="btn p">Cetak Laporan PDF</button>';

    SP.el('filterbar').querySelectorAll('.seg button').forEach(function (b) {
      b.addEventListener('click', function () { SURVEI = b.dataset.s; render(); });
    });

    /* isi halaman */
    const tbl = LEVEL === 'polda' ? tablePolda() : LEVEL === 'polres' ? tablePolres() : tableUnit();

    SP.el('page').innerHTML =
      '<div class="row sm">' + kpis() + '</div>' +
      '<div class="row">' + trendCard() + unsurCard() + '</div>' +
      komposisiCard() +
      tbl;
  }

  window.renderDashboard = function (level) {
    LEVEL = level;
    const q = new URLSearchParams(location.search).get('survei');
    if (q === 'spak' || q === 'skm') SURVEI = q;
    render();
  };
})();
