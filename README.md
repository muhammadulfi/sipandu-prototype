# SIPANDU PRIMA — Prototipe Antarmuka

Prototipe statis antarmuka **Sistem Monitoring Survei Pelayanan Publik Polda Kalimantan Tengah**.
Dibangun sebagai HTML, CSS, dan JavaScript biasa — tanpa framework, tanpa build step — agar dapat
langsung diunggah ke GitHub Pages.

> **Seluruh angka di dalamnya adalah data contoh.** Tidak ada data nyata Polri, tidak ada backend,
> dan tidak ada data yang tersimpan ke mana pun. Semua perubahan hilang saat halaman dimuat ulang.

---

## Daftar halaman

| Berkas | Halaman | Peran pengguna |
|---|---|---|
| `index.html` | Daftar layar dan catatan teknis | Semua |
| `dashboard-polda.html` | Dashboard jenjang Polda, 14 satwil | Pimpinan / Operator Polda |
| `dashboard-polres.html` | Dashboard jenjang Polres, matriks 11 unit | Pimpinan / Operator Polres |
| `dashboard-unit.html` | Dashboard jenjang unit layanan | Kepala / Operator Unit |
| `input-skm.html` | Input rekap SKM, 9 unsur × 6 skala | Operator Unit |
| `input-spak.html` | Input rekap SPAK, 4 unsur × 3 jawaban | Operator Unit |
| `validasi.html` | Antrean validasi kedua survei | Kepala Unit |
| `strategi.html` | Strategi dan evaluasi tindak lanjut | Pimpinan Polres |
| `bank-strategi.html` | Pustaka strategi | Operator Polda |
| `notifikasi.html` | Log pengiriman WhatsApp | Pengawas |
| `notifikasi-penerima.html` | Kelola nomor penerima per jabatan | Operator Polres |
| `flyer.html` | Generate flyer hasil survei | Humas |
| `mobile.html` | Input dari ponsel | Operator Unit |

Ketiga dashboard punya **pengalih SKM dan SPAK** di bilah filter yang berfungsi penuh.

---

## Yang benar-benar berfungsi di prototipe ini

- Pengalih SKM ↔ SPAK pada ketiga dashboard, termasuk pergantian matriks dan komposisinya.
- Matriks input: total baris, NRR, indeks, dan komposisi dihitung ulang setiap ketikan.
- **Tempel dari spreadsheet** — parser TSV/CSV lengkap dengan pratinjau hasil pembacaan.
- **Impor dari Excel** — membaca `.xlsx`, `.xls`, `.csv` lewat SheetJS, dengan seret dan lepas.
- **Unduh template** `.xlsx` dan `.csv` yang dibuat di sisi peramban.
- Pencarian pada Bank Strategi, log notifikasi, dan daftar nomor penerima.
- Opsi flyer: template, cakupan, dan daftar centang elemen langsung mengubah pratinjau.
- Tombol tambah dan kurang pada tampilan ponsel.

Yang **belum** berfungsi karena tidak ada backend: penyimpanan, autentikasi, pengiriman WhatsApp,
render flyer ke berkas gambar, dan ekspor PDF.

---

## Struktur berkas

```
sipandu-prima-prototype/
├── index.html                    ← halaman depan
├── dashboard-polda.html
├── dashboard-polres.html
├── dashboard-unit.html
├── input-skm.html
├── input-spak.html
├── validasi.html
├── strategi.html
├── bank-strategi.html
├── notifikasi.html
├── notifikasi-penerima.html
├── flyer.html
├── mobile.html
├── .nojekyll                     ← wajib ada, lihat catatan di bawah
├── README.md
└── assets/
    ├── css/app.css               ← seluruh gaya
    ├── img/logo.png
    └── js/
        ├── data.js               ← semua data contoh, ubah di sini
        ├── app.js                ← helper tampilan dan parser tempel
        ├── dashboard.js          ← perender tiga dashboard
        └── input.js              ← perender dua form input
```

Semua tautan **relatif**, jadi situs ini berjalan baik di root domain maupun di subfolder
seperti `namaanda.github.io/sipandu-prima-prototype/`.

---

## Cara deploy ke GitHub Pages

### Prasyarat

Akun GitHub. Tidak perlu memasang apa pun di komputer bila memakai Cara A.

---

### Cara A — lewat peramban, tanpa Git (paling cepat)

**1. Buat repositori baru**

Buka [github.com/new](https://github.com/new).

- *Repository name*: `sipandu-prima-prototype`
- Pilih **Public**
- Jangan centang *Add a README file*
- Klik **Create repository**

> GitHub Pages gratis hanya untuk repositori **Public**. Untuk repositori Private, Pages memerlukan
> GitHub Pro atau Team. Baca bagian **Pertimbangan sebelum dipublikasikan** di bawah lebih dulu.

**2. Unggah berkas**

Pada halaman repositori yang baru dibuat, klik **uploading an existing file**.

Ekstrak lebih dulu berkas zip yang Anda terima, lalu seret **isi** foldernya — bukan foldernya —
ke jendela unggah. Pastikan `index.html` berada di tingkat paling atas, bukan di dalam subfolder.

Isi *Commit changes* dengan misalnya `Prototipe awal`, lalu klik **Commit changes**.

**3. Pastikan `.nojekyll` ikut terunggah**

Berkas ini diawali titik sehingga sering tersembunyi di penjelajah berkas.

- Di Windows: buka File Explorer → tab **View** → centang **Hidden items**
- Di macOS: tekan <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>

Kalau tetap tidak terunggah, buat manual: di repositori klik **Add file → Create new file**,
beri nama `.nojekyll`, biarkan isinya kosong, lalu commit.

**4. Nyalakan GitHub Pages**

Di repositori, buka **Settings** → menu kiri **Pages**.

- *Source*: **Deploy from a branch**
- *Branch*: **main**, folder **/ (root)**
- Klik **Save**

**5. Tunggu dan buka**

Proses pertama memakan waktu satu sampai tiga menit. Muat ulang halaman Settings → Pages sampai
muncul tautan hijau:

```
https://NAMA-AKUN-ANDA.github.io/sipandu-prima-prototype/
```

Kalau masih 404, tunggu satu menit lagi lalu muat ulang dengan <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>.

---

### Cara B — lewat Git (untuk pembaruan berkelanjutan)

```bash
# 1. Masuk ke folder prototipe
cd sipandu-prima-prototype

# 2. Siapkan repositori
git init
git add .
git commit -m "Prototipe awal SIPANDU PRIMA"
git branch -M main

# 3. Sambungkan ke repositori GitHub yang sudah dibuat
git remote add origin https://github.com/NAMA-AKUN-ANDA/sipandu-prima-prototype.git
git push -u origin main
```

Lalu nyalakan Pages seperti langkah 4 dan 5 di atas.

Untuk memperbarui setelah mengubah berkas:

```bash
git add .
git commit -m "Perbarui angka contoh"
git push
```

Perubahan tampil di situs sekitar satu menit setelah push.

---

### Menguji secara lokal sebelum diunggah

Membuka `index.html` dengan klik ganda **bisa bermasalah** karena peramban membatasi berkas
lokal. Jalankan server kecil dulu:

```bash
# Python 3 — hampir selalu sudah terpasang
cd sipandu-prima-prototype
python3 -m http.server 8080
```

Buka `http://localhost:8080`. Hentikan dengan <kbd>Ctrl</kbd> + <kbd>C</kbd>.

Alternatif tanpa terminal: pasang ekstensi **Live Server** di Visual Studio Code, lalu klik kanan
`index.html` → *Open with Live Server*.

---

## Pertimbangan sebelum dipublikasikan

Halaman ini berlogo dan bernama satuan Polri, menampilkan peringkat 14 Polres beserta temuan
integritas. Meski semuanya jelas ditandai **DATA CONTOH**, repositori publik berarti halaman ini
terbuka di internet dan dapat terindeks mesin pencari.

Tiga hal yang sudah disiapkan untuk mengurangi risiko itu:

1. `index.html` memuat `<meta name="robots" content="noindex, nofollow">` agar tidak diindeks.
2. Nama pejabat ditulis `[NAMA PEJABAT]`, nomor telepon disamarkan `+62 812-****-4417`.
3. Setiap halaman memasang lencana **DATA CONTOH** di bilah atas.

**Jangan mengganti data contoh dengan data asli** selama halaman berada di repositori publik.

### Bila perlu dikunci

GitHub Pages tidak menyediakan proteksi kata sandi. Alternatif gratis yang bisa dikunci:

| Layanan | Cara mengunci | Biaya |
|---|---|---|
| **Cloudflare Pages** + Cloudflare Access | Daftar email yang boleh membuka | Gratis untuk puluhan pengguna |
| Netlify | Proteksi kata sandi | Paket berbayar |
| Vercel | Deployment Protection | Paket berbayar |

Untuk presentasi internal ke Polda, **Cloudflare Pages dengan Cloudflare Access** adalah pilihan
paling tepat. Cara unggahnya mirip: sambungkan repositori GitHub, biarkan *Build command* kosong,
dan *Output directory* diisi `/`.

Batasan tier gratis tiap layanan berubah cukup sering — sebaiknya dicek ulang saat akan dipakai.

---

## Mengubah data contoh

Semua angka ada di satu berkas: **`assets/js/data.js`**. Tidak perlu menyentuh HTML.

Contoh mengubah nilai unsur jenjang Polda:

```js
const POLDA = {
  ikm: 83.8, ipak: 91.4, responden: 14382,
  unsur: [
    ['U4', 'Jangka waktu',        2.926],   // NRR skala 1–4
    ['U6', 'Fasilitas pelayanan', 3.112],
    // …
  ]
};
```

Nilai ketiga adalah **NRR pada skala 1–4**. Indeks dihitung otomatis sebagai `NRR × 25`, dan
kategori mutu A/B/C/D mengikuti dengan sendirinya. Urutkan dari terendah agar tampilan batangnya
rapi.

Data satuan kewilayahan ada di `SATWIL`, unit layanan di `UNIT`, isi form di `ENTRI_SKM` dan
`ENTRI_SPAK`, strategi di `STRATEGI` dan `BANK`, notifikasi di `NOTIF_LOG` dan `PENERIMA`.

---

## Rumus yang dipakai

**SKM — 9 unsur, skala 1 sampai 6**

Bobot konversi: `1→1,0` · `2→1,6` · `3→2,2` · `4→2,8` · `5→3,4` · `6→4,0`

```
NRR unsur = Σ (frekuensi × bobot) ÷ n
IKM       = Σ (NRR unsur × 1/9) × 25
```

**SPAK — 4 unsur**

Skor jawaban: `Tidak ada = 4` · `Ragu-ragu = 2` · `Ada = 0`

```
NRR unsur = Σ (frekuensi × skor) ÷ n
IPAK      = Σ (NRR unsur × 1/4) × 25
```

**Kategori mutu** (Permenpan-RB 14/2017)

| Nilai | Mutu | Kinerja |
|---|:---:|---|
| 88,31 – 100,00 | A | Sangat Baik |
| 76,61 – 88,30 | B | Baik |
| 65,00 – 76,60 | C | Kurang Baik |
| 25,00 – 64,99 | D | Tidak Baik |

---

## Ketergantungan luar

| Pustaka | Dipakai di | Sumber |
|---|---|---|
| Plus Jakarta Sans | Semua halaman | Google Fonts |
| SheetJS 0.18.5 | `input-skm.html`, `input-spak.html` | cdnjs |

Keduanya dimuat dari CDN. Bila situs harus berjalan tanpa internet, unduh kedua berkas itu ke
`assets/` dan ubah tautannya menjadi relatif.

---

## Masalah yang sering muncul

| Gejala | Penyebab | Solusi |
|---|---|---|
| Halaman putih, tanpa gaya | `.nojekyll` tidak ada | Buat berkas kosong bernama `.nojekyll` di root |
| 404 setelah Pages dinyalakan | Proses build belum selesai | Tunggu 1–3 menit, muat ulang dengan Ctrl+Shift+R |
| Huruf tampil generik | Google Fonts terblokir | Normal di jaringan tertutup; tampilan tetap terbaca |
| Impor Excel gagal | SheetJS tidak termuat | Periksa koneksi, atau simpan berkas sebagai `.csv` |
| Berkas masuk ke subfolder | Seluruh folder ikut terseret | Unggah **isi** folder, bukan foldernya |
| Tabel terpotong di ponsel | Lebar minimum 1180 px | Normal — geser mendatar, atau buka `mobile.html` |

---

*Prototipe antarmuka, bukan sistem yang berjalan. Blueprint sistem lengkapnya ada di dokumen terpisah.*
