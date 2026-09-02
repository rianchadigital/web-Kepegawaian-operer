# 🚀 PEDOMAN DEPLOYMENT SIMPEG DIGITAL - RUMAHWEB HOSTING
**Puskesmas Kepulauan Seribu Selatan**
**Domain Target:** `https://tatausahaseribu.my.id`

---

## 📌 RINGKASAN PROJEK & INFRASTRUKTUR
- **Nama Aplikasi:** SIMPEG Digital - Sistem Informasi Kepegawaian Puskesmas Kepulauan Seribu Selatan
- **Domain Utama:** `tatausahaseribu.my.id`
- **Provider Hosting:** Rumahweb Indonesia (cPanel Hosting Shared / Cloud / WordPress Hosting)
- **Backend Storage:** `api.php` (Auto-Sync MySQL & File Storage JSON `data_pegawai_db.json`)
- **Database Engine:** MySQL / MariaDB (via phpMyAdmin & PDO PHP)
- **File Database SQL:** `database_simpeg.sql`
- **File Konfigurasi DB:** `config.php`
- **File Installer Web:** `simpeg-app.zip` / `index.html`

---

## 🛠️ TAHAP 1: PERSIAPAN DATABASE MYSQL DI CPANEL RUMAHWEB

### 1. Login ke cPanel Rumahweb
1. Akses halaman cPanel domain Anda melalui browser:
   `https://tatausahaseribu.my.id:2083` atau via Client Area Rumahweb ([https://clientzone.rumahweb.com](https://clientzone.rumahweb.com)).
2. Masukkan **Username** dan **Password** cPanel yang dikirimkan oleh Rumahweb melalui email konfirmasi aktivasi hosting.

---

### 2. Membuat Database & User MySQL
1. Pada dashboard cPanel, cari kolom pencarian di bagian atas dan ketik **MySQL Database Wizard**, lalu klik menu tersebut.
2. **Step 1 - Create A Database:**
   - Masukkan nama database, contoh: `simpeg_pkss`
   - Nama lengkap database akan menjadi `[cpanel_user]_simpeg_pkss` (misal: `tatausah_simpeg_pkss`).
   - Klik **Next Step**.
3. **Step 2 - Create Database Users:**
   - Masukkan nama user database, contoh: `user_simpeg`
   - Masukkan Password yang kuat (Gunakan *Password Generator*). Catat password ini.
   - Klik **Create User**.
4. **Step 3 - Add User to Database:**
   - Centang opsi **ALL PRIVILEGES** (Memberikan seluruh hak akses ke user).
   - Klik **Make Changes** / **Next Step**.

---

### 3. Import File `database_simpeg.sql` via phpMyAdmin
1. Kembali ke halaman utama cPanel, cari dan klik menu **phpMyAdmin** pada kategori *Databases*.
2. Pada panel sebelah kiri di phpMyAdmin, klik nama database yang baru saja dibuat (misal: `tatausah_simpeg_pkss`).
3. Pada menu tab bagian atas, klik tab **Import**.
4. Di bagian **File to import**, klik **Choose File** / **Pilih Berkas**, lalu pilih file **`database_simpeg.sql`** dari komputer Anda.
5. Pastikan format terpilih **SQL**, lalu gulir ke bawah dan klik tombol **Go** / **Kirim**.
6. Tunggu hingga proses impor selesai sampai muncul notifikasi hijau: *"Import has been successfully finished"*.
7. **Verifikasi Tabel:** Pastikan 10 tabel berikut berhasil terbentuk:
   - `users` (Akun login pengguna/admin)
   - `pegawai` (Data master pegawai PNS, PPPK, PJLP)
   - `master_jabatan_menpan` (Master Jabatan Permenpan)
   - `master_jabatan_orb` (Master Jabatan Pergub/ORB)
   - `master_rumpun_jabatan` (Master Rumpun Nakes/Non-Nakes)
   - `master_unit_tugas` (Master Puskesmas, Pustu & Poskes)
   - `usulan_kepegawaian` (Modul Usulan Tunjangan, Pangkat, Jenjang)
   - `disiplin_pegawai` (Modul Rekam Hukdis & Dokumen BAP/SK)
   - `gap_kompetensi` (Modul Analisis Gap Kompetensi Pegawai)
   - `uraian_tugas` (Modul Analisis Jabatan & Uraian Tugas)

---

## 📂 TAHAP 2: UPLOAD APLIKASI WEB & BACKEND API KE PUBLIC_HTML

1. Di cPanel Rumahweb, buka menu **File Manager** pada kategori *Files*.
2. Pada panel direktori sebelah kiri, masuk ke dalam folder **`public_html`**.
   *(Catatan: Jika `tatausahaseribu.my.id` adalah domain utama, semua file diletakkan langsung di dalam `public_html`).*
3. Jika terdapat file default cPanel seperti `default.php` atau `index.php` lama, Hapus atau Rename file tersebut.
4. Klik tombol **Upload** di menu bar atas File Manager.
5. Pilih file paket aplikasi **`simpeg-app.zip`** (atau unggah langsung seluruh file hasil ekstrak).
6. Setelah indikator upload mencapai 100% (berwarna hijau), kembali ke folder `public_html`.
7. Klik kanan pada file **`simpeg-app.zip`**, lalu pilih **Extract** -> **Extract File(s)**.
8. Pastikan struktur file di `public_html/` adalah sebagai berikut:
   ```text
   public_html/
   ├── api.php               (API Backend Handler PHP untuk Penyimpanan Data Rumahweb)
   ├── config.php            (File Konfigurasi Koneksi MySQL Database cPanel)
   ├── data_pegawai_db.json  (Database Cadangan File JSON Server)
   ├── index.html            (Halaman Utama SIMPEG Digital)
   ├── assets/               (Folder CSS, Images & Assets)
   ├── .htaccess             (Routing API & HTTPS SSL Rumahweb)
   └── database_simpeg.sql   (File Backup Database SQL)
   ```

---

## ⚙️ TAHAP 3: KONFIGURASI DATABASE DI FILE `CONFIG.PHP`

Buka dan edit file **`config.php`** di dalam `public_html/` via File Manager Code Editor:

```php
<?php
// Ubah parameter berikut sesuai dengan Database & User MySQL cPanel Anda
$dbHost = 'localhost';
$dbName = 'tatausah_simpeg_pkss';  // Ganti dengan nama database cPanel Anda
$dbUser = 'tatausah_user_simpeg';  // Ganti dengan username database cPanel Anda
$dbPass = 'Password_Kuat_Anda_123'; // Ganti dengan password database cPanel Anda
```

> **Keunggulan Sistem Dual Storage:**
> Jika MySQL belum dikonfigurasi, `api.php` secara otomatis menyimpan seluruh input data pegawai (Tambah, Edit, Hapus, Bulk Upload) ke dalam file `data_pegawai_db.json` di server Rumahweb secara persisten.

---

## ⚙️ TAHAP 4: KONFIGURASI FILE `.HTACCESS` UNTUK RUMAHWEB

Pastikan file **`.htaccess`** di `public_html/` telah terisi dengan rule routing `/api/gas` ke `api.php`:

```apache
# ============================================================
# KONFIGURASI .HTACCESS - SIMPEG DIGITAL RUMAHWEB HOSTING
# Target Domain: tatausahaseribu.my.id
# ============================================================

RewriteEngine On

# 1. ROUTE API REQUEST KE API.PHP RUMAHWEB
RewriteRule ^api/gas$ api.php [L,QSA]
RewriteRule ^api/gas/(.*)$ api.php [L,QSA]

# 2. PAKSA KONEKSI HTTPS (SSL ENCRYPTION)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 3. OPTIMASI PERFORMANCE (GZIP COMPRESSION)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# 4. EXPIRES CACHING UNTUK ASSETS
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>

# 5. MENCEGAH DIRECTORY BROWSING
Options -Indexes

# 6. HEADER KEAMANAN BASIC & CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
</IfModule>
```

---

## 🔒 TAHAP 5: AKTIVASI SSL GRATIS (AUTOSSL / LET'S ENCRYPT)

1. Kembali ke Dashboard cPanel Rumahweb.
2. Cari dan klik menu **SSL/TLS Status** atau **AutoSSL**.
3. Centang domain **`tatausahaseribu.my.id`** dan **`www.tatausahaseribu.my.id`**.
4. Klik tombol **Run AutoSSL**.
5. Tunggu 1–3 menit hingga status berubah menjadi **Domain Verified / Valid SSL** dengan ikon gembok hijau 🔒.

---

## 🔑 TAHAP 6: AKUN AKSES DAFTAR LOGIN DEFAULT

Setelah database diimpor dan aplikasi aktif di `https://tatausahaseribu.my.id`, gunakan kredensial bawaan berikut untuk pengujian awal sistem:

| Level Pengguna | Username | Password | Hak Akses |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `123456` | Akses Penuh Seluruh Modul & Manajemen User |
| **Admin Kepegawaian** | `kepegawaian` | `123456` | Manajemen Pegawai, Usulan, Disiplin, & Laporan |
| **Operator Unit** | `operator_pustu` | `123456` | Input Data Unit & Usulan Kepegawaian |
| **Pegawai (NIP)** | *[NIP Pegawai]* | `123456` | Portal Mandiri Pegawai (Profil, SK, Disiplin) |

---

## ❓ TAHAP 7: TROUBLESHOOTING & MAINTENANCE

### 1. Data Input Tidak Tersimpan di Server
- **Penyebab:** Hak akses file `data_pegawai_db.json` belum writable oleh web server.
- **Solusi:** Di File Manager cPanel, klik kanan pada `data_pegawai_db.json`, pilih **Change Permissions**, dan atur ke **664** atau **755**.

### 2. Tampilan Website Tidak Muncuk / Blank White Screen
- **Penyebab:** Path asset javascript/css keliru atau browser menyimpan cache lama.
- **Solusi:** Tekan `Ctrl + Shift + R` (Hard Refresh). Pastikan folder `assets/` diupload utuh di `public_html/assets`.

### 3. File Upload BAP / SK Tidak Tersimpan
- **Penyebab:** Ukuran file melebihi batas upload PHP di cPanel.
- **Solusi:** 
  1. Buka cPanel -> **Select PHP Version** atau **MultiPHP INI Editor**.
  2. Ubah `upload_max_filesize` menjadi **64M** dan `post_max_size` menjadi **64M**.

---

### 📞 TIM DUKUNGAN TEKNIS
- **Puskesmas Kepulauan Seribu Selatan:** Subbagian Tata Usaha / Kepegawaian
- **Rumahweb Technical Support:** Live Chat 24/7 di [rumahweb.com](https://www.rumahweb.com) atau via Ticket cPanel.
