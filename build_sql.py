import json

with open('data_pegawai_db.json', 'r', encoding='utf-8') as f:
    pegawai_list = json.load(f)

sql = []

sql.append('-- ============================================================')
sql.append('-- DATABASE SIMPEG DIGITAL - PUSKESMAS KEPULAUAN SERIBU SELATAN')
sql.append('-- Domain Target: tatausahaseribu.my.id (cPanel / Rumahweb Hosting)')
sql.append('-- Dibuat Otomatis untuk Import ke phpMyAdmin (MySQL / MariaDB)')
sql.append('-- ============================================================\n')

sql.append('SET FOREIGN_KEY_CHECKS = 0;\n')

# 1. TABEL PENGGUNA
sql.append('-- 1. TABEL PENGGUNA (AKUN LOGIN ADMIN & PEGAWAI)')
sql.append('''CREATE TABLE IF NOT EXISTS `users` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''INSERT INTO `users` (`username`, `password`, `nama`, `nip`, `email`, `role`, `status`) VALUES
('admin', '123456', 'Super Administrator SIMPEG', '198501012010011001', 'admin.pkss@jakarta.go.id', 'Super Admin', 'Aktif'),
('kepegawaian', '123456', 'Admin Kepegawaian PKSS', '198805152015031002', 'kepegawaian.pkss@jakarta.go.id', 'Admin Kepegawaian', 'Aktif'),
('operator_pustu', '123456', 'Operator Pustu Panggang', '199408202022032008', 'pustu.panggang@jakarta.go.id', 'Operator Unit', 'Aktif');\n''')

# 2. TABEL PEGAWAI
sql.append('-- 2. TABEL PEGAWAI (DATA MASTER PEGAWAI)')
sql.append('''CREATE TABLE IF NOT EXISTS `pegawai` (
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
  `tempat_tugas` VARCHAR(150) DEFAULT 'Puskesmas Seribu Selatan',
  `jabatan` VARCHAR(150) DEFAULT NULL,
  `jabatan_orb` VARCHAR(150) DEFAULT NULL,
  `jabatan_kepmenpan` VARCHAR(150) DEFAULT NULL,
  `rumpun` VARCHAR(100) DEFAULT NULL,
  `status_rumpun` VARCHAR(100) DEFAULT NULL,
  `kategori` VARCHAR(50) DEFAULT 'Tenaga Kesehatan',
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
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

def esc(val):
    if val is None or str(val).strip() == '':
        return 'NULL'
    s = str(val).replace("'", "''").replace("\\", "\\\\")
    return f"'{s}'"

for p in pegawai_list:
    nik = esc(p.get('nik'))
    nip = esc(p.get('nip'))
    nrk = esc(p.get('nrk'))
    nama = esc(p.get('nama'))
    gelar_depan = esc(p.get('gelar_depan'))
    gelar_belakang = esc(p.get('gelar_belakang'))
    jk = esc(p.get('jenis_kelamin') or 'Laki-laki')
    tempat_lahir = esc(p.get('tempat_lahir'))
    tgl_lahir = esc(p.get('tanggal_lahir')) if p.get('tanggal_lahir') else 'NULL'
    agama = esc(p.get('agama'))
    status_nikah = esc(p.get('status_nikah'))
    status_pegawai = esc(p.get('status_pegawai'))
    tempat_tugas = esc(p.get('tempat_tugas') or p.get('nama_ukpd'))
    jabatan = esc(p.get('jabatan'))
    jabatan_orb = esc(p.get('jabatan_orb') or p.get('jabatan_pergub'))
    jabatan_kepmenpan = esc(p.get('jabatan_permenpan11') or p.get('jabatan_kepmenpan11'))
    rumpun = esc(p.get('rumpun'))
    status_rumpun = esc(p.get('status_rumpun'))
    kategori = esc(p.get('kategori'))
    pangkat_gol = esc(p.get('pangkat_gol'))
    tmt = esc(p.get('tmt')) if p.get('tmt') else 'NULL'
    kondisi = esc(p.get('kondisi') or 'Aktif')
    str_no = esc(p.get('str'))
    aktif_str = esc(p.get('aktif_str')) if p.get('aktif_str') else 'NULL'
    sip_no = esc(p.get('sip'))
    aktif_sip = esc(p.get('aktif_sip')) if p.get('aktif_sip') else 'NULL'
    no_hp = esc(p.get('no_hp') or p.get('nohp'))
    email = esc(p.get('email'))
    alamat = esc(p.get('alamat'))

    stmt = f"INSERT INTO `pegawai` (`nik`, `nip`, `nrk`, `nama`, `gelar_depan`, `gelar_belakang`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `agama`, `status_nikah`, `status_pegawai`, `tempat_tugas`, `jabatan`, `jabatan_orb`, `jabatan_kepmenpan`, `rumpun`, `status_rumpun`, `kategori`, `pangkat_gol`, `tmt`, `kondisi`, `str`, `aktif_str`, `sip`, `aktif_sip`, `no_hp`, `email`, `alamat`) VALUES ({nik}, {nip}, {nrk}, {nama}, {gelar_depan}, {gelar_belakang}, {jk}, {tempat_lahir}, {tgl_lahir}, {agama}, {status_nikah}, {status_pegawai}, {tempat_tugas}, {jabatan}, {jabatan_orb}, {jabatan_kepmenpan}, {rumpun}, {status_rumpun}, {kategori}, {pangkat_gol}, {tmt}, {kondisi}, {str_no}, {aktif_str}, {sip_no}, {aktif_sip}, {no_hp}, {email}, {alamat});"
    sql.append(stmt)

sql.append('\n')

# 3. MASTER TABLES
sql.append('-- 3. TABEL MASTER REFERENSI')
sql.append('''CREATE TABLE IF NOT EXISTS `master_jabatan_menpan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `master_jabatan_orb` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `master_rumpun_jabatan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `master_unit_tugas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''INSERT INTO `master_unit_tugas` (`nama`, `status`) VALUES
('Puskesmas Seribu Selatan', 'Aktif'),
('Puskesmas Pembantu Pulau Panggang', 'Aktif'),
('Puskesmas Pembantu Pulau Harapan', 'Aktif'),
('POSKES Pulau Sabira', 'Aktif'),
('PUSLING Pulau Pramuka', 'Aktif');\n''')

# 4. USULAN & DISIPLIN & GAP & URAIAN TUGAS
sql.append('-- 4. TABEL MODUL USULAN, DISIPLIN, GAP & URAIAN TUGAS')
sql.append('''CREATE TABLE IF NOT EXISTS `usulan_kepegawaian` (
  `id` VARCHAR(50) PRIMARY KEY,
  `jenis` ENUM('tunjangan', 'pangkat', 'jenjang') NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `disiplin_pegawai` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''INSERT INTO `disiplin_pegawai` (`nip`, `tingkat`, `jenis`, `pelanggaran`, `no_sk`, `tgl_sk`, `pejabat`, `tmt_mulai`, `tmt_selesai`, `status`, `keterangan`, `doc_bap`, `doc_sk`, `doc_lainnya`) VALUES
('198204202008012005', 'Ringan', 'Teguran Lisan', 'Terlambat mengikuti apel pagi dan ketidakhadiran tanpa keterangan 1 hari', '800/2024/SK-DIS-01', '2024-02-15', 'Kepala Puskesmas Kepulauan Seribu Selatan', '2024-02-15', '2024-04-15', 'Selesai', 'Telah dilakukan pembinaan lisan oleh Atasan Langsung', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Ringan_01/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Ringan_01/view?usp=sharing', NULL),
('199209152022032008', 'Ringan', 'Teguran Lisan', 'Keterlambatan penyusunan laporan bulanan unit kepegawaian', '800/2024/SK-DIS-02', '2024-03-01', 'Kepala Puskesmas Kepulauan Seribu Selatan', '2024-03-01', '2024-05-01', 'Selesai', 'Telah diberikan pengarahan dan tindak lanjut perbaikan', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Ringan_02/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Ringan_02/view?usp=sharing', NULL),
('199405242023212009', 'Sedang', 'Penundaan Kenaikan Gaji Berkala (KGB) 1 Tahun', 'Pelanggaran ketentuan jam kerja dan ketidakhadiran secara akumulatif', '821/2023/SK-DIS-08', '2023-09-10', 'Kepala Dinas Kesehatan Provinsi DKI Jakarta', '2023-10-01', '2024-10-01', 'Aktif', 'Sedang menjalani masa hukdis penundaan KGB', 'https://drive.google.com/file/d/1BAP_Pemeriksaan_Sedang_08/view?usp=sharing', 'https://drive.google.com/file/d/1SK_Disiplin_Sedang_08/view?usp=sharing', 'https://drive.google.com/file/d/1LHP_Pemeriksaan_Disiplin/view?usp=sharing');\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `gap_kompetensi` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('''CREATE TABLE IF NOT EXISTS `uraian_tugas` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n''')

sql.append('SET FOREIGN_KEY_CHECKS = 1;')

with open('database_simpeg.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql))

print('SUCCESSFULLY CREATED database_simpeg.sql')
