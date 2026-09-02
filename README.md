# 🏥 SIMPEG Digital - Puskesmas Kepulauan Seribu Selatan
**Sistem Informasi Kepegawaian & Manajemen SDMK Digital**
**Target Domain:** [https://tatausahaseribu.my.id](https://tatausahaseribu.my.id)

---

## 📌 Deskripsi Aplikasi
SIMPEG Digital Puskesmas Kepulauan Seribu Selatan adalah aplikasi kepegawaian terpadu berbasis web yang dirancang khusus untuk mengelola data kepegawaian ASN (PNS, PPPK) dan Non-ASN (PJLP) di lingkungan Puskesmas Kepulauan Seribu Selatan beserta seluruh Puskesmas Pembantu (Pustu Pulau Panggang, Pustu Pulau Harapan, Poskes Pulau Sabira, dan Pusling Pulau Pramuka).

---

## 🚀 Fitur Utama

1. **Dashboard Eksekutif Kepegawaian**
   - Statistik riil pegawai PNS, PPPK, PJLP, Kuota Formasi, dan Status STR/SIP.
   - Grafik distribusi jabatan, rumpun tenaga kesehatan, dan peta sebaran tempat tugas.
   - Alert otomatis masa berlaku STR/SIP dan masa berlaku Hukuman Disiplin.

2. **Manajemen Master Data Pegawai**
   - Pencarian cerdas (NIP, NIK, Nama, Tempat Tugas, Jabatan).
   - Filter lengkap berdasarkan Status Pegawai, Jenis Kelamin, Pangkat/Golongan, Rumpun Nakes, dan Unit Kerja.
   - Manajemen Gelar Depan & Gelar Belakang secara terpisah dari nama utama.
   - Opsi Ekspor Data Lengkap ke Excel / CSV.

3. **Modul Rekam Catatan Disiplin Pegawai (Hukdis)**
   - Pencatatan riwayat pelanggaran dan tingkat hukdis (Ringan, Sedang, Berat).
   - Pengunggahan & Manajemen Dokumen Digital:
     - **Berita Acara Pemeriksaan (BAP) / Clarification**
     - **Surat Keputusan (SK) Hukuman Disiplin**
     - **Lampiran / Dokumen Pendukung**
   - Status masa hukdis (Aktif / Selesai) dan perhitungan otomatis TMT.
   - Modal detail interaktif untuk peninjauan berkas BAP & SK.

4. **Modul Usulan Kepegawaian (Tunjangan, Pangkat, Jenjang)**
   - Pengajuan usulan kenaikan pangkat, tunjangan, dan jenjang jabatan.
   - Sistem verifikasi berkas dan persetujuan oleh Admin Kepegawaian.

5. **Modul Analisis Gap Kompetensi**
   - Penilaian standar vs realisasi kompetensi Manajerial, Sosial Kultural, dan Teknis.
   - Rekomendasi pengembangan kapasitas dan pelatihan pegawai.

6. **Modul Analisis Jabatan & Uraian Tugas**
   - Penyiapan ikhtisar jabatan, tugas pokok, tugas tambahan, wewenang, dan tanggung jawab pegawai.

---

## 💾 Struktur Database MySQL / MariaDB (`database_simpeg.sql`)

Aplikasi ini menggunakan database MySQL/MariaDB yang siap di-import ke phpMyAdmin cPanel Rumahweb:

1. `users` - Akun login & hak akses (Super Admin, Admin Kepegawaian, Operator Unit, Pegawai).
2. `pegawai` - Data pokok pegawai, NIP, NIK, STR, SIP, Gelar, Alamat, dan Kontak.
3. `disiplin_pegawai` - Rekam rekam disiplin beserta link/dokumen BAP, SK, dan Lampiran.
4. `usulan_kepegawaian` - Pengajuan & verifikasi usulan kepegawaian.
5. `gap_kompetensi` - Data analisis standar dan riil kompetensi pegawai.
6. `uraian_tugas` - Rincian tugas pokok, tambahan, dan wewenang pegawai.
7. `master_jabatan_menpan` - Reference master jabatan versi Permenpan.
8. `master_jabatan_orb` - Reference master jabatan versi Pergub/ORB.
9. `master_rumpun_jabatan` - Master rumpun jabatan medis, keperawatan, kebidanan, dll.
10. `master_unit_tugas` - Master lokasi tempat tugas di Kepulauan Seribu Selatan.

---

## 📖 Panduan Deployment di Rumahweb Hosting

Panduan langkah demi langkah lengkap untuk deploy ke domain `tatausahaseribu.my.id` di Rumahweb Hosting telah disediakan pada file:
👉 **[`PEDOMAN_DEPLOY_RUMAHWEB.md`](./PEDOMAN_DEPLOY_RUMAHWEB.md)**

---

## 🔑 Kredensial Login Default

| Role / Akses | Username | Password |
| :--- | :--- | :--- |
| **Super Administrator** | `admin` | `123456` |
| **Admin Kepegawaian** | `kepegawaian` | `123456` |
| **Operator Unit Pustu** | `operator_pustu` | `123456` |

---
*Subbagian Tata Usaha - Puskesmas Kepulauan Seribu Selatan © 2026*
