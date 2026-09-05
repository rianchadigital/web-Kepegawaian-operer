<?php
/**
 * ============================================================
 * SCRIPT DIAGNOSIS & TEST KONEKSI DATABASE HOSTINGER
 * Akses di browser: https://domain-anda.com/test_koneksi.php
 * ============================================================
 */

header('Content-Type: text/html; charset=utf-8');

$configFile = __DIR__ . '/config.php';
$configExists = file_exists($configFile);

$dbHost = 'localhost';
$dbPort = '3306';
$dbName = 'u133879636_dbsimpegkawan';
$dbUser = 'u133879636_simpegkawan';
$dbPass = 'Simpegkawan2026';

if ($configExists) {
    include_once $configFile;
}

$phpVersion = phpversion();
$pdoLoaded = extension_loaded('pdo');
$pdoMysqlLoaded = extension_loaded('pdo_mysql');

$connectionStatus = false;
$errorMessage = '';
$tablesFound = [];
$totalPegawai = 0;

if ($pdoLoaded && $pdoMysqlLoaded && !empty($dbName)) {
    try {
        $port = isset($dbPort) ? $dbPort : '3306';
        $pdo = new PDO("mysql:host={$dbHost};port={$port};dbname={$dbName};charset=utf8mb4", $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO_ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO_FETCH_ASSOC
        ]);
        $connectionStatus = true;

        // Cek Tabel yang ada
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_NUM);
        foreach ($tables as $t) {
            $tablesFound[] = $t[0];
        }

        // Cek jumlah data pegawai jika tabel ada
        if (in_array('pegawai', $tablesFound)) {
            $stmtCount = $pdo->query("SELECT COUNT(*) as total FROM pegawai");
            $res = $stmtCount->fetch();
            $totalPegawai = $res['total'];
        }
    } catch (PDOException $e) {
        $connectionStatus = false;
        $errorMessage = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Koneksi Database Hostinger - SIMPEG PKSS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { background-color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
        .card-custom { border-radius: 16px; border: none; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    </style>
</head>
<body class="py-5">
<div class="container" style="max-width: 760px;">
    <div class="card card-custom p-4 p-md-5 bg-white">
        <div class="d-flex align-items-center mb-4">
            <div class="p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                <i class="fas fa-database fa-2x"></i>
            </div>
            <div>
                <h4 class="mb-1 fw-bold text-dark">Tes Koneksi Database Hostinger</h4>
                <p class="text-muted mb-0">Sistem Informasi Kepegawaian (SIMPEG Digital)</p>
            </div>
        </div>

        <!-- Status Koneksi MySQL -->
        <div class="mb-4">
            <label class="fw-semibold text-secondary small text-uppercase mb-2">Status Koneksi MySQL</label>
            <?php if ($connectionStatus): ?>
                <div class="alert alert-success d-flex align-items-center" role="alert">
                    <i class="fas fa-check-circle fa-2x me-3"></i>
                    <div>
                        <h6 class="alert-heading fw-bold mb-1">Koneksi Berhasil Terhubung ke Hostinger MySQL!</h6>
                        <p class="mb-0 small">Database <strong><?= htmlspecialchars($dbName) ?></strong> pada host <strong><?= htmlspecialchars($dbHost) ?></strong> berhasil diakses.</p>
                    </div>
                </div>
            <?php else: ?>
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <i class="fas fa-times-circle fa-2x me-3"></i>
                    <div>
                        <h6 class="alert-heading fw-bold mb-1">Koneksi Database Belum Terhubung</h6>
                        <p class="mb-0 small">
                            <?= !empty($errorMessage) ? htmlspecialchars($errorMessage) : 'Silakan buka file <code>config.php</code> dan lengkapi konfigurasi database Hostinger Anda.' ?>
                        </p>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <!-- Detail Konfigurasi -->
        <div class="card bg-light border-0 p-3 mb-4 rounded-3">
            <h6 class="fw-bold mb-3 text-secondary">Parameter Konfigurasi Aktif (config.php)</h6>
            <div class="row g-2 small">
                <div class="col-sm-4 text-muted">File config.php:</div>
                <div class="col-sm-8 fw-semibold"><?= $configExists ? '<span class="text-success"><i class="fas fa-check"></i> Ditemukan</span>' : '<span class="text-danger"><i class="fas fa-times"></i> Tidak Ditemukan</span>' ?></div>

                <div class="col-sm-4 text-muted">DB Host:</div>
                <div class="col-sm-8 fw-semibold font-monospace"><?= htmlspecialchars($dbHost) ?></div>

                <div class="col-sm-4 text-muted">DB Name:</div>
                <div class="col-sm-8 fw-semibold font-monospace"><?= htmlspecialchars($dbName) ?></div>

                <div class="col-sm-4 text-muted">DB User:</div>
                <div class="col-sm-8 fw-semibold font-monospace"><?= htmlspecialchars($dbUser) ?></div>

                <div class="col-sm-4 text-muted">PHP Version:</div>
                <div class="col-sm-8 fw-semibold font-monospace"><?= $phpVersion ?> (PDO MySQL: <?= $pdoMysqlLoaded ? 'Aktif' : 'Tidak Aktif' ?>)</div>
            </div>
        </div>

        <?php if ($connectionStatus): ?>
            <!-- Tabel yang ditemukan -->
            <div class="mb-4">
                <h6 class="fw-bold mb-2">Tabel Database yang Ditemukan (<?= count($tablesFound) ?> Tabel):</h6>
                <?php if (!empty($tablesFound)): ?>
                    <div class="d-flex flex-wrap gap-2">
                        <?php foreach ($tablesFound as $tbl): ?>
                            <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1"><?= htmlspecialchars($tbl) ?></span>
                        <?php endforeach; ?>
                    </div>
                    <?php if (in_array('pegawai', $tablesFound)): ?>
                        <div class="mt-3 p-2 px-3 bg-white border rounded small text-success fw-semibold">
                            <i class="fas fa-users me-1"></i> Data Pegawai dalam tabel <code>pegawai</code>: <?= $totalPegawai ?> data
                        </div>
                    <?php endif; ?>
                <?php else: ?>
                    <div class="alert alert-warning small mb-0">
                        <i class="fas fa-exclamation-triangle me-1"></i> Database kosong (belum ada tabel). Silakan import file <code>database_simpeg.sql</code> melalui phpMyAdmin di Hostinger hPanel.
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="border-top pt-3 text-center">
            <a href="index.html" class="btn btn-outline-primary btn-sm px-4 me-2"><i class="fas fa-home me-1"></i> Buka Aplikasi SIMPEG</a>
            <a href="test_koneksi.php" class="btn btn-secondary btn-sm px-4"><i class="fas fa-sync-alt me-1"></i> Uji Ulang Koneksi</a>
        </div>
    </div>
</div>
</body>
</html>
