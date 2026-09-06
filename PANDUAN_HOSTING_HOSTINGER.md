# Panduan Lengkap Hosting SIMPEG PKSS di Hostinger Menggunakan PHP & MySQL

Panduan ini memandu Anda langkah demi langkah untuk mengunggah dan mengaktifkan aplikasi **SIMPEG Digital PKSS** di hosting **Hostinger** menggunakan database **MySQL** dan **PHP PDO**, baik via GitHub Deployment maupun via File Manager Hostinger.

---

## 1. Kredensial Database Hostinger Anda

Sesuai konfigurasi yang telah diatur di `config.php`:
- **Host:** `localhost`
- **Port:** `3306`
- **Nama Database:** `u133879636_dbsimpegkawan`
- **Nama User:** `u133879636_simpegkawan`
- **Password:** `Simpegkawan2026`

---

## 2. Langkah 1: Buat Database di hPanel Hostinger

1. Buka [https://hpanel.hostinger.com](https://hpanel.hostinger.com) dan login.
2. Masuk ke menu **Databases** > **Database MySQL**.
3. Pada form **Buat Database MySQL Baru**:
   - **Nama Database:** Masukkan `dbsimpegkawan` (sehingga nama lengkap menjadi `u133879636_dbsimpegkawan`).
   - **Nama User:** Masukkan `simpegkawan` (sehingga nama lengkap menjadi `u133879636_simpegkawan`).
   - **Password:** Masukkan `Simpegkawan2026`.
4. Klik tombol **Buat (Create)**.

---

## 3. Langkah 2: Import Tabel & Data Awal (`database_simpeg.sql`)

1. Pada daftar database di hPanel, klik tombol **Buka phpMyAdmin (Enter phpMyAdmin)** di samping database `u133879636_dbsimpegkawan`.
2. Setelah phpMyAdmin terbuka, pastikan database `u133879636_dbsimpegkawan` terpilih di panel sebelah kiri.
3. Klik tab **Import** pada menu atas.
4. Klik **Choose File (Pilih Berkas)** dan pilih file `database_simpeg.sql`.
5. Biarkan pengaturan lainnya secara default (format SQL, UTF-8), lalu scroll ke bawah dan klik tombol **Kirim (Go)**.
6. Tunggu beberapa saat hingga muncul notifikasi hijau: *"Import has been successfully finished"*.
   - Tabel yang otomatis dibuat:
     - `pegawai` (Master Data Pegawai, Jabatan, Gaji, SK, STR, SIP, dll)
     - `pengguna` (Manajemen Akun Login Admin, Kepegawaian, Pegawai)
     - `usulan` (Layanan Usulan Kenaikan Pangkat, Diklat, Cuti)
     - `diklat` (Jadwal & Riwayat Pelatihan SDMK)
     - `disiplin` (Catatan Pelanggaran & Hukuman Disiplin)
     - `gap_kompetensi` (Analisis Kesenjangan Standar Kompetensi)
     - `pengaturan` (Nama Instansi, Logo Kop Surat Resmi DKI Jakarta)

---

## 4. Langkah 3: Deploy via GitHub atau File Manager Hostinger

### Opsi A: Menggunakan GitHub (Otomatis Sync)
1. Buat repository baru di akun GitHub Anda (misalnya `simpeg-hostinger`).
2. Push seluruh berkas proyek (`index.html`, `config.php`, `api.php`, `test_koneksi.php`, `.htaccess`, assets) ke repository GitHub Anda.
3. Di hPanel Hostinger:
   - Masuk ke menu **Tingkat Lanjut (Advanced)** > **GIT**.
   - Masukkan URL Repository GitHub Anda: `https://github.com/username/simpeg-hostinger.git`.
   - Branch: `main` (atau `master`).
   - Install Directory: `public_html` (kosongkan jika langsung di root).
   - Klik **Buat (Create)** atau **Deploy**.

### Opsi B: Menggunakan File Manager Hostinger (Paling Cepat & Mudah)
1. Di hPanel Hostinger, klik menu **File Manager**.
2. Masuk ke folder `public_html`.
3. Upload berkas-berkas berikut langsung ke dalam `public_html`:
   - `index.html` (Frontend Utama)
   - `config.php` (Konfigurasi Koneksi PDO MySQL)
   - `api.php` (Backend REST API)
   - `test_koneksi.php` (Skrip Diagnostik Koneksi Database)
   - `.htaccess` (Pengaturan CORS & Rewrite URL)
   - Folder `assets/` (Gambar logo, icon, dan dokumen)

---

## 5. Langkah 4: Uji Koneksi Database

Setelah berkas diunggah, Anda dapat menguji koneksi database secara langsung melalui browser:

1. Buka browser dan akses:
   `https://domain-anda.com/test_koneksi.php`
2. Halaman diagnostik akan memeriksa:
   - Versi PHP (minimal 7.4 / disarankan 8.0+)
   - Driver PDO MySQL
   - Keterhubungan ke `localhost:3306`
   - Keberadaan tabel `pegawai`, `pengguna`, `usulan`, `diklat`, dll.
3. Jika semua berstatus hijau (✅), hapus atau proteksi file `test_koneksi.php` demi keamanan.

---

## 6. Status Pemutusan Cloud & Spreadsheet

- **Google Apps Script (GAS):** Telah diputus dan dinonaktifkan secara penuh. Aplikasi tidak lagi memanggil URL script eksternal.
- **Firebase / Cloud Firestore:** Seluruh dependensi SDK Firebase dan sinkronisasi Cloud Firestore telah dihentikan dan dihapus dari aplikasi.
- **Penyimpanan:** Seluruh data kini langsung disimpan ke database MySQL Hostinger (`u133879636_dbsimpegkawan`) secara terpusat dan aman.
