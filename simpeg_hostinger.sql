-- ============================================================
-- DATABASE SIMPEG DIGITAL - PUSKESMAS KEPULAUAN SERIBU SELATAN
-- Target Hosting: Hostinger / cPanel / MariaDB / MySQL 8.x
-- Siap diimport langsung ke phpMyAdmin Hostinger
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+07:00";

-- --------------------------------------------------------
-- 1. TABEL PENGGUNA (AKUN LOGIN ADMIN & OPERATOR)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `nip` VARCHAR(30) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'Pegawai',
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `password`, `nama`, `nip`, `email`, `role`, `status`) VALUES
(1, 'admin', '123456', 'Super Administrator SIMPEG', '198501012010011001', 'admin.pkss@jakarta.go.id', 'Super Admin', 'Aktif'),
(2, 'kepegawaian', '123456', 'Admin Kepegawaian PKSS', '198805152015031002', 'kepegawaian.pkss@jakarta.go.id', 'Admin Kepegawaian', 'Aktif'),
(3, 'operator_pustu', '123456', 'Operator Pustu Pulau Tidung', '199408202022032008', 'pustu.tidung@jakarta.go.id', 'Operator Unit', 'Aktif');

-- --------------------------------------------------------
-- 2. TABEL PEGAWAI (DATA MASTER PEGAWAI)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pegawai`;
CREATE TABLE IF NOT EXISTS `pegawai` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nik` VARCHAR(20) DEFAULT NULL,
  `nip` VARCHAR(30) DEFAULT NULL,
  `nrk` VARCHAR(20) DEFAULT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `gelar_depan` VARCHAR(30) DEFAULT NULL,
  `gelar_belakang` VARCHAR(30) DEFAULT NULL,
  `jenis_kelamin` ENUM('Laki-laki', 'Perempuan') DEFAULT 'Laki-laki',
  `tempat_lahir` VARCHAR(100) DEFAULT NULL,
  `tanggal_lahir` DATE DEFAULT NULL,
  `agama` VARCHAR(30) DEFAULT NULL,
  `status_nikah` VARCHAR(30) DEFAULT NULL,
  `status_pegawai` VARCHAR(50) DEFAULT 'PNS',
  `tempat_tugas` VARCHAR(150) DEFAULT 'Puskesmas Kepulauan Seribu Selatan',
  `jabatan` VARCHAR(150) DEFAULT NULL,
  `jabatan_orb` VARCHAR(150) DEFAULT NULL,
  `jabatan_kepmenpan` VARCHAR(150) DEFAULT NULL,
  `rumpun` VARCHAR(100) DEFAULT NULL,
  `status_rumpun` VARCHAR(100) DEFAULT NULL,
  `kategori` VARCHAR(50) DEFAULT 'Tenaga Medis',
  `pangkat_gol` VARCHAR(50) DEFAULT NULL,
  `tmt` DATE DEFAULT NULL,
  `kondisi` VARCHAR(50) DEFAULT 'Aktif',
  `str` VARCHAR(100) DEFAULT NULL,
  `aktif_str` DATE DEFAULT NULL,
  `sip` VARCHAR(100) DEFAULT NULL,
  `aktif_sip` DATE DEFAULT NULL,
  `no_hp` VARCHAR(30) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `alamat` TEXT DEFAULT NULL,
  `riwayat_jabatan` JSON DEFAULT NULL,
  `riwayat_pendidikan` JSON DEFAULT NULL,
  `riwayat_keluarga` JSON DEFAULT NULL,
  `riwayat_diklat` JSON DEFAULT NULL,
  `uraian_tugas` JSON DEFAULT NULL,
  `data_gaji` JSON DEFAULT NULL,
  `dokumen` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_nip` (`nip`),
  KEY `idx_nik` (`nik`),
  KEY `idx_unit` (`tempat_tugas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pegawai` (`id`, `nik`, `nip`, `nrk`, `nama`, `gelar_depan`, `gelar_belakang`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `agama`, `status_nikah`, `status_pegawai`, `tempat_tugas`, `jabatan`, `jabatan_orb`, `jabatan_kepmenpan`, `rumpun`, `status_rumpun`, `kategori`, `pangkat_gol`, `tmt`, `kondisi`, `str`, `aktif_str`, `sip`, `aktif_sip`, `no_hp`, `email`, `alamat`) VALUES 
(1, '3171011505850001', '198505152010011002', '182930', 'dr. Ahmad Zulkarnain, Sp.A', 'dr.', 'Sp.A', 'Laki-laki', 'Jakarta', '1985-05-15', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Dokter Spesialis Anak', 'Dokter Ahli Muda / Dokter Spesialis', 'Dokter Ahli Muda', '01. Medis', '01. Medis', 'Tenaga Medis', 'III/c (Penata)', '2010-01-01', 'Aktif', '31.1.1.100.2.20.123456', '2027-12-31', '446/001/SIP-D/2023', '2027-12-31', '081234567890', 'ahmad.zulkarnain@jakarta.go.id', 'Jl. Pulau Tidung No. 12, Kepulauan Seribu'),
(2, '3171012004820002', '198204202008012005', '175412', 'dr. Fitriani Handayani', 'dr.', NULL, 'Perempuan', 'Bandung', '1982-04-20', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Kepala Puskesmas Kepulauan Seribu Selatan', 'Kepala Puskesmas / Dokter Ahli Madya', 'Dokter Ahli Madya', '01. Medis', '01. Medis', 'Tenaga Medis', 'IV/a (Pembina)', '2008-01-01', 'Aktif', '31.1.1.100.1.18.654321', '2028-04-20', '446/002/SIP-D/2022', '2028-04-20', '081298765432', 'fitriani.handayani@jakarta.go.id', 'Jl. Pulau Tidung No. 05, Kepulauan Seribu'),
(3, '3171021208880003', '198808122014021003', '193821', 'Ns. Budi Santoso, S.Kep', 'Ns.', 'S.Kep', 'Laki-laki', 'Cirebon', '1988-08-12', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Perawat Penyelia / PJ Keperawatan', 'Perawat Ahli Muda', 'Perawat Ahli Muda', '02. Keperawatan', '02. Keperawatan', 'Tenaga Keperawatan', 'III/c (Penata)', '2014-02-01', 'Aktif', '31.2.1.200.3.21.789012', '2026-08-12', '446/015/SIP-P/2021', '2026-08-12', '081388776655', 'budi.santoso@jakarta.go.id', 'Jl. Pulau Pari No. 18, Kepulauan Seribu'),
(4, '3171035509920004', '199209152022032008', '204192', 'Siti Sarah, A.Md.Keb', NULL, 'A.Md.Keb', 'Perempuan', 'Bogor', '1992-09-15', 'Islam', 'Kawin', 'PPPK', 'Pustu Pulau Untung Jawa', 'Bidan Mahir / Pustu Pulau Untung Jawa', 'Bidan Terampil', 'Bidan Terampil', '03. Kebidanan', '03. Kebidanan', 'Tenaga Kebidanan', 'VII (Penata Muda)', '2022-03-01', 'Aktif', '31.3.1.300.2.22.345678', '2027-09-15', '446/022/SIP-B/2022', '2027-09-15', '081211223344', 'siti.sarah@jakarta.go.id', 'Jl. Pulau Untung Jawa No. 04, Kepulauan Seribu'),
(5, '3171010311870005', '198711032011011004', '188291', 'Apt. Rahmat Hidayat, S.Farm', 'Apt.', 'S.Farm', 'Laki-laki', 'Tangerang', '1987-11-03', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Apoteker Ahli Muda / Pengelola Obat', 'Apoteker Ahli Muda', 'Apoteker Ahli Muda', '04. Farmasi', '04. Farmasi', 'Tenaga Kefarmasian', 'III/c (Penata)', '2011-01-01', 'Aktif', '31.4.1.400.1.20.901234', '2027-11-03', '446/008/SIP-A/2022', '2027-11-03', '081566778899', 'rahmat.hidayat@jakarta.go.id', 'Jl. Pulau Tidung No. 22, Kepulauan Seribu'),
(6, '3171026405940006', '199405242023212009', '208190', 'Dewi Lestari, A.Md.Gz', NULL, 'A.Md.Gz', 'Perempuan', 'Bekasi', '1994-05-24', 'Islam', 'Kawin', 'PPPK', 'Puskesmas Kepulauan Seribu Selatan', 'Nutrisionis Terampil / Pengelola Gizi', 'Nutrisionis Terampil', 'Nutrisionis Terampil', '05. Gizi', '05. Gizi', 'Tenaga Gizi', 'VII (Penata Muda)', '2023-06-01', 'Aktif', '31.5.1.500.2.23.112233', '2028-05-24', '446/011/SIP-G/2023', '2028-05-24', '081277889900', 'dewi.lestari@jakarta.go.id', 'Jl. Pulau Pari No. 45, Kepulauan Seribu'),
(7, '3171011010910007', '199110102019031005', '201045', 'Rizky Pratama, A.Md.AK', NULL, 'A.Md.AK', 'Laki-laki', 'Depok', '1991-10-10', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Pranata Laboratorium Kesehatan Mahir', 'Pranata Laboratorium Kesehatan Terampil', 'Pranata Laboratorium Kesehatan Terampil', '08. ATLM', '08. ATLM', 'Tenaga Keteknisian Medis', 'III/b (Penata Muda Tk. I)', '2019-03-01', 'Aktif', '31.8.1.800.1.19.445566', '2026-10-10', '446/019/SIP-L/2021', '2026-10-10', '081399001122', 'rizky.pratama@jakarta.go.id', 'Jl. Pulau Tidung No. 10, Kepulauan Seribu'),
(8, '3171011703860008', '198603172010011003', '181923', 'Eko Prasetyo, S.ST', NULL, 'S.ST', 'Laki-laki', 'Semarang', '1986-03-17', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Sanitarian Ahli Muda / Pengelola Kesling', 'Sanitarian Ahli Muda', 'Sanitarian Ahli Muda', '09. Sanitarium', '09. Sanitarium', 'Tenaga Kesehatan Lingkungan', 'III/c (Penata)', '2010-01-01', 'Aktif', '31.9.1.900.1.20.556677', '2027-03-17', '446/005/SIP-S/2022', '2027-03-17', '081288990011', 'eko.prasetyo@jakarta.go.id', 'Jl. Pulau Untung Jawa No. 09, Kepulauan Seribu'),
(9, '3171036811950009', '199511282023212010', '209112', 'Maya Indah, A.Md.PK', NULL, 'A.Md.PK', 'Perempuan', 'Bogor', '1995-11-28', 'Islam', 'Lajang', 'PPPK', 'Puskesmas Kepulauan Seribu Selatan', 'Perekam Medis Terampil / Pengelola Loket', 'Perekam Medis Terampil', 'Perekam Medis Terampil', '06. Rekam Medis', '06. Rekam Medis', 'Tenaga Rekam Medis', 'VII (Penata Muda)', '2023-06-01', 'Aktif', '31.6.1.600.2.23.667788', '2028-11-28', '446/014/SIP-RM/2023', '2028-11-28', '081299881122', 'maya.indah@jakarta.go.id', 'Jl. Pulau Tidung No. 15, Kepulauan Seribu'),
(10, '3171010804840010', '198404082009021001', '179402', 'Hendra Wijaya, S.E.', NULL, 'S.E.', 'Laki-laki', 'Jakarta', '1984-04-08', 'Islam', 'Kawin', 'PNS', 'Puskesmas Kepulauan Seribu Selatan', 'Pengadministrasi Keuangan / Kasubag TU', 'Penata Laporan Keuangan', 'Pengelola Keuangan', '10. Administrasi', '10. Administrasi', 'Tenaga Administrasi', 'III/d (Penata Tk. I)', '2009-02-01', 'Aktif', '-', '-', '-', '-', '081199887766', 'hendra.wijaya@jakarta.go.id', 'Jl. Pulau Tidung No. 02, Kepulauan Seribu'),
(11, '3171021512960011', '-', 'PJLP-2024-001', 'Bambang Supriyanto', NULL, NULL, 'Laki-laki', 'Kepulauan Seribu', '1996-12-15', 'Islam', 'Kawin', 'PJLP', 'Puskesmas Kepulauan Seribu Selatan', 'Petugas Kebersihan & Pengamanan (PJLP)', 'Tenaga Penyedia Jasa Lainnya Perorangan', 'Petugas Kebersihan', '10. Administrasi', '10. Administrasi', 'Tenaga Pendukung / PJLP', '-', '2021-01-02', 'Aktif', '-', '-', '-', '-', '081233445566', 'bambang.supriyanto@gmail.com', 'Jl. Pulau Tidung No. 88, Kepulauan Seribu');

-- --------------------------------------------------------
-- 3. TABEL MASTER REFERENSI
-- --------------------------------------------------------
DROP TABLE IF EXISTS `master_jabatan_menpan`;
CREATE TABLE IF NOT EXISTS `master_jabatan_menpan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `master_jabatan_orb`;
CREATE TABLE IF NOT EXISTS `master_jabatan_orb` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `master_rumpun_jabatan`;
CREATE TABLE IF NOT EXISTS `master_rumpun_jabatan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `master_unit_tugas`;
CREATE TABLE IF NOT EXISTS `master_unit_tugas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `master_unit_tugas` (`id`, `nama`, `status`) VALUES
(1, 'Puskesmas Kepulauan Seribu Selatan', 'Aktif'),
(2, 'Puskesmas Pembantu Pulau Tidung', 'Aktif'),
(3, 'Puskesmas Pembantu Pulau Pari', 'Aktif'),
(4, 'Puskesmas Pembantu Pulau Untung Jawa', 'Aktif'),
(5, 'Puskesmas Pembantu Pulau Lancang', 'Aktif'),
(6, 'Puskesmas Pembantu Pulau Payung', 'Aktif');

-- --------------------------------------------------------
-- 4. TABEL MODUL USULAN KEPEGAWAIAN
-- --------------------------------------------------------
DROP TABLE IF EXISTS `usulan_kepegawaian`;
CREATE TABLE IF NOT EXISTS `usulan_kepegawaian` (
  `id` VARCHAR(50) PRIMARY KEY,
  `jenis` VARCHAR(50) NOT NULL,
  `tgl` DATE NOT NULL,
  `nip` VARCHAR(30) NOT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `unit` VARCHAR(150) DEFAULT NULL,
  `berkas` TEXT DEFAULT NULL,
  `catatan` TEXT DEFAULT NULL,
  `status` ENUM('Menunggu Verifikasi', 'Disetujui', 'Ditolak') NOT NULL DEFAULT 'Menunggu Verifikasi',
  `nosk` VARCHAR(100) DEFAULT NULL,
  `catatan_verif` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. TABEL DISIPLIN PEGAWAI (HUKDIS)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `disiplin_pegawai`;
CREATE TABLE IF NOT EXISTS `disiplin_pegawai` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nip` VARCHAR(30) NOT NULL,
  `tingkat` ENUM('Ringan', 'Sedang', 'Berat') NOT NULL,
  `jenis` VARCHAR(150) NOT NULL,
  `pelanggaran` TEXT NOT NULL,
  `no_sk` VARCHAR(100) NOT NULL,
  `tgl_sk` DATE NOT NULL,
  `pejabat` VARCHAR(150) DEFAULT NULL,
  `tmt_mulai` DATE NOT NULL,
  `tmt_selesai` DATE DEFAULT NULL,
  `status` ENUM('Aktif', 'Selesai') NOT NULL DEFAULT 'Aktif',
  `keterangan` TEXT DEFAULT NULL,
  `doc_bap` TEXT DEFAULT NULL,
  `doc_sk` TEXT DEFAULT NULL,
  `doc_lainnya` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `disiplin_pegawai` (`id`, `nip`, `tingkat`, `jenis`, `pelanggaran`, `no_sk`, `tgl_sk`, `pejabat`, `tmt_mulai`, `tmt_selesai`, `status`, `keterangan`, `doc_bap`, `doc_sk`, `doc_lainnya`) VALUES
(1, '198204202008012005', 'Ringan', 'Teguran Lisan', 'Terlambat mengikuti apel pagi dan ketidakhadiran tanpa keterangan 1 hari', '800/2024/SK-DIS-01', '2024-02-15', 'Kepala Puskesmas Kepulauan Seribu Selatan', '2024-02-15', '2024-04-15', 'Selesai', 'Telah dilakukan pembinaan lisan oleh Atasan Langsung', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Ringan_01/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Ringan_01/view?usp=sharing', NULL),
(2, '199209152022032008', 'Ringan', 'Teguran Lisan', 'Keterlambatan penyusunan laporan bulanan unit kepegawaian', '800/2024/SK-DIS-02', '2024-03-01', 'Kepala Puskesmas Kepulauan Seribu Selatan', '2024-03-01', '2024-05-01', 'Selesai', 'Telah diberikan pengarahan dan tindak lanjut perbaikan', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Ringan_02/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Ringan_02/view?usp=sharing', NULL),
(3, '199405242023212009', 'Sedang', 'Penundaan Kenaikan Gaji Berkala (KGB) 1 Tahun', 'Pelanggaran ketentuan jam kerja dan ketidakhadiran secara akumulatif', '821/2023/SK-DIS-08', '2023-09-10', 'Kepala Dinas Kesehatan Provinsi DKI Jakarta', '2023-10-01', '2024-10-01', 'Aktif', 'Sedang menjalani masa hukdis penundaan KGB', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Sedang_08/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Sedang_08/view?usp=sharing', 'https://drive.google.com/file/d/1LHP_Pemeriksaan_Disiplin/view?usp=sharing');

-- --------------------------------------------------------
-- 6. TABEL GAP KOMPETENSI
-- --------------------------------------------------------
DROP TABLE IF EXISTS `gap_kompetensi`;
CREATE TABLE IF NOT EXISTS `gap_kompetensi` (
  `id` VARCHAR(50) PRIMARY KEY,
  `tahun` INT NOT NULL DEFAULT 2026,
  `nip` VARCHAR(30) NOT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `jabatan` VARCHAR(150) DEFAULT NULL,
  `unit` VARCHAR(150) DEFAULT NULL,
  `manajerial_std` INT DEFAULT 85,
  `manajerial_riil` INT DEFAULT 80,
  `sosial_std` INT DEFAULT 85,
  `sosial_riil` INT DEFAULT 85,
  `teknis_std` INT DEFAULT 90,
  `teknis_riil` INT DEFAULT 80,
  `rekomendasi` TEXT DEFAULT NULL,
  `catatan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. TABEL URAIAN TUGAS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `uraian_tugas`;
CREATE TABLE IF NOT EXISTS `uraian_tugas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nip` VARCHAR(30) NOT NULL UNIQUE,
  `ikhtisar` TEXT NOT NULL,
  `tugas_pokok` TEXT NOT NULL,
  `tugas_tambahan` TEXT DEFAULT NULL,
  `wewenang` TEXT NOT NULL,
  `tanggung_jawab` TEXT NOT NULL,
  `tgl_penetapan` DATE DEFAULT NULL,
  `nama_atasan` VARCHAR(150) DEFAULT NULL,
  `status` VARCHAR(30) DEFAULT 'Lengkap',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. TABEL PENGGAJIAN DAN SLIP PENGHASILAN PEGAWAI
-- --------------------------------------------------------
DROP TABLE IF EXISTS `penggajian`;
CREATE TABLE IF NOT EXISTS `penggajian` (
  `id` VARCHAR(50) PRIMARY KEY,
  `nip` VARCHAR(30) NOT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `bulan` INT NOT NULL,
  `tahun` INT NOT NULL,
  `pangkat_gol` VARCHAR(50) DEFAULT NULL,
  `jabatan` VARCHAR(150) DEFAULT NULL,
  `unit_tugas` VARCHAR(150) DEFAULT NULL,
  `gaji_pokok` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `tunjangan_kinerja` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `tunjangan_transportasi` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `total_bruto` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `potongan_pph21` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `potongan_bpjs_kesehatan` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `potongan_bpjs_jht` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `potongan_bpjs_jp` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `total_potongan` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `gaji_bersih` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `status_bayar` ENUM('Lunas', 'Proses', 'Ditunda') NOT NULL DEFAULT 'Lunas',
  `tgl_transfer` DATE DEFAULT NULL,
  `no_rekening` VARCHAR(50) DEFAULT NULL,
  `keterangan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unik_gaji_periode` (`nip`, `bulan`, `tahun`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `penggajian` (`id`, `nip`, `nama`, `bulan`, `tahun`, `pangkat_gol`, `jabatan`, `unit_tugas`, `gaji_pokok`, `tunjangan_kinerja`, `tunjangan_transportasi`, `total_bruto`, `potongan_pph21`, `potongan_bpjs_kesehatan`, `potongan_bpjs_jht`, `potongan_bpjs_jp`, `total_potongan`, `gaji_bersih`, `status_bayar`, `tgl_transfer`, `no_rekening`, `keterangan`) VALUES
('GAJI-198505152010011002-2026-08', '198505152010011002', 'dr. Ahmad Zulkarnain, Sp.A', 8, 2026, 'III/c (Penata)', 'Dokter Spesialis Anak', 'Puskesmas Kepulauan Seribu Selatan', 4500000.00, 7500000.00, 1200000.00, 13200000.00, 450000.00, 180000.00, 90000.00, 45000.00, 765000.00, 12435000.00, 'Lunas', '2026-08-01', 'Bank DKI 5012345678', 'Gaji Bulan Agustus 2026'),
('GAJI-198204202008012005-2026-08', '198204202008012005', 'dr. Fitriani Handayani', 8, 2026, 'IV/a (Pembina)', 'Kepala Puskesmas Kepulauan Seribu Selatan', 'Puskesmas Kepulauan Seribu Selatan', 5200000.00, 10500000.00, 1500000.00, 17200000.00, 680000.00, 200000.00, 104000.00, 52000.00, 1036000.00, 16164000.00, 'Lunas', '2026-08-01', 'Bank DKI 5023456789', 'Gaji Bulan Agustus 2026'),
('GAJI-198808122014021003-2026-08', '198808122014021003', 'Ns. Budi Santoso, S.Kep', 8, 2026, 'III/c (Penata)', 'Perawat Penyelia / PJ Keperawatan', 'Puskesmas Kepulauan Seribu Selatan', 4200000.00, 5800000.00, 1000000.00, 11000000.00, 320000.00, 160000.00, 84000.00, 42000.00, 606000.00, 10394000.00, 'Lunas', '2026-08-01', 'Bank DKI 5034567890', 'Gaji Bulan Agustus 2026'),
('GAJI-199209152022032008-2026-08', '199209152022032008', 'Siti Sarah, A.Md.Keb', 8, 2026, 'VII (Penata Muda)', 'Bidan Mahir / Pustu Pulau Untung Jawa', 'Pustu Pulau Untung Jawa', 3500000.00, 4200000.00, 850000.00, 8550000.00, 210000.00, 140000.00, 70000.00, 35000.00, 455000.00, 8095000.00, 'Lunas', '2026-08-01', 'Bank DKI 5045678901', 'Gaji Bulan Agustus 2026'),
('GAJI-198711032011011004-2026-08', '198711032011011004', 'Apt. Rahmat Hidayat, S.Farm', 8, 2026, 'III/c (Penata)', 'Apoteker Ahli Muda / Pengelola Obat', 'Puskesmas Kepulauan Seribu Selatan', 4300000.00, 6000000.00, 1000000.00, 11300000.00, 350000.00, 172000.00, 86000.00, 43000.00, 651000.00, 10649000.00, 'Lunas', '2026-08-01', 'Bank DKI 5056789012', 'Gaji Bulan Agustus 2026');

-- --------------------------------------------------------
-- 9. TABEL JADWAL & AGENDA DIKLAT / PELATIHAN
-- --------------------------------------------------------
DROP TABLE IF EXISTS `diklat_pegawai`;
CREATE TABLE IF NOT EXISTS `diklat_pegawai` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nip` VARCHAR(30) NOT NULL,
  `nama_diklat` VARCHAR(255) NOT NULL,
  `penyelenggara` VARCHAR(150) NOT NULL,
  `tahun` INT NOT NULL,
  `jp` INT NOT NULL DEFAULT 20,
  `tgl_mulai` DATE DEFAULT NULL,
  `tgl_selesai` DATE DEFAULT NULL,
  `lokasi` VARCHAR(150) DEFAULT NULL,
  `sertifikat_url` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. TABEL DOKUMEN DIGITAL ARSIP PEGAWAI
-- --------------------------------------------------------
DROP TABLE IF EXISTS `dokumen_digital`;
CREATE TABLE IF NOT EXISTS `dokumen_digital` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nip` VARCHAR(30) NOT NULL,
  `jenis_dokumen` VARCHAR(50) NOT NULL,
  `nama_file` VARCHAR(255) NOT NULL,
  `file_url` TEXT NOT NULL,
  `ukuran_kb` INT DEFAULT 0,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY `idx_doc_nip` (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 11. TABEL PENGATURAN SISTEM & KOP SURAT
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pengaturan_sistem`;
CREATE TABLE IF NOT EXISTS `pengaturan_sistem` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `val_content` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pengaturan_sistem` (`key_name`, `val_content`) VALUES
('nama_instansi', 'Pemerintah Provinsi DKI Jakarta - Dinas Kesehatan'),
('nama_puskesmas', 'Puskesmas Kepulauan Seribu Selatan'),
('alamat_puskesmas', 'Jl. Pantai Jembatan Cinta, Kel. Pulau Tidung, Kec. Kepulauan Seribu Selatan, Kab. Adm. Kepulauan Seribu 14520'),
('email_puskesmas', 'pkmkepseribuselatan@jakarta.go.id'),
('telepon_puskesmas', '021-69876543'),
('kepala_puskesmas_nama', 'dr. Fitriani Handayani'),
('kepala_puskesmas_nip', '198204202008012005'),
('kasubag_tu_nama', 'Hendra Wijaya, S.E.'),
('kasubag_tu_nip', '198404082009021001');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
