/* ==========================================================================
   SIPANDU PRIMA — Data contoh
   Seluruh angka pada prototipe ini adalah DATA CONTOH, bukan data nyata.
   Rantai perhitungannya konsisten: rekap unit -> Polres -> Polda.
   ========================================================================== */

window.DATA = (function () {

  /* ---- Instrumen SKM: 9 unsur, skala 1-6 dengan bobot 1 / 1,6 / 2,2 / 2,8 / 3,4 / 4 ---- */
  const BOBOT = [1, 1.6, 2.2, 2.8, 3.4, 4];

  const SKALA = [
    { n: 1, label: 'Sangat buruk', bobot: 1,   warna: '#991B1B' },
    { n: 2, label: 'Buruk',        bobot: 1.6, warna: '#DC2626' },
    { n: 3, label: 'Cukup buruk',  bobot: 2.2, warna: '#F97316' },
    { n: 4, label: 'Cukup baik',   bobot: 2.8, warna: '#EAB308' },
    { n: 5, label: 'Baik',         bobot: 3.4, warna: '#84CC16' },
    { n: 6, label: 'Sangat baik',  bobot: 4,   warna: '#16A34A' }
  ];

  const UNSUR_SKM = [
    { kode: 'U1',  nama: 'Informasi layanan' },
    { kode: 'U2',  nama: 'Persyaratan pelayanan' },
    { kode: 'U3',  nama: 'Alur / prosedur' },
    { kode: 'U4',  nama: 'Jangka waktu' },
    { kode: 'U5',  nama: 'Biaya pelayanan' },
    { kode: 'U6',  nama: 'Fasilitas pelayanan' },
    { kode: 'U7a', nama: 'Kompetensi petugas' },
    { kode: 'U7b', nama: 'Perilaku petugas' },
    { kode: 'U8',  nama: 'Pengaduan pelayanan' }
  ];

  /* ---- Instrumen SPAK: 4 unsur, Tidak ada = 4, Ragu = 2, Ada = 0 ---- */
  const OPSI_SPAK = [
    { kode: 'TA', label: 'Tidak ada', skor: 4, warna: '#16A34A' },
    { kode: 'RG', label: 'Ragu-ragu', skor: 2, warna: '#EAB308' },
    { kode: 'AD', label: 'Ada',       skor: 0, warna: '#DC2626' }
  ];

  const UNSUR_SPAK = [
    { kode: 'K1', nama: 'Pelayanan di luar prosedur', tanya: 'Apakah ada pelayanan di luar prosedur, curang, diskriminasi, atau pilih kasih?' },
    { kode: 'K2', nama: 'Pemberian imbalan',          tanya: 'Apakah ada pemberian imbalan uang atau barang sebagai ucapan terima kasih?' },
    { kode: 'K3', nama: 'Pungutan liar',              tanya: 'Apakah ada pungutan liar (pungli)?' },
    { kode: 'K4', nama: 'Calo tidak resmi',           tanya: 'Apakah ada calo atau perantara tidak resmi?' }
  ];

  /* ================= JENJANG POLDA ================= */

  const POLDA = {
    nama: 'Polda Kalimantan Tengah',
    ikm: 83.8, ipak: 91.4, responden: 14382, respondenSpak: 13907,
    unitLapor: 110, unitTotal: 112, deltaIkm: '+0,9', deltaIpak: '+1,3',
    strategi: { total: 24, efektif: 9, belum: 11, tidak: 4 },
    /* NRR pada skala bobot 1-4; IKM unsur = NRR x 25 */
    unsur: [
      ['U4',  'Jangka waktu',          2.926],
      ['U6',  'Fasilitas pelayanan',   3.112],
      ['U3',  'Alur / prosedur',       3.244],
      ['U1',  'Informasi layanan',     3.316],
      ['U8',  'Pengaduan pelayanan',   3.388],
      ['U7a', 'Kompetensi petugas',    3.400],
      ['U2',  'Persyaratan pelayanan', 3.460],
      ['U7b', 'Perilaku petugas',      3.536],
      ['U5',  'Biaya pelayanan',       3.772]
    ],
    /* NRR SPAK 0-4; indeks = NRR x 25 */
    spak: [
      ['K2', 'Pemberian imbalan',            3.58],
      ['K4', 'Calo tidak resmi',             3.60],
      ['K1', 'Pelayanan di luar prosedur',   3.71],
      ['K3', 'Pungutan liar',                3.74]
    ],
    trenIkm:  [79.4, 80.1, 80.8, 81.5, 81.2, 82.0, 82.6, 82.9, 83.8],
    trenIpak: [88.2, 88.6, 89.1, 89.4, 89.9, 90.2, 90.6, 90.1, 91.4],
    komposisiSkm:  [1, 3, 7, 16, 38, 35],
    komposisiSpak: [86, 11, 3],
    totalJawabanSkm: 129438
  };

  /* 14 satuan kewilayahan */
  const SATWIL = [
    [1,  'Polres Sukamara',           'Sukamara',       89.4, 94.2, 612,  '6/6',   1, '+2,3'],
    [2,  'Polres Lamandau',           'Nanga Bulik',    88.6, 93.5, 587,  '6/6',   1, '+1,9'],
    [3,  'Polres Barito Timur',       'Tamiang Layang', 87.2, 92.8, 703,  '7/7',   2, '+1,4'],
    [4,  'Polresta Palangka Raya',    'Palangka Raya',  86.5, 92.1, 2418, '11/11', 3, '+0,8'],
    [5,  'Polres Gunung Mas',         'Kuala Kurun',    85.9, 93.0, 664,  '7/7',   1, '+2,1'],
    [6,  'Polres Murung Raya',        'Puruk Cahu',     85.1, 91.6, 598,  '6/6',   2, '+1,2'],
    [7,  'Polres Barito Selatan',     'Buntok',         84.3, 91.2, 812,  '8/8',   2, '+0,6'],
    [8,  'Polres Pulang Pisau',       'Pulang Pisau',   83.7, 90.4, 741,  '7/7',   2, '-0,4'],
    [9,  'Polres Seruyan',            'Kuala Pembuang', 83.0, 90.8, 769,  '7/8',   1, '+1,1'],
    [10, 'Polres Katingan',           'Kasongan',       82.4, 90.1, 856,  '8/8',   2, '+0,9'],
    [11, 'Polres Kapuas',             'Kuala Kapuas',   81.8, 89.7, 1204, '9/9',   2, '-0,7'],
    [12, 'Polres Barito Utara',       'Muara Teweh',    80.6, 88.9, 897,  '8/8',   1, '+0,3'],
    [13, 'Polres Kotawaringin Barat', 'Pangkalan Bun',  79.2, 87.4, 1641, '10/10', 2, '+1,6'],
    [14, 'Polres Kotawaringin Timur', 'Sampit',         78.0, 83.8, 1880, '10/11', 5, '-1,2']
  ];

  /* ================= JENJANG POLRES (Kotawaringin Timur) ================= */

  const POLRES = {
    nama: 'Polres Kotawaringin Timur',
    kota: 'Sampit',
    ikm: 78.0, ipak: 83.8, responden: 1880, respondenSpak: 1834,
    unitLapor: 10, unitTotal: 11, deltaIkm: '-1,2', deltaIpak: '-0,9',
    peringkat: 14, dariSatwil: 14,
    strategi: { total: 5, efektif: 2, belum: 2, tidak: 1 },
    unsur: [
      ['U4',  'Jangka waktu',          2.696],
      ['U6',  'Fasilitas pelayanan',   2.876],
      ['U3',  'Alur / prosedur',       2.980],
      ['U1',  'Informasi layanan',     3.040],
      ['U8',  'Pengaduan pelayanan',   3.124],
      ['U7a', 'Kompetensi petugas',    3.180],
      ['U2',  'Persyaratan pelayanan', 3.212],
      ['U7b', 'Perilaku petugas',      3.308],
      ['U5',  'Biaya pelayanan',       3.664]
    ],
    spak: [
      ['K2', 'Pemberian imbalan',          3.26],
      ['K4', 'Calo tidak resmi',           3.29],
      ['K1', 'Pelayanan di luar prosedur', 3.42],
      ['K3', 'Pungutan liar',              3.44]
    ],
    trenIkm:  [80.2, 79.8, 79.1, 78.9, 79.4, 78.6, 78.9, 79.2, 78.0],
    trenIpak: [85.6, 85.2, 84.9, 84.4, 84.8, 84.1, 84.6, 84.7, 83.8],
    komposisiSkm:  [2, 6, 12, 22, 34, 24],
    komposisiSpak: [78, 15, 7],
    totalJawabanSkm: 16920
  };

  /* Unit layanan Polres Kotim.
     cells = 9 nilai IKM per unsur (urutan U1,U2,U3,U4,U5,U6,U7a,U7b,U8)
     cellsSpak = 4 nilai indeks per unsur SPAK (K1,K2,K3,K4) */
  const UNIT = [
    ['Pelayanan Informasi Publik (PPID)',  'Sihumas',     [85,89,84,80,95,82,86,89,87], [93,90,94,89], 86.2, 91.5, 42,  0],
    ['Izin Keramaian dan Rek. Senpi',      'Satintelkam', [83,87,81,77,94,79,84,87,85], [91,88,92,88], 84.1, 89.8, 68,  0],
    ['Sentra Pelayanan Kepolisian Terpadu','SPKT',        [81,84,79,74,93,76,82,85,85], [89,85,89,86], 82.4, 87.2, 268, 1],
    ['Pelayanan SKCK',                     'Satintelkam', [80,85,78,72,92,75,81,84,84], [88,84,88,85], 81.6, 86.4, 312, 0],
    ['Pelayanan Pengaduan Masyarakat',     'Siwas',       [78,82,76,71,92,74,80,83,80], [90,86,90,86], 79.5, 88.1, 41,  0],
    ['Pelayanan BPKB',                     'Satlantas',   [77,81,75,70,92,73,79,82,78], [87,83,86,84], 78.8, 85.0, 144, 0],
    ['Pelayanan STNK (Samsat)',            'Satlantas',   [75,79,73,66,91,70,78,81,77], [85,81,85,83], 76.2, 83.6, 356, 1],
    ['Pelayanan SIM (Satpas)',             'Satlantas',   [73,77,71,64,90,68,77,80,75], [82,77,80,80], 74.9, 79.8, 421, 3],
    ['Pelayanan SP2HP / Penyidikan',       'Satreskrim',  [71,76,70,63,89,67,76,79,74], [84,80,83,82], 73.6, 82.4, 96,  1],
    ['Pelayanan Tilang dan Laka',          'Satlantas',   [69,74,67,61,88,64,74,77,72], [79,75,78,78], 71.3, 77.5, 132, 2],
    ['Pelayanan Poliklinik',               'Sidokkes',    [null,null,null,null,null,null,null,null,null], [null,null,null,null], null, null, null, null]
  ];

  /* ================= JENJANG UNIT (Pelayanan SIM / Satpas) ================= */

  const UNITX = {
    nama: 'Pelayanan SIM (Satpas)',
    induk: 'Polres Kotawaringin Timur',
    satfung: 'Satlantas',
    ikm: 74.9, ipak: 79.8, responden: 421, respondenSpak: 408,
    entriTerisi: 12, entriTotal: 13, deltaIkm: '+0,8', deltaIpak: '+1,5',
    strategi: { total: 3, efektif: 1, belum: 1, baru: 1 },
    unsur: [
      ['U4',  'Jangka waktu',          2.552],
      ['U6',  'Fasilitas pelayanan',   2.732],
      ['U3',  'Alur / prosedur',       2.840],
      ['U1',  'Informasi layanan',     2.904],
      ['U8',  'Pengaduan pelayanan',   2.992],
      ['U7a', 'Kompetensi petugas',    3.060],
      ['U2',  'Persyaratan pelayanan', 3.080],
      ['U7b', 'Perilaku petugas',      3.194],
      ['U5',  'Biaya pelayanan',       3.592]
    ],
    spak: [
      ['K2', 'Pemberian imbalan',          3.08],
      ['K3', 'Pungutan liar',              3.21],
      ['K4', 'Calo tidak resmi',           3.22],
      ['K1', 'Pelayanan di luar prosedur', 3.26]
    ],
    trenIkm:  [72.1, 73.0, 72.4, 73.8, 74.2, 73.5, 75.0, 74.1, 74.9],
    trenIpak: [76.8, 77.4, 77.1, 78.0, 78.6, 78.2, 79.4, 78.3, 79.8],
    komposisiSkm:  [3, 8, 15, 25, 32, 17],
    komposisiSpak: [74, 18, 8],
    totalJawabanSkm: 3789
  };

  /* Riwayat entri mingguan unit SIM */
  const RIWAYAT = [
    ['P39', '21 – 27 September 2026',        38, 81.0, 87.5, 'Menunggu validasi'],
    ['P38', '14 – 20 September 2026',        34, 75.4, 80.1, 'Tervalidasi'],
    ['P37', '7 – 13 September 2026',         41, 74.8, 79.3, 'Tervalidasi'],
    ['P36', '31 Agustus – 6 September 2026', 29, 73.2, 78.4, 'Tervalidasi'],
    ['P35', '24 – 30 Agustus 2026',          36, 76.1, 80.6, 'Tervalidasi'],
    ['P34', '17 – 23 Agustus 2026',          31, 72.9, 77.4, 'Ditolak, sudah direvisi']
  ];

  /* ================= ENTRI PEKAN 39 (untuk form input & validasi) ================= */

  /* Frekuensi per unsur untuk skala 1..6, total 38 responden per baris */
  const ENTRI_SKM = [
    ['U1',  'Informasi layanan',     [0, 1, 3,  9, 15, 10]],
    ['U2',  'Persyaratan pelayanan', [0, 0, 2,  7, 17, 12]],
    ['U3',  'Alur / prosedur',       [1, 1, 4, 10, 14,  8]],
    ['U4',  'Jangka waktu',          [2, 3, 6, 12, 10,  5]],
    ['U5',  'Biaya pelayanan',       [0, 0, 1,  3, 12, 22]],
    ['U6',  'Fasilitas pelayanan',   [1, 2, 5, 11, 13,  6]],
    ['U7a', 'Kompetensi petugas',    [0, 1, 3,  8, 16, 10]],
    ['U7b', 'Perilaku petugas',      [0, 1, 2,  7, 16, 12]],
    ['U8',  'Pengaduan pelayanan',   [1, 1, 3, 10, 14,  9]]
  ];

  /* Frekuensi per unsur SPAK: [Tidak ada, Ragu, Ada] */
  const ENTRI_SPAK = [
    ['K1', 31, 6, 1],
    ['K2', 28, 8, 2],
    ['K3', 32, 5, 1],
    ['K4', 29, 7, 2]
  ];

  /* ================= STRATEGI & EVALUASI ================= */

  const STRATEGI = [
    ['Pelayanan SIM (Satpas)', 'Satlantas', 'Jul 2026', 'U4 Jangka waktu', 'D', 'STR-001',
     'Tambah loket foto dan sidik jari pada jam puncak 08.00 – 10.00',
     'Kanit Regident', '14 Jul 2026', 'Selesai', 2.480, 2.552],
    ['Pelayanan SIM (Satpas)', 'Satlantas', 'Jul 2026', 'U6 Fasilitas', 'C', 'STR-006',
     'Ganti pendingin ruang tunggu dan tambah 20 kursi antrean',
     'Kasat Lantas', '14 Jul 2026', 'Berjalan', 2.702, 2.732],
    ['Pelayanan Tilang dan Laka', 'Satlantas', 'Agu 2026', 'U4 Jangka waktu', 'D', 'STR-002',
     'Antrean digital dan penambahan satu hari sidang tilang per pekan',
     'Kasat Lantas', '3 Agu 2026', 'Berjalan', 2.484, 2.440],
    ['Pelayanan SP2HP / Penyidikan', 'Satreskrim', 'Agu 2026', 'U1 Informasi', 'C', 'STR-003',
     'Kirim progres SP2HP otomatis via WhatsApp setiap 14 hari',
     'KBO Reskrim', '5 Agu 2026', 'Selesai', 2.706, 2.840],
    ['Pelayanan STNK (Samsat)', 'Satlantas', 'Agu 2026', 'U3 Alur / prosedur', 'C', 'STR-004',
     'Papan alur layanan dan nomor antrean digital di pintu masuk',
     'Kanit Regident', '11 Agu 2026', 'Berjalan', 2.900, 2.920],
    ['Pelayanan SIM (Satpas)', 'Satlantas', 'Sep 2026', 'U3 Alur / prosedur', 'C', 'STR-005',
     'Pemisahan jalur perpanjangan dan pembuatan SIM baru',
     'Kanit Regident', '8 Sep 2026', 'Baru ditetapkan', 2.840, null],
    ['Pelayanan Tilang dan Laka', 'Satlantas', 'Sep 2026', 'U6 Fasilitas', 'D', 'STR-007',
     'Renovasi ruang tunggu dan penambahan kanopi area antrean',
     'Kasat Lantas', '15 Sep 2026', 'Baru ditetapkan', 2.560, null]
  ];

  const BANK = [
    ['STR-010', 'U5 Biaya',       'skm',  'Papan tarif resmi dan pembayaran nontunai', 'Tarif PNBP terpampang dan seluruh pembayaran lewat bank', 4,  100, 'Aktif'],
    ['STR-003', 'U1 Informasi',   'skm',  'Notifikasi progres layanan via WhatsApp',   'Kirim pemberitahuan tahap layanan otomatis ke nomor pemohon', 14, 86,  'Aktif'],
    ['STR-005', 'U3 Alur',        'skm',  'Pemisahan jalur baru dan perpanjangan',     'Dua antrean terpisah agar layanan singkat tidak tertahan', 6,  83,  'Aktif'],
    ['STR-007', 'U6 Fasilitas',   'skm',  'Jalur dan loket prioritas',                 'Loket khusus lansia, difabel, dan ibu hamil', 5,  80,  'Aktif'],
    ['STR-001', 'U4 Jangka waktu','skm',  'Tambah loket pada jam puncak',              'Buka loket tambahan pada rentang jam tersibuk hasil analisis antrean', 12, 75, 'Aktif'],
    ['STR-009', 'U8 Pengaduan',   'skm',  'Kanal aduan QR di ruang tunggu',            'QR menuju formulir aduan yang masuk langsung ke Siwas', 7,  71,  'Aktif'],
    ['STR-008', 'U7b Perilaku',   'skm',  'Pelatihan pelayanan prima triwulanan',      'Refreshment sikap dan komunikasi petugas loket', 10, 70,  'Aktif'],
    ['STR-002', 'U4 Jangka waktu','skm',  'Antrean digital dan nomor online',          'Ambil nomor antrean dari ponsel sebelum datang', 9,  67,  'Aktif'],
    ['STR-013', 'U7a Kompetensi', 'skm',  'Sertifikasi dan rotasi petugas loket',      'Uji kompetensi berkala dan rotasi antar loket agar cakap lintas layanan', 3, 67, 'Aktif'],
    ['STR-011', 'SPAK Calo',      'spak', 'Penertiban calo bersama Sipropam',          'Patroli berkala area parkir dan pintu masuk layanan', 6, 67, 'Aktif'],
    ['STR-012', 'SPAK Pungli',    'spak', 'Kamera pengawas di area loket',             'CCTV aktif dengan papan pemberitahuan di titik layanan', 5, 60, 'Arsip'],
    ['STR-004', 'U3 Alur',        'skm',  'Papan alur layanan di titik masuk',         'Infografik alur dan syarat dipasang sebelum loket', 11, 55, 'Aktif'],
    ['STR-006', 'U6 Fasilitas',   'skm',  'Pembaruan ruang tunggu dan pendingin',      'Penambahan kursi, pendingin ruangan, dan air minum', 8, 50, 'Arsip']
  ];

  /* ================= NOTIFIKASI ================= */

  const NOTIF_LOG = [
    ['27 Sep 2026', '16.43 WIB', 'Entri menunggu validasi', '[NAMA] · Kanit Regident',  '+62 812-****-4417', 'Rekap SKM P39 · Pelayanan SIM',     'Terbaca'],
    ['27 Sep 2026', '16.43 WIB', 'Eskalasi SPAK',           '[NAMA] · Kasipropam',      '+62 813-****-2098', '6 jawaban "Ada" · Pelayanan SIM',   'Ditindaklanjuti'],
    ['27 Sep 2026', '16.43 WIB', 'Eskalasi SPAK',           '[NAMA] · Kasiwas',         '+62 852-****-7731', '6 jawaban "Ada" · Pelayanan SIM',   'Terkirim'],
    ['27 Sep 2026', '09.00 WIB', 'Pengingat input rekap',   '[NAMA] · Banit SPKT',      '+62 821-****-5510', 'Rekap P39 · SPKT',                  'Ditindaklanjuti'],
    ['27 Sep 2026', '09.00 WIB', 'Pengingat input rekap',   '[NAMA] · Bamin Sidokkes',  '+62 857-****-3364', 'Rekap P39 · Poliklinik',            'Terkirim'],
    ['26 Sep 2026', '17.05 WIB', 'Mutu turun ke D',         '[NAMA] · Kasat Lantas',    '+62 811-****-9042', 'Jangka waktu · Pelayanan Tilang',   'Ditindaklanjuti'],
    ['26 Sep 2026', '08.30 WIB', 'Strategi jatuh tempo',    '[NAMA] · Kanit Regident',  '+62 812-****-4417', 'STR-001 · Pelayanan SIM',           'Terbaca'],
    ['25 Sep 2026', '14.12 WIB', 'Entri ditolak',           '[NAMA] · Banit Regident',  '+62 822-****-1187', 'Rekap SKM P34 · Pelayanan SIM',     'Ditindaklanjuti'],
    ['25 Sep 2026', '09.00 WIB', 'Unit belum lapor',        '[NAMA] · Kabag Ren',       '+62 813-****-6620', 'Poliklinik belum lapor 2 pekan',    'Eskalasi'],
    ['24 Sep 2026', '09.00 WIB', 'Pengingat input rekap',   '[NAMA] · Bamin Sidokkes',  '+62 857-****-3364', 'Rekap P38 · Poliklinik',            'Gagal kirim']
  ];

  const NOTIF_ATURAN = [
    ['Pengingat input rekap mingguan',        'Operator unit, tembusan kepala unit',   'Setiap Senin 09.00 WIB'],
    ['Entri menunggu validasi',               'Kepala unit layanan',                   'Segera setelah entri dikirim'],
    ['Entri ditolak kepala unit',             'Operator unit pengirim',                'Segera setelah penolakan'],
    ['Mutu unsur turun ke C atau D',          'Kepala unit, Kasat fungsi, Kabag Ren',  'Saat rekap periode ditutup'],
    ['Ambang jawaban "Ada" SPAK terlampaui',  'Kasipropam dan Kasiwas',                'Saat entri SPAK disetujui'],
    ['Strategi jatuh tempo evaluasi',         'Penetap strategi dan Kabag Ren',        'H-7 sebelum tenggat evaluasi']
  ];

  const PENERIMA = [
    ['Kapolres Kotawaringin Timur', 'Pimpinan',    'AKBP',   '+62 811-****-9001', 'Terverifikasi',       '9 Sep 2026',  true],
    ['Wakapolres',                  'Pimpinan',    'Kompol', '+62 812-****-4210', 'Terverifikasi',       '14 Mar 2026', false],
    ['Kabag Ren',                   'Bagren',      'Kompol', '+62 813-****-6620', 'Terverifikasi',       '2 Jan 2026',  false],
    ['Kasiwas',                     'Siwas',       'AKP',    '+62 852-****-7731', 'Terverifikasi',       '2 Jan 2026',  false],
    ['Kasipropam',                  'Sipropam',    'AKP',    '+62 813-****-2098', 'Terverifikasi',       '20 Jun 2026', false],
    ['Kasat Lantas',                'Satlantas',   'AKP',    '+62 811-****-9042', 'Terverifikasi',       '11 Feb 2026', false],
    ['Kanit Regident',              'Satlantas',   'Ipda',   '+62 812-****-4417', 'Menunggu verifikasi', '25 Sep 2026', false],
    ['Ka SPKT',                     'SPKT',        'Iptu',   '+62 821-****-5510', 'Terverifikasi',       '2 Jan 2026',  false],
    ['Kasat Intelkam',              'Satintelkam', 'AKP',    '+62 878-****-3055', 'Terverifikasi',       '8 Apr 2026',  false],
    ['Kasat Reskrim',               'Satreskrim',  'AKP',    '+62 856-****-1182', 'Gagal kirim 3x',      '2 Jan 2026',  false]
  ];

  const RIWAYAT_NOMOR = [
    ['9 Sep 2026, 10.24',  'Kapolres Kotawaringin Timur', '+62 812-****-7788', '+62 811-****-9001', 'Mutasi jabatan',       'Bamin Bagren'],
    ['25 Sep 2026, 14.02', 'Kanit Regident',              '+62 878-****-1120', '+62 812-****-4417', 'Mutasi jabatan',       'Bamin Bagren'],
    ['20 Jun 2026, 09.11', 'Kasipropam',                  '+62 852-****-4471', '+62 813-****-2098', 'Mutasi jabatan',       'Operator Polda'],
    ['11 Feb 2026, 16.40', 'Kasat Lantas',                '+62 811-****-2231', '+62 811-****-9042', 'Perbaikan nomor salah','Bamin Bagren']
  ];

  const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'];
  const PEKAN = ['P31', 'P32', 'P33', 'P34', 'P35', 'P36', 'P37', 'P38', 'P39'];

  return {
    BOBOT, SKALA, UNSUR_SKM, OPSI_SPAK, UNSUR_SPAK,
    POLDA, SATWIL, POLRES, UNIT, UNITX, RIWAYAT,
    ENTRI_SKM, ENTRI_SPAK,
    STRATEGI, BANK,
    NOTIF_LOG, NOTIF_ATURAN, PENERIMA, RIWAYAT_NOMOR,
    BULAN, PEKAN
  };
})();
