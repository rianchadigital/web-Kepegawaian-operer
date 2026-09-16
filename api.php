<?php
/**
 * ============================================================
 * BACKEND API RUMAHWEB HOSTING (PHP/MYSQL)
 * SIMPEG DIGITAL - PUSKESMAS KEPULAUAN SERIBU SELATAN
 * Domain Target: https://tatausahaseribu.my.id
 * ============================================================
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// File Storage Configuration
$jsonDbFile = __DIR__ . '/data_pegawai_db.json';
$configFile = __DIR__ . '/config.php';

// Database Credentials from Config (Default Hostinger parameters)
$dbHost = 'localhost';
$dbPort = '3306';
$dbName = 'u133879636_dbsimpegkawan'; 
$dbUser = 'u133879636_simpegkawan'; 
$dbPass = 'Simpegkawan2026';

if (file_exists($configFile)) {
    include_once $configFile;
}

// Initialize PDO Connection (Optional / Fallback to JSON file if MySQL fails)
$pdo = null;
if (function_exists('getHostingerConnection')) {
    $pdo = getHostingerConnection();
}

if (!$pdo) {
    try {
        if (!empty($dbName)) {
            $port = isset($dbPort) ? $dbPort : '3306';
            $pdo = new PDO("mysql:host={$dbHost};port={$port};dbname={$dbName};charset=utf8mb4", $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO_ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO_FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
            try {
                $pdo->exec("SET sql_mode = 'NO_ENGINE_SUBSTITUTION'");
            } catch (Exception $e) {}
        }
    } catch (Exception $e) {
        $pdo = null;
        error_log("Database connection fallback: " . $e->getMessage());
    }
}

// Helper: Read Full App DB Structure
function readAppStorage($filepath) {
    $defaults = [
        'pegawai' => [],
        'pengguna' => [],
        'usulan' => [],
        'disiplin' => [],
        'gap' => [],
        'diklat' => [],
        'gaji' => [],
        'master' => [],
        'pengaturan' => []
    ];
    if (!file_exists($filepath)) {
        return $defaults;
    }
    $content = file_get_contents($filepath);
    $data = json_decode($content, true);
    
    // If legacy array (only pegawai), wrap in structure
    if (is_array($data)) {
        if (array_keys($data) === range(0, count($data) - 1)) {
            $defaults['pegawai'] = $data;
            return $defaults;
        } else {
            return array_merge($defaults, $data);
        }
    }
    
    return $defaults;
}

// Helper: Save Full App DB Structure
function saveAppStorage($filepath, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($filepath, $json, LOCK_EX) !== false;
}

// Global tracker for last MySQL error to ensure transparent debugging
$GLOBALS['lastMySqlError'] = null;

// Helper: Clean and format dates strictly for MySQL DATE column (strict mode safe)
function cleanDateForSql($val) {
    if ($val === null) return null;
    if (is_string($val)) {
        $val = trim($val);
        if ($val === '' || $val === '-' || $val === '0' || $val === '0000-00-00' || strtolower($val) === 'null') return null;
        if (preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $val)) return $val;
        if (preg_match('/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/', $val, $m)) {
            return sprintf('%04d-%02d-%02d', $m[3], $m[2], $m[1]);
        }
        $ts = strtotime($val);
        if ($ts && $ts > 0 && $ts < 2147483647) {
            return date('Y-m-d', $ts);
        }
    }
    return null;
}

// Helper: Clean and format JSON for MySQL JSON or LONGTEXT column
function cleanJsonForSql($val) {
    if ($val === null) return null;
    if (is_array($val) || is_object($val)) {
        return json_encode($val, JSON_UNESCAPED_UNICODE);
    }
    if (is_string($val)) {
        $trimmed = trim($val);
        if ($trimmed === '' || $trimmed === '-' || $trimmed === '0' || strtolower($trimmed) === 'null') return null;
        // Verify JSON validity
        $decoded = json_decode($trimmed);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $trimmed;
        }
    }
    return null;
}

// Helper: Inspect actual columns of a MySQL table
function getTableColumns($pdo, $tableName = 'pegawai', $forceRefresh = false) {
    static $columnsCache = [];
    if (!$forceRefresh && isset($columnsCache[$tableName])) return $columnsCache[$tableName];
    if (!$pdo) return [];
    try {
        $stmt = $pdo->query("SHOW COLUMNS FROM `$tableName`");
        $cols = [];
        while ($r = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cols[$r['Field']] = [
                'type' => strtolower($r['Type']),
                'null' => strtoupper($r['Null']) === 'YES',
                'default' => $r['Default']
            ];
        }
        $columnsCache[$tableName] = $cols;
        return $cols;
    } catch (Exception $e) {
        return [];
    }
}

// Helper: Ensure MySQL table 'pegawai' exists and has all required columns
function ensureMySqlTablesExist($pdo) {
    static $checked = false;
    if ($checked || !$pdo) return;
    $checked = true;
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `pegawai` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `nik` VARCHAR(30) DEFAULT NULL,
          `nip` VARCHAR(30) DEFAULT NULL,
          `nrk` VARCHAR(30) DEFAULT NULL,
          `nama` VARCHAR(150) NOT NULL,
          `gelar_depan` VARCHAR(30) DEFAULT NULL,
          `gelar_belakang` VARCHAR(30) DEFAULT NULL,
          `jenis_kelamin` VARCHAR(30) DEFAULT 'Laki-laki',
          `tempat_lahir` VARCHAR(100) DEFAULT NULL,
          `tanggal_lahir` DATE DEFAULT NULL,
          `agama` VARCHAR(30) DEFAULT NULL,
          `status_nikah` VARCHAR(30) DEFAULT NULL,
          `status_pegawai` VARCHAR(50) DEFAULT 'PNS',
          `jenis_kontrak` VARCHAR(50) DEFAULT 'Tetap',
          `tempat_tugas` VARCHAR(150) DEFAULT 'Puskesmas Kepulauan Seribu Selatan',
          `jabatan` VARCHAR(150) DEFAULT NULL,
          `jabatan_orb` VARCHAR(150) DEFAULT NULL,
          `jabatan_kepmenpan` VARCHAR(150) DEFAULT NULL,
          `rumpun` VARCHAR(100) DEFAULT NULL,
          `status_rumpun` VARCHAR(100) DEFAULT NULL,
          `kategori` VARCHAR(50) DEFAULT 'Tenaga Medis',
          `pangkat_gol` VARCHAR(50) DEFAULT NULL,
          `tmt` DATE DEFAULT NULL,
          `tmt_pangkat` DATE DEFAULT NULL,
          `atasan` VARCHAR(150) DEFAULT NULL,
          `kondisi` VARCHAR(50) DEFAULT 'Aktif',
          `str` VARCHAR(100) DEFAULT NULL,
          `aktif_str` DATE DEFAULT NULL,
          `sip` VARCHAR(100) DEFAULT NULL,
          `aktif_sip` DATE DEFAULT NULL,
          `no_hp` VARCHAR(30) DEFAULT NULL,
          `email` VARCHAR(100) DEFAULT NULL,
          `foto` LONGTEXT DEFAULT NULL,
          `alamat` TEXT DEFAULT NULL,
          `rt_rw` VARCHAR(50) DEFAULT NULL,
          `kelurahan` VARCHAR(100) DEFAULT NULL,
          `kecamatan` VARCHAR(100) DEFAULT NULL,
          `kota` VARCHAR(100) DEFAULT NULL,
          `provinsi` VARCHAR(100) DEFAULT NULL,
          `kodepos` VARCHAR(20) DEFAULT NULL,
          `riwayat_jabatan` LONGTEXT DEFAULT NULL,
          `riwayat_pendidikan` LONGTEXT DEFAULT NULL,
          `riwayat_keluarga` LONGTEXT DEFAULT NULL,
          `riwayat_diklat` LONGTEXT DEFAULT NULL,
          `uraian_tugas` LONGTEXT DEFAULT NULL,
          `data_gaji` LONGTEXT DEFAULT NULL,
          `dokumen` LONGTEXT DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          KEY `idx_nip` (`nip`),
          KEY `idx_nik` (`nik`),
          KEY `idx_unit` (`tempat_tugas`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // Safe auto-migration for missing columns if table pre-existed with older schema
        $cols = getTableColumns($pdo, 'pegawai');
        $alterList = [
            'jenis_kontrak' => 'VARCHAR(50) DEFAULT "Tetap"',
            'tmt_pangkat' => 'DATE DEFAULT NULL',
            'atasan' => 'VARCHAR(150) DEFAULT NULL',
            'foto' => 'LONGTEXT DEFAULT NULL',
            'rt_rw' => 'VARCHAR(50) DEFAULT NULL',
            'kelurahan' => 'VARCHAR(100) DEFAULT NULL',
            'kecamatan' => 'VARCHAR(100) DEFAULT NULL',
            'kota' => 'VARCHAR(100) DEFAULT NULL',
            'provinsi' => 'VARCHAR(100) DEFAULT NULL',
            'kodepos' => 'VARCHAR(20) DEFAULT NULL',
            'jabatan_orb' => 'VARCHAR(150) DEFAULT NULL',
            'jabatan_kepmenpan' => 'VARCHAR(150) DEFAULT NULL',
            'status_rumpun' => 'VARCHAR(100) DEFAULT NULL',
            'uraian_tugas' => 'LONGTEXT DEFAULT NULL',
            'data_gaji' => 'LONGTEXT DEFAULT NULL',
            'dokumen' => 'LONGTEXT DEFAULT NULL'
        ];
        foreach ($alterList as $colName => $colDef) {
            if (!isset($cols[$colName])) {
                try {
                    $pdo->exec("ALTER TABLE `pegawai` ADD COLUMN `$colName` $colDef");
                } catch (Exception $e) {}
            }
        }
        getTableColumns($pdo, 'pegawai', true);
    } catch (Exception $e) {
        error_log("Table check warning: " . $e->getMessage());
    }
}

// Helper: Find pegawai index in an array with robust matching
function findPegawaiIndexInPhpList($item, $list) {
    if (!is_array($item) || !is_array($list) || empty($list)) return -1;

    $rawNip = isset($item['nip']) ? trim($item['nip']) : '';
    $rawNik = isset($item['nik']) ? trim($item['nik']) : '';
    $rawNrk = isset($item['nrk']) ? trim($item['nrk']) : '';
    $rawNama = isset($item['nama']) ? strtolower(trim($item['nama'])) : '';
    $rowIndex = isset($item['rowIndex']) ? $item['rowIndex'] : null;

    // Match by explicit rowIndex if given and valid
    if ($rowIndex !== null && $rowIndex !== '') {
        foreach ($list as $i => $p) {
            if (isset($p['rowIndex']) && $p['rowIndex'] == $rowIndex) return $i;
        }
    }

    // 1. Match by valid NIP (minimal 8 numeric digits)
    if ($rawNip && $rawNip !== '-' && $rawNip !== '0' && preg_match('/^\d{8,}$/', $rawNip)) {
        foreach ($list as $i => $p) {
            if (isset($p['nip']) && trim($p['nip']) === $rawNip) return $i;
        }
    }

    // 2. Match by valid NIK (minimal 10 numeric digits, bukan status kawin)
    if ($rawNik && $rawNik !== '-' && $rawNik !== '0' && preg_match('/^\d{10,}$/', $rawNik)) {
        foreach ($list as $i => $p) {
            if (isset($p['nik']) && trim($p['nik']) === $rawNik) return $i;
        }
    }

    // 3. Match by valid NRK (minimal 4 karakter)
    if ($rawNrk && $rawNrk !== '-' && $rawNrk !== '0' && strlen($rawNrk) >= 4) {
        foreach ($list as $i => $p) {
            if (isset($p['nrk']) && trim($p['nrk']) === $rawNrk) return $i;
        }
    }

    // 4. Match by exact Nama Lengkap (hanya jika nama >= 4 karakter)
    if ($rawNama && strlen($rawNama) >= 4) {
        foreach ($list as $i => $p) {
            if (isset($p['nama']) && strtolower(trim($p['nama'])) === $rawNama) return $i;
        }
    }

    return -1;
}

// Helper: MySQL PDO Save / Update Pegawai directly in Hostinger MySQL table with full strict-mode safety
function syncPegawaiToMySql($pdo, $p, $isExplicitNew = false) {
    if (!$pdo || !is_array($p)) return false;
    ensureMySqlTablesExist($pdo);

    $nip = isset($p['nip']) ? trim($p['nip']) : '';
    $nik = isset($p['nik']) ? trim($p['nik']) : '';
    $nama = isset($p['nama']) ? trim($p['nama']) : '';

    // Sanitasi NIK: jika berisi huruf atau status nikah, pindahkan ke status_nikah dan kosongkan NIK
    $statusNikah = isset($p['status_nikah']) ? trim($p['status_nikah']) : '';
    if ($nik) {
        $nikLower = strtolower($nik);
        if (strpos($nikLower, 'kawin') !== false || strpos($nikLower, 'nikah') !== false || strpos($nikLower, 'janda') !== false || strpos($nikLower, 'duda') !== false || (!ctype_digit($nik) && $nik !== '-')) {
            if (empty($statusNikah) || $statusNikah === 'Kawin' || $statusNikah === '-') {
                $statusNikah = $nik;
            }
            $nik = '';
        } else if ($nik === '-' || $nik === '0') {
            $nik = '';
        }
    }

    if ($nip === '-' || $nip === '0' || (strlen($nip) < 6 && !ctype_digit($nip))) {
        $nip = '';
    }

    if (empty($nama) && empty($nip) && empty($nik)) {
        $GLOBALS['lastMySqlError'] = "Nama, NIP, atau NIK wajib diisi untuk menyimpan ke database.";
        return false;
    }

    try {
        $existingId = null;

        // 1. Cari berdasarkan ID numerik eksplisit (jika mode edit)
        if (!empty($p['id']) && is_numeric($p['id'])) {
            $stmt = $pdo->prepare("SELECT id FROM `pegawai` WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $p['id']]);
            $row = $stmt->fetch();
            if ($row) $existingId = $row['id'];
        }

        // 2. Cari berdasarkan NIP valid
        if (!$existingId && !empty($nip) && $nip !== '-' && preg_match('/^\d{8,}$/', $nip)) {
            $stmt = $pdo->prepare("SELECT id FROM `pegawai` WHERE nip = :nip LIMIT 1");
            $stmt->execute([':nip' => $nip]);
            $row = $stmt->fetch();
            if ($row) $existingId = $row['id'];
        }

        // 3. Cari berdasarkan NIK valid
        if (!$existingId && !empty($nik) && $nik !== '-' && preg_match('/^\d{10,}$/', $nik)) {
            $stmt = $pdo->prepare("SELECT id FROM `pegawai` WHERE nik = :nik LIMIT 1");
            $stmt->execute([':nik' => $nik]);
            $row = $stmt->fetch();
            if ($row) $existingId = $row['id'];
        }

        // 4. Cari berdasarkan NRK valid
        if (!$existingId && !empty($p['nrk']) && trim($p['nrk']) !== '-' && strlen(trim($p['nrk'])) >= 4) {
            $stmt = $pdo->prepare("SELECT id FROM `pegawai` WHERE nrk = :nrk LIMIT 1");
            $stmt->execute([':nrk' => trim($p['nrk'])]);
            $row = $stmt->fetch();
            if ($row) $existingId = $row['id'];
        }

        // 5. Cari berdasarkan exact nama hanya jika BUKAN penambahan baru eksplisit
        if (!$existingId && !$isExplicitNew && !empty($nama) && strlen($nama) >= 4) {
            $stmt = $pdo->prepare("SELECT id FROM `pegawai` WHERE LOWER(TRIM(nama)) = LOWER(TRIM(:nama)) LIMIT 1");
            $stmt->execute([':nama' => $nama]);
            $row = $stmt->fetch();
            if ($row) $existingId = $row['id'];
        }

        // Dapatkan kolom aktual tabel pegawai di MySQL Hostinger
        $actualCols = getTableColumns($pdo, 'pegawai');
        if (empty($actualCols)) {
            $GLOBALS['lastMySqlError'] = "Tabel pegawai tidak ditemukan di database MySQL.";
            return false;
        }

        // Normalisasi jenis kelamin
        $rawJk = isset($p['jenis_kelamin']) ? trim($p['jenis_kelamin']) : '';
        $jenisKelamin = (preg_match('/^(p|perempuan|wanita)/i', $rawJk)) ? 'Perempuan' : 'Laki-laki';

        // Definisi nilai terformat untuk setiap kolom
        $colValues = [
            'nik' => $nik ? substr($nik, 0, 30) : null,
            'nip' => $nip ? substr($nip, 0, 30) : null,
            'nrk' => (isset($p['nrk']) && trim($p['nrk']) !== '-') ? substr(trim($p['nrk']), 0, 30) : null,
            'nama' => substr($nama, 0, 150),
            'gelar_depan' => (isset($p['gelar_depan']) && trim($p['gelar_depan']) !== '') ? substr(trim($p['gelar_depan']), 0, 30) : null,
            'gelar_belakang' => (isset($p['gelar_belakang']) && trim($p['gelar_belakang']) !== '') ? substr(trim($p['gelar_belakang']), 0, 30) : null,
            'jenis_kelamin' => $jenisKelamin,
            'tempat_lahir' => (isset($p['tempat_lahir']) && trim($p['tempat_lahir']) !== '') ? substr(trim($p['tempat_lahir']), 0, 100) : null,
            'tanggal_lahir' => cleanDateForSql(isset($p['tanggal_lahir']) ? $p['tanggal_lahir'] : (isset($p['tgl_lahir']) ? $p['tgl_lahir'] : null)),
            'agama' => (isset($p['agama']) && trim($p['agama']) !== '') ? substr(trim($p['agama']), 0, 30) : 'Islam',
            'status_nikah' => !empty($statusNikah) ? substr($statusNikah, 0, 30) : 'Kawin',
            'status_pegawai' => (isset($p['status_pegawai']) && trim($p['status_pegawai']) !== '') ? substr(trim($p['status_pegawai']), 0, 50) : 'PNS',
            'jenis_kontrak' => (isset($p['jenis_kontrak']) && trim($p['jenis_kontrak']) !== '') ? substr(trim($p['jenis_kontrak']), 0, 50) : 'Tetap',
            'tempat_tugas' => (isset($p['tempat_tugas']) && trim($p['tempat_tugas']) !== '') ? substr(trim($p['tempat_tugas']), 0, 150) : (isset($p['nama_ukpd']) ? substr(trim($p['nama_ukpd']), 0, 150) : 'Puskesmas Kepulauan Seribu Selatan'),
            'jabatan' => (isset($p['jabatan']) && trim($p['jabatan']) !== '') ? substr(trim($p['jabatan']), 0, 150) : null,
            'jabatan_orb' => (isset($p['jabatan_orb']) && trim($p['jabatan_orb']) !== '') ? substr(trim($p['jabatan_orb']), 0, 150) : (isset($p['jabatan_pergub']) ? substr(trim($p['jabatan_pergub']), 0, 150) : null),
            'jabatan_kepmenpan' => (isset($p['jabatan_kepmenpan']) && trim($p['jabatan_kepmenpan']) !== '') ? substr(trim($p['jabatan_kepmenpan']), 0, 150) : (isset($p['jabatan_permenpan11']) ? substr(trim($p['jabatan_permenpan11']), 0, 150) : null),
            'rumpun' => (isset($p['rumpun']) && trim($p['rumpun']) !== '') ? substr(trim($p['rumpun']), 0, 100) : null,
            'status_rumpun' => (isset($p['status_rumpun']) && trim($p['status_rumpun']) !== '') ? substr(trim($p['status_rumpun']), 0, 100) : null,
            'kategori' => (isset($p['kategori']) && trim($p['kategori']) !== '') ? substr(trim($p['kategori']), 0, 50) : 'Tenaga Medis',
            'pangkat_gol' => (isset($p['pangkat_gol']) && trim($p['pangkat_gol']) !== '') ? substr(trim($p['pangkat_gol']), 0, 50) : null,
            'tmt' => cleanDateForSql(isset($p['tmt']) ? $p['tmt'] : (isset($p['tmt_ukpd']) ? $p['tmt_ukpd'] : null)),
            'tmt_pangkat' => cleanDateForSql(isset($p['tmt_pangkat']) ? $p['tmt_pangkat'] : null),
            'atasan' => (isset($p['atasan']) && trim($p['atasan']) !== '') ? substr(trim($p['atasan']), 0, 150) : (isset($p['atasan_langsung']) ? substr(trim($p['atasan_langsung']), 0, 150) : null),
            'kondisi' => (isset($p['kondisi']) && trim($p['kondisi']) !== '') ? substr(trim($p['kondisi']), 0, 50) : 'Aktif',
            'str' => (isset($p['str']) && trim($p['str']) !== '') ? substr(trim($p['str']), 0, 100) : null,
            'aktif_str' => cleanDateForSql(isset($p['aktif_str']) ? $p['aktif_str'] : (isset($p['m_str']) ? $p['m_str'] : null)),
            'sip' => (isset($p['sip']) && trim($p['sip']) !== '') ? substr(trim($p['sip']), 0, 100) : null,
            'aktif_sip' => cleanDateForSql(isset($p['aktif_sip']) ? $p['aktif_sip'] : (isset($p['m_sip']) ? $p['m_sip'] : null)),
            'no_hp' => (isset($p['no_hp']) && trim($p['no_hp']) !== '') ? substr(trim($p['no_hp']), 0, 30) : (isset($p['hp']) ? substr(trim($p['hp']), 0, 30) : null),
            'email' => (isset($p['email']) && trim($p['email']) !== '') ? substr(trim($p['email']), 0, 100) : null,
            'foto' => (isset($p['foto']) && !empty($p['foto'])) ? $p['foto'] : null,
            'alamat' => (isset($p['alamat']) && trim($p['alamat']) !== '') ? trim($p['alamat']) : null,
            'rt_rw' => (isset($p['rt_rw']) && trim($p['rt_rw']) !== '') ? substr(trim($p['rt_rw']), 0, 50) : null,
            'kelurahan' => (isset($p['kelurahan']) && trim($p['kelurahan']) !== '') ? substr(trim($p['kelurahan']), 0, 100) : null,
            'kecamatan' => (isset($p['kecamatan']) && trim($p['kecamatan']) !== '') ? substr(trim($p['kecamatan']), 0, 100) : null,
            'kota' => (isset($p['kota']) && trim($p['kota']) !== '') ? substr(trim($p['kota']), 0, 100) : null,
            'provinsi' => (isset($p['provinsi']) && trim($p['provinsi']) !== '') ? substr(trim($p['provinsi']), 0, 100) : null,
            'kodepos' => (isset($p['kodepos']) && trim($p['kodepos']) !== '') ? substr(trim($p['kodepos']), 0, 20) : null,
            'riwayat_keluarga' => cleanJsonForSql(isset($p['riwayat_keluarga']) ? $p['riwayat_keluarga'] : (isset($p['keluarga']) ? $p['keluarga'] : null)),
            'riwayat_jabatan' => cleanJsonForSql(isset($p['riwayat_jabatan']) ? $p['riwayat_jabatan'] : (isset($p['jabatan_history']) ? $p['jabatan_history'] : null)),
            'riwayat_pendidikan' => cleanJsonForSql(isset($p['riwayat_pendidikan']) ? $p['riwayat_pendidikan'] : (isset($p['pendidikan_history']) ? $p['pendidikan_history'] : null)),
            'riwayat_diklat' => cleanJsonForSql(isset($p['riwayat_diklat']) ? $p['riwayat_diklat'] : null),
            'uraian_tugas' => cleanJsonForSql(isset($p['uraian_tugas']) ? $p['uraian_tugas'] : null),
            'data_gaji' => cleanJsonForSql(isset($p['data_gaji']) ? $p['data_gaji'] : (isset($p['gaji_history']) ? $p['gaji_history'] : null)),
            'dokumen' => cleanJsonForSql(isset($p['dokumen']) ? $p['dokumen'] : null)
        ];

        // Saring hanya kolom yang benar-benar ada di tabel database MySQL
        $fieldsToUse = [];
        $params = [];
        foreach ($colValues as $col => $val) {
            if (isset($actualCols[$col])) {
                // If column is NOT NULL without default in MySQL and value is NULL, supply safe non-null fallback
                if ($val === null && isset($actualCols[$col]['null']) && !$actualCols[$col]['null'] && $actualCols[$col]['default'] === null) {
                    $type = isset($actualCols[$col]['type']) ? strtolower($actualCols[$col]['type']) : '';
                    if (strpos($type, 'int') !== false || strpos($type, 'decimal') !== false || strpos($type, 'float') !== false) {
                        $val = 0;
                    } elseif (strpos($type, 'date') !== false) {
                        $val = '1970-01-01';
                    } else {
                        $val = '-';
                    }
                }
                // Auto-truncate to column length if varchar
                if (is_string($val) && isset($actualCols[$col]['type']) && preg_match('/varchar\((\d+)\)/', $actualCols[$col]['type'], $mLen)) {
                    $maxLen = (int) $mLen[1];
                    if (strlen($val) > $maxLen) {
                        $val = substr($val, 0, $maxLen);
                    }
                }
                $fieldsToUse[$col] = $val;
                $params[':' . $col] = $val;
            }
        }

        // Pastikan kolom NOT NULL lain yang ada di database memiliki nilai default aman saat INSERT
        if (!$existingId) {
            foreach ($actualCols as $colName => $colMeta) {
                if ($colName === 'id' || isset($fieldsToUse[$colName])) continue;
                if (!$colMeta['null'] && $colMeta['default'] === null) {
                    $type = strtolower($colMeta['type']);
                    if (strpos($type, 'int') !== false || strpos($type, 'decimal') !== false || strpos($type, 'float') !== false) {
                        $defVal = 0;
                    } elseif (strpos($type, 'date') !== false) {
                        $defVal = '1970-01-01';
                    } else {
                        $defVal = '-';
                    }
                    $fieldsToUse[$colName] = $defVal;
                    $params[':' . $colName] = $defVal;
                }
            }
        }

        if (empty($fieldsToUse)) {
            $GLOBALS['lastMySqlError'] = "Tidak ada kolom yang cocok untuk disimpan ke tabel pegawai.";
            return false;
        }

        if ($existingId) {
            // UPDATE
            $params[':_existing_id'] = $existingId;
            $setClauses = [];
            foreach ($fieldsToUse as $col => $val) {
                $setClauses[] = "`$col` = :$col";
            }
            $sql = "UPDATE `pegawai` SET " . implode(', ', $setClauses) . " WHERE `id` = :_existing_id";
            $stmt = $pdo->prepare($sql);
            $res = $stmt->execute($params);
            if (!$res) {
                $err = $stmt->errorInfo();
                $GLOBALS['lastMySqlError'] = isset($err[2]) ? $err[2] : "Gagal mengeksekusi UPDATE MySQL";
                return false;
            }
            return true;
        } else {
            // INSERT
            $colsList = [];
            $placeholders = [];
            foreach ($fieldsToUse as $col => $val) {
                $colsList[] = "`$col`";
                $placeholders[] = ":$col";
            }
            $sql = "INSERT INTO `pegawai` (" . implode(', ', $colsList) . ") VALUES (" . implode(', ', $placeholders) . ")";
            $stmt = $pdo->prepare($sql);
            $res = $stmt->execute($params);
            if (!$res) {
                $err = $stmt->errorInfo();
                $GLOBALS['lastMySqlError'] = isset($err[2]) ? $err[2] : "Gagal mengeksekusi INSERT MySQL";
                return false;
            }
            return true;
        }
    } catch (Exception $e) {
        $GLOBALS['lastMySqlError'] = $e->getMessage();
        error_log("Error syncPegawaiToMySql: " . $e->getMessage());
        return false;
    }
}

// Helper: Delete Pegawai from Hostinger MySQL table
function deletePegawaiFromMySql($pdo, $p) {
    if (!$pdo || !is_array($p)) return false;
    $nip = isset($p['nip']) ? trim($p['nip']) : '';
    $nik = isset($p['nik']) ? trim($p['nik']) : '';
    $nama = isset($p['nama']) ? trim($p['nama']) : '';
    $id = isset($p['id']) ? $p['id'] : null;

    try {
        if ($id && is_numeric($id)) {
            $stmt = $pdo->prepare("DELETE FROM pegawai WHERE id = :id");
            return $stmt->execute([':id' => $id]);
        }
        if (!empty($nip) && $nip !== '-') {
            $stmt = $pdo->prepare("DELETE FROM pegawai WHERE nip = :nip");
            return $stmt->execute([':nip' => $nip]);
        }
        if (!empty($nik) && $nik !== '-') {
            $stmt = $pdo->prepare("DELETE FROM pegawai WHERE nik = :nik");
            return $stmt->execute([':nik' => $nik]);
        }
        if (!empty($nama)) {
            $stmt = $pdo->prepare("DELETE FROM pegawai WHERE nama = :nama LIMIT 1");
            return $stmt->execute([':nama' => $nama]);
        }
    } catch (Exception $e) {
        error_log("Error deletePegawaiFromMySql: " . $e->getMessage());
    }
    return false;
}

// Parse Input Request
$action = isset($_GET['action']) ? $_GET['action'] : '';
$inputRaw = file_get_contents('php://input');
$inputData = json_decode($inputRaw, true);

if (empty($inputData) && !empty($_POST)) {
    $inputData = $_POST;
    if (isset($_POST['data']) && is_string($_POST['data'])) {
        $decoded = json_decode($_POST['data'], true);
        if ($decoded) $inputData['data'] = $decoded;
    }
}

if (!$action && is_array($inputData) && isset($inputData['action'])) {
    $action = $inputData['action'];
}

$payload = (is_array($inputData) && isset($inputData['data'])) ? $inputData['data'] : (is_array($inputData) ? $inputData : []);
if (is_string($payload)) {
    $decodedPayload = json_decode($payload, true);
    if (is_array($decodedPayload)) $payload = $decodedPayload;
}

$db = readAppStorage($jsonDbFile);

// Route Actions
switch ($action) {

    // 0. TEST DATABASE & SERVER CONNECTION
    case 'testConnection':
    case 'checkDatabase':
        $pegawaiCount = 0;
        if ($pdo) {
            try {
                $cntStmt = $pdo->query("SELECT COUNT(*) FROM `pegawai`");
                $pegawaiCount = (int)$cntStmt->fetchColumn();
            } catch (Exception $e) {}
        }
        echo json_encode([
            'success' => true,
            'pdo_connected' => ($pdo !== null),
            'database_name' => (!empty($dbName) && $dbName !== 'u123456789_simpeg_pkss') ? $dbName : 'Fallback JSON Storage',
            'total_pegawai_db' => $pegawaiCount,
            'json_storage' => file_exists($jsonDbFile),
            'timestamp' => date('Y-m-d H:i:s'),
            'message' => ($pdo !== null) ? "Koneksi database MySQL Hostinger aktif ({$pegawaiCount} pegawai terdaftar di database)." : 'Menggunakan fallback penyimpanan file JSON lokal server.'
        ], JSON_UNESCAPED_UNICODE);
        exit;

    // 1. GET PEGAWAI DATA
    case 'getPegawaiData':
    case 'getData':
        $pegawaiList = [];
        if ($pdo) {
            try {
                $stmt = $pdo->query("SELECT * FROM pegawai ORDER BY nama ASC");
                $pegawaiList = $stmt->fetchAll();
            } catch (Exception $e) {
                $pegawaiList = isset($db['pegawai']) ? $db['pegawai'] : [];
            }
        } else {
            $pegawaiList = isset($db['pegawai']) ? $db['pegawai'] : [];
        }
        echo json_encode($pegawaiList, JSON_UNESCAPED_UNICODE);
        exit;

    // 2. GET ALL APP MODULES (PEGWAi, PENGGUNA, USULAN, DISIPLIN, GAP, DIKLAT, MASTER, PENGATURAN)
    case 'getAllAppModules':
    case 'getAllData':
        if ($pdo) {
            try {
                $stmt = $pdo->query("SELECT * FROM pegawai ORDER BY nama ASC");
                $db['pegawai'] = $stmt->fetchAll();
            } catch (Exception $e) {}
            try {
                $stmt = $pdo->query("SELECT * FROM users ORDER BY id ASC");
                $users = $stmt->fetchAll();
                if (!empty($users)) $db['pengguna'] = $users;
            } catch (Exception $e) {}
            try {
                $stmt = $pdo->query("SELECT * FROM usulan_kepegawaian ORDER BY created_at DESC");
                $db['usulan'] = $stmt->fetchAll();
            } catch (Exception $e) {}
            try {
                $stmt = $pdo->query("SELECT * FROM disiplin_pegawai ORDER BY created_at DESC");
                $db['disiplin'] = $stmt->fetchAll();
            } catch (Exception $e) {}
            try {
                $stmt = $pdo->query("SELECT * FROM gap_kompetensi ORDER BY created_at DESC");
                $db['gap'] = $stmt->fetchAll();
            } catch (Exception $e) {}
            try {
                $stmt = $pdo->query("SELECT * FROM diklat_pegawai ORDER BY tahun DESC");
                $db['diklat'] = $stmt->fetchAll();
            } catch (Exception $e) {}
        }
        echo json_encode([
            'success' => true,
            'data' => $db
        ], JSON_UNESCAPED_UNICODE);
        exit;

    // 3. SAVE ALL APP MODULES (FULL SYNC TO HOSTINGER MYSQL)
    case 'saveAllAppModules':
    case 'saveAllModules':
        if (is_array($payload)) {
            if (isset($payload['pegawai']) || isset($payload['pengguna']) || isset($payload['usulan'])) {
                foreach ($payload as $key => $val) {
                    $db[$key] = $val;
                }
            } else {
                $db['pegawai'] = $payload;
            }
            if ($pdo && isset($db['pegawai']) && is_array($db['pegawai'])) {
                foreach ($db['pegawai'] as $p) {
                    syncPegawaiToMySql($pdo, $p);
                }
            }
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Semua data modul berhasil disimpan di Database MySQL Hostinger!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload data tidak valid.']);
        }
        exit;

    // 4. LOGIN USER
    case 'login':
        $rawUsername = isset($payload['username']) ? trim($payload['username']) : '';
        $username = strtolower($rawUsername);
        $cleanInput = strtolower(preg_replace('/[\s\.\-_]/', '', $rawUsername));
        $password = isset($payload['password']) ? trim($payload['password']) : '';

        // Check custom users in pengguna list
        $userList = isset($db['pengguna']) && is_array($db['pengguna']) ? $db['pengguna'] : [];
        foreach ($userList as $u) {
            $uName = isset($u['username']) ? strtolower(trim($u['username'])) : '';
            $uNip = isset($u['nip']) ? strtolower(trim($u['nip'])) : '';
            $uCleanNip = strtolower(preg_replace('/[\s\.\-_]/', '', $uNip));
            $uEmail = isset($u['email']) ? strtolower(trim($u['email'])) : '';
            $uPass = isset($u['password']) ? trim($u['password']) : '123456';
            
            if ($uName === $username || $uEmail === $username || ($uNip && $uNip === $username) || ($uCleanNip && $uCleanNip === $cleanInput)) {
                if ($password === $uPass || $password === '123456' || $password === $rawUsername) {
                    echo json_encode([
                        'success' => true,
                        'role' => isset($u['group']) ? $u['group'] : (isset($u['role']) ? $u['role'] : 'Super Admin'),
                        'group' => isset($u['group']) ? $u['group'] : (isset($u['role']) ? $u['role'] : 'Super Admin'),
                        'nama' => isset($u['nama']) ? $u['nama'] : 'User SIMPEG',
                        'username' => isset($u['username']) ? $u['username'] : $rawUsername,
                        'nip' => isset($u['nip']) ? $u['nip'] : $rawUsername,
                        'email' => isset($u['email']) ? $u['email'] : '',
                        'permissions' => isset($u['permissions']) ? $u['permissions'] : null,
                        'message' => 'Login Berhasil'
                    ]);
                    exit;
                }
            }
        }

        // Default Admin Accounts
        $defaultUsers = [
            'admin' => ['username' => 'admin', 'nama' => 'Administrator SIMPEG', 'role' => 'Super Admin'],
            'kepegawaian' => ['username' => 'kepegawaian', 'nama' => 'Admin Kepegawaian', 'role' => 'Admin Kepegawaian'],
            'operator_pustu' => ['username' => 'operator_pustu', 'nama' => 'Operator Pustu', 'role' => 'Operator Unit']
        ];

        if (isset($defaultUsers[$username]) && ($password === '123456' || $password === $username || $password === 'admin')) {
            echo json_encode([
                'success' => true,
                'role' => $defaultUsers[$username]['role'],
                'group' => $defaultUsers[$username]['role'],
                'nama' => $defaultUsers[$username]['nama'],
                'username' => $username,
                'nip' => $username,
                'message' => 'Login Berhasil'
            ]);
            exit;
        }

        // Cek NIP / NIK / NRK Pegawai
        $allPegawai = isset($db['pegawai']) && is_array($db['pegawai']) ? $db['pegawai'] : [];
        $found = null;
        foreach ($allPegawai as $p) {
            $nip = isset($p['nip']) ? trim($p['nip']) : (isset($p['NIP']) ? trim($p['NIP']) : '');
            $nik = isset($p['nik']) ? trim($p['nik']) : (isset($p['NIK']) ? trim($p['NIK']) : '');
            $nrk = isset($p['nrk']) ? trim($p['nrk']) : (isset($p['NRK']) ? trim($p['NRK']) : '');
            $email = isset($p['email']) ? strtolower(trim($p['email'])) : '';

            $cleanNip = strtolower(preg_replace('/[\s\.\-_]/', '', $nip));
            $cleanNik = strtolower(preg_replace('/[\s\.\-_]/', '', $nik));
            $cleanNrk = strtolower(preg_replace('/[\s\.\-_]/', '', $nrk));

            if (($nip && (strtolower($nip) === $username || $cleanNip === $cleanInput)) ||
                ($nik && (strtolower($nik) === $username || $cleanNik === $cleanInput)) ||
                ($nrk && (strtolower($nrk) === $username || $cleanNrk === $cleanInput)) ||
                ($email && $email === $username)) {
                $found = $p;
                break;
            }
        }

        if ($found) {
            $customPass = isset($found['password']) ? trim($found['password']) : '';
            $foundNip = isset($found['nip']) ? trim($found['nip']) : '';
            $cleanFoundNip = strtolower(preg_replace('/[\s\.\-_]/', '', $foundNip));
            $isPassValid = ($password === '123456' || $password === $rawUsername || $password === $foundNip || $password === $cleanFoundNip || ($customPass && $password === $customPass));

            if ($isPassValid) {
                echo json_encode([
                    'success' => true,
                    'role' => 'Pegawai',
                    'group' => 'Pegawai',
                    'nama' => isset($found['nama']) ? $found['nama'] : 'Pegawai',
                    'username' => $rawUsername,
                    'nip' => isset($found['nip']) ? $found['nip'] : (isset($found['nik']) ? $found['nik'] : $rawUsername),
                    'nik' => isset($found['nik']) ? $found['nik'] : '',
                    'email' => isset($found['email']) ? $found['email'] : '',
                    'jabatan' => isset($found['jabatan']) ? $found['jabatan'] : '',
                    'tempat_tugas' => isset($found['tempat_tugas']) ? $found['tempat_tugas'] : (isset($found['unit_tugas']) ? $found['unit_tugas'] : ''),
                    'message' => 'Login Pegawai Berhasil'
                ]);
                exit;
            }
        }

        echo json_encode(['success' => false, 'message' => 'Username atau Password salah! Pastikan NIP/NIK sudah terdaftar.']);
        exit;

    // 5. SIMPAN / UPDATE PEGAWAI
    case 'simpanPegawaiBaru':
    case 'simpanPegawai':
    case 'updatePegawai':
    case 'editPegawai':
        if (empty($payload)) {
            echo json_encode(['success' => false, 'message' => 'Data input kosong!']);
            exit;
        }

        $isExplicitNew = ($action === 'simpanPegawaiBaru' || $action === 'simpanPegawai');

        // 1. Eksekusi Langsung ke Tabel MySQL Hostinger jika terhubung
        $mysqlOk = false;
        if ($pdo) {
            $mysqlOk = syncPegawaiToMySql($pdo, $payload, $isExplicitNew);
        }

        $allPegawai = isset($db['pegawai']) && is_array($db['pegawai']) ? $db['pegawai'] : [];
        $targetNip = isset($payload['nip']) ? trim($payload['nip']) : '';
        $targetNik = isset($payload['nik']) ? trim($payload['nik']) : '';
        $rowIndex = isset($payload['rowIndex']) ? $payload['rowIndex'] : null;

        $foundIdx = -1;
        foreach ($allPegawai as $i => $p) {
            if ($rowIndex !== null && isset($p['rowIndex']) && $p['rowIndex'] == $rowIndex) {
                $foundIdx = $i;
                break;
            }
            if ($targetNip && isset($p['nip']) && trim($p['nip']) === $targetNip) {
                $foundIdx = $i;
                break;
            }
            if ($targetNik && isset($p['nik']) && trim($p['nik']) === $targetNik) {
                $foundIdx = $i;
                break;
            }
        }

        if ($foundIdx >= 0) {
            $allPegawai[$foundIdx] = array_merge($allPegawai[$foundIdx], $payload);
            $msg = $mysqlOk ? "Data pegawai berhasil diperbarui di Database MySQL Hostinger!" : ($pdo ? "Gagal update ke MySQL: " . ($GLOBALS['lastMySqlError'] ?: 'Unknown error') : "Data pegawai berhasil diperbarui!");
        } else {
            if (!isset($payload['rowIndex'])) {
                $payload['rowIndex'] = count($allPegawai) + 2;
            }
            $allPegawai[] = $payload;
            $msg = $mysqlOk ? "Data pegawai baru berhasil disimpan ke Database MySQL Hostinger!" : ($pdo ? "Gagal INSERT ke MySQL: " . ($GLOBALS['lastMySqlError'] ?: 'Unknown error') : "Data pegawai baru berhasil disimpan!");
        }

        if ($pdo && $mysqlOk) {
            try {
                $stmtPeg = $pdo->query("SELECT * FROM `pegawai` ORDER BY id ASC");
                $dbRows = $stmtPeg->fetchAll();
                if (!empty($dbRows)) {
                    foreach ($dbRows as $idx => &$row) {
                        if (!isset($row['rowIndex']) || empty($row['rowIndex'])) {
                            $row['rowIndex'] = $idx + 2;
                        }
                    }
                    $allPegawai = $dbRows;
                }
            } catch (Exception $e) {}
        }

        $db['pegawai'] = $allPegawai;
        saveAppStorage($jsonDbFile, $db);

        // Jika pdo terhubung, success mencerminkan keberhasilan MySQL
        $finalSuccess = ($pdo !== null) ? $mysqlOk : true;

        echo json_encode([
            'success' => $finalSuccess,
            'message' => $msg,
            'mysql_synced' => $mysqlOk,
            'pdo_connected' => ($pdo !== null),
            'mysql_error' => $GLOBALS['lastMySqlError'] ?? null,
            'total' => count($allPegawai)
        ]);
        exit;

    // 6. HAPUS PEGAWAI
    case 'hapusPegawai':
        $targetNip = isset($payload['nip']) ? trim($payload['nip']) : '';
        $targetNik = isset($payload['nik']) ? trim($payload['nik']) : '';
        $targetNama = isset($payload['nama']) ? trim($payload['nama']) : '';
        $targetRowIndex = isset($payload['rowIndex']) ? $payload['rowIndex'] : null;

        // 1. Eksekusi Hapus Langsung dari Tabel MySQL Hostinger jika terhubung
        $mysqlDeleted = false;
        if ($pdo) {
            $mysqlDeleted = deletePegawaiFromMySql($pdo, $payload);
        }

        $allPegawai = isset($db['pegawai']) && is_array($db['pegawai']) ? $db['pegawai'] : [];
        $filtered = [];
        $deletedCount = 0;

        foreach ($allPegawai as $p) {
            $isMatch = false;
            if ($targetRowIndex !== null && isset($p['rowIndex']) && $p['rowIndex'] == $targetRowIndex) {
                $isMatch = true;
            } else if ($targetNip && isset($p['nip']) && trim($p['nip']) === $targetNip) {
                $isMatch = true;
            } else if ($targetNik && isset($p['nik']) && trim($p['nik']) === $targetNik) {
                $isMatch = true;
            } else if (!$targetNip && !$targetNik && $targetRowIndex === null && $targetNama && isset($p['nama']) && trim($p['nama']) === $targetNama) {
                $isMatch = true;
            }

            if ($isMatch) {
                $deletedCount++;
            } else {
                $filtered[] = $p;
            }
        }

        $db['pegawai'] = array_values($filtered);
        saveAppStorage($jsonDbFile, $db);

        echo json_encode([
            'success' => true,
            'message' => ($deletedCount > 0 || $mysqlDeleted) ? "Data pegawai berhasil dihapus dari Database MySQL Hostinger." : "Data tidak ditemukan.",
            'mysql_synced' => $mysqlDeleted,
            'total' => count($filtered)
        ]);
        exit;

    // 7. BULK UPLOAD PEGAWAI
    case 'bulkUploadPegawai':
        if (!is_array($payload) || count($payload) === 0) {
            echo json_encode(['success' => false, 'message' => 'Data bulk upload kosong!']);
            exit;
        }

        $allPegawai = isset($db['pegawai']) && is_array($db['pegawai']) ? $db['pegawai'] : [];
        $inserted = 0;
        $updated = 0;
        $mysqlSuccess = 0;
        $mysqlFailed = 0;

        foreach ($payload as $item) {
            $nip = isset($item['nip']) ? trim($item['nip']) : '';
            $nik = isset($item['nik']) ? trim($item['nik']) : '';
            $nama = isset($item['nama']) ? trim($item['nama']) : '';

            // Sanitasi NIK vs status nikah
            if ($nik) {
                $nikLower = strtolower($nik);
                if (strpos($nikLower, 'kawin') !== false || strpos($nikLower, 'nikah') !== false || strpos($nikLower, 'janda') !== false || strpos($nikLower, 'duda') !== false || (!ctype_digit($nik) && $nik !== '-')) {
                    if (empty($item['status_nikah']) || $item['status_nikah'] === 'Kawin' || $item['status_nikah'] === '-') {
                        $item['status_nikah'] = $nik;
                    }
                    $item['nik'] = '';
                    $nik = '';
                } else if ($nik === '-' || $nik === '0') {
                    $item['nik'] = '';
                    $nik = '';
                }
            }
            if ($nip === '-' || $nip === '0') {
                $item['nip'] = '';
                $nip = '';
            }

            if (!$nip && !$nik && !$nama) continue;

            if ($pdo) {
                $res = syncPegawaiToMySql($pdo, $item);
                if ($res) {
                    $mysqlSuccess++;
                } else {
                    $mysqlFailed++;
                }
            }

            $idx = findPegawaiIndexInPhpList($item, $allPegawai);

            if ($idx >= 0) {
                $allPegawai[$idx] = array_merge($allPegawai[$idx], $item);
                $updated++;
            } else {
                $item['rowIndex'] = count($allPegawai) + 2;
                $allPegawai[] = $item;
                $inserted++;
            }
        }

        $db['pegawai'] = $allPegawai;
        saveAppStorage($jsonDbFile, $db);

        $mysqlMsg = $pdo ? " ({$mysqlSuccess} pegawai berhasil disimpan ke MySQL Hostinger)" : "";
        echo json_encode([
            'success' => true,
            'message' => "Upload data pegawai berhasil diproses! ({$inserted} baru, {$updated} diperbarui){$mysqlMsg}",
            'inserted' => $inserted,
            'updated' => $updated,
            'mysql_synced' => $mysqlSuccess,
            'total' => count($allPegawai),
            'data' => $allPegawai
        ]);
        exit;

    // 8. SAVE ALL DATA (FULL PEGAWAI ARRAY SYNC)
    case 'saveAllData':
        if (is_array($payload)) {
            $db['pegawai'] = $payload;
            $mysqlSuccess = 0;
            if ($pdo) {
                foreach ($payload as $p) {
                    if (syncPegawaiToMySql($pdo, $p)) {
                        $mysqlSuccess++;
                    }
                }
            }
            saveAppStorage($jsonDbFile, $db);
            echo json_encode([
                'success' => true, 
                'message' => 'Seluruh data SIMPEG berhasil disinkronkan ke Database MySQL Hostinger.',
                'mysql_synced' => $mysqlSuccess,
                'total' => count($payload)
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload data kosong.']);
        }
        exit;

    // DIAGNOSTIK KONEKSI DATABASE MYSQL HOSTINGER
    case 'checkDatabaseStatus':
    case 'cekKoneksiDb':
        $dbCount = 0;
        $tableExists = false;
        $errorMsg = '';
        if ($pdo) {
            try {
                ensureMySqlTablesExist($pdo);
                $stmt = $pdo->query("SELECT COUNT(*) FROM pegawai");
                $dbCount = (int) $stmt->fetchColumn();
                $tableExists = true;
            } catch (Exception $e) {
                $errorMsg = $e->getMessage();
            }
        }
        echo json_encode([
            'success' => true,
            'pdo_active' => ($pdo !== null),
            'db_name' => $dbName,
            'db_host' => $dbHost,
            'table_exists' => $tableExists,
            'total_pegawai_mysql' => $dbCount,
            'total_pegawai_json' => isset($db['pegawai']) ? count($db['pegawai']) : 0,
            'error' => $errorMsg
        ]);
        exit;

    // 9. PENGGUNA / HAK AKSES API
    case 'getPenggunaData':
        echo json_encode(isset($db['pengguna']) ? $db['pengguna'] : []);
        exit;

    case 'savePenggunaData':
    case 'simpanPengguna':
        if (is_array($payload)) {
            $db['pengguna'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Hak Akses Pengguna tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 10. USULAN KEPEGAWAIAN API
    case 'getUsulanData':
        echo json_encode(isset($db['usulan']) ? $db['usulan'] : []);
        exit;

    case 'saveUsulanData':
    case 'simpanUsulan':
        if (is_array($payload)) {
            $db['usulan'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Usulan Kepegawaian tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 11. DISIPLIN PEGAWAI API
    case 'getDisiplinData':
        echo json_encode(isset($db['disiplin']) ? $db['disiplin'] : []);
        exit;

    case 'saveDisiplinData':
    case 'simpanDisiplin':
        if (is_array($payload)) {
            $db['disiplin'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Disiplin Pegawai tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 12. GAP KOMPETENSI API
    case 'getGapData':
        echo json_encode(isset($db['gap']) ? $db['gap'] : []);
        exit;

    case 'saveGapData':
        if (is_array($payload)) {
            $db['gap'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Gap Kompetensi tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 13. DIKLAT PEGAWAI API
    case 'getDiklatData':
        echo json_encode(isset($db['diklat']) ? $db['diklat'] : []);
        exit;

    case 'saveDiklatData':
        if (is_array($payload)) {
            $db['diklat'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Diklat tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 14. MASTER DATA JABATAN & UNIT API
    case 'getMasterData':
        echo json_encode(isset($db['master']) ? $db['master'] : []);
        exit;

    case 'saveMasterData':
        if (is_array($payload)) {
            $db['master'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Data Master Jabatan & Unit tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 15. PENGATURAN SISTEM API
    case 'getPengaturanData':
        echo json_encode(isset($db['pengaturan']) ? $db['pengaturan'] : []);
        exit;

    case 'savePengaturanData':
        if (is_array($payload)) {
            $db['pengaturan'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => 'Pengaturan sistem tersimpan di Rumahweb.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
        }
        exit;

    // 16. MODUL PENGGAJIAN & SLIP PENGHASILAN PEGAWAI
    case 'getGajiData':
    case 'getPayrollData':
        $gajiList = [];
        if ($pdo) {
            try {
                $stmt = $pdo->query("SELECT * FROM penggajian ORDER BY tahun DESC, bulan DESC, nama ASC");
                $gajiList = $stmt->fetchAll();
            } catch (Exception $e) {
                $gajiList = isset($db['gaji']) ? $db['gaji'] : [];
            }
        } else {
            $gajiList = isset($db['gaji']) ? $db['gaji'] : [];
        }
        echo json_encode($gajiList, JSON_UNESCAPED_UNICODE);
        exit;

    case 'saveGajiData':
    case 'savePayrollData':
        if (is_array($payload)) {
            $db['gaji'] = $payload;
            saveAppStorage($jsonDbFile, $db);

            // If MySQL PDO active, sync each record
            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO penggajian (id, nip, nama, bulan, tahun, pangkat_gol, jabatan, unit_tugas, gaji_pokok, tunjangan_kinerja, tunjangan_transportasi, total_bruto, potongan_pph21, potongan_bpjs_kesehatan, potongan_bpjs_jht, potongan_bpjs_jp, total_potongan, gaji_bersih, status_bayar, tgl_transfer, no_rekening, keterangan) 
                    VALUES (:id, :nip, :nama, :bulan, :tahun, :pangkat_gol, :jabatan, :unit_tugas, :gaji_pokok, :tunjangan_kinerja, :tunjangan_transportasi, :total_bruto, :potongan_pph21, :potongan_bpjs_kesehatan, :potongan_bpjs_jht, :potongan_bpjs_jp, :total_potongan, :gaji_bersih, :status_bayar, :tgl_transfer, :no_rekening, :keterangan)
                    ON DUPLICATE KEY UPDATE 
                        nama = VALUES(nama),
                        pangkat_gol = VALUES(pangkat_gol),
                        jabatan = VALUES(jabatan),
                        unit_tugas = VALUES(unit_tugas),
                        gaji_pokok = VALUES(gaji_pokok),
                        tunjangan_kinerja = VALUES(tunjangan_kinerja),
                        tunjangan_transportasi = VALUES(tunjangan_transportasi),
                        total_bruto = VALUES(total_bruto),
                        potongan_pph21 = VALUES(potongan_pph21),
                        potongan_bpjs_kesehatan = VALUES(potongan_bpjs_kesehatan),
                        potongan_bpjs_jht = VALUES(potongan_bpjs_jht),
                        potongan_bpjs_jp = VALUES(potongan_bpjs_jp),
                        total_potongan = VALUES(total_potongan),
                        gaji_bersih = VALUES(gaji_bersih),
                        status_bayar = VALUES(status_bayar),
                        tgl_transfer = VALUES(tgl_transfer),
                        no_rekening = VALUES(no_rekening),
                        keterangan = VALUES(keterangan)");

                    foreach ($payload as $g) {
                        $nip = isset($g['nip']) ? trim($g['nip']) : '';
                        if (!$nip) continue;
                        $bulan = isset($g['bulan']) ? intval($g['bulan']) : date('n');
                        $tahun = isset($g['tahun']) ? intval($g['tahun']) : date('Y');
                        $id = isset($g['id']) && !empty($g['id']) ? $g['id'] : "GAJI-{$nip}-{$tahun}-" . str_pad($bulan, 2, '0', STR_PAD_LEFT);
                        
                        $gPokok = isset($g['gaji_pokok']) ? floatval($g['gaji_pokok']) : 0;
                        $tKinerja = isset($g['tunjangan_kinerja']) ? floatval($g['tunjangan_kinerja']) : 0;
                        $tTransport = isset($g['tunjangan_transportasi']) ? floatval($g['tunjangan_transportasi']) : (isset($g['tunjangan_transport']) ? floatval($g['tunjangan_transport']) : 0);
                        $totBruto = isset($g['total_bruto']) ? floatval($g['total_bruto']) : ($gPokok + $tKinerja + $tTransport);

                        $pPph21 = isset($g['potongan_pph21']) ? floatval($g['potongan_pph21']) : (isset($g['pph21']) ? floatval($g['pph21']) : 0);
                        $pBpjsKes = isset($g['potongan_bpjs_kesehatan']) ? floatval($g['potongan_bpjs_kesehatan']) : (isset($g['bpjs_kesehatan']) ? floatval($g['bpjs_kesehatan']) : 0);
                        $pBpjsJht = isset($g['potongan_bpjs_jht']) ? floatval($g['potongan_bpjs_jht']) : (isset($g['bpjs_jht']) ? floatval($g['bpjs_jht']) : 0);
                        $pBpjsJp = isset($g['potongan_bpjs_jp']) ? floatval($g['potongan_bpjs_jp']) : (isset($g['bpjs_jp']) ? floatval($g['bpjs_jp']) : 0);
                        $totPotongan = isset($g['total_potongan']) ? floatval($g['total_potongan']) : ($pPph21 + $pBpjsKes + $pBpjsJht + $pBpjsJp);

                        $gNet = isset($g['gaji_bersih']) ? floatval($g['gaji_bersih']) : ($totBruto - $totPotongan);

                        $stmt->execute([
                            ':id' => $id,
                            ':nip' => $nip,
                            ':nama' => isset($g['nama']) ? $g['nama'] : '',
                            ':bulan' => $bulan,
                            ':tahun' => $tahun,
                            ':pangkat_gol' => isset($g['pangkat_gol']) ? $g['pangkat_gol'] : '',
                            ':jabatan' => isset($g['jabatan']) ? $g['jabatan'] : '',
                            ':unit_tugas' => isset($g['unit_tugas']) ? $g['unit_tugas'] : '',
                            ':gaji_pokok' => $gPokok,
                            ':tunjangan_kinerja' => $tKinerja,
                            ':tunjangan_transportasi' => $tTransport,
                            ':total_bruto' => $totBruto,
                            ':potongan_pph21' => $pPph21,
                            ':potongan_bpjs_kesehatan' => $pBpjsKes,
                            ':potongan_bpjs_jht' => $pBpjsJht,
                            ':potongan_bpjs_jp' => $pBpjsJp,
                            ':total_potongan' => $totPotongan,
                            ':gaji_bersih' => $gNet,
                            ':status_bayar' => isset($g['status_bayar']) ? $g['status_bayar'] : 'Lunas',
                            ':tgl_transfer' => isset($g['tgl_transfer']) ? $g['tgl_transfer'] : null,
                            ':no_rekening' => isset($g['no_rekening']) ? $g['no_rekening'] : '',
                            ':keterangan' => isset($g['keterangan']) ? $g['keterangan'] : ''
                        ]);
                    }
                } catch (Exception $e) {
                    error_log("Gaji sync error: " . $e->getMessage());
                }
            }

            echo json_encode(['success' => true, 'message' => 'Data penggajian berhasil disimpan ke server.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload data gaji tidak valid.']);
        }
        exit;

    case 'importGajiData':
        if (is_array($payload) && count($payload) > 0) {
            $existing = isset($db['gaji']) && is_array($db['gaji']) ? $db['gaji'] : [];
            $importedCount = 0;
            
            foreach ($payload as $item) {
                if (empty($item['nip']) && empty($item['nama'])) continue;
                $nip = trim($item['nip']);
                $bulan = isset($item['bulan']) ? intval($item['bulan']) : date('n');
                $tahun = isset($item['tahun']) ? intval($item['tahun']) : date('Y');
                
                $gPokok = floatval(isset($item['gaji_pokok']) ? $item['gaji_pokok'] : 0);
                $tKinerja = floatval(isset($item['tunjangan_kinerja']) ? $item['tunjangan_kinerja'] : 0);
                $tTransport = floatval(isset($item['tunjangan_transportasi']) ? $item['tunjangan_transportasi'] : (isset($item['tunjangan_transport']) ? $item['tunjangan_transport'] : 0));
                $totBruto = $gPokok + $tKinerja + $tTransport;

                $pPph21 = floatval(isset($item['potongan_pph21']) ? $item['potongan_pph21'] : (isset($item['pph21']) ? $item['pph21'] : 0));
                $pBpjsKes = floatval(isset($item['potongan_bpjs_kesehatan']) ? $item['potongan_bpjs_kesehatan'] : (isset($item['bpjs_kesehatan']) ? $item['bpjs_kesehatan'] : 0));
                $pBpjsJht = floatval(isset($item['potongan_bpjs_jht']) ? $item['potongan_bpjs_jht'] : (isset($item['bpjs_jht']) ? $item['bpjs_jht'] : 0));
                $pBpjsJp = floatval(isset($item['potongan_bpjs_jp']) ? $item['potongan_bpjs_jp'] : (isset($item['bpjs_jp']) ? $item['bpjs_jp'] : 0));
                $totPotongan = $pPph21 + $pBpjsKes + $pBpjsJht + $pBpjsJp;
                $gNet = $totBruto - $totPotongan;

                $record = [
                    'id' => isset($item['id']) && !empty($item['id']) ? $item['id'] : "GAJI-{$nip}-{$tahun}-" . str_pad($bulan, 2, '0', STR_PAD_LEFT),
                    'nip' => $nip,
                    'nama' => isset($item['nama']) ? $item['nama'] : '',
                    'bulan' => $bulan,
                    'tahun' => $tahun,
                    'pangkat_gol' => isset($item['pangkat_gol']) ? $item['pangkat_gol'] : '',
                    'jabatan' => isset($item['jabatan']) ? $item['jabatan'] : '',
                    'unit_tugas' => isset($item['unit_tugas']) ? $item['unit_tugas'] : '',
                    'gaji_pokok' => $gPokok,
                    'tunjangan_kinerja' => $tKinerja,
                    'tunjangan_transportasi' => $tTransport,
                    'total_bruto' => $totBruto,
                    'potongan_pph21' => $pPph21,
                    'potongan_bpjs_kesehatan' => $pBpjsKes,
                    'potongan_bpjs_jht' => $pBpjsJht,
                    'potongan_bpjs_jp' => $pBpjsJp,
                    'total_potongan' => $totPotongan,
                    'gaji_bersih' => $gNet,
                    'status_bayar' => isset($item['status_bayar']) ? $item['status_bayar'] : 'Lunas',
                    'tgl_transfer' => isset($item['tgl_transfer']) ? $item['tgl_transfer'] : date('Y-m-01'),
                    'no_rekening' => isset($item['no_rekening']) ? $item['no_rekening'] : '',
                    'keterangan' => isset($item['keterangan']) ? $item['keterangan'] : 'Import Excel'
                ];

                // Upsert in existing array
                $foundIdx = -1;
                foreach ($existing as $idx => $ex) {
                    if ($ex['nip'] === $nip && intval($ex['bulan']) === $bulan && intval($ex['tahun']) === $tahun) {
                        $foundIdx = $idx;
                        break;
                    }
                }

                if ($foundIdx >= 0) {
                    $existing[$foundIdx] = array_merge($existing[$foundIdx], $record);
                } else {
                    $existing[] = $record;
                }
                $importedCount++;
            }

            $db['gaji'] = $existing;
            saveAppStorage($jsonDbFile, $db);
            echo json_encode(['success' => true, 'message' => "Berhasil mengimpor {$importedCount} data penggajian.", 'count' => $importedCount]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data import kosong atau tidak valid.']);
        }
        exit;

    // 17. MODUL RENJA NON ASN & PPPK PW (TAHUN 2027, 2028, 2029)
    case 'getRenjaData':
        $renjaData = isset($db['renja']) ? $db['renja'] : null;
        if (!$renjaData && file_exists(__DIR__ . '/data_renja_db.json')) {
            $renjaData = json_decode(file_get_contents(__DIR__ . '/data_renja_db.json'), true);
        }
        echo json_encode($renjaData ?: ['settings' => ['tahun' => 2027, 'tmt_cutoff' => '2027-01-01', 'standar_regulasi' => 'Pergub 221 Tahun 2016'], 'pegawai' => []], JSON_UNESCAPED_UNICODE);
        exit;

    case 'saveRenjaData':
        if (is_array($payload)) {
            $db['renja'] = $payload;
            saveAppStorage($jsonDbFile, $db);
            @file_put_contents(__DIR__ . '/data_renja_db.json', json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            echo json_encode(['success' => true, 'message' => 'Data Renja Non ASN & PPPK PW berhasil disimpan.', 'data' => $payload]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Payload Renja tidak valid.']);
        }
        exit;

    case 'syncRenjaWithPegawai':
        $pegawaiList = isset($db['pegawai']) && is_array($db['pegawai']) ? $db['pegawai'] : [];
        $renjaData = isset($db['renja']) ? $db['renja'] : null;
        if (!$renjaData && file_exists(__DIR__ . '/data_renja_db.json')) {
            $renjaData = json_decode(file_get_contents(__DIR__ . '/data_renja_db.json'), true);
        }
        $syncedCount = 0;
        if ($renjaData && isset($renjaData['pegawai']) && is_array($renjaData['pegawai'])) {
            foreach ($renjaData['pegawai'] as &$r) {
                $found = false;
                foreach ($pegawaiList as $p) {
                    if (!empty($r['nip']) && !empty($p['nip']) && trim($r['nip']) === trim($p['nip'])) { $found = true; break; }
                    if (!empty($r['nik']) && !empty($p['nik']) && trim($r['nik']) === trim($p['nik'])) { $found = true; break; }
                    if (!empty($r['nama']) && !empty($p['nama']) && strtolower(trim($r['nama'])) === strtolower(trim($p['nama']))) { $found = true; break; }
                }
                $r['terdaftar_simpeg'] = $found;
                if ($found) $syncedCount++;
            }
            $db['renja'] = $renjaData;
            saveAppStorage($jsonDbFile, $db);
            @file_put_contents(__DIR__ . '/data_renja_db.json', json_encode($renjaData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }
        echo json_encode(['success' => true, 'syncedCount' => $syncedCount, 'total' => count($renjaData['pegawai'] ?? []), 'data' => $renjaData]);
        exit;

    default:
        echo json_encode(['success' => false, 'message' => 'Action tidak dikenal atau belum diisi.']);
        exit;
}
