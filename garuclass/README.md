# GaruClass

Frontend Sistem Informasi dan Klasifikasi Jurnal Indonesia berbasis data GARUDA (Capstone Teknik Komputer Undip).
Vanilla HTML/CSS/JS tanpa build, jadi bisa dibuka langsung dari `index.html`.

## Struktur

```
index.html                  shell (header, footer, daftar <link> dan <script>)
css/                        base.css, layout.css, components.css (gaya bersama)
js/data/journals.js         data jurnal contoh (dummy)
js/core/                    utils, state, auth, api, similarity, router
js/main.js                  entry point
pages/<nama>/<nama>.js|css  satu folder per halaman:
  beranda, jurnal, statistik, masuk, klasifikasi (admin), admin (admin)
components/detail-modal/    modal detail jurnal (kutipan + jurnal serupa)
```

## Mengubah / menambah halaman

1. Edit file di `pages/<nama>/` (JS untuk isi, CSS untuk gaya halaman itu).
2. Halaman baru: buat `pages/<baru>/<baru>.js` berisi fungsi yang mengisi `app.innerHTML`, tambahkan `<script>`/`<link>` di `index.html`, lalu daftarkan di `js/core/router.js` dan tambah link di `<nav>`.

## Hak akses

- Publik: Beranda, Cari Jurnal, Statistik.
- Menu **Klasifikasi** dan **Dashboard Admin** hanya muncul setelah login admin.
- Akun demo: `admin@garuclass.id` / `admin12345` (di `js/core/auth.js`).

> Login hanya simulasi di sisi klien dan kredensial terlihat di kode sumber. Ganti dengan autentikasi backend (`POST /api/auth/login` + JWT) sebelum dipakai nyata.

## Integrasi backend

Isi `API.base` di `js/core/api.js`. `GET /api/journals` mengembalikan array `{id,t,p,sb,s,issn,a,f,d}`.

## Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: GaruClass frontend"
git branch -M main
git remote add origin https://github.com/<username>/garuclass.git
git push -u origin main
```

Aktifkan GitHub Pages: Settings > Pages > Source: **GitHub Actions**. Situs terbit otomatis setiap push ke `main`.
