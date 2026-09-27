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



*Prototipe antarmuka, bukan sistem yang berjalan. Blueprint sistem lengkapnya ada di dokumen terpisah.*
