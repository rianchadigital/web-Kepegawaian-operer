<?php
/**
 * ============================================================
 * KONFIGURASI DATABASE MYSQL - HOSTINGER / CPANEL HOSTING
 * SIMPEG DIGITAL - PUSKESMAS KEPULAUAN SERIBU SELATAN
 * ============================================================
 */

// 1. Kredensial Database Hostinger (hPanel / cPanel)
$dbHost = 'localhost';                  // Default di Hostinger adalah 'localhost'
$dbPort = '3306';                       // Port default MySQL
$dbName = 'u133879636_dbsimpeg';        // Nama Database Hostinger
$dbUser = 'u133879636_dbsimpeg';        // Username Database Hostinger
$dbPass = 'Simpeg@2027';                // Password Database Hostinger

// 2. Opsi Tambahan PDO
$dbCharset = 'utf8mb4';

/**
 * Fungsi pembantu untuk inisialisasi koneksi PDO ke database Hostinger
 * @return PDO|null
 */
function getHostingerConnection() {
    global $dbHost, $dbPort, $dbName, $dbUser, $dbPass, $dbCharset;
    
    // Jangan konek jika masih menggunakan nilai default/placeholder dummy
    if (empty($dbName) || $dbName === 'u123456789_simpeg_pkss') {
        return null;
    }

    try {
        $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset={$dbCharset}";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO_ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO_FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$dbCharset}"
        ]);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Hostinger MySQL Connection Error: " . $e->getMessage());
        return null;
    }
}
