# 📄 PANDUAN LENGKAP KONEKSI GOOGLE APPS SCRIPT (GAS), GOOGLE SPREADSHEET & GOOGLE DRIVE
**SIMPEG Digital - Puskesmas Kepulauan Seribu Selatan**

Panduan ini menjelaskan cara menghubungkan aplikasi SIMPEG Digital ke **Google Spreadsheet** sebagai Database gratis & realtime, serta **Google Drive** sebagai media penyimpanan otomatis berkas arsip dokumen pegawai (KTP, NPWP, SK, STR, SIP, Sertifikat, Ijazah, dll).

---

## 🌟 Ringkasan Alur & Manfaat
1. **Google Spreadsheet**: Berfungsi sebagai database penyimpanan data tabel (Pegawai, Pengguna, Usulan, Disiplin, Gap Kompetensi, Penggajian, Uraian Tugas).
2. **Google Drive**: Berfungsi sebagai penyimpanan file digital tak terbatas. Seluruh berkas pegawai otomatis disimpan ke folder induk:
   - **Link Folder Google Drive Utama**: [https://drive.google.com/drive/u/0/folders/1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR](https://drive.google.com/drive/u/0/folders/1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR)
   - **ID Folder Google Drive**: `1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR`
   - **Subfolder Pegawai**: Script otomatis membuat dan mengelompokkan berkas ke dalam sub-folder khusus sesuai dengan nama masing-masing pegawai.
3. **Google Apps Script (Code.gs)**: Menjadi jembatan REST API antara SIMPEG Digital dan ekosistem Google Workspace.

---

## 🛠️ LANGKAH 1: MEMBUAT SPREADSHEET & FOLDER GOOGLE DRIVE

1. **Folder Google Drive Induk**:
   - Folder Google Drive induk telah dikonfigurasi ke: `https://drive.google.com/drive/u/0/folders/1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR` (`ID: 1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR`).
   - Di dalam folder ini, script `Code.gs` akan secara otomatis membuat subfolder berdasarkan nama masing-masing pegawai saat dokumen pertama kali diunggah.
2. **Buat Google Spreadsheet Baru**:
   - Di dalam Google Drive Anda, klik **Baru (+)** ➔ **Google Spreadsheet** ➔ **Spreadsheet kosong**.
   - Beri judul: `DATABASE SIMPEG - PUSKESMAS KEPULAUAN SERIBU SELATAN`.

---

## 💻 LANGKAH 2: MEMBUKA APPS SCRIPT EDITOR & MEMASANG CODE.GS

1. Di dalam Google Spreadsheet yang baru dibuat, klik menu atas:
   **Ekstensi (Extensions)** ➔ **Apps Script**.
2. Jendela editor Google Apps Script akan terbuka di tab baru.
3. Hapus seluruh teks kode bawaan (`function myFunction() { ... }`) di file `Code.gs`.
4. Buka file **`Code.gs`** yang telah disediakan di aplikasi ini, lalu **Copy (Salin) seluruh isinya** dan **Paste (Tempel)** ke editor Apps Script.
5. Konfigurasi ID Folder Drive (`1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR`) sudah terpasang secara default di `Code.gs`.
6. Klik ikon **Simpan (Save / 💾)** atau tekan `Ctrl + S`.

---

## ⚙️ LANGKAH 3: INISIALISASI STRUKTUR TABEL OTOMATIS

1. Di baris atas editor Apps Script, pada dropdown pilihan fungsi (di sebelah tombol Debug), pilih fungsi: **`initDatabaseSheets`**.
2. Klik tombol **Jalankan (Run / ▶️)**.
3. Google akan meminta izin otorisasi (hanya dilakukan sekali di awal):
   - Klik **Tinjau Izin (Review Permissions)**.
   - Pilih akun Google Anda.
   - Klik **Lanjutan (Advanced)** ➔ klik **Buka (tidak aman) / Go to project (unsafe)**.
   - Klik **Izinkan (Allow)**.
4. Tunggu beberapa detik sampai log eksekusi selesai.
5. Periksa Google Spreadsheet Anda: Seluruh 10 Sheet telah terbuat otomatis dengan warna header biru dan kolom lengkap:
   - `Pegawai`
   - `Pengguna` (dengan akun awal `admin`, `kepegawaian`, `operator_pustu`)
   - `Usulan`
   - `Disiplin`
   - `GapKompetensi`
   - `UraianTugas`
   - `Penggajian`
   - `Diklat`
   - `Dokumen`
   - `Pengaturan`

---

## 🚀 LANGKAH 4: DEPLOY SEBAGAI WEB APP (APLIKASI WEB)

Agar SIMPEG Digital dapat membaca dan mengunggah dokumen:

1. Di pojok kanan atas Apps Script, klik tombol biru **Terapkan (Deploy)** ➔ pilih **Penerapan Baru (New deployment)**.
2. Klik ikon gerigi ⚙️ di samping *"Pilih jenis"*, pilih **Aplikasi web (Web app)**.
3. Isi konfigurasi sebagai berikut:
   - **Deskripsi:** `SIMPEG PKSS Production API v1`
   - **Jalankan sebagai (Execute as):** **Saya (email.anda@gmail.com)** *(PENTING: Jangan pilih 'User accessing the web app')*
   - **Yang memiliki akses (Who has access):** **Siapa saja (Anyone)** *(PENTING: Agar browser SIMPEG dapat mengirim & menerima data tanpa terblokir login Google)*
4. Klik **Terapkan (Deploy)**.
5. Salin **URL Aplikasi Web (Web App URL)** yang dihasilkan.
   *Bentuk URL: `https://script.google.com/macros/s/AKfycbx.../exec`*

---

## 🔗 LANGKAH 5: HUBUNGKAN KE SIMPEG DIGITAL

1. Buka aplikasi **SIMPEG Digital**.
2. Masuk ke menu **Pengaturan** (atau klik tombol **Koneksi Database / Cloud Sync**).
3. Tempelkan URL Web App Google Apps Script Anda ke kolom:
   **"URL Google Apps Script (GAS Web App Endpoint)"**.
4. Klik tombol **Simpan & Uji Koneksi**.
5. Sistem akan menampilkan status: **"Terhubung ke Google Spreadsheet & Google Drive!"**.

---

## 📁 CARA KERJA UPLOAD DOKUMEN KE GOOGLE DRIVE

Ketika operator atau pegawai mengunggah berkas PDF/Foto melalui menu **Dokumen Pegawai**:

1. File diubah menjadi format data Base64 secara instan di browser.
2. Permintaan dikirim ke endpoint GAS (`action=uploadFile`).
3. Google Apps Script akan:
   - Mencari folder induk `SIMPEG_PKSS_ARSIP_DIGITAL`.
   - Otomatis membuat subfolder pegawai: `[NIP] - [NAMA PEGAWAI]` jika belum ada.
   - Menyimpan file dengan format nama resmi: `[JENIS]_[NIP]_[NAMA_FILE].pdf`.
   - Mengatur izin file menjadi dapat dilihat publik via link (*Viewer*).
   - Mencatat metadata di Sheet `Dokumen`.
   - Memperbarui tautan berkas di Sheet `Pegawai`.
4. URL Google Drive resmi langsung terpasang di profil pegawai dan dapat dibuka kapan saja.

---

## 📋 DAFTAR ENDPOINT ACTION PADA CODE.GS

| Method | Action Param | Deskripsi |
| :--- | :--- | :--- |
| **GET** | `action=testConnection` | Uji status koneksi Spreadsheet & Drive |
| **GET** | `action=getAllAppModules` | Mengambil seluruh data modul aplikasi |
| **GET** | `action=getPegawaiData` | Mengambil daftar seluruh master pegawai |
| **GET** | `action=getDokumenList&nip=...` | Mengambil daftar arsip berkas pegawai tertentu |
| **POST** | `action=uploadFile` | **Upload berkas PDF/Foto langsung ke Google Drive** |
| **POST** | `action=simpanPegawai` | Tambah atau perbarui data pegawai di sheet `Pegawai` |
| **POST** | `action=hapusPegawai` | Hapus data pegawai dari sheet |
| **POST** | `action=bulkUploadPegawai` | Impor massal data pegawai |
| **POST** | `action=saveGajiData` | Simpan rekap gaji dan slip bulanan |
| **POST** | `action=saveAllAppModules` | Sinkronisasi penuh semua modul ke Google Spreadsheet |
| **POST** | `action=login` | Verifikasi login akun & password |

---

## 💡 TIPS & KEAMANAN
- Selalu pilih **Execute as: Me** dan **Who has access: Anyone** saat melakukan deployment.
- Jika Anda mengedit kode di `Code.gs`, pastikan membuat **Penerapan Baru (New Deployment)** atau mengedit versi penerapan yang aktif agar perubahannya langsung berlaku di URL web app.
