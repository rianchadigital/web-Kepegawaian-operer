# 🚀 PANDUAN LENGKAP HOSTING SIMPEG DIGITAL DI HOSTINGER (hPanel)
**SIMPEG Digital - Puskesmas Kepulauan Seribu Selatan**

Panduan ini berisi langkah-langkah lengkap dari awal hingga aplikasi siap digunakan secara online di layanan hosting **Hostinger** menggunakan web server PHP & database MySQL (MariaDB).

---

## 📌 Ringkasan File & Berkas Hosting
1. **File Skema & Data Database:** `database_simpeg.sql` (atau `simpeg_hostinger.sql`)
2. **File Konfigurasi Koneksi Database:** `config.php`
3. **Backend API Handler:** `api.php`
4. **Alat Uji Koneksi Otomatis:** `test_koneksi.php`
5. **Penyimpanan Cadangan Failover:** `data_pegawai_db.json`
6. **Frontend Utama:** `index.html` & folder `assets/`

---

## 🛠️ LANGKAH 1: MEMBUAT DATABASE MYSQL DI HOSTINGER (hPanel)

1. **Login ke Hostinger hPanel**:
   - Buka [https://hpanel.hostinger.com](https://hpanel.hostinger.com) dan masukkan akun Hostinger Anda.
   - Pada menu **Websites** / **Hosting**, klik tombol **Manage** (Kelola) pada domain Anda.

2. **Buka Menu MySQL Databases**:
   - Di sidebar sebelah kiri, klik menu **Databases** ➔ **MySQL Databases**.

3. **Buat Database dan User Baru**:
   - **MySQL Database Name:** Masukkan nama database, contoh: `dbsimpeg`
     *(Hostinger akan menambahkan prefix otomatis, contoh: `u133879636_dbsimpeg`)*
   - **MySQL Username:** Masukkan nama pengguna database, contoh: `dbsimpeg`
     *(Contoh nama user lengkap: `u133879636_dbsimpeg`)*
   - **Password:** Buat password database yang aman (contoh: `Simpeg@2027` atau generate password baru).
   - Klik tombol **Create** / **Buat**.
   - **Catat**: Nama Database, Username, dan Password yang telah dibuat.

---

## 📥 LANGKAH 2: IMPORT DATABASE SQL VIA phpMyAdmin

1. Pada halaman **MySQL Databases** di hPanel Hostinger, gulir ke bawah ke daftar **List of Current MySQL Databases And Users**.
2. Di baris database yang baru dibuat, klik tombol **Enter phpMyAdmin** (atau tombol phpMyAdmin).
3. Setelah phpMyAdmin terbuka:
   - Klik nama database Anda di panel kiri.
   - Klik tab **Import** pada menu bar atas.
   - Pada bagian **File to import**, klik **Choose File** / **Pilih Berkas**, lalu pilih file **`database_simpeg.sql`** (atau `simpeg_hostinger.sql`).
   - Pastikan format adalah **SQL**.
   - Gulir ke bawah dan klik tombol **Go** / **Kirim / Import**.
4. Tunggu beberapa detik sampai muncul notifikasi hijau: *"Import has been successfully finished"*.
5. Seluruh 11 tabel SIMPEG siap digunakan:
   - `users` (Akun pengguna Super Admin, Admin Kepegawaian, Operator)
   - `pegawai` (Master biodata & profil kepegawaian)
   - `penggajian` (Manajemen gaji bulanan & slip penghasilan pegawai)
   - `usulan_kepegawaian` (Layanan usulan kenaikan pangkat, tunjangan, jenjang)
   - `disiplin_pegawai` (Rekam jejak hukuman disiplin)
   - `gap_kompetensi` (Analisis standar vs riil kompetensi)
   - `uraian_tugas` (Formulir uraian tugas, wewenang & tanggung jawab)
   - `diklat_pegawai` (Agenda pelatihan / pengembangan SDMK)
   - `dokumen_digital` (Arsip digital dokumen pegawai)
   - `master_unit_tugas`, `master_jabatan_menpan`, `master_jabatan_orb`, `master_rumpun_jabatan`
   - `pengaturan_sistem` (Kop surat, nama puskesmas & pejabat)

---

## 📂 LANGKAH 3: UPLOAD FILE APLIKASI KE `public_html` HOSTINGER

1. Di dashboard hPanel, klik menu **Files** ➔ **File Manager** (atau akses via FTP seperti FileZilla).
2. Masuk ke direktori utama website Anda: **`public_html`**.
3. Upload seluruh file berikut ke dalam `public_html`:
   - `index.html`
   - `api.php`
   - `config.php`
   - `test_koneksi.php`
   - `data_pegawai_db.json`
   - `database_simpeg.sql`
   - Folder `assets/` (beserta isinya: foto logo, gambar, file pendukung)
4. Struktur direktori di Hostinger akan tampak seperti berikut:
   ```text
   public_html/
   ├── index.html
   ├── api.php
   ├── config.php
   ├── test_koneksi.php
   ├── data_pegawai_db.json
   ├── database_simpeg.sql
   ├── simpeg_hostinger.sql
   └── assets/
       ├── custom.css
       ├── logo.jpg
       └── default-avatar.jpg
   ```

---

## ⚙️ LANGKAH 4: SETTING FILE KONEKSI `config.php`

1. Di dalam **File Manager** Hostinger, klik kanan file **`config.php`** ➔ pilih **Edit**.
2. Masukkan informasi database Hostinger yang telah Anda buat pada Langkah 1:

```php
<?php
// Kredensial Database Hostinger (hPanel)
$dbHost = 'localhost';                  // Default di Hostinger tetap 'localhost'
$dbPort = '3306';                       // Port default MySQL
$dbName = 'u133879636_dbsimpegkawan';    // Nama Database Hostinger Anda
$dbUser = 'u133879636_simpegkawan';     // Username Database Hostinger Anda
$dbPass = 'Simpegkawan2026';            // Password Database Anda
```

3. Klik tombol **Save & Close** (Simpan).

---

## 🔍 LANGKAH 5: CEK & VERIFIKASI KONEKSI DATABASE

Buka browser Anda dan akses file penguji:
```text
https://domain-anda.com/test_koneksi.php
```
*(Ganti `domain-anda.com` dengan alamat domain/subdomain Anda di Hostinger)*

- Jika koneksi berhasil, akan muncul layar hijau bertuliskan:
  **"Status: Terhubung ke Database MySQL Hostinger"** beserta status tabel dan jumlah pegawai aktif.
- Jika ada kesalahan kata sandi atau nama database, sistem akan memberikan petunjuk spesifik bagian yang perlu diperbaiki.

---

## 🛡️ LANGKAH 6: AKTIVASI KEAMANAN HTTPS / SSL HOSTINGER

1. Di dashboard hPanel, pilih menu **Security** ➔ **SSL**.
2. Pastikan SSL Certificate untuk domain Anda berstatus **Active** (Let's Encrypt Free).
3. Nyalakan opsi **Force HTTPS** (Otomatis beralih ke HTTPS) agar data kepegawaian terenkripsi aman.

---

## 🔐 DAFTAR AKUN LOGIN DEFAULT

| Level Pengguna | Username | Password | Keterangan |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `123456` | Akses penuh ke seluruh menu dan modul |
| **Admin Kepegawaian** | `kepegawaian` | `123456` | Pengelolaan data pegawai, usulan, gaji, & diklat |
| **Operator Unit** | `operator_pustu` | `123456` | Input & update data pegawai unit/pustu |
| **Pegawai (Self-Service)** | *[NIP / NIK]* | `123456` | Portal mandiri melihat profil, usulan & slip gaji |

---

## 💡 KEUNGGULAN ARSITEKTUR HYBRID SIMPEG
1. **Dual Storage Failover**: Jika suatu saat koneksi MySQL maintenance/offline, aplikasi otomatis mengalihkan penyimpanan ke `data_pegawai_db.json` sehingga data tidak hilang dan operasional puskesmas tetap berjalan lancar.
2. **Offline-Ready LocalStorage**: Data di browser tetap tersinkronisasi secara real-time.
3. **Cepat & Ringan**: Tidak memerlukan server Node.js khusus di hosting, cukup Apache/Nginx + PHP standar di paket shared hosting Hostinger apa pun (Single, Premium, Business, atau Cloud).
