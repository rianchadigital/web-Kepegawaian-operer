/**
 * Modul PAK Konversi (Penetapan Angka Kredit Konversi JF)
 * Puskesmas Kepulauan Seribu Selatan - SIMPEG Digital PKSS
 * Berdasarkan Regulasi PermenPAN-RB No. 1 Tahun 2023 & Acuan Master Data Angka Kredit JF
 * 
 * Menghasilkan & Mengelola 3 Dokumen Resmi:
 * 1. Konversi Predikat Kinerja ke Angka Kredit (Formulir Konversi Kinerja)
 * 2. Akumulasi Angka Kredit (Formulir Riwayat Akumulasi AK)
 * 3. Penetapan Angka Kredit (PAK) Kumulatif beserta Keterangan Syarat Kenaikan Pangkat & Jenjang
 */

(function() {
    'use strict';

    // KUNCI PENYIMPANAN LOCALSTORAGE
    const STORAGE_KEY_PAK = 'simpeg_pak_konversi_db';

    // DATA DEFAULT AWAL - PERSIS SEPERTI DOKUMEN RESMI HIKMAYANI, A.MD, KEP
    const DEFAULT_PAK_LIST = [
        {
            id: "PAK-2025-001",
            nomor_konversi: "115/KG.04.04",
            nomor_akumulasi: "116/KG.04.04",
            nomor_pak: "117/KG.04.04",
            instansi: "Dinas Kesehatan Provinsi DKI Jakarta",
            periode: "Januari s.d Desember 2025",
            // Data Pejabat Fungsional yang Dinilai
            nama: "Hikmayani, A.Md, Kep",
            nip_nrk: "198108072008012019 / 173803",
            nip: "198108072008012019",
            nrk: "173803",
            karpeg: "Q 131743",
            tempat_tgl_lahir: "Jakarta, 07 Agustus 1981",
            jenis_kelamin: "Perempuan",
            pendidikan: "D-III Keperawatan",
            pangkat_gol_tmt: "Penata Muda Tk.I (III/b) / 01.04.2023",
            pangkat: "Penata Muda Tk.I (III/b)",
            tmt_pangkat: "01.04.2023",
            jabatan_tmt: "Perawat Mahir / 03.02.2017",
            jabatan: "Perawat Mahir",
            tmt_jabatan: "03.02.2017",
            unit_kerja: "Puskesmas Kepulauan Seribu Selatan",
            instansi_pegawai: "Dinas Kesehatan Provinsi DKI Jakarta",
            
            // Konversi Kinerja (Dokumen 1)
            kategori_jf: "Keterampilan",
            jenjang_jf: "Mahir",
            predikat_kinerja: "Baik",
            persentase_kinerja: 100,
            koefisien_tahunan: 12.500,
            ak_kinerja_didapat: 12.500,

            // Akumulasi Riwayat (Dokumen 2)
            riwayat_akumulasi: [
                {
                    tahun: "2024",
                    periodik: "AK Konversi Lama",
                    predikat: "-",
                    persentase: "-",
                    koefisien: "-",
                    ak_didapat: 123.303
                },
                {
                    tahun: "2025",
                    periodik: "1 Januari - 31 Desember 2025",
                    predikat: "Baik",
                    persentase: "100%",
                    koefisien: "12,500",
                    ak_didapat: 12.500
                }
            ],
            ak_konversi_lama: 123.303,
            jumlah_ak_diperoleh: 135.803,

            // Penetapan Angka Kredit (Dokumen 3)
            ak_dasar_lama: 0.000,
            ak_dasar_baru: 0.000,
            ak_dasar_jumlah: 0.000,
            ak_jf_lama_lama: null,
            ak_jf_lama_baru: null,
            ak_jf_lama_jumlah: null,
            ak_penyesuaian_lama: null,
            ak_penyesuaian_baru: null,
            ak_penyesuaian_jumlah: null,
            ak_konversi_lama_pak: 0.000,
            ak_konversi_baru_pak: 135.803,
            ak_konversi_jumlah_pak: 135.803,
            ak_pendidikan_lama: null,
            ak_pendidikan_baru: null,
            ak_pendidikan_jumlah: null,
            jumlah_ak_kumulatif_lama: 0.000,
            jumlah_ak_kumulatif_baru: 135.803,
            jumlah_ak_kumulatif: 135.803,

            // Syarat Minimal Kenaikan (Acuan Master Data Angka Kredit JF)
            syarat_min_pangkat: 50.000,
            syarat_min_jenjang: 100.000,
            kelebihan_pangkat: 85.803,
            kelebihan_jenjang: 35.803,
            rekomendasi: "Dapat dipertimbangkan untuk Kenaikan Pangkat/ Jenjang Jabatan Setingkat Lebih Tinggi menjadi Perawat Penyelia Pangkat/Golongan Ruang Penata (III/c)",
            target_jenjang: "Perawat Penyelia",
            target_pangkat: "Penata (III/c)",

            // Penandatangan Pejabat Penilai Kinerja
            tempat_penetapan: "Jakarta",
            tanggal_penetapan: "2 Januari 2026",
            pejabat_penilai_nama: "dr. Ghamal Ahmad Pramana",
            pejabat_penilai_nip: "198312282010011018",
            pejabat_penilai_jabatan: "Pejabat Penilai Kinerja",

            status: "Ditetapkan",
            created_at: "2026-01-02"
        }
    ];

    // REFERENSI HIERARKI JENJANG & PANGKAT JF (ACUAN MASTER DATA PERMENPAN-RB 1/2023)
    const HIERARKI_JF = {
        // Keterampilan
        'Pemula': {
            kategori: 'Keterampilan',
            pangkat: 'II/a',
            koefisien: 3.75,
            pangkat_min: 15,
            jenjang_min: 15,
            next_jenjang: 'Terampil',
            next_pangkat: 'Pengatur Muda Tk.I (II/b)'
        },
        'Terampil': {
            kategori: 'Keterampilan',
            pangkat: 'II/b – II/c – II/d',
            koefisien: 5.0,
            pangkat_min: 20,
            jenjang_min: 60,
            next_jenjang: 'Mahir',
            next_pangkat: 'Penata Muda (III/a)'
        },
        'Mahir': {
            kategori: 'Keterampilan',
            pangkat: 'III/a – III/b',
            koefisien: 12.5,
            pangkat_min: 50,
            jenjang_min: 100,
            next_jenjang: 'Penyelia',
            next_pangkat: 'Penata (III/c)'
        },
        'Penyelia': {
            kategori: 'Keterampilan',
            pangkat: 'III/c – III/d',
            koefisien: 25.0,
            pangkat_min: 100,
            jenjang_min: null,
            next_jenjang: null,
            next_pangkat: 'Penata Tk.I (III/d)'
        },

        // Keahlian
        'Ahli Pertama': {
            kategori: 'Keahlian',
            pangkat: 'III/a – III/b',
            koefisien: 12.5,
            pangkat_min: 50,
            jenjang_min: 100,
            next_jenjang: 'Ahli Muda',
            next_pangkat: 'Penata (III/c)'
        },
        'Ahli Muda': {
            kategori: 'Keahlian',
            pangkat: 'III/c – III/d',
            koefisien: 25.0,
            pangkat_min: 100,
            jenjang_min: 200,
            next_jenjang: 'Ahli Madya',
            next_pangkat: 'Pembina (IV/a)'
        },
        'Ahli Madya': {
            kategori: 'Keahlian',
            pangkat: 'IV/a – IV/b – IV/c',
            koefisien: 37.5,
            pangkat_min: 150,
            jenjang_min: 450,
            next_jenjang: 'Ahli Utama',
            next_pangkat: 'Pembina Utama Madya (IV/d)'
        },
        'Ahli Utama': {
            kategori: 'Keahlian',
            pangkat: 'IV/d – IV/e',
            koefisien: 50.0,
            pangkat_min: 200,
            jenjang_min: null,
            next_jenjang: null,
            next_pangkat: 'Pembina Utama (IV/e)'
        }
    };

    // State Modul
    let pakList = [];
    let currentPakId = null;
    let activeDocTab = 1; // 1 = Konversi, 2 = Akumulasi, 3 = PAK

    // Helper format desimal 3 digit (standar BKN / PermenPAN)
    function formatAk3(val) {
        if (val === null || val === undefined || val === '') return '-';
        if (typeof val === 'string' && val.trim() === '-') return '-';
        const num = parseFloat(val);
        if (isNaN(num)) return '-';
        return num.toLocaleString('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    }

    // Helper format desimal umum
    function formatAkDes(val) {
        if (val === null || val === undefined || val === '') return '-';
        if (typeof val === 'string' && val.trim() === '-') return '-';
        const num = parseFloat(val);
        if (isNaN(num)) return '-';
        return num.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
    }

    // Load Data dari LocalStorage
    function loadPakData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_PAK);
            if (raw) {
                pakList = JSON.parse(raw);
                if (!Array.isArray(pakList) || pakList.length === 0) {
                    pakList = JSON.parse(JSON.stringify(DEFAULT_PAK_LIST));
                    savePakData();
                } else {
                    // Pastikan tempat penetapan adalah 'Jakarta' (bukan Pulau Panggang)
                    let updated = false;
                    pakList.forEach(item => {
                        if (!item.tempat_penetapan || item.tempat_penetapan.toLowerCase().includes('panggang')) {
                            item.tempat_penetapan = 'Jakarta';
                            updated = true;
                        }
                    });
                    if (updated) savePakData();
                }
            } else {
                pakList = JSON.parse(JSON.stringify(DEFAULT_PAK_LIST));
                savePakData();
            }
        } catch (e) {
            console.error("Error loading PAK data:", e);
            pakList = JSON.parse(JSON.stringify(DEFAULT_PAK_LIST));
        }

        if (!currentPakId && pakList.length > 0) {
            currentPakId = pakList[0].id;
        }
    }

    // Simpan Data ke LocalStorage
    function savePakData() {
        try {
            localStorage.setItem(STORAGE_KEY_PAK, JSON.stringify(pakList));
        } catch (e) {
            console.error("Error saving PAK data:", e);
        }
    }

    // Dapatkan data PAK aktif saat ini
    function getCurrentPak() {
        if (!Array.isArray(pakList) || pakList.length === 0) return null;
        if (!currentPakId || !pakList.some(p => p.id === currentPakId)) {
            currentPakId = pakList[0].id;
        }
        const item = pakList.find(p => p.id === currentPakId) || pakList[0] || null;
        if (item && (!item.tempat_penetapan || item.tempat_penetapan.toLowerCase().includes('panggang'))) {
            item.tempat_penetapan = 'Jakarta';
        }
        return item;
    }

    // RUANG TANDA TANGAN KOSONG (UNTUK TANDA TANGAN BASAH MANUAL - STEMPEL DIHAPUS)
    function getOfficialStampSignatureHtml() {
        return `
            <!-- Ruang Kosong Tanda Tangan Basah Manual (Stempel Dihapus) -->
            <div style="height: 60px; min-height: 60px; margin: 4px 0;"></div>
        `;
    }

    // KOP SURAT RESMI (SESUAI DOKUMEN PENETAPAN SUKU DINAS KESEHATAN KAB. ADM. KEPULAUAN SERIBU)
    function getOfficialKopHtml() {
        return `
            <div class="official-kop text-center" style="text-align: center; margin-bottom: 16px; padding-bottom: 2px;">
                <div style="text-align: center; margin-bottom: 8px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Coat_of_arms_of_Jakarta.svg" 
                         style="width: 76px; height: auto; display: inline-block; filter: grayscale(100%) contrast(120%);" 
                         alt="Lambang Jaya Raya DKI Jakarta" 
                         onerror="this.onerror=null; this.src='/assets/jaya-raya.svg';">
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: bold; line-height: 1.35; color: #000; letter-spacing: 0.2px; text-align: center; text-transform: uppercase;">
                    SUKU DINAS KESEHATAN KABUPATEN ADMINISTRASI KEPULAUAN SERIBU<br>
                    DINAS KESEHATAN<br>
                    PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
                </div>
            </div>
        `;
    }

    // RENDER DOKUMEN 1: KONVERSI PREDIKAT KINERJA KE ANGKA KREDIT (NOMOR: 115/KG.04.04)
    function renderDoc1Html(pak) {
        if (!pak) return '<div class="alert alert-warning">Data PAK tidak ditemukan.</div>';

        return `
            <div class="official-paper bg-white text-dark shadow-sm mx-auto position-relative" style="width: 100%; max-width: 840px; padding: 22px 32px; font-family: 'Arial', sans-serif; font-size: 9pt; line-height: 1.32; border: 1px solid #cbd5e1; border-radius: 4px; color: #000;">
                <!-- KOP SURAT -->
                ${getOfficialKopHtml()}

                <!-- JUDUL SURAT -->
                <div class="text-center my-2">
                    <div style="font-size: 11pt; font-weight: bold; text-decoration: underline; letter-spacing: 0.5px;">
                        KONVERSI PREDIKAT KINERJA KE ANGKA KREDIT
                    </div>
                    <div style="font-size: 9.5pt; font-weight: bold; margin-top: 2px;">
                        NOMOR : ${pak.nomor_konversi || '115/KG.04.04'}
                    </div>
                </div>

                <!-- INSTANSI & PERIODE -->
                <table style="width: 100%; margin-bottom: 6px; font-size: 9pt;">
                    <tr>
                        <td style="width: 55%; vertical-align: top;">
                            Instansi : ${pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}
                        </td>
                        <td style="width: 45%; text-align: right; vertical-align: top;">
                            Periode : ${pak.periode || 'Januari s.d Desember 2025'}
                        </td>
                    </tr>
                </table>

                <!-- TABEL PEJABAT FUNGSIONAL YANG DINILAI -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 10px; font-size: 9pt;">
                    <thead>
                        <tr style="background-color: #fff;">
                            <th colspan="3" style="border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: bold;">
                                PEJABAT FUNGSIONAL YANG DINILAI
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width: 35px; border: 1px solid #000; padding: 3px 6px; text-align: center;">1</td>
                            <td style="width: 250px; border: 1px solid #000; padding: 3px 8px;">Nama</td>
                            <td style="border: 1px solid #000; padding: 3px 8px; font-weight: bold;">${pak.nama}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">2</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">NIP/NRK</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.nip_nrk || pak.nip}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">3</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Nomor Seri Karpeg</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.karpeg || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">4</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Tempat/Tgl. Lahir</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.tempat_tgl_lahir || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">5</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Jenis Kelamin</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.jenis_kelamin || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">6</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Pendidikan</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.pendidikan || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">7</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Pangkat/Golongan Ruang/TMT</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.pangkat_gol_tmt || pak.pangkat}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">8</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Jabatan/TMT</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.jabatan_tmt || pak.jabatan}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">9</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Unit Kerja</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.unit_kerja || 'Puskesmas Kepulauan Seribu Selatan'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">10</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Instansi</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.instansi_pegawai || pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- TABEL KONVERSI PREDIKAT KINERJA KE ANGKA KREDIT -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 16px; font-size: 9pt;">
                    <thead>
                        <tr>
                            <th colspan="4" style="border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: bold;">
                                KONVERSI PREDIKAT KINERJA KE ANGKA KREDIT
                            </th>
                        </tr>
                        <tr style="text-align: center;">
                            <th colspan="2" style="border: 1px solid #000; padding: 4px 6px; font-weight: bold; width: 45%;">
                                Hasil Penilaian Kinerja
                            </th>
                            <th rowspan="2" style="border: 1px solid #000; padding: 4px 6px; font-weight: bold; width: 27%;">
                                Koefisien Per Tahun
                            </th>
                            <th rowspan="2" style="border: 1px solid #000; padding: 4px 6px; font-weight: bold; width: 28%;">
                                Angka Kredit<br>yang didapat<br>(Kolom 2 x kolom 3)
                            </th>
                        </tr>
                        <tr style="text-align: center;">
                            <th style="border: 1px solid #000; padding: 3px 6px; font-weight: bold; width: 25%;">PREDIKAT</th>
                            <th style="border: 1px solid #000; padding: 3px 6px; font-weight: bold; width: 20%;">PROSENTASE</th>
                        </tr>
                        <!-- Baris Penomoran Kolom 1 2 3 4 -->
                        <tr style="text-align: center; font-size: 8pt; font-style: italic;">
                            <th style="border: 1px solid #000; padding: 2px;">1</th>
                            <th style="border: 1px solid #000; padding: 2px;">2</th>
                            <th style="border: 1px solid #000; padding: 2px;">3</th>
                            <th style="border: 1px solid #000; padding: 2px;">4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="text-align: center; height: 42px; vertical-align: middle;">
                            <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${pak.predikat_kinerja}</td>
                            <td style="border: 1px solid #000; padding: 6px;">${pak.persentase_kinerja}%</td>
                            <td style="border: 1px solid #000; padding: 6px;">${formatAk3(pak.koefisien_tahunan)}</td>
                            <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${formatAk3(pak.ak_kinerja_didapat)}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- BAGIAN TANDA TANGAN -->
                <div class="row" style="margin-top: 15px; font-size: 9pt; page-break-inside: avoid; break-inside: avoid;">
                    <div class="col-6">
                        <!-- Ruang kosong kiri -->
                    </div>
                    <div class="col-6" style="padding-left: 35px;">
                        <div>Ditetapkan di ${pak.tempat_penetapan && !pak.tempat_penetapan.toLowerCase().includes('panggang') ? pak.tempat_penetapan : 'Jakarta'}</div>
                        <div>Pada Tanggal ${pak.tanggal_penetapan || '2 Januari 2026'}</div>
                        <div style="margin-bottom: 2px;">${pak.pejabat_penilai_jabatan || 'Pejabat Penilai Kinerja'}</div>
                        
                        <!-- Ruang Kosong Tanda Tangan & Stempel Dinas Manual -->
                        ${getOfficialStampSignatureHtml()}

                        <div style="font-weight: bold; text-decoration: underline;">${pak.pejabat_penilai_nama || 'dr. Ghamal Ahmad Pramana'}</div>
                        <div>NIP. ${pak.pejabat_penilai_nip || '198312282010011018'}</div>
                    </div>
                </div>

                <!-- TEMBUSAN -->
                <div style="margin-top: 20px; font-size: 8pt; line-height: 1.3;">
                    <div>Tembusan disampaikan kepada:</div>
                    <ol style="margin-bottom: 0; padding-left: 18px;">
                        <li>Jabatan Fungsional yang bersangkutan;</li>
                        <li>Kepala Dinas Kesehatan Provinsi DKI Jakarta;</li>
                        <li>Kepala Badan Kepegawaian Daerah Provinsi DKI Jakarta; dan</li>
                        <li>Kepala Kantor Regional V BKN Jakarta.</li>
                    </ol>
                </div>
            </div>
        `;
    }

    // RENDER DOKUMEN 2: AKUMULASI ANGKA KREDIT (NOMOR: 116/KG.04.04)
    function renderDoc2Html(pak) {
        if (!pak) return '<div class="alert alert-warning">Data PAK tidak ditemukan.</div>';

        const rowsRiwayat = (pak.riwayat_akumulasi && pak.riwayat_akumulasi.length > 0) ? pak.riwayat_akumulasi : [
            { tahun: "2024", periodik: "AK Konversi Lama", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: pak.ak_konversi_lama || 123.303 },
            { tahun: "2025", periodik: "1 Januari - 31 Desember 2025", predikat: pak.predikat_kinerja || "Baik", persentase: (pak.persentase_kinerja || 100) + "%", koefisien: formatAk3(pak.koefisien_tahunan || 12.5), ak_didapat: pak.ak_kinerja_didapat || 12.500 }
        ];

        let rowsHtml = '';
        rowsRiwayat.forEach(r => {
            rowsHtml += `
                <tr style="text-align: center; vertical-align: middle;">
                    <td style="border: 1px solid #000; padding: 6px 4px; font-weight: bold; cursor: pointer;" onclick="window.openModalEditTahunAkumulasi()" title="Klik untuk mengubah label Tahun">${r.tahun}</td>
                    <td style="border: 1px solid #000; padding: 6px 6px; text-align: left; cursor: pointer;" onclick="window.openModalEditTahunAkumulasi()" title="Klik untuk mengubah label Periode">${r.periodik}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px;">${r.predikat || '-'}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px;">${r.persentase || '-'}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px;">${typeof r.koefisien === 'number' ? formatAk3(r.koefisien) : (r.koefisien || '-')}</td>
                    <td style="border: 1px solid #000; padding: 6px 6px; text-align: right; font-weight: bold;">${formatAk3(r.ak_didapat)}</td>
                </tr>
            `;
        });

        return `
            <div class="official-paper bg-white text-dark shadow-sm mx-auto position-relative" style="width: 100%; max-width: 840px; padding: 22px 32px; font-family: 'Arial', sans-serif; font-size: 9pt; line-height: 1.32; border: 1px solid #cbd5e1; border-radius: 4px; color: #000;">
                <!-- KOP SURAT -->
                ${getOfficialKopHtml()}

                <!-- JUDUL SURAT -->
                <div class="text-center my-2">
                    <div style="font-size: 11pt; font-weight: bold; text-decoration: underline; letter-spacing: 0.5px;">
                        AKUMULASI ANGKA KREDIT
                    </div>
                    <div style="font-size: 9.5pt; font-weight: bold; margin-top: 2px;">
                        NOMOR : ${pak.nomor_akumulasi || '116/KG.04.04'}
                    </div>
                </div>

                <!-- INSTANSI & PERIODE -->
                <table style="width: 100%; margin-bottom: 6px; font-size: 9pt;">
                    <tr>
                        <td style="width: 55%; vertical-align: top;">
                            Instansi : ${pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}
                        </td>
                        <td style="width: 45%; text-align: right; vertical-align: top;">
                            Periode : ${pak.periode || 'Januari s.d Desember 2025'}
                        </td>
                    </tr>
                </table>

                <!-- TABEL I. KETERANGAN PERORANGAN -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 10px; font-size: 9pt;">
                    <thead>
                        <tr style="background-color: #fff;">
                            <th style="width: 35px; border: 1px solid #000; padding: 3px 6px; text-align: center;">I</th>
                            <th colspan="3" style="border: 1px solid #000; padding: 3px 8px; text-align: left; font-weight: bold;">
                                KETERANGAN PERORANGAN
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;" rowspan="10"></td>
                            <td style="width: 35px; border: 1px solid #000; padding: 3px 6px; text-align: center;">1</td>
                            <td style="width: 250px; border: 1px solid #000; padding: 3px 8px;">Nama</td>
                            <td style="border: 1px solid #000; padding: 3px 8px; font-weight: bold;">${pak.nama}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">2</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">NIP/NRK</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.nip_nrk || pak.nip}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">3</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Nomor Seri Karpeg</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.karpeg || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">4</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Tempat/Tgl. Lahir</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.tempat_tgl_lahir || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">5</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Jenis Kelamin</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.jenis_kelamin || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">6</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Pendidikan</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.pendidikan || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">7</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Pangkat/Golongan Ruang/TMT</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.pangkat_gol_tmt || pak.pangkat}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">8</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Jabatan/TMT</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.jabatan_tmt || pak.jabatan}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">9</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Unit Kerja</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.unit_kerja || 'Puskesmas Kepulauan Seribu Selatan'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center;">10</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">Instansi</td>
                            <td style="border: 1px solid #000; padding: 3px 8px;">${pak.instansi_pegawai || pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- TABEL HASIL PENILAIAN KINERJA (AKUMULASI) -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 16px; font-size: 9pt;">
                    <thead>
                        <tr>
                            <th colspan="6" style="border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: bold; position: relative;">
                                <span>HASIL PENILAIAN KINERJA</span>
                                <button type="button" class="btn btn-warning btn-xs py-0 px-2 rounded-pill shadow-xs d-print-none" style="font-size: 8pt; position: absolute; right: 6px; top: 3px; font-weight: bold; text-transform: none; color: #1e293b;" onclick="window.openModalEditTahunAkumulasi()" title="Ubah Tahun & Periode Penilaian Akumulasi AK">
                                    <i class="fas fa-edit me-1"></i> Ubah Tahun
                                </button>
                            </th>
                        </tr>
                        <tr style="text-align: center;">
                            <th rowspan="2" style="border: 1px solid #000; padding: 4px 4px; font-weight: bold; width: 10%;">TAHUN</th>
                            <th colspan="3" style="border: 1px solid #000; padding: 4px 6px; font-weight: bold; width: 50%;">HASIL PENILAIAN KINERJA</th>
                            <th rowspan="2" style="border: 1px solid #000; padding: 4px 4px; font-weight: bold; width: 18%;">KOEFISIEN PER<br>TAHUN</th>
                            <th rowspan="2" style="border: 1px solid #000; padding: 4px 6px; font-weight: bold; width: 22%;">ANGKA KREDIT<br>YANG DIDAPAT</th>
                        </tr>
                        <tr style="text-align: center;">
                            <th style="border: 1px solid #000; padding: 3px 6px; font-weight: bold; width: 26%;">PERIODIK<br>(BULAN)</th>
                            <th style="border: 1px solid #000; padding: 3px 4px; font-weight: bold; width: 12%;">PREDIKAT</th>
                            <th style="border: 1px solid #000; padding: 3px 4px; font-weight: bold; width: 12%;">PROSENTASE</th>
                        </tr>
                        <!-- Baris Penomoran Kolom 1 2 3 4 5 6 -->
                        <tr style="text-align: center; font-size: 8pt; font-style: italic;">
                            <th style="border: 1px solid #000; padding: 2px;">1</th>
                            <th style="border: 1px solid #000; padding: 2px;">2</th>
                            <th style="border: 1px solid #000; padding: 2px;">3</th>
                            <th style="border: 1px solid #000; padding: 2px;">4</th>
                            <th style="border: 1px solid #000; padding: 2px;">5</th>
                            <th style="border: 1px solid #000; padding: 2px;">6</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                        <!-- Baris Total Kumulatif -->
                        <tr style="font-weight: bold;">
                            <td colspan="5" style="border: 1px solid #000; padding: 6px 12px; text-align: center; text-transform: uppercase;">
                                JUMLAH ANGKA KREDIT YANG DIPEROLEH
                            </td>
                            <td style="border: 1px solid #000; padding: 6px 6px; text-align: right;">
                                ${formatAk3(pak.jumlah_ak_diperoleh)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- BAGIAN TANDA TANGAN -->
                <div class="row" style="margin-top: 15px; font-size: 9pt; page-break-inside: avoid; break-inside: avoid;">
                    <div class="col-6">
                        <!-- Ruang kosong kiri -->
                    </div>
                    <div class="col-6" style="padding-left: 35px;">
                        <div>Ditetapkan di ${pak.tempat_penetapan && !pak.tempat_penetapan.toLowerCase().includes('panggang') ? pak.tempat_penetapan : 'Jakarta'}</div>
                        <div>Pada Tanggal ${pak.tanggal_penetapan || '2 Januari 2026'}</div>
                        <div style="margin-bottom: 2px;">${pak.pejabat_penilai_jabatan || 'Pejabat Penilai Kinerja'}</div>
                        
                        <!-- Ruang Kosong Tanda Tangan & Stempel Dinas Manual -->
                        ${getOfficialStampSignatureHtml()}

                        <div style="font-weight: bold; text-decoration: underline;">${pak.pejabat_penilai_nama || 'dr. Ghamal Ahmad Pramana'}</div>
                        <div>NIP. ${pak.pejabat_penilai_nip || '198312282010011018'}</div>
                    </div>
                </div>

                <!-- TEMBUSAN -->
                <div style="margin-top: 20px; font-size: 8pt; line-height: 1.3;">
                    <div>Tembusan disampaikan kepada:</div>
                    <ol style="margin-bottom: 0; padding-left: 18px;">
                        <li>Jabatan Fungsional yang bersangkutan;</li>
                        <li>Kepala Dinas Kesehatan Provinsi DKI Jakarta;</li>
                        <li>Kepala Badan Kepegawaian Daerah Provinsi DKI Jakarta; dan</li>
                        <li>Kepala Kantor Regional V BKN Jakarta.</li>
                    </ol>
                </div>
            </div>
        `;
    }

    // RENDER DOKUMEN 3: PENETAPAN ANGKA KREDIT (PAK) (NOMOR: 117/KG.04.04)
    function renderDoc3Html(pak) {
        if (!pak) return '<div class="alert alert-warning">Data PAK tidak ditemukan.</div>';

        return `
            <div class="official-paper bg-white text-dark shadow-sm mx-auto position-relative" style="width: 100%; max-width: 840px; padding: 22px 32px; font-family: 'Arial', sans-serif; font-size: 8.5pt; line-height: 1.28; border: 1px solid #cbd5e1; border-radius: 4px; color: #000;">
                <!-- KOP SURAT -->
                ${getOfficialKopHtml()}

                <!-- JUDUL SURAT -->
                <div class="text-center my-2">
                    <div style="font-size: 11pt; font-weight: bold; text-decoration: underline; letter-spacing: 0.5px;">
                        PENETAPAN ANGKA KREDIT
                    </div>
                    <div style="font-size: 9pt; font-weight: bold; margin-top: 1px;">
                        NOMOR : ${pak.nomor_pak || '117/KG.04.04'}
                    </div>
                </div>

                <!-- INSTANSI & PERIODE -->
                <table style="width: 100%; margin-bottom: 5px; font-size: 8.5pt;">
                    <tr>
                        <td style="width: 55%; vertical-align: top;">
                            Instansi : ${pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}
                        </td>
                        <td style="width: 45%; text-align: right; vertical-align: top;">
                            Periode : ${pak.periode || 'Januari s.d Desember 2025'}
                        </td>
                    </tr>
                </table>

                <!-- TABEL I. KETERANGAN PERORANGAN -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 8px; font-size: 8.5pt;">
                    <thead>
                        <tr style="background-color: #fff;">
                            <th style="width: 30px; border: 1px solid #000; padding: 2px 4px; text-align: center;">I</th>
                            <th colspan="3" style="border: 1px solid #000; padding: 2px 6px; text-align: left; font-weight: bold;">
                                KETERANGAN PERORANGAN
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;" rowspan="10"></td>
                            <td style="width: 30px; border: 1px solid #000; padding: 2px 4px; text-align: center;">1</td>
                            <td style="width: 240px; border: 1px solid #000; padding: 2px 6px;">Nama</td>
                            <td style="border: 1px solid #000; padding: 2px 6px; font-weight: bold;">${pak.nama}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">2</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">NIP/NRK</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.nip_nrk || pak.nip}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">3</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Nomor Seri Karpeg</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.karpeg || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">4</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Tempat/Tgl. Lahir</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.tempat_tgl_lahir || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">5</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Jenis Kelamin</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.jenis_kelamin || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">6</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Pendidikan</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.pendidikan || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">7</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Pangkat/Golongan Ruang/TMT</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.pangkat_gol_tmt || pak.pangkat}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">8</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Jabatan/TMT</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.jabatan_tmt || pak.jabatan}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">9</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Unit Kerja</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.unit_kerja || 'Puskesmas Kepulauan Seribu Selatan'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 2px 4px; text-align: center;">10</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">Instansi</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">${pak.instansi_pegawai || pak.instansi || 'Dinas Kesehatan Provinsi DKI Jakarta'}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- TABEL II. PENETAPAN ANGKA KREDIT -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 8px; font-size: 8.5pt;">
                    <thead>
                        <tr>
                            <th colspan="6" style="border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: bold;">
                                HASIL PENILAIAN ANGKA KREDIT
                            </th>
                        </tr>
                        <tr style="text-align: center;">
                            <th style="width: 30px; border: 1px solid #000; padding: 3px 4px;">II</th>
                            <th style="border: 1px solid #000; padding: 3px 6px; text-align: center;">PENETAPAN ANGKA KREDIT</th>
                            <th style="width: 85px; border: 1px solid #000; padding: 3px 4px;">LAMA</th>
                            <th style="width: 85px; border: 1px solid #000; padding: 3px 4px;">BARU</th>
                            <th style="width: 85px; border: 1px solid #000; padding: 3px 4px;">JUMLAH</th>
                            <th style="width: 100px; border: 1px solid #000; padding: 3px 4px;">KETERANGAN</th>
                        </tr>
                        <!-- Baris Penomoran Kolom 1 2 3 4 5 6 -->
                        <tr style="text-align: center; font-size: 7.5pt; font-style: italic;">
                            <th style="border: 1px solid #000; padding: 1px;">1</th>
                            <th style="border: 1px solid #000; padding: 1px;">2</th>
                            <th style="border: 1px solid #000; padding: 1px;">3</th>
                            <th style="border: 1px solid #000; padding: 1px;">4</th>
                            <th style="border: 1px solid #000; padding: 1px;">5</th>
                            <th style="border: 1px solid #000; padding: 1px;">6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #000; text-align: center; padding: 2px;">1</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">AK Dasar yang diberikan</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_dasar_lama || 0)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_dasar_baru || 0)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_dasar_jumlah || 0)}</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;"></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; text-align: center; padding: 2px;">2</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">AK JF Lama</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;"></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; text-align: center; padding: 2px;">3</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">AK Penyesuaian/ Penyetaraan</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;"></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; text-align: center; padding: 2px;">4</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">AK Konversi</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_konversi_lama_pak || 0)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_konversi_baru_pak || pak.jumlah_ak_diperoleh)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">${formatAk3(pak.ak_konversi_jumlah_pak || pak.jumlah_ak_diperoleh)}</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;"></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; text-align: center; padding: 2px;">5</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;">AK yang diperoleh dari peningkatan pendidikan</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 2px 6px;">-</td>
                            <td style="border: 1px solid #000; padding: 2px 6px;"></td>
                        </tr>
                        <!-- Baris Total Kumulatif -->
                        <tr style="font-weight: bold;">
                            <td colspan="2" style="border: 1px solid #000; padding: 3px 6px; text-transform: uppercase;">
                                JUMLAH ANGKA KREDIT KUMULATIF
                            </td>
                            <td style="border: 1px solid #000; text-align: right; padding: 3px 6px;">${formatAk3(pak.jumlah_ak_kumulatif_lama || 0)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 3px 6px;">${formatAk3(pak.jumlah_ak_kumulatif_baru || pak.jumlah_ak_diperoleh)}</td>
                            <td style="border: 1px solid #000; text-align: right; padding: 3px 6px;">${formatAk3(pak.jumlah_ak_kumulatif || pak.jumlah_ak_diperoleh)}</td>
                            <td style="border: 1px solid #000; padding: 3px 6px;"></td>
                        </tr>
                    </tbody>
                </table>

                <!-- TABEL PERSYARATAN KENAIKAN PANGKAT & JENJANG -->
                <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 10px; font-size: 8.5pt;">
                    <thead>
                        <tr style="text-align: center; font-weight: bold;">
                            <th colspan="2" style="border: 1px solid #000; padding: 3px 6px; text-align: center; width: 52%;">Keterangan</th>
                            <th style="border: 1px solid #000; padding: 3px 6px; width: 24%;">Pangkat</th>
                            <th style="border: 1px solid #000; padding: 3px 6px; width: 24%;">Jenjang Jabatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 3px 6px;">
                                Angka Kredit Minimal yang harus dipenuhi untuk kenaikan pangkat/ jenjang
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: right; font-weight: bold;">
                                ${formatAk3(pak.syarat_min_pangkat)}
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: right; font-weight: bold;">
                                ${pak.syarat_min_jenjang ? formatAk3(pak.syarat_min_jenjang) : '-'}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 3px 6px;">
                                Kelebihan/Kekurangan *) Angka Kredit yang harus dicapai untuk kenaikan pangkat
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: right; font-weight: bold; color: ${pak.kelebihan_pangkat >= 0 ? '#15803d' : '#b91c1c'};">
                                ${formatAk3(pak.kelebihan_pangkat)}
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center; background-color: #f8fafc;">
                                -
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #000; padding: 3px 6px;">
                                Kelebihan/Kekurangan *) Angka Kredit yang harus dicapai untuk kenaikan jenjang
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: center; background-color: #f8fafc;">
                                -
                            </td>
                            <td style="border: 1px solid #000; padding: 3px 6px; text-align: right; font-weight: bold; color: ${pak.kelebihan_jenjang >= 0 ? '#15803d' : '#b91c1c'};">
                                ${pak.syarat_min_jenjang ? formatAk3(pak.kelebihan_jenjang) : '-'}
                            </td>
                        </tr>
                        <!-- Rekomendasi Resmi -->
                        <tr>
                            <td colspan="4" style="border: 1px solid #000; padding: 4px 8px; font-size: 8.5pt; background-color: #fefce8; line-height: 1.3;">
                                <strong>Keterangan / Rekomendasi:</strong><br>
                                ${pak.rekomendasi || 'Dapat dipertimbangkan untuk Kenaikan Pangkat/ Jenjang Jabatan Setingkat Lebih Tinggi.'}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- BAGIAN TANDA TANGAN DUA SISI -->
                <div class="row" style="margin-top: 10px; font-size: 8.5pt; page-break-inside: avoid; break-inside: avoid;">
                    <div class="col-6" style="padding-top: 16px;">
                        <div style="font-weight: bold; margin-bottom: 2px;">ASLI Penetapan Angka Kredit untuk :</div>
                        <div>Jabatan Fungsional yang bersangkutan</div>
                    </div>
                    <div class="col-6" style="padding-left: 30px;">
                        <div>Ditetapkan di ${pak.tempat_penetapan && !pak.tempat_penetapan.toLowerCase().includes('panggang') ? pak.tempat_penetapan : 'Jakarta'}</div>
                        <div>Pada Tanggal ${pak.tanggal_penetapan || '2 Januari 2026'}</div>
                        <div style="margin-bottom: 2px;">${pak.pejabat_penilai_jabatan || 'Pejabat Penilai Kinerja'}</div>
                        
                        <!-- Ruang Kosong Tanda Tangan & Stempel Dinas Manual -->
                        ${getOfficialStampSignatureHtml()}

                        <div style="font-weight: bold; text-decoration: underline;">${pak.pejabat_penilai_nama || 'dr. Ghamal Ahmad Pramana'}</div>
                        <div>NIP. ${pak.pejabat_penilai_nip || '198312282010011018'}</div>
                    </div>
                </div>

                <!-- TEMBUSAN RESMI 5 BUTIR KHUSUS FORM PAK -->
                <div style="margin-top: 14px; font-size: 7.5pt; line-height: 1.25;">
                    <div>Tembusan disampaikan kepada:</div>
                    <ol style="margin-bottom: 0; padding-left: 18px;">
                        <li>Kepala Dinas Kesehatan Provinsi DKI Jakarta;</li>
                        <li>Pejabat Penilai Kinerja;</li>
                        <li>Sekretariat Tim Penilai yang bersangkutan;</li>
                        <li>Kepala Badan Kepegawaian Daerah Provinsi DKI Jakarta; dan</li>
                        <li>Kepala Kantor Regional V BKN Jakarta.</li>
                    </ol>
                </div>
            </div>
        `;
    }

    // UPDATE UI DAFTAR DOKUMEN PAK & PREVIEW
    window.renderPakKonversiUI = function() {
        const pak = getCurrentPak();

        // 1. Update Badge Statistik di Header
        const statTotal = document.getElementById('stat_pak_total');
        if (statTotal) statTotal.textContent = pakList.length;

        const statAkumulasi = document.getElementById('stat_pak_akumulasi');
        if (statAkumulasi) statAkumulasi.textContent = pak ? formatAk3(pak.jumlah_ak_diperoleh) : '0,000';

        const statKelebihan = document.getElementById('stat_pak_kelebihan');
        if (statKelebihan) {
            statKelebihan.textContent = pak ? ('+' + formatAk3(pak.kelebihan_pangkat)) : '0,000';
        }

        // 2. Render Select Pegawai di Toolbar (Terhubung dengan Data Pegawai)
        const selectPegawai = document.getElementById('select_pak_active');
        if (selectPegawai) {
            let options = '';
            if (pakList.length > 0) {
                options += '<optgroup label="📋 Dokumen PAK Aktif">';
                pakList.forEach(item => {
                    const selected = item.id === currentPakId ? 'selected' : '';
                    options += `<option value="${item.id}" ${selected}>${item.nama} - ${item.jabatan} (${item.periode})</option>`;
                });
                options += '</optgroup>';
            } else {
                options += '<option value="">-- Belum Ada Dokumen PAK Terdaftar --</option>';
            }

            const simpegList = window.dataPegawai || [];
            if (simpegList.length > 0) {
                const unlinked = [];
                simpegList.forEach((p, pIdx) => {
                    const cleanNip = (p.nip || p.NIP || '').toString().trim().toLowerCase();
                    const cleanNama = (p.nama || '').trim().toLowerCase();
                    const exists = pakList.some(item => {
                        const itemNip = (item.nip || '').toString().trim().toLowerCase();
                        const itemNama = (item.nama || '').trim().toLowerCase();
                        return (cleanNip && itemNip && cleanNip === itemNip) || (cleanNama && itemNama && cleanNama === itemNama);
                    });
                    if (!exists) {
                        unlinked.push({ p, pIdx });
                    }
                });

                if (unlinked.length > 0) {
                    options += '<optgroup label="👤 Dari Data Pegawai (Pilih untuk Buat PAK)">';
                    unlinked.forEach(({ p, pIdx }) => {
                        options += `<option value="pegawai_idx_${pIdx}">+ ${p.nama} (${p.nip || '-'}) - ${p.jabatan || p.jabatan_orb || '-'}</option>`;
                    });
                    options += '</optgroup>';
                }
            }
            selectPegawai.innerHTML = options;
        }

        // 3. Render Card Info Ringkasan Pegawai & Toolbar Pemilihan Bulan Penilaian Fleksibel
        const infoCard = document.getElementById('box_pak_summary');
        if (infoCard) {
            if (pak) {
                const currentDurasi = pak.durasi_bulan || 12;
                infoCard.innerHTML = `
                    <div class="row g-3 align-items-center">
                        <div class="col-md-7">
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar-circle rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 54px; height: 54px;">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-0 text-dark">${pak.nama}</h5>
                                    <div class="text-muted small">
                                        <span>NIP/NRK: <strong>${pak.nip_nrk || pak.nip}</strong></span> &bull; 
                                        <span>Pangkat: <strong>${pak.pangkat}</strong></span>
                                    </div>
                                    <div class="mt-1 d-flex flex-wrap gap-1 align-items-center">
                                        <span class="badge bg-success-subtle text-success border border-success border-opacity-25">
                                            <i class="fas fa-id-badge me-1"></i> ${pak.jabatan} (Kategori ${pak.kategori_jf})
                                        </span>
                                        <button type="button" class="btn btn-outline-primary btn-sm rounded-pill py-0 px-2 fw-semibold" style="font-size:0.75rem;" onclick="window.viewProfilFromPak('${pak.nip || ''}')">
                                            <i class="fas fa-user-circle me-1"></i> Buka Profil di Data Pegawai
                                        </button>
                                        ${(pak.kelebihan_pangkat >= 0 || (pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0)) ? `
                                        <button type="button" class="btn btn-success btn-sm rounded-pill py-0 px-2.5 fw-semibold text-white shadow-xs" style="font-size:0.75rem;" onclick="window.arahkanPakKeUsulan('${pak.id}')" title="Pegawai memenuhi syarat, klik untuk langsung diarahkan ke Menu Usulan">
                                            <i class="fas fa-paper-plane me-1"></i> Arahkan ke Menu Usulan (${(pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0) ? 'Jenjang/KP' : 'Kenaikan Pangkat'}) &rarr;
                                        </button>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 text-md-end">
                            <div class="d-flex justify-content-md-end gap-2 flex-wrap">
                                <span class="badge bg-light text-dark border p-2 text-start">
                                    <span class="text-muted small d-block">No. Konversi:</span>
                                    <strong>${pak.nomor_konversi}</strong>
                                </span>
                                <span class="badge bg-light text-dark border p-2 text-start">
                                    <span class="text-muted small d-block">No. Akumulasi:</span>
                                    <strong>${pak.nomor_akumulasi}</strong>
                                </span>
                                <span class="badge bg-primary-subtle text-primary border p-2 text-start">
                                    <span class="text-muted small d-block">No. Penetapan:</span>
                                    <strong>${pak.nomor_pak}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Toolbar Pilih Bulan Penilaian Cepat (Fleksibel Pada Bulan Apapun) -->
                    <div class="mt-3 pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                            <span class="small fw-bold text-dark"><i class="fas fa-calendar-alt text-primary me-1"></i> Evaluasi Bulan Penilaian:</span>
                            <div class="btn-group btn-group-sm rounded-pill shadow-xs" role="group">
                                <button type="button" class="btn ${currentDurasi === 1 ? 'btn-primary text-white fw-bold' : 'btn-outline-secondary'}" onclick="window.quickChangeBulanPak(1)">Januari (1 bln)</button>
                                <button type="button" class="btn ${currentDurasi === 3 ? 'btn-primary text-white fw-bold' : 'btn-outline-secondary'}" onclick="window.quickChangeBulanPak(3)">Maret / TW I (KP April)</button>
                                <button type="button" class="btn ${currentDurasi === 6 ? 'btn-primary text-white fw-bold' : 'btn-outline-secondary'}" onclick="window.quickChangeBulanPak(6)">Juni / Sem I (KP Ags)</button>
                                <button type="button" class="btn ${currentDurasi === 9 ? 'btn-primary text-white fw-bold' : 'btn-outline-secondary'}" onclick="window.quickChangeBulanPak(9)">September / TW III (KP Okt)</button>
                                <button type="button" class="btn ${currentDurasi === 12 ? 'btn-primary text-white fw-bold' : 'btn-outline-secondary'}" onclick="window.quickChangeBulanPak(12)">Desember / 1 Thn</button>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                            <button type="button" class="btn btn-sm btn-outline-info rounded-pill px-3 fw-semibold" onclick="window.openSimulatorPakModal()">
                                <i class="fas fa-calculator me-1"></i> Simulator Semua Bulan
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold text-dark" onclick="window.switchDocTab(2); window.openModalEditTahunAkumulasi();" title="Ubah Tahun & Periodik pada Lembar Akumulasi Angka Kredit">
                                <i class="fas fa-calendar-alt text-warning me-1"></i> Ubah Tahun Akumulasi
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 fw-semibold" onclick="window.openEditPakModal('${pak.id}')">
                                <i class="fas fa-edit me-1"></i> Edit Dokumen Lengkap
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-semibold" onclick="window.confirmDeletePak('${pak.id}')" title="Hapus Dokumen PAK Ini">
                                <i class="fas fa-trash-alt me-1"></i> Hapus
                            </button>
                        </div>
                    </div>
                `;
            } else {
                infoCard.innerHTML = `
                    <div class="text-center py-4">
                        <div class="avatar-circle rounded-circle bg-secondary bg-opacity-10 text-secondary d-inline-flex align-items-center justify-content-center fw-bold fs-3 mb-2" style="width: 54px; height: 54px;">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <h6 class="fw-bold text-dark mb-1">Belum Ada Dokumen PAK Terpilih</h6>
                        <p class="text-muted small mb-3">Silakan buat dokumen baru atau pilih pegawai dari Data Pegawai untuk menyiapkan PAK Konversi JF.</p>
                        <button type="button" class="btn btn-success btn-sm rounded-pill px-4 fw-bold shadow-sm" onclick="window.openModalTambahPak()">
                            <i class="fas fa-plus-circle me-1"></i> Buat Dokumen PAK Baru
                        </button>
                    </div>
                `;
            }
        }

        // 3b. Render Banner Real-time Kelayakan Kenaikan Pangkat / Jenjang pada Bulan Berjalan
        const bannerContainer = document.getElementById('box_pak_eligibility_banner');
        if (bannerContainer && pak) {
            const isMemenuhiPangkat = pak.kelebihan_pangkat >= 0;
            const isMemenuhiJenjang = pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0;

            if (isMemenuhiPangkat || isMemenuhiJenjang) {
                bannerContainer.innerHTML = `
                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: linear-gradient(135deg, #065f46 0%, #047857 60%, #0f766e 100%);">
                        <div class="card-body p-4 text-white">
                            <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
                                <div class="d-flex align-items-start gap-3">
                                    <div class="rounded-circle bg-white text-success d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style="width: 52px; height: 52px;">
                                        <i class="fas fa-check-double fa-2x"></i>
                                    </div>
                                    <div>
                                        <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                                            <span class="badge bg-warning text-dark fw-bold rounded-pill px-2.5 py-1">
                                                <i class="fas fa-calendar-check me-1"></i> SAH DICETAK PADA BULAN APAPUN
                                            </span>
                                            <span class="badge bg-white bg-opacity-25 text-white rounded-pill px-2.5 py-1">
                                                PermenPAN-RB No. 1/2023
                                            </span>
                                        </div>
                                        <h5 class="fw-bold mb-1 text-white">
                                            MEMENUHI SYARAT KENAIKAN ${isMemenuhiJenjang ? 'JENJANG JABATAN & PANGKAT' : 'PANGKAT'} (${pak.periode})!
                                        </h5>
                                        <p class="text-white text-opacity-90 mb-0 small" style="max-width: 760px;">
                                            Total Angka Kredit Kumulatif <strong>${formatAk3(pak.jumlah_ak_diperoleh)} AK</strong> telah melampaui batas minimal Kenaikan Pangkat (Syarat: <strong>${formatAk3(pak.syarat_min_pangkat)} AK</strong> | Kelebihan: <strong>+${formatAk3(pak.kelebihan_pangkat)} AK</strong>)${pak.syarat_min_jenjang ? ` serta Syarat Jenjang (${formatAk3(pak.syarat_min_jenjang)} AK | Kelebihan: +${formatAk3(pak.kelebihan_jenjang)} AK)` : ''}. Dokumen ini sah ditetapkan dan dicetak pada bulan berjalan kapanpun untuk pengusulan kenaikan pangkat / jenjang ke BKN.
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap gap-2 justify-content-lg-end flex-shrink-0">
                                    ${isMemenuhiJenjang ? `
                                    <button type="button" class="btn btn-warning btn-sm rounded-pill px-3 py-2 fw-bold text-dark shadow-sm" onclick="window.arahkanPakKeUsulan('${pak.id}', 'jenjang')">
                                        <i class="fas fa-user-graduate me-1 text-dark"></i> Arahkan ke Usulan Jenjang <i class="fas fa-arrow-right ms-1"></i>
                                    </button>
                                    ` : ''}
                                    <button type="button" class="btn ${isMemenuhiJenjang ? 'btn-light' : 'btn-warning'} btn-sm rounded-pill px-3 py-2 fw-bold text-dark shadow-sm" onclick="window.arahkanPakKeUsulan('${pak.id}', 'pangkat')">
                                        <i class="fas fa-level-up-alt me-1 text-primary"></i> Arahkan ke Usulan Pangkat <i class="fas fa-arrow-right ms-1"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-light btn-sm rounded-pill px-3 py-2 fw-bold" onclick="window.printAllPakDocs()">
                                        <i class="fas fa-print me-1"></i> Cetak Dokumen (F4)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                bannerContainer.innerHTML = `
                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: linear-gradient(135deg, #78350f 0%, #92400e 60%, #b45309 100%);">
                        <div class="card-body p-4 text-white">
                            <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
                                <div class="d-flex align-items-start gap-3">
                                    <div class="rounded-circle bg-white text-warning d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style="width: 52px; height: 52px;">
                                        <i class="fas fa-hourglass-half fa-2x"></i>
                                    </div>
                                    <div>
                                        <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                                            <span class="badge bg-light text-dark fw-bold rounded-pill px-2.5 py-1">
                                                <i class="fas fa-chart-line me-1"></i> PROGRES PENILAIAN BERJALAN
                                            </span>
                                            <span class="badge bg-white bg-opacity-25 text-white rounded-pill px-2.5 py-1">
                                                ${pak.periode}
                                            </span>
                                        </div>
                                        <h5 class="fw-bold mb-1 text-white">
                                            AKUMULASI ANGKA KREDIT SAAT INI: ${formatAk3(pak.jumlah_ak_diperoleh)} AK
                                        </h5>
                                        <p class="text-white text-opacity-90 mb-0 small" style="max-width: 760px;">
                                            Kekurangan Angka Kredit untuk Kenaikan Pangkat: <strong>${formatAk3(Math.abs(pak.kelebihan_pangkat))} AK</strong> (Syarat Minimal: ${formatAk3(pak.syarat_min_pangkat)} AK). Dokumen tetap sah disimpan dan dicetak sebagai bukti penetapan periodik. Anda juga dapat menggunakan Simulator untuk menghitung bulan saat syarat terpenuhi.
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap gap-2 justify-content-lg-end flex-shrink-0">
                                    <button type="button" class="btn btn-warning btn-sm rounded-pill px-3 py-2 fw-bold text-dark shadow-sm" onclick="window.openSimulatorPakModal()">
                                        <i class="fas fa-calculator me-1"></i> Simulasi Bulan Depan
                                    </button>
                                    <button type="button" class="btn btn-light btn-sm rounded-pill px-3 py-2 fw-bold text-dark shadow-sm" onclick="window.printActivePakDoc()">
                                        <i class="fas fa-print me-1"></i> Cetak Lembar F4
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Update tombol toolbar dokumen preview
        const btnAjukanPreview = document.getElementById('btn_ajukan_usulan_from_preview');
        if (btnAjukanPreview && pak) {
            const isMemenuhiP = pak.kelebihan_pangkat >= 0;
            const isMemenuhiJ = pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0;
            if (isMemenuhiP || isMemenuhiJ) {
                btnAjukanPreview.classList.remove('d-none');
                btnAjukanPreview.innerHTML = `<i class="fas fa-paper-plane me-1"></i> Arahkan ke Menu Usulan (${isMemenuhiJ ? 'Jenjang/KP' : 'Kenaikan Pangkat'})`;
            } else {
                btnAjukanPreview.classList.add('d-none');
            }
        }

        // 4. Render Dokumen Aktif Sesuai Tab
        const docContainer = document.getElementById('container_pak_preview');
        if (docContainer && pak) {
            if (activeDocTab === 1) {
                docContainer.innerHTML = renderDoc1Html(pak);
            } else if (activeDocTab === 2) {
                docContainer.innerHTML = renderDoc2Html(pak);
            } else {
                docContainer.innerHTML = renderDoc3Html(pak);
            }
        }

        if (activeDocTab === 2) {
            $('#btn_modal_ubah_tahun_akumulasi').removeClass('btn-outline-warning').addClass('btn-warning shadow-sm');
        } else {
            $('#btn_modal_ubah_tahun_akumulasi').removeClass('btn-warning shadow-sm').addClass('btn-outline-warning');
        }

        // 5. Update Table Riwayat Daftar PAK (Dengan Dukungan Filter & Pencarian)
        const tbodyList = document.getElementById('tbody_daftar_pak');
        if (tbodyList) {
            const searchQuery = ($('#search_pak_table').val() || $('#filter_pak_search').val() || '').toLowerCase().trim();
            const statusFilter = $('#filter_pak_status').val() || 'all';

            let filteredList = pakList.filter(item => {
                // Filter pencarian
                const matchSearch = !searchQuery || 
                    (item.nama && item.nama.toLowerCase().includes(searchQuery)) ||
                    (item.nip && item.nip.toLowerCase().includes(searchQuery)) ||
                    (item.nip_nrk && item.nip_nrk.toLowerCase().includes(searchQuery)) ||
                    (item.jabatan && item.jabatan.toLowerCase().includes(searchQuery)) ||
                    (item.periode && item.periode.toLowerCase().includes(searchQuery));

                // Filter status kelayakan
                let matchStatus = true;
                const isMemenuhiP = item.kelebihan_pangkat >= 0;
                const isMemenuhiJ = item.syarat_min_jenjang && item.kelebihan_jenjang >= 0;

                if (statusFilter === 'memenuhi_pangkat' || statusFilter === 'memenuhi') {
                    matchStatus = isMemenuhiP;
                } else if (statusFilter === 'memenuhi_jenjang') {
                    matchStatus = isMemenuhiJ;
                } else if (statusFilter === 'memenuhi_semua') {
                    matchStatus = isMemenuhiP && isMemenuhiJ;
                } else if (statusFilter === 'belum_memenuhi' || statusFilter === 'belum') {
                    matchStatus = !isMemenuhiP;
                }

                return matchSearch && matchStatus;
            });

            if (filteredList.length === 0) {
                tbodyList.innerHTML = `
                    <tr>
                        <td colspan="9" class="text-center py-4 text-muted">
                            <i class="fas fa-search-minus fa-2x mb-2 d-block text-secondary"></i>
                            Tidak ditemukan dokumen PAK yang sesuai dengan kriteria filter/pencarian.
                        </td>
                    </tr>
                `;
            } else {
                let html = '';
                filteredList.forEach((item, idx) => {
                    const isActive = item.id === currentPakId ? 'table-primary' : '';
                    const isEligible = item.kelebihan_pangkat >= 0;
                    const isJenjangEligible = item.syarat_min_jenjang && item.kelebihan_jenjang >= 0;
                    const badgeKelayakan = (isEligible || isJenjangEligible)
                        ? `<button type="button" onclick="window.arahkanPakKeUsulan('${item.id}', '${isJenjangEligible ? 'jenjang' : 'pangkat'}')" class="btn btn-xs btn-success rounded-pill px-2 py-0.5 fw-semibold shadow-xs" title="Pegawai memenuhi syarat. Klik untuk langsung diarahkan ke Menu Usulan!"><i class="fas fa-paper-plane me-1"></i>Memenuhi &rarr; Usulkan</button>`
                        : `<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1"><i class="fas fa-clock me-1"></i>Belum Cukup</span>`;

                    html += `
                        <tr class="${isActive}">
                            <td class="text-center fw-medium">${idx + 1}</td>
                            <td>
                                <strong>${item.nama}</strong>
                                <div class="text-muted small">NIP. ${item.nip || item.nip_nrk}</div>
                            </td>
                            <td>
                                <div>${item.jabatan}</div>
                                <span class="badge bg-light text-secondary border mt-1" style="font-size: 0.75rem;">${item.jenjang_jf || 'Mahir'}</span>
                            </td>
                            <td><span class="badge bg-light text-dark border">${item.pangkat}</span></td>
                            <td>
                                <div class="small fw-semibold text-dark">${item.periode}</div>
                                <div class="text-muted" style="font-size: 0.72rem;"><i class="fas fa-calendar-day me-1"></i>Tgl: ${item.tanggal_penetapan || '-'}</div>
                            </td>
                            <td class="text-center">
                                <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">${item.predikat_kinerja}</span>
                            </td>
                            <td class="text-end fw-bold text-success fs-6">${formatAk3(item.jumlah_ak_diperoleh)}</td>
                            <td class="text-center">
                                ${badgeKelayakan}
                            </td>
                            <td class="text-center">
                                <div class="btn-group btn-group-sm shadow-xs">
                                    ${(isEligible || isJenjangEligible) ? `
                                    <button type="button" class="btn btn-success text-white" title="Memenuhi Syarat: Arahkan ke Menu Usulan (${isJenjangEligible ? 'Kenaikan Jenjang' : 'Kenaikan Pangkat'})" onclick="window.arahkanPakKeUsulan('${item.id}', '${isJenjangEligible ? 'jenjang' : 'pangkat'}')">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                    ` : ''}
                                    <button type="button" class="btn btn-outline-primary" title="Lihat Dokumen" onclick="window.selectPakRecord('${item.id}')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning text-dark" title="Ubah Tahun Akumulasi" onclick="window.selectPakRecord('${item.id}'); window.switchDocTab(2); window.openModalEditTahunAkumulasi();">
                                        <i class="fas fa-calendar-alt text-warning"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" title="Edit Data Lengkap" onclick="window.openEditPakModal('${item.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" title="Hapus Dokumen Ini" onclick="window.confirmDeletePak('${item.id}')">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                });
                tbodyList.innerHTML = html;
            }
        }

        // Render Rekapan Nilai AK Kumulatif Tiap Tahun Seluruh Pegawai
        if (typeof window.renderRekapAkTahunanUI === 'function') {
            window.renderRekapAkTahunanUI();
        }
    };

    // Filter listener tabel PAK
    window.filterPakTable = function() {
        window.renderPakKonversiUI();
    };

    // Quick Change Bulan Penilaian Aktif (Dapat Dibuat dan Dicetak Pada Bulan Apapun)
    window.quickChangeBulanPak = function(bulan) {
        const pak = getCurrentPak();
        if (!pak) return;
        const durasiBulan = Math.min(12, Math.max(1, parseInt(bulan, 10) || 12));
        const info = HIERARKI_JF[pak.jenjang_jf] || HIERARKI_JF['Mahir'];
        const koef = info.koefisien;
        let pct = (pak.persentase_kinerja || 100) / 100.0;
        const akDidapat = (koef * pct) * (durasiBulan / 12.0);
        const totalAk = (pak.ak_konversi_lama || 0) + akDidapat;

        const namaBulanArr = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const namaBulan = namaBulanArr[durasiBulan] || 'Desember';
        const currentYear = new Date().getFullYear();

        pak.durasi_bulan = durasiBulan;
        if (durasiBulan === 12) {
            pak.tipe_periode = 'tahunan';
            pak.periode = `Januari s.d Desember ${currentYear}`;
            pak.tanggal_penetapan = `2 Januari ${currentYear + 1}`;
        } else if (durasiBulan === 3) {
            pak.tipe_periode = 'triwulan1';
            pak.periode = `Januari s.d Maret ${currentYear} (Triwulan I)`;
            pak.tanggal_penetapan = `15 Maret ${currentYear}`;
        } else if (durasiBulan === 6) {
            pak.tipe_periode = 'semester1';
            pak.periode = `Januari s.d Juni ${currentYear} (Semester I)`;
            pak.tanggal_penetapan = `30 Juni ${currentYear}`;
        } else if (durasiBulan === 9) {
            pak.tipe_periode = 'triwulan3';
            pak.periode = `Januari s.d September ${currentYear} (Triwulan III)`;
            pak.tanggal_penetapan = `15 September ${currentYear}`;
        } else {
            pak.tipe_periode = 'bulan_kustom';
            pak.periode = `Januari s.d ${namaBulan} ${currentYear}`;
            pak.tanggal_penetapan = `15 ${namaBulan} ${currentYear}`;
        }

        pak.ak_kinerja_didapat = akDidapat;
        pak.riwayat_akumulasi = [
            { tahun: "Lalu", periodik: "AK Konversi Lama (Tahun Lalu)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: pak.ak_konversi_lama },
            { tahun: "Berjalan", periodik: pak.periode, predikat: pak.predikat_kinerja, persentase: (pak.persentase_kinerja || 100) + "%", koefisien: formatAk3(koef), ak_didapat: akDidapat }
        ];
        pak.jumlah_ak_diperoleh = totalAk;
        pak.ak_konversi_baru_pak = totalAk;
        pak.ak_konversi_jumlah_pak = totalAk;
        pak.jumlah_ak_kumulatif_baru = totalAk;
        pak.jumlah_ak_kumulatif = totalAk;
        pak.kelebihan_pangkat = totalAk - (info.pangkat_min || 0);
        pak.kelebihan_jenjang = info.jenjang_min ? (totalAk - info.jenjang_min) : null;

        savePakData();
        window.renderPakKonversiUI();

        if (window.Swal) {
            const eligible = pak.kelebihan_pangkat >= 0;
            const eligibleJenjang = pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0;
            if (eligible || eligibleJenjang) {
                Swal.fire({
                    icon: 'success',
                    title: `Bulan Penilaian Diubah: ${namaBulan}`,
                    html: `<div>Periode: <strong>${pak.periode}</strong></div>
                           <div class="mt-2">Total Akumulasi: <strong class="fs-5 text-success">${formatAk3(totalAk)} AK</strong></div>
                           <div class="mt-2 small badge bg-success p-2">
                              ✓ MEMENUHI SYARAT ${eligibleJenjang ? 'KENAIKAN JENJANG & PANGKAT' : 'KENAIKAN PANGKAT'}
                           </div>
                           <div class="mt-2 text-muted small">Pegawai telah memenuhi syarat. Apakah Anda ingin langsung diarahkan ke Menu Usulan?</div>`,
                    showConfirmButton: true,
                    confirmButtonText: '<i class="fas fa-paper-plane me-1"></i> Arahkan ke Menu Usulan',
                    confirmButtonColor: '#16a34a',
                    showCancelButton: true,
                    cancelButtonText: 'Tetap di Sini',
                    cancelButtonColor: '#64748b'
                }).then((res) => {
                    if (res.isConfirmed) {
                        window.arahkanPakKeUsulan(pak.id, eligibleJenjang ? 'jenjang' : 'pangkat');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: `Bulan Penilaian Diubah: ${namaBulan}`,
                    html: `<div>Periode: <strong>${pak.periode}</strong></div>
                           <div class="mt-2">Total Akumulasi: <strong class="fs-5 text-warning-emphasis">${formatAk3(totalAk)} AK</strong></div>
                           <div class="mt-2 small badge bg-warning text-dark p-2">
                              Belum Memenuhi Syarat Minimal
                           </div>
                           <div class="mt-2 text-muted small">Sah diterbitkan dan dicetak untuk pengusulan berkala ke BKN</div>`,
                    timer: 2200,
                    showConfirmButton: false
                });
            }
        }
    };

    // Ganti Tab Dokumen (1 = Konversi, 2 = Akumulasi, 3 = PAK)
    window.switchDocTab = function(tabNumber) {
        activeDocTab = parseInt(tabNumber, 10) || 1;
        $('.btn-doc-tab').removeClass('active btn-primary text-white').addClass('btn-outline-primary');
        $(`.btn-doc-tab[data-tab="${activeDocTab}"]`).removeClass('btn-outline-primary').addClass('active btn-primary text-white');
        
        // Highlight tombol Ubah Tahun Akumulasi saat di Tab 2
        if (activeDocTab === 2) {
            $('#btn_modal_ubah_tahun_akumulasi').removeClass('btn-outline-warning').addClass('btn-warning shadow-sm');
        } else {
            $('#btn_modal_ubah_tahun_akumulasi').removeClass('btn-warning shadow-sm').addClass('btn-outline-warning');
        }

        const pak = getCurrentPak();
        const docContainer = document.getElementById('container_pak_preview');
        if (docContainer && pak) {
            if (activeDocTab === 1) docContainer.innerHTML = renderDoc1Html(pak);
            else if (activeDocTab === 2) docContainer.innerHTML = renderDoc2Html(pak);
            else docContainer.innerHTML = renderDoc3Html(pak);
        }
    };

    // Pilih Record PAK dari Dropdown atau Tabel
    window.selectPakRecord = function(id) {
        if (!id) return;
        if (typeof id === 'string' && id.startsWith('pegawai_idx_')) {
            const idx = parseInt(id.replace('pegawai_idx_', ''), 10);
            window.openPakKonversiForPegawai(idx);
            return;
        }
        currentPakId = id;
        window.renderPakKonversiUI();
        
        // Scroll ke view dokumen jika di mobile
        const el = document.getElementById('section_doc_view');
        if (el && window.innerWidth < 768) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Ubah jenis periode penilaian pada Modal Form
    window.handleTipePeriodeChange = function() {
        const tipe = $('#modal_pak_tipe_periode').val();
        const year = new Date().getFullYear();

        if (tipe === 'tahunan') {
            $('#modal_pak_durasi_bulan').val(12).prop('readonly', false);
            $('#modal_pak_periode').val(`Januari s.d Desember ${year}`);
        } else if (tipe === 'triwulan1') {
            $('#modal_pak_durasi_bulan').val(3).prop('readonly', false);
            $('#modal_pak_periode').val(`Januari s.d Maret ${year} (Triwulan I)`);
        } else if (tipe === 'semester1') {
            $('#modal_pak_durasi_bulan').val(6).prop('readonly', false);
            $('#modal_pak_periode').val(`Januari s.d Juni ${year} (Semester I)`);
        } else if (tipe === 'triwulan3') {
            $('#modal_pak_durasi_bulan').val(9).prop('readonly', false);
            $('#modal_pak_periode').val(`Januari s.d September ${year}`);
        } else {
            $('#modal_pak_durasi_bulan').prop('readonly', false);
        }

        window.handlePakFormChange();
    };

    // Helper cepat set tanggal penetapan
    window.setPresetTanggalPak = function(preset) {
        const now = new Date();
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const currentYear = now.getFullYear();

        if (preset === 'today') {
            $('#modal_pak_tgl_penetapan').val(`${now.getDate()} ${months[now.getMonth()]} ${currentYear}`);
        } else if (preset === 'kp_april') {
            $('#modal_pak_tgl_penetapan').val(`15 Maret ${currentYear}`);
        } else if (preset === 'kp_juni') {
            $('#modal_pak_tgl_penetapan').val(`15 Mei ${currentYear}`);
        } else if (preset === 'kp_agustus') {
            $('#modal_pak_tgl_penetapan').val(`15 Juli ${currentYear}`);
        } else if (preset === 'kp_oktober') {
            $('#modal_pak_tgl_penetapan').val(`15 September ${currentYear}`);
        } else if (preset === 'kp_desember') {
            $('#modal_pak_tgl_penetapan').val(`15 November ${currentYear}`);
        }
    };

    // Auto-calculate pada Form Modal saat Pegawai / Jenjang / Predikat / AK Lama / Durasi Bulan berubah
    window.handlePakFormChange = function() {
        const jenjang = $('#modal_pak_jenjang').val() || 'Mahir';
        const predikat = $('#modal_pak_predikat').val() || 'baik';
        const akLama = parseFloat($('#modal_pak_ak_lama').val()) || 0;
        let durasiBulan = parseInt($('#modal_pak_durasi_bulan').val(), 10);
        if (isNaN(durasiBulan) || durasiBulan < 1) durasiBulan = 12;
        if (durasiBulan > 12) durasiBulan = 12;

        const info = HIERARKI_JF[jenjang] || HIERARKI_JF['Mahir'];

        // Koefisien
        const koef = info.koefisien;
        $('#modal_pak_koefisien').val(koef.toFixed(3).replace('.', ','));

        // Persentase Kinerja
        let pct = 1.0;
        let pctLabel = 100;
        if (predikat === 'sangat_baik') { pct = 1.5; pctLabel = 150; }
        else if (predikat === 'baik') { pct = 1.0; pctLabel = 100; }
        else if (predikat === 'butuh_perbaikan') { pct = 0.75; pctLabel = 75; }
        else if (predikat === 'kurang') { pct = 0.50; pctLabel = 50; }
        else if (predikat === 'sangat_kurang') { pct = 0.25; pctLabel = 25; }

        $('#modal_pak_persentase').val(pctLabel + '%');

        // AK Didapat (dengan perhitungan prorata bulan berjalan jika < 12 bulan)
        const prorataFactor = durasiBulan / 12.0;
        const akDidapat = (koef * pct) * prorataFactor;
        $('#modal_pak_ak_didapat').val(akDidapat.toFixed(3).replace('.', ','));

        // Keterangan perhitungan
        if (durasiBulan < 12) {
            $('#modal_pak_total_desc').html(`Akumulasi AK Lama (${formatAk3(akLama)}) + AK Berjalan (${durasiBulan}/12 Bulan Prorata: ${formatAk3(akDidapat)})`);
        } else {
            $('#modal_pak_total_desc').html(`Akumulasi AK Lama (${formatAk3(akLama)}) + AK Penilaian 1 Tahun Penuh (${formatAk3(akDidapat)})`);
        }

        // Total Akumulasi
        const totalAk = akLama + akDidapat;
        $('#modal_pak_total_ak').val(totalAk.toFixed(3).replace('.', ','));

        // Syarat Min Pangkat & Jenjang
        const syaratPangkat = info.pangkat_min;
        const syaratJenjang = info.jenjang_min;
        $('#modal_pak_syarat_pangkat').val(syaratPangkat ? syaratPangkat.toFixed(3).replace('.', ',') : '-');
        $('#modal_pak_syarat_jenjang').val(syaratJenjang ? syaratJenjang.toFixed(3).replace('.', ',') : '-');

        // Kelebihan Pangkat
        const kelebihanP = totalAk - (syaratPangkat || 0);
        $('#modal_pak_kelebihan_pangkat').val(kelebihanP.toFixed(3).replace('.', ','));

        // Kelebihan Jenjang
        let kelebihanJ = null;
        if (syaratJenjang) {
            kelebihanJ = totalAk - syaratJenjang;
            $('#modal_pak_kelebihan_jenjang').val(kelebihanJ.toFixed(3).replace('.', ','));
        } else {
            $('#modal_pak_kelebihan_jenjang').val('-');
        }

        // Real-Time Alert Kelayakan di Modal Form
        const alertBox = $('#modal_pak_alert_box');
        if (alertBox.length) {
            const isMemenuhiPangkat = kelebihanP >= 0;
            const isMemenuhiJenjang = syaratJenjang ? (kelebihanJ >= 0) : false;

            if (isMemenuhiPangkat || isMemenuhiJenjang) {
                $('#btn_modal_pak_usulkan').removeClass('d-none');
                alertBox.removeClass('bg-warning-subtle border-warning-subtle text-warning-emphasis bg-secondary-subtle border-secondary')
                        .addClass('bg-success-subtle border border-success-subtle text-success-emphasis p-3');
                alertBox.html(`
                    <div class="d-flex align-items-start gap-2">
                        <i class="fas fa-check-circle fs-4 text-success mt-1"></i>
                        <div class="flex-grow-1">
                            <div class="fw-bold fs-6">MEMENUHI SYARAT KENAIKAN ${isMemenuhiJenjang ? 'JENJANG & PANGKAT' : 'PANGKAT'}!</div>
                            <div class="small">
                                Total Angka Kredit diperoleh (<strong>${formatAk3(totalAk)}</strong>) telah melampaui batas minimal 
                                (Syarat Pangkat: <strong>${formatAk3(syaratPangkat)}</strong> | Kelebihan: <strong>+${formatAk3(kelebihanP)}</strong>)${syaratJenjang ? ` | Syarat Jenjang: <strong>${formatAk3(syaratJenjang)}</strong> (Kelebihan: +${formatAk3(kelebihanJ)})` : ''}.
                                <br><span class="badge bg-success text-white mt-1"><i class="fas fa-stamp me-1"></i>Dapat Ditetapkan & Dicetak Pada Bulan Ini</span> 
                                Dokumen PAK Konversi ini sah untuk diajukan dalam periode Kenaikan Pangkat/Jenjang BKN.
                            </div>
                            <div class="mt-2 pt-2 border-top border-success border-opacity-25 d-flex flex-wrap gap-2 align-items-center">
                                <span class="small fw-semibold text-success"><i class="fas fa-arrow-circle-right me-1"></i>Arahkan ke Usulan:</span>
                                ${isMemenuhiJenjang ? `
                                <button type="button" class="btn btn-xs btn-outline-success py-1 px-2.5 rounded-pill fw-bold" onclick="window.simpanDanArahkanKeUsulan('jenjang')">
                                    <i class="fas fa-user-graduate me-1"></i> Simpan & Usulkan Jenjang &rarr;
                                </button>
                                ` : ''}
                                <button type="button" class="btn btn-xs btn-success py-1 px-2.5 rounded-pill fw-bold text-white shadow-xs" onclick="window.simpanDanArahkanKeUsulan('pangkat')">
                                    <i class="fas fa-paper-plane me-1"></i> Simpan & Usulkan Pangkat &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                `);
            } else {
                $('#btn_modal_pak_usulkan').addClass('d-none');
                alertBox.removeClass('bg-success-subtle border-success-subtle text-success-emphasis')
                        .addClass('bg-warning-subtle border border-warning-subtle text-warning-emphasis p-3');
                const kekuranganP = Math.abs(kelebihanP);
                alertBox.html(`
                    <div class="d-flex align-items-start gap-2">
                        <i class="fas fa-info-circle fs-4 text-warning mt-1"></i>
                        <div>
                            <div class="fw-bold fs-6">PROGRES ANGKA KREDIT BERJALAN</div>
                            <div class="small">
                                Total Angka Kredit terkumpul saat ini adalah <strong>${formatAk3(totalAk)}</strong>. 
                                Kekurangan untuk Kenaikan Pangkat: <strong>${formatAk3(kekuranganP)} AK</strong>.
                                <br><span class="text-muted">Dokumen tetap sah disimpan dan dicetak sebagai bukti penetapan angka kredit kinerja berkala.</span>
                            </div>
                        </div>
                    </div>
                `);
            }
        }

        // Rekomendasi Otomatis
        let rekom = '';
        if (kelebihanP >= 0 && kelebihanJ !== null && kelebihanJ >= 0 && info.next_jenjang && info.next_pangkat) {
            rekom = `Dapat dipertimbangkan untuk Kenaikan Pangkat/ Jenjang Jabatan Setingkat Lebih Tinggi menjadi Perawat ${info.next_jenjang} Pangkat/Golongan Ruang ${info.next_pangkat}`;
        } else if (kelebihanP >= 0 && info.next_pangkat) {
            rekom = `Dapat dipertimbangkan untuk Kenaikan Pangkat Setingkat Lebih Tinggi menjadi Pangkat/Golongan Ruang ${info.next_pangkat}`;
        } else if (kelebihanP < 0) {
            rekom = `Mempertahankan dan meningkatkan kinerja untuk pemenuhan Angka Kredit Kumulatif kenaikan pangkat periode berikutnya.`;
        } else {
            rekom = `Mempertahankan predikat kinerja pada jenjang jabatan saat ini (${jenjang}).`;
        }
        $('#modal_pak_rekomendasi').val(rekom);
    };

    // Auto-fill form saat memilih pegawai dari database SIMPEG
    window.handlePakSelectPegawai = function() {
        const val = $('#modal_pak_pegawai_ref').val();
        if (!val) return;

        const list = window.dataPegawai || [];
        const found = list.find(p => p.id === val || p.nip === val);
        if (found) {
            $('#modal_pak_nama').val(found.nama || '');
            $('#modal_pak_nip_nrk').val((found.nip || '') + (found.nrk ? ' / ' + found.nrk : ''));
            $('#modal_pak_karpeg').val(found.karpeg || found.no_karpeg || 'Q 131743');
            $('#modal_pak_lahir').val((found.tempat_lahir ? found.tempat_lahir + ', ' : '') + (found.tgl_lahir || ''));
            $('#modal_pak_gender').val(found.jenis_kelamin || 'Perempuan');
            $('#modal_pak_pendidikan').val(found.pendidikan_terakhir || found.pendidikan || 'D-III Keperawatan');
            $('#modal_pak_pangkat_tmt').val(found.pangkat || found.golongan || 'Penata Muda Tk.I (III/b)');
            $('#modal_pak_jabatan_tmt').val(found.jabatan || 'Perawat Mahir');
            $('#modal_pak_unit').val(found.unit_kerja || found.tempat_tugas || 'Puskesmas Kepulauan Seribu Selatan');

            // Deteksi Jenjang
            const jabUpper = (found.jabatan || '').toUpperCase();
            if (jabUpper.includes('MAHIR')) $('#modal_pak_jenjang').val('Mahir');
            else if (jabUpper.includes('TERAMPIL')) $('#modal_pak_jenjang').val('Terampil');
            else if (jabUpper.includes('PENYELIA')) $('#modal_pak_jenjang').val('Penyelia');
            else if (jabUpper.includes('PEMULA')) $('#modal_pak_jenjang').val('Pemula');
            else if (jabUpper.includes('PERTAMA')) $('#modal_pak_jenjang').val('Ahli Pertama');
            else if (jabUpper.includes('MUDA')) $('#modal_pak_jenjang').val('Ahli Muda');
            else if (jabUpper.includes('MADYA')) $('#modal_pak_jenjang').val('Ahli Madya');
            else if (jabUpper.includes('UTAMA')) $('#modal_pak_jenjang').val('Ahli Utama');

            window.handlePakFormChange();
        }
    };

    // Buka Modal Tambah PAK Baru
    window.openModalTambahPak = function() {
        $('#formPakKonversi')[0].reset();
        $('#modal_pak_id').val('');
        $('#modalPakTitle').text('Buat Dokumen PAK Konversi Baru');

        // Populate dropdown pegawai SIMPEG
        const selectPeg = $('#modal_pak_pegawai_ref');
        selectPeg.empty().append('<option value="">-- Pilih Pegawai dari SIMPEG (Opsional) --</option>');
        const activeList = window.dataPegawai || [];
        activeList.forEach(p => {
            selectPeg.append(`<option value="${p.id || p.nip}">${p.nama} (${p.nip}) - ${p.jabatan || '-'}</option>`);
        });

        // Set Default Numbers
        const nextNum = pakList.length + 115;
        $('#modal_pak_no_konversi').val(`${nextNum}/KG.04.04`);
        $('#modal_pak_no_akumulasi').val(`${nextNum + 1}/KG.04.04`);
        $('#modal_pak_no_pak').val(`${nextNum + 2}/KG.04.04`);
        
        $('#modal_pak_tipe_periode').val('tahunan');
        $('#modal_pak_durasi_bulan').val(12);
        $('#modal_pak_periode').val('Januari s.d Desember 2025');

        // Set default Hikmayani style values
        $('#modal_pak_jenjang').val('Mahir');
        $('#modal_pak_predikat').val('baik');
        $('#modal_pak_ak_lama').val('123.303');
        $('#modal_pak_tempat_penetapan').val('Jakarta');
        $('#modal_pak_tgl_penetapan').val('2 Januari 2026');
        $('#modal_pak_pejabat_nama').val('dr. Ghamal Ahmad Pramana');
        $('#modal_pak_pejabat_nip').val('198312282010011018');
        $('#btn_modal_pak_hapus').addClass('d-none');

        window.handlePakFormChange();

        const modal = new bootstrap.Modal(document.getElementById('modalFormPakKonversi'));
        modal.show();
    };

    // Buka Modal Edit PAK
    window.openEditPakModal = function(id) {
        const item = pakList.find(p => p.id === id);
        if (!item) return;

        $('#modal_pak_id').val(item.id);
        $('#modalPakTitle').text('Edit Dokumen PAK Konversi - ' + item.nama);

        $('#modal_pak_no_konversi').val(item.nomor_konversi);
        $('#modal_pak_no_akumulasi').val(item.nomor_akumulasi);
        $('#modal_pak_no_pak').val(item.nomor_pak);
        $('#modal_pak_periode').val(item.periode);
        $('#modal_pak_durasi_bulan').val(item.durasi_bulan || 12);
        $('#modal_pak_tipe_periode').val(item.tipe_periode || 'tahunan');

        $('#modal_pak_nama').val(item.nama);
        $('#modal_pak_nip_nrk').val(item.nip_nrk || item.nip);
        $('#modal_pak_karpeg').val(item.karpeg);
        $('#modal_pak_lahir').val(item.tempat_tgl_lahir);
        $('#modal_pak_gender').val(item.jenis_kelamin);
        $('#modal_pak_pendidikan').val(item.pendidikan);
        $('#modal_pak_pangkat_tmt').val(item.pangkat_gol_tmt || item.pangkat);
        $('#modal_pak_jabatan_tmt').val(item.jabatan_tmt || item.jabatan);
        $('#modal_pak_unit').val(item.unit_kerja);

        $('#modal_pak_jenjang').val(item.jenjang_jf || 'Mahir');
        $('#modal_pak_predikat').val(item.predikat_kinerja === 'Sangat Baik' ? 'sangat_baik' : (item.predikat_kinerja === 'Baik' ? 'baik' : (item.predikat_kinerja === 'Butuh Perbaikan' ? 'butuh_perbaikan' : 'kurang')));
        $('#modal_pak_ak_lama').val(item.ak_konversi_lama || 0);

        $('#modal_pak_tempat_penetapan').val((item.tempat_penetapan && !item.tempat_penetapan.toLowerCase().includes('panggang')) ? item.tempat_penetapan : 'Jakarta');
        $('#modal_pak_tgl_penetapan').val(item.tanggal_penetapan);
        $('#modal_pak_pejabat_nama').val(item.pejabat_penilai_nama);
        $('#modal_pak_pejabat_nip').val(item.pejabat_penilai_nip);
        $('#modal_pak_rekomendasi').val(item.rekomendasi);
        $('#btn_modal_pak_hapus').removeClass('d-none');

        window.handlePakFormChange();

        const modal = new bootstrap.Modal(document.getElementById('modalFormPakKonversi'));
        modal.show();
    };

    // Simpan Form PAK (Tambah / Edit)
    window.saveFormPakKonversi = function() {
        const id = $('#modal_pak_id').val();
        const jenjang = $('#modal_pak_jenjang').val() || 'Mahir';
        const info = HIERARKI_JF[jenjang] || HIERARKI_JF['Mahir'];

        const predikatRaw = $('#modal_pak_predikat').val();
        let predikatTitle = 'Baik';
        let pct = 1.0;
        let pctNum = 100;
        if (predikatRaw === 'sangat_baik') { predikatTitle = 'Sangat Baik'; pct = 1.5; pctNum = 150; }
        else if (predikatRaw === 'baik') { predikatTitle = 'Baik'; pct = 1.0; pctNum = 100; }
        else if (predikatRaw === 'butuh_perbaikan') { predikatTitle = 'Butuh Perbaikan'; pct = 0.75; pctNum = 75; }
        else if (predikatRaw === 'kurang') { predikatTitle = 'Kurang'; pct = 0.50; pctNum = 50; }
        else if (predikatRaw === 'sangat_kurang') { predikatTitle = 'Sangat Kurang'; pct = 0.25; pctNum = 25; }

        const akLama = parseFloat($('#modal_pak_ak_lama').val()) || 0;
        let durasiBulan = parseInt($('#modal_pak_durasi_bulan').val(), 10);
        if (isNaN(durasiBulan) || durasiBulan < 1) durasiBulan = 12;
        if (durasiBulan > 12) durasiBulan = 12;

        const koef = info.koefisien;
        const akDidapat = (koef * pct) * (durasiBulan / 12.0);
        const totalAk = akLama + akDidapat;

        const periodeText = $('#modal_pak_periode').val().trim() || 'Januari s.d Desember 2025';

        const record = {
            id: id || ('PAK-' + Date.now()),
            nomor_konversi: $('#modal_pak_no_konversi').val().trim() || '115/KG.04.04',
            nomor_akumulasi: $('#modal_pak_no_akumulasi').val().trim() || '116/KG.04.04',
            nomor_pak: $('#modal_pak_no_pak').val().trim() || '117/KG.04.04',
            instansi: 'Dinas Kesehatan Provinsi DKI Jakarta',
            tipe_periode: $('#modal_pak_tipe_periode').val() || 'tahunan',
            durasi_bulan: durasiBulan,
            periode: periodeText,

            nama: $('#modal_pak_nama').val().trim() || 'Hikmayani, A.Md, Kep',
            nip_nrk: $('#modal_pak_nip_nrk').val().trim() || '198108072008012019 / 173803',
            nip: ($('#modal_pak_nip_nrk').val().trim().split('/')[0] || '').trim(),
            karpeg: $('#modal_pak_karpeg').val().trim() || 'Q 131743',
            tempat_tgl_lahir: $('#modal_pak_lahir').val().trim() || 'Jakarta, 07 Agustus 1981',
            jenis_kelamin: $('#modal_pak_gender').val() || 'Perempuan',
            pendidikan: $('#modal_pak_pendidikan').val().trim() || 'D-III Keperawatan',
            pangkat_gol_tmt: $('#modal_pak_pangkat_tmt').val().trim() || 'Penata Muda Tk.I (III/b) / 01.04.2023',
            pangkat: ($('#modal_pak_pangkat_tmt').val().trim().split('/')[0] || '').trim() || 'Penata Muda Tk.I (III/b)',
            jabatan_tmt: $('#modal_pak_jabatan_tmt').val().trim() || 'Perawat Mahir / 03.02.2017',
            jabatan: ($('#modal_pak_jabatan_tmt').val().trim().split('/')[0] || '').trim() || 'Perawat Mahir',
            unit_kerja: $('#modal_pak_unit').val().trim() || 'Puskesmas Kepulauan Seribu Selatan',
            instansi_pegawai: 'Dinas Kesehatan Provinsi DKI Jakarta',

            kategori_jf: info.kategori,
            jenjang_jf: jenjang,
            predikat_kinerja: predikatTitle,
            persentase_kinerja: pctNum,
            koefisien_tahunan: koef,
            ak_kinerja_didapat: akDidapat,

            riwayat_akumulasi: [
                { tahun: "Lalu", periodik: "AK Konversi Lama (Tahun Lalu)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "Berjalan", periodik: periodeText, predikat: predikatTitle, persentase: pctNum + "%", koefisien: formatAk3(koef), ak_didapat: akDidapat }
            ],
            ak_konversi_lama: akLama,
            jumlah_ak_diperoleh: totalAk,

            ak_dasar_lama: 0.0,
            ak_dasar_baru: 0.0,
            ak_dasar_jumlah: 0.0,
            ak_konversi_lama_pak: 0.0,
            ak_konversi_baru_pak: totalAk,
            ak_konversi_jumlah_pak: totalAk,
            jumlah_ak_kumulatif_lama: 0.0,
            jumlah_ak_kumulatif_baru: totalAk,
            jumlah_ak_kumulatif: totalAk,

            syarat_min_pangkat: info.pangkat_min || 50.0,
            syarat_min_jenjang: info.jenjang_min || 100.0,
            kelebihan_pangkat: totalAk - (info.pangkat_min || 0),
            kelebihan_jenjang: info.jenjang_min ? (totalAk - info.jenjang_min) : null,
            rekomendasi: $('#modal_pak_rekomendasi').val().trim() || 'Dapat dipertimbangkan untuk Kenaikan Pangkat/ Jenjang Jabatan Setingkat Lebih Tinggi.',

            tempat_penetapan: ($('#modal_pak_tempat_penetapan').val() || '').trim() || 'Jakarta',
            tanggal_penetapan: $('#modal_pak_tgl_penetapan').val().trim() || '2 Januari 2026',
            pejabat_penilai_nama: $('#modal_pak_pejabat_nama').val().trim() || 'dr. Ghamal Ahmad Pramana',
            pejabat_penilai_nip: $('#modal_pak_pejabat_nip').val().trim() || '198312282010011018',
            pejabat_penilai_jabatan: 'Pejabat Penilai Kinerja',

            status: 'Ditetapkan',
            created_at: new Date().toISOString().split('T')[0]
        };

        if (id) {
            const index = pakList.findIndex(p => p.id === id);
            if (index >= 0) pakList[index] = record;
        } else {
            pakList.unshift(record);
        }

        currentPakId = record.id;
        savePakData();
        window.renderPakKonversiUI();

        const modalEl = document.getElementById('modalFormPakKonversi');
        const modalInst = bootstrap.Modal.getInstance(modalEl);
        if (modalInst) modalInst.hide();

        if (window.Swal) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Disimpan',
                text: `Dokumen PAK Konversi untuk ${record.nama} telah berhasil diperbarui dan siap dicetak kapanpun.`,
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    // =========================================================================
    // SIMULATOR KELAYAKAN NAIK PANGKAT / JENJANG PADA BULAN APAPUN
    // =========================================================================

    // Buka Modal Simulator
    window.openSimulatorPakModal = function() {
        // Populate dropdown pegawai
        const selPeg = $('#sim_pak_pegawai');
        selPeg.empty().append('<option value="">-- Manual / Tanpa Pegawai --</option>');
        const activeList = window.dataPegawai || [];
        activeList.forEach(p => {
            selPeg.append(`<option value="${p.id || p.nip}">${p.nama} (${p.nip}) - ${p.jabatan || '-'}</option>`);
        });

        // Set default simulator values
        $('#sim_pak_jenjang').val('Mahir');
        $('#sim_pak_ak_lama').val('123.303');
        $('#sim_pak_bulan').val('3'); // Maret / TW 1
        $('#sim_pak_predikat').val('baik');

        window.runSimulatorPak();

        const modal = new bootstrap.Modal(document.getElementById('modalSimulatorPakKonversi'));
        modal.show();
    };

    // Saat pegawai dipilih di simulator
    window.handleSimPegawaiChange = function() {
        const val = $('#sim_pak_pegawai').val();
        if (!val) return;

        // Cek apakah ada di pakList
        const foundPak = pakList.find(p => p.id === val || p.nip === val || (p.nip_nrk && p.nip_nrk.includes(val)));
        if (foundPak) {
            $('#sim_pak_jenjang').val(foundPak.jenjang_jf || 'Mahir');
            $('#sim_pak_ak_lama').val(foundPak.ak_konversi_lama || 123.303);
            window.runSimulatorPak();
            return;
        }

        // Cek di dataPegawai
        const list = window.dataPegawai || [];
        const found = list.find(p => p.id === val || p.nip === val);
        if (found) {
            const jabUpper = (found.jabatan || '').toUpperCase();
            if (jabUpper.includes('MAHIR')) $('#sim_pak_jenjang').val('Mahir');
            else if (jabUpper.includes('TERAMPIL')) $('#sim_pak_jenjang').val('Terampil');
            else if (jabUpper.includes('PENYELIA')) $('#sim_pak_jenjang').val('Penyelia');
            else if (jabUpper.includes('PEMULA')) $('#sim_pak_jenjang').val('Pemula');
            else if (jabUpper.includes('PERTAMA')) $('#sim_pak_jenjang').val('Ahli Pertama');
            else if (jabUpper.includes('MUDA')) $('#sim_pak_jenjang').val('Ahli Muda');
            else if (jabUpper.includes('MADYA')) $('#sim_pak_jenjang').val('Ahli Madya');
            else if (jabUpper.includes('UTAMA')) $('#sim_pak_jenjang').val('Ahli Utama');

            window.runSimulatorPak();
        }
    };

    // Eksekusi kalkulasi simulasi kelayakan
    window.runSimulatorPak = function() {
        const jenjang = $('#sim_pak_jenjang').val() || 'Mahir';
        const akLama = parseFloat($('#sim_pak_ak_lama').val()) || 0;
        const bulan = parseInt($('#sim_pak_bulan').val(), 10) || 3;
        const predikat = $('#sim_pak_predikat').val() || 'baik';

        const info = HIERARKI_JF[jenjang] || HIERARKI_JF['Mahir'];
        const koef = info.koefisien;

        let pct = 1.0;
        let pctLabel = '100%';
        if (predikat === 'sangat_baik') { pct = 1.5; pctLabel = '150%'; }
        else if (predikat === 'baik') { pct = 1.0; pctLabel = '100%'; }
        else if (predikat === 'butuh_perbaikan') { pct = 0.75; pctLabel = '75%'; }
        else if (predikat === 'kurang') { pct = 0.50; pctLabel = '50%'; }

        const namaBulanArr = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const namaBulan = namaBulanArr[bulan] || 'Bulan Berjalan';

        // Hitung prorata AK kinerja berjalan
        const prorataFactor = bulan / 12.0;
        const akDidapatBulan = (koef * pct) * prorataFactor;
        const totalAkSimulasi = akLama + akDidapatBulan;

        const syaratPangkat = info.pangkat_min;
        const syaratJenjang = info.jenjang_min;
        const selisihPangkat = totalAkSimulasi - (syaratPangkat || 0);
        const selisihJenjang = syaratJenjang ? (totalAkSimulasi - syaratJenjang) : null;

        const isMemenuhiPangkat = selisihPangkat >= 0;
        const isMemenuhiJenjang = syaratJenjang ? (selisihJenjang >= 0) : false;

        // Pilihan Periode KP BKN yang relevan
        let saranKP = 'Periode Reguler / Kapan Saja';
        if (bulan <= 2) saranKP = 'KP Periode April (Batas Usulan BKN: Akhir Februari)';
        else if (bulan <= 4) saranKP = 'KP Periode Juni (Batas Usulan BKN: Akhir April)';
        else if (bulan <= 6) saranKP = 'KP Periode Agustus (Batas Usulan BKN: Akhir Juni)';
        else if (bulan <= 8) saranKP = 'KP Periode Oktober (Batas Usulan BKN: Akhir Agustus)';
        else if (bulan <= 10) saranKP = 'KP Periode Desember (Batas Usulan BKN: Akhir Oktober)';
        else saranKP = 'KP Periode Februari Tahun Depan';

        const resultBox = document.getElementById('sim_pak_result_box');
        if (!resultBox) return;

        let statusHeader = '';
        if (isMemenuhiPangkat || isMemenuhiJenjang) {
            statusHeader = `
                <div class="alert alert-success d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3 border-0 shadow-xs">
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 46px; height: 46px;">
                            <i class="fas fa-check-double fa-lg"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-0 text-success-emphasis">MEMENUHI SYARAT KENAIKAN ${isMemenuhiJenjang ? 'JENJANG & PANGKAT' : 'PANGKAT'} PADA BULAN ${namaBulan.toUpperCase()}!</h6>
                            <div class="small text-success-emphasis">Angka kredit kumulatif telah melampaui ambang batas minimum. Dokumen PAK Konversi dapat langsung dibuat & diajukan.</div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 flex-shrink-0">
                        <button type="button" class="btn btn-success btn-sm rounded-pill px-3 fw-bold text-white shadow-xs" onclick="window.arahkanSimulatorKeUsulan('${isMemenuhiJenjang ? 'jenjang' : 'pangkat'}')">
                            <i class="fas fa-paper-plane me-1"></i> Arahkan ke Usulan &rarr;
                        </button>
                    </div>
                </div>
            `;
        } else {
            statusHeader = `
                <div class="alert alert-warning d-flex align-items-center gap-3 mb-3 border-0 shadow-xs">
                    <div class="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center" style="width: 46px; height: 46px;">
                        <i class="fas fa-hourglass-half fa-lg"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0 text-warning-emphasis">BELUM MEMENUHI SYARAT MINIMAL PADA BULAN ${namaBulan.toUpperCase()}</h6>
                        <div class="small text-warning-emphasis">Kekurangan untuk kenaikan pangkat: <strong>${formatAk3(Math.abs(selisihPangkat))} AK</strong>. Lanjutkan kinerja atau simulasikan pada bulan berikutnya.</div>
                    </div>
                </div>
            `;
        }

        resultBox.innerHTML = `
            ${statusHeader}
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="bg-white p-3 rounded-3 border">
                        <div class="text-muted small mb-1">Rincian Perolehan Angka Kredit s.d ${namaBulan}:</div>
                        <ul class="list-unstyled mb-0 small">
                            <li class="d-flex justify-content-between py-1 border-bottom">
                                <span>AK Konversi Dimiliki Sebelumnya:</span>
                                <strong>${formatAk3(akLama)}</strong>
                            </li>
                            <li class="d-flex justify-content-between py-1 border-bottom">
                                <span>Koefisien Standar Jenjang (${jenjang}):</span>
                                <span>${formatAk3(koef)} / tahun</span>
                            </li>
                            <li class="d-flex justify-content-between py-1 border-bottom">
                                <span>Predikat & Prosentase:</span>
                                <span>${predikat.toUpperCase()} (${pctLabel})</span>
                            </li>
                            <li class="d-flex justify-content-between py-1 border-bottom">
                                <span>AK Berjalan (${bulan}/12 Bulan Prorata):</span>
                                <strong class="text-primary">+${formatAk3(akDidapatBulan)}</strong>
                            </li>
                            <li class="d-flex justify-content-between pt-2 fw-bold text-dark fs-6">
                                <span>Total AK Diperoleh:</span>
                                <span class="text-success">${formatAk3(totalAkSimulasi)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-3 rounded-3 border h-100 d-flex flex-column justify-content-between">
                        <div>
                            <div class="text-muted small mb-2">Evaluasi Terhadap Syarat Regulasi BKN:</div>
                            <table class="table table-sm table-bordered mb-2" style="font-size: 0.85rem;">
                                <tr class="table-light">
                                    <th>Kriteria Kenaikan</th>
                                    <th class="text-end">Syarat Min</th>
                                    <th class="text-end">Kelebihan/Kekurangan</th>
                                </tr>
                                <tr>
                                    <td>Kenaikan Pangkat</td>
                                    <td class="text-end fw-semibold">${formatAk3(syaratPangkat)}</td>
                                    <td class="text-end fw-bold ${selisihPangkat >= 0 ? 'text-success' : 'text-danger'}">
                                        ${selisihPangkat >= 0 ? '+' : ''}${formatAk3(selisihPangkat)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kenaikan Jenjang</td>
                                    <td class="text-end fw-semibold">${syaratJenjang ? formatAk3(syaratJenjang) : '-'}</td>
                                    <td class="text-end fw-bold ${selisihJenjang !== null ? (selisihJenjang >= 0 ? 'text-success' : 'text-danger') : 'text-muted'}">
                                        ${selisihJenjang !== null ? ((selisihJenjang >= 0 ? '+' : '') + formatAk3(selisihJenjang)) : '-'}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="p-2 bg-light rounded border text-muted small">
                            <i class="fas fa-calendar-check text-primary me-1"></i> Rekomendasi Periode Kenaikan: <strong>${saranKP}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Terapkan hasil simulasi ke Modal Buat Dokumen PAK Baru
    window.applySimulatorToNewPak = function() {
        const modalSimEl = document.getElementById('modalSimulatorPakKonversi');
        const modalSimInst = bootstrap.Modal.getInstance(modalSimEl);
        if (modalSimInst) modalSimInst.hide();

        const jenjang = $('#sim_pak_jenjang').val() || 'Mahir';
        const akLama = $('#sim_pak_ak_lama').val() || '123.303';
        const bulan = parseInt($('#sim_pak_bulan').val(), 10) || 3;
        const predikat = $('#sim_pak_predikat').val() || 'baik';

        const namaBulanArr = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const year = new Date().getFullYear();

        window.openModalTambahPak();

        // Overwrite fields with simulation choices
        $('#modal_pak_jenjang').val(jenjang);
        $('#modal_pak_ak_lama').val(akLama);
        $('#modal_pak_durasi_bulan').val(bulan);
        $('#modal_pak_predikat').val(predikat);

        if (bulan === 12) {
            $('#modal_pak_tipe_periode').val('tahunan');
            $('#modal_pak_periode').val(`Januari s.d Desember ${year}`);
            $('#modal_pak_tgl_penetapan').val(`2 Januari ${year + 1}`);
        } else if (bulan === 3) {
            $('#modal_pak_tipe_periode').val('triwulan1');
            $('#modal_pak_periode').val(`Januari s.d Maret ${year} (Triwulan I)`);
            $('#modal_pak_tgl_penetapan').val(`15 Maret ${year}`);
        } else if (bulan === 6) {
            $('#modal_pak_tipe_periode').val('semester1');
            $('#modal_pak_periode').val(`Januari s.d Juni ${year} (Semester I)`);
            $('#modal_pak_tgl_penetapan').val(`30 Juni ${year}`);
        } else {
            $('#modal_pak_tipe_periode').val('bulan_kustom');
            $('#modal_pak_periode').val(`Januari s.d ${namaBulanArr[bulan]} ${year}`);
            $('#modal_pak_tgl_penetapan').val(`15 ${namaBulanArr[bulan]} ${year}`);
        }

        window.handlePakFormChange();
    };

    // Target ID untuk penghapusan PAK
    let pakIdToDelete = null;

    // Buka dialog konfirmasi hapus dokumen PAK
    window.confirmDeletePak = function(id) {
        pakIdToDelete = id;
        const target = pakList.find(p => p.id === id);
        if (!target) return;

        const modalEl = document.getElementById('modalConfirmDeletePak');
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const namaEl = document.getElementById('deletePakTargetNama');
            const nipEl = document.getElementById('deletePakTargetNip');
            const jabEl = document.getElementById('deletePakTargetJabatan');
            const perEl = document.getElementById('deletePakTargetPeriode');

            if (namaEl) namaEl.textContent = target.nama || 'Dokumen PAK';
            if (nipEl) nipEl.textContent = 'NIP: ' + (target.nip || target.nip_nrk || '-');
            if (jabEl) jabEl.textContent = (target.jabatan || '-') + (target.jenjang_jf ? ` (${target.jenjang_jf})` : '');
            if (perEl) perEl.textContent = 'Periode: ' + (target.periode || '-') + ' | No: ' + (target.nomor_pak || target.nomor_konversi || '-');

            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.show();
        } else {
            // Fallback konfirmasi bawaan browser jika modal belum terpasang
            if (confirm(`Apakah Anda yakin ingin menghapus data PAK Konversi untuk ${target.nama}?`)) {
                window.executeDeletePakRecord(id);
            }
        }
    };

    // Eksekusi penghapusan Dokumen PAK
    window.executeDeletePakRecord = function(directId) {
        const id = directId || pakIdToDelete;
        if (!id) return;

        const modalEl = document.getElementById('modalConfirmDeletePak');
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        const targetIndex = pakList.findIndex(p => p.id === id);
        const targetName = targetIndex >= 0 ? pakList[targetIndex].nama : '';

        pakList = pakList.filter(p => p.id !== id);
        if (pakList.length === 0) {
            currentPakId = null;
        } else if (currentPakId === id) {
            currentPakId = pakList[0].id;
        }

        savePakData();
        window.renderPakKonversiUI();

        if (typeof showToast === 'function') {
            showToast(`Dokumen PAK Konversi untuk ${targetName || 'pegawai'} berhasil dihapus!`, 'success');
        }
        pakIdToDelete = null;
    };

    // Alias fungsi deletePakRecord agar tombol atau script lama tetap berjalan lancar
    window.deletePakRecord = function(id) {
        window.confirmDeletePak(id);
    };

    // Hapus dokumen aktif langsung dari modal Edit PAK
    window.confirmDeleteCurrentPakFromModal = function() {
        const curId = $('#modal_pak_id').val();
        if (!curId) return;

        const formModalEl = document.getElementById('modalFormPakKonversi');
        if (formModalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const formModal = bootstrap.Modal.getInstance(formModalEl);
            if (formModal) formModal.hide();
        }

        setTimeout(() => {
            window.confirmDeletePak(curId);
        }, 300);
    };

    // HELPER: CETAK MENGGUNAKAN IFRAME JIKA WINDOW.OPEN DIBLOKIR
    function printHtmlContent(htmlContent, title) {
        let win = null;
        try {
            win = window.open('', '_blank');
        } catch (e) {
            console.warn('window.open gagal, beralih ke print iframe fallback:', e);
        }

        if (win && !win.closed) {
            win.document.open();
            win.document.write(htmlContent);
            win.document.close();
        } else {
            // Fallback hidden iframe untuk mode preview terbatas / browser popup blocked
            let iframe = document.getElementById('pak_print_hidden_iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'pak_print_hidden_iframe';
                iframe.style.position = 'fixed';
                iframe.style.right = '0';
                iframe.style.bottom = '0';
                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.style.border = '0';
                document.body.appendChild(iframe);
            }
            const frameDoc = iframe.contentWindow || iframe.contentDocument;
            const doc = frameDoc.document || frameDoc;
            doc.open();
            doc.write(htmlContent);
            doc.close();
            setTimeout(function() {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }, 600);
        }
    }

    // CETAK FORMULIR AKTIF (1 LEMBAR KERTAS F4)
    window.printActivePakDoc = function() {
        const pak = getCurrentPak();
        if (!pak) return;

        let content = '';
        let docTitle = '';
        let formName = '';
        if (activeDocTab === 1) {
            content = renderDoc1Html(pak);
            docTitle = `Formulir_Konversi_Kinerja_${pak.nama.replace(/[^a-zA-Z0-9]/g, '_')}`;
            formName = 'Formulir 1 - Konversi Predikat Kinerja ke Angka Kredit';
        } else if (activeDocTab === 2) {
            content = renderDoc2Html(pak);
            docTitle = `Formulir_Akumulasi_AK_${pak.nama.replace(/[^a-zA-Z0-9]/g, '_')}`;
            formName = 'Formulir 2 - Akumulasi Angka Kredit';
        } else {
            content = renderDoc3Html(pak);
            docTitle = `Formulir_Penetapan_AK_PAK_${pak.nama.replace(/[^a-zA-Z0-9]/g, '_')}`;
            formName = 'Formulir 3 - Penetapan Angka Kredit (PAK)';
        }

        const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docTitle}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        @page {
            /* Standar Kertas F4 / Folio Indonesia: 215mm x 330mm */
            size: 215mm 330mm portrait;
            margin: 10mm 15mm 10mm 15mm;
        }
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        body {
            background-color: #f1f5f9;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
        }
        .official-paper {
            background: #fff !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
        }
        table {
            border-collapse: collapse !important;
            width: 100% !important;
        }
        table, th, td {
            border-color: #000 !important;
        }
        @media print {
            body {
                background: #fff !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            .no-print {
                display: none !important;
            }
            .official-paper {
                padding: 0 !important;
                margin: 0 !important;
                width: 100% !important;
            }
        }
        @media screen {
            .page-container {
                max-width: 860px;
                margin: 20px auto;
                background: #fff;
                padding: 30px 40px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 1px solid #cbd5e1;
            }
        }
    </style>
</head>
<body>
    <div class="no-print p-3 bg-dark text-white border-bottom shadow-sm">
        <div class="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
                <strong class="text-warning">Kertas: F4 / Folio (215 x 330 mm)</strong>
                <span class="ms-2 text-white-50">| ${formName} | ${pak.nama}</span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-primary fw-bold px-4" onclick="window.print()">
                    🖨️ Cetak / Simpan PDF
                </button>
                <button class="btn btn-secondary px-3" onclick="window.close()">Tutup</button>
            </div>
        </div>
        <div class="small text-white-50 mt-1">
            * Tips: Pada dialog cetak, pilih Ukuran Kertas <strong>Folio / F4 (215 x 330 mm)</strong> dan Margin <strong>Default atau Minimum</strong>.
        </div>
    </div>
    <div class="page-container">
        ${content}
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    </script>
</body>
</html>`;

        printHtmlContent(html, docTitle);
    };

    // CETAK 3 DOKUMEN SEKALIGUS (LENGKAP 3 HALAMAN BERURUTAN PADA KERTAS F4)
    window.printAllPakDocs = function() {
        const pak = getCurrentPak();
        if (!pak) return;

        const doc1 = renderDoc1Html(pak);
        const doc2 = renderDoc2Html(pak);
        const doc3 = renderDoc3Html(pak);
        const docTitle = `Paket_Lengkap_PAK_Konversi_${pak.nama.replace(/[^a-zA-Z0-9]/g, '_')}`;

        const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docTitle}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        @page {
            /* Standar Kertas F4 / Folio Indonesia: 215mm x 330mm */
            size: 215mm 330mm portrait;
            margin: 10mm 15mm 10mm 15mm;
        }
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        body {
            background-color: #f1f5f9;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
        }
        .official-paper {
            background: #fff !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
        }
        table {
            border-collapse: collapse !important;
            width: 100% !important;
        }
        table, th, td {
            border-color: #000 !important;
        }
        .print-page {
            page-break-after: always;
            break-after: page;
        }
        .print-page:last-child {
            page-break-after: auto;
            break-after: auto;
        }
        @media print {
            body {
                background: #fff !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            .no-print {
                display: none !important;
            }
            .official-paper {
                padding: 0 !important;
                margin: 0 !important;
                width: 100% !important;
            }
        }
        @media screen {
            .page-container {
                max-width: 860px;
                margin: 20px auto;
                background: #fff;
                padding: 30px 40px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 1px solid #cbd5e1;
            }
            .page-separator {
                max-width: 860px;
                margin: 15px auto;
                text-align: center;
                color: #64748b;
                font-weight: bold;
                font-size: 11pt;
            }
        }
    </style>
</head>
<body>
    <div class="no-print p-3 bg-dark text-white border-bottom shadow-sm">
        <div class="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
                <strong class="text-warning">Kertas: F4 / Folio (215 x 330 mm)</strong>
                <span class="ms-2 text-white-50">| Paket Lengkap 3 Halaman (Form 1, Form 2, Form 3 PAK) | ${pak.nama}</span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-primary fw-bold px-4" onclick="window.print()">
                    🖨️ Cetak 3 Halaman F4 Lengkap / Simpan PDF
                </button>
                <button class="btn btn-secondary px-3" onclick="window.close()">Tutup</button>
            </div>
        </div>
        <div class="small text-white-50 mt-1">
            * 3 Dokumen akan tercetak masing-masing 1 lembar utuh pada kertas F4 (Folio 215 x 330 mm) tanpa tanda tangan dan stempel digital (siap tanda tangan basah & stempel dinas asli).
        </div>
    </div>

    <!-- HALAMAN 1: KONVERSI PREDIKAT KINERJA -->
    <div class="print-page page-container">
        ${doc1}
    </div>

    <!-- PEMBATAS TAMPILAN SCREEN -->
    <div class="no-print page-separator">--- Batas Halaman 1 (Kertas F4) ---</div>

    <!-- HALAMAN 2: AKUMULASI ANGKA KREDIT -->
    <div class="print-page page-container">
        ${doc2}
    </div>

    <!-- PEMBATAS TAMPILAN SCREEN -->
    <div class="no-print page-separator">--- Batas Halaman 2 (Kertas F4) ---</div>

    <!-- HALAMAN 3: PENETAPAN ANGKA KREDIT (PAK) -->
    <div class="print-page page-container">
        ${doc3}
    </div>

    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 600);
        };
    </script>
</body>
</html>`;

        printHtmlContent(html, docTitle);
    };

    // EXPORT REKAP PAK KE CSV
    window.exportPakToCsv = function() {
        let csv = "data:text/csv;charset=utf-8,";
        csv += "REKAPITULASI DOKUMEN PENETAPAN ANGKA KREDIT (PAK) KONVERSI JF\r\n";
        csv += "Puskesmas Kepulauan Seribu Selatan - Dinas Kesehatan Provinsi DKI Jakarta\r\n\r\n";
        csv += "ID,Nama,NIP/NRK,Jabatan,Pangkat,Periode,No Konversi,No Akumulasi,No PAK,Predikat Kinerja,AK Lama,AK Didapat,Total AK,Syarat Pangkat,Kelebihan Pangkat,Syarat Jenjang,Kelebihan Jenjang,Rekomendasi\r\n";

        pakList.forEach(p => {
            csv += `"${p.id}","${p.nama}","${p.nip_nrk || p.nip}","${p.jabatan}","${p.pangkat}","${p.periode}","${p.nomor_konversi}","${p.nomor_akumulasi}","${p.nomor_pak}","${p.predikat_kinerja}","${p.ak_konversi_lama}","${p.ak_kinerja_didapat}","${p.jumlah_ak_diperoleh}","${p.syarat_min_pangkat}","${p.kelebihan_pangkat}","${p.syarat_min_jenjang || '-'}","${p.kelebihan_jenjang || '-'}","${p.rekomendasi}"\r\n`;
        });

        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Rekap_PAK_Konversi_JF_PKSS.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // INISIALISASI MODUL PAK KONVERSI
    window.initPakKonversi = function() {
        loadPakData();
        window.renderPakKonversiUI();
    };

    // Navigasi cepat dari Master Angka Kredit ke PAK Konversi
    window.navigasiKePakKonversi = function() {
        const link = document.querySelector('a[data-target="pak-konversi"]');
        if (link) {
            link.click();
        } else {
            $('.page-section').removeClass('section-active-fade active').hide();
            $('#pak-konversi').show().addClass('section-active-fade active');
            $('#page-title').text('PAK Konversi (Penetapan Angka Kredit)');
            window.initPakKonversi();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Buka / Buat Dokumen PAK Konversi untuk Pegawai tertentu dari Data Pegawai
    window.openPakKonversiForPegawai = function(idxOrIdentifier) {
        let p = null;
        const list = window.dataPegawai || [];
        if (typeof idxOrIdentifier === 'number') {
            p = list[idxOrIdentifier] || null;
        } else if (typeof idxOrIdentifier === 'string') {
            p = list.find(item => (item.id === idxOrIdentifier || item.nip === idxOrIdentifier || (item.nama && item.nama.toLowerCase() === idxOrIdentifier.toLowerCase()))) || null;
        } else if (typeof idxOrIdentifier === 'object' && idxOrIdentifier !== null) {
            p = idxOrIdentifier;
        }

        if (!p) {
            if (typeof showToast === 'function') {
                showToast("Data pegawai tidak ditemukan.", "warning");
            }
            return;
        }

        loadPakData();

        const currentYear = new Date().getFullYear();
        const cleanNip = (p.nip || p.NIP || '').toString().trim();
        const cleanNama = (p.nama || '').trim().toLowerCase();

        // 1. Cek apakah dokumen PAK untuk pegawai ini sudah ada di pakList
        let foundPak = pakList.find(item => {
            const itemNip = (item.nip || '').toString().trim();
            const itemNama = (item.nama || '').trim().toLowerCase();
            return (cleanNip && itemNip && cleanNip === itemNip) || (cleanNama && itemNama && cleanNama === itemNama);
        });

        if (foundPak) {
            currentPakId = foundPak.id;
            window.renderPakKonversiUI();
            window.navigasiKePakKonversi();
            if (typeof showToast === 'function') {
                showToast(`Membuka dokumen PAK Konversi untuk ${p.nama}`, "success");
            }
            return;
        }

        // 2. Jika belum ada, buat otomatis dokumen PAK Konversi berdasarkan data master pegawai
        const jabRaw = (p.jabatan || p.jabatan_orb || p.jabatan_pergub || p.jabatan_permenpan41 || p.jabatan_kepmenpan11 || 'Perawat Mahir').toString();
        const jabUpper = jabRaw.toUpperCase();

        let jenjang = 'Mahir';
        if (jabUpper.includes('MAHIR')) jenjang = 'Mahir';
        else if (jabUpper.includes('TERAMPIL')) jenjang = 'Terampil';
        else if (jabUpper.includes('PENYELIA')) jenjang = 'Penyelia';
        else if (jabUpper.includes('PEMULA')) jenjang = 'Pemula';
        else if (jabUpper.includes('PERTAMA')) jenjang = 'Ahli Pertama';
        else if (jabUpper.includes('MUDA')) jenjang = 'Ahli Muda';
        else if (jabUpper.includes('MADYA')) jenjang = 'Ahli Madya';
        else if (jabUpper.includes('UTAMA')) jenjang = 'Ahli Utama';

        const info = HIERARKI_JF[jenjang] || { kategori: "Keahlian", koefisien: 12.5, pangkat_min: 50.0, jenjang_min: 100.0, jenjang_selanjutnya: "Penyelia", pangkat_selanjutnya: "Penata (III/c)" };
        const koef = info.koefisien;
        const durasi = 12;
        const pct = 100;
        const akDidapat = (koef * 1.0) * (durasi / 12.0);
        const akLama = 25.000;
        const totalAk = akLama + akDidapat;

        const nextNum = pakList.length + 115;
        const newId = 'PAK-' + Date.now();

        const newRecord = {
            id: newId,
            nomor_konversi: `${nextNum}/KG.04.04`,
            nomor_akumulasi: `${nextNum + 1}/KG.04.04`,
            nomor_pak: `${nextNum + 2}/KG.04.04`,
            instansi: "Dinas Kesehatan Provinsi DKI Jakarta",
            periode: `Januari s.d Desember ${currentYear - 1}`,
            durasi_bulan: 12,
            tipe_periode: 'tahunan',

            nama: p.nama || '-',
            nip_nrk: cleanNip + (p.nrk ? ' / ' + p.nrk : ''),
            nip: cleanNip || '-',
            nrk: p.nrk || '-',
            karpeg: p.karpeg || p.no_karpeg || 'Q 131743',
            tempat_tgl_lahir: (p.tempat_lahir ? p.tempat_lahir + ', ' : '') + (p.tanggal_lahir || p.tgl_lahir || '-'),
            jenis_kelamin: p.jenis_kelamin || 'Perempuan',
            pendidikan: p.pendidikan_terakhir || p.pendidikan || 'D-III Keperawatan',
            pangkat_gol_tmt: (p.pangkat_gol || p.pangkat || 'Penata Muda Tk.I (III/b)') + (p.tmt ? ' / ' + p.tmt : ''),
            pangkat: p.pangkat_gol || p.pangkat || 'Penata Muda Tk.I (III/b)',
            tmt_pangkat: p.tmt || '01.04.2023',
            jabatan_tmt: jabRaw + (p.tmt ? ' / ' + p.tmt : ''),
            jabatan: jabRaw,
            tmt_jabatan: p.tmt || '03.02.2017',
            unit_kerja: p.tempat_tugas || p.nama_ukpd || 'Puskesmas Kepulauan Seribu Selatan',
            instansi_pegawai: 'Dinas Kesehatan Provinsi DKI Jakarta',

            kategori_jf: info.kategori,
            jenjang_jf: jenjang,
            predikat_kinerja: "Baik",
            persentase_kinerja: pct,
            koefisien_tahunan: koef,
            ak_kinerja_didapat: akDidapat,

            riwayat_akumulasi: [
                { tahun: "Lalu", periodik: "AK Konversi Lama (Tahun Lalu)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "Berjalan", periodik: `1 Januari - 31 Desember ${currentYear - 1}`, predikat: "Baik", persentase: "100%", koefisien: formatAk3(koef), ak_didapat: akDidapat }
            ],
            ak_konversi_lama: akLama,
            jumlah_ak_diperoleh: totalAk,

            ak_dasar_lama: 0.0,
            ak_dasar_baru: 0.0,
            ak_dasar_jumlah: 0.0,
            ak_jf_lama_lama: null,
            ak_jf_lama_baru: null,
            ak_jf_lama_jumlah: null,
            ak_penyesuaian_lama: null,
            ak_penyesuaian_baru: null,
            ak_penyesuaian_jumlah: null,
            ak_konversi_lama_pak: 0.0,
            ak_konversi_baru_pak: totalAk,
            ak_konversi_jumlah_pak: totalAk,
            ak_pendidikan_lama: null,
            ak_pendidikan_baru: null,
            ak_pendidikan_jumlah: null,
            jumlah_ak_kumulatif_lama: 0.0,
            jumlah_ak_kumulatif_baru: totalAk,
            jumlah_ak_kumulatif: totalAk,

            syarat_min_pangkat: info.pangkat_min || 50.0,
            syarat_min_jenjang: info.jenjang_min || 100.0,
            kelebihan_pangkat: totalAk - (info.pangkat_min || 0),
            kelebihan_jenjang: info.jenjang_min ? (totalAk - info.jenjang_min) : null,
            rekomendasi: `Dapat dipertimbangkan untuk Kenaikan Pangkat/ Jenjang Jabatan Setingkat Lebih Tinggi menjadi ${info.jenjang_selanjutnya || 'Penyelia'} Pangkat/Golongan Ruang ${info.pangkat_selanjutnya || 'Penata (III/c)'}`,

            tempat_penetapan: "Jakarta",
            tanggal_penetapan: `2 Januari ${currentYear}`,
            pejabat_nama: "dr. Ghamal Ahmad Pramana",
            pejabat_nip: "198312282010011018",
            pejabat_jabatan: "Plt. Kepala Puskesmas Kepulauan Seribu Selatan",

            status: 'Ditetapkan',
            created_at: new Date().toISOString().split('T')[0]
        };

        pakList.unshift(newRecord);
        currentPakId = newRecord.id;
        savePakData();
        window.renderPakKonversiUI();
        window.navigasiKePakKonversi();

        if (typeof showToast === 'function') {
            showToast(`Dokumen PAK Konversi untuk ${p.nama} berhasil disiapkan dari Data Pegawai!`, "success");
        }
    };

    window.openPakKonversiForCurrentProfil = function() {
        if (typeof window.currentViewedPegawaiIdx === 'number' && window.currentViewedPegawaiIdx >= 0) {
            const modalEl = document.getElementById('modalProfilPegawai');
            if (modalEl) {
                const inst = bootstrap.Modal.getInstance(modalEl);
                if (inst) inst.hide();
            }
            window.openPakKonversiForPegawai(window.currentViewedPegawaiIdx);
        } else {
            window.navigasiKePakKonversi();
        }
    };

    // Buka Profil Pegawai di Data Pegawai dari Modul PAK Konversi
    window.viewProfilFromPak = function(nip) {
        const list = window.dataPegawai || [];
        const cleanNip = (nip || '').toString().trim().toLowerCase();
        let idx = -1;
        if (cleanNip) {
            idx = list.findIndex(p => (p.nip || p.NIP || '').toString().trim().toLowerCase() === cleanNip);
        }
        if (idx === -1 && currentPakId) {
            const cur = pakList.find(p => p.id === currentPakId);
            if (cur && cur.nama) {
                const curNama = cur.nama.toLowerCase();
                idx = list.findIndex(p => (p.nama || '').toLowerCase() === curNama);
            }
        }

        if (idx >= 0) {
            const linkDataMaster = document.querySelector('a[data-target="data-master"]');
            if (linkDataMaster) linkDataMaster.click();
            setTimeout(() => {
                if (typeof window.viewProfilPegawai === 'function') {
                    window.viewProfilPegawai(idx);
                }
            }, 250);
        } else {
            if (typeof showToast === 'function') {
                showToast("Data pegawai tidak ditemukan di Data Master Pegawai.", "warning");
            }
        }
    };

    // =========================================================================
    // MODUL PENGARAHAN DOKUMEN PAK KONVERSI MEMENUHI SYARAT KE MENU USULAN
    // =========================================================================
    
    // Helper untuk menentukan opsi Pangkat Diusulkan berikutnya
    window.getNextPangkatOption = function(pangkatLama) {
        if (!pangkatLama) return 'Penata, III/c';
        const p = pangkatLama.toUpperCase();
        if (p.includes('IV/C') || p.includes('IV.C') || p.includes('PEMBINA UTAMA MUDA')) return 'Pembina Utama Madya, IV/d';
        if (p.includes('IV/B') || p.includes('IV.B') || p.includes('PEMBINA TK.I')) return 'Pembina Utama Muda, IV/c';
        if (p.includes('IV/A') || p.includes('IV.A') || p.includes('PEMBINA')) return 'Pembina Tk.I, IV/b';
        if (p.includes('III/D') || p.includes('III.D') || p.includes('PENATA TK.I')) return 'Pembina, IV/a';
        if (p.includes('III/C') || p.includes('III.C') || p.includes('PENATA,')) return 'Penata Tk.I, III/d';
        if (p.includes('III/B') || p.includes('III.B') || p.includes('PENATA MUDA TK.I')) return 'Penata, III/c';
        if (p.includes('III/A') || p.includes('III.A') || p.includes('PENATA MUDA')) return 'Penata Muda Tk.I, III/b';
        if (p.includes('II/D') || p.includes('II.D') || p.includes('PENGATUR TK.I')) return 'Penata Muda, III/a';
        if (p.includes('II/C') || p.includes('II.C') || p.includes('PENGATUR,')) return 'Pengatur Tk.I, II/d';
        if (p.includes('II/B') || p.includes('II.B') || p.includes('PENGATUR MUDA TK.I')) return 'Pengatur, II/c';
        if (p.includes('II/A') || p.includes('II.A') || p.includes('PENGATUR MUDA')) return 'Pengatur Muda Tk.I, II/b';
        return 'Penata, III/c';
    };

    // Helper untuk menentukan Jenjang Jabatan berikutnya
    window.getNextJenjangOption = function(jenjangLama) {
        if (!jenjangLama) return 'Penyelia';
        const j = jenjangLama.trim().toLowerCase();
        if (j.includes('pemula')) return 'Terampil';
        if (j.includes('terampil')) return 'Mahir';
        if (j.includes('mahir')) return 'Penyelia';
        if (j.includes('pertama')) return 'Ahli Muda';
        if (j.includes('muda')) return 'Ahli Madya';
        if (j.includes('madya')) return 'Ahli Utama';
        return 'Penyelia';
    };

    // Helper untuk memperkirakan TMT Kenaikan Pangkat BKN berikutnya
    window.getNearestKpPeriod = function() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1 - 12
        const year = now.getFullYear();
        if (month <= 2) return `01 April ${year}`;
        if (month <= 4) return `01 Juni ${year}`;
        if (month <= 6) return `01 Agustus ${year}`;
        if (month <= 8) return `01 Oktober ${year}`;
        if (month <= 10) return `01 Desember ${year}`;
        return `01 Februari ${year + 1}`;
    };

    // FUNGSI UTAMA: Alihkan pegawai dari menu PAK Konversi ke Menu Usulan (Kenaikan Pangkat / Jenjang)
    window.arahkanPakKeUsulan = function(pakOrIdentifier, jenisUsulanPreferred) {
        loadPakData();
        let pak = null;
        if (pakOrIdentifier && typeof pakOrIdentifier === 'object') {
            pak = pakOrIdentifier;
        } else if (typeof pakOrIdentifier === 'string') {
            const query = pakOrIdentifier.trim();
            pak = pakList.find(item => 
                item.id === query || 
                (item.nip && item.nip.toString().trim() === query) ||
                (item.nip_nrk && item.nip_nrk.toString().trim() === query) ||
                (item.nama && item.nama.toLowerCase() === query.toLowerCase())
            );
        }

        if (!pak) {
            pak = getCurrentPak();
        }

        if (!pak) {
            if (typeof showToast === 'function') {
                showToast("Dokumen PAK Konversi tidak ditemukan.", "warning");
            }
            return;
        }

        // Cek kelayakan
        const isMemenuhiPangkat = pak.kelebihan_pangkat >= 0;
        const isMemenuhiJenjang = pak.syarat_min_jenjang && pak.kelebihan_jenjang >= 0;

        // Tentukan jenis usulan ('pangkat' atau 'jenjang')
        let jenis = jenisUsulanPreferred;
        if (!jenis) {
            if (isMemenuhiJenjang && !isMemenuhiPangkat) {
                jenis = 'jenjang';
            } else {
                jenis = 'pangkat';
            }
        }

        const targetSection = jenis === 'jenjang' ? 'usulan-kenaikan-jenjang' : 'usulan-kenaikan-pangkat';
        const info = HIERARKI_JF[pak.jenjang_jf] || {};
        const nextJenjang = info.next_jenjang || window.getNextJenjangOption(pak.jenjang_jf);
        const nextPangkat = window.getNextPangkatOption(pak.pangkat) || info.next_pangkat || 'Penata, III/c';
        const tmtUsulan = window.getNearestKpPeriod();

        const extraData = {
            from_pak: true,
            nomor_pak: pak.nomor_pak,
            nomor_konversi: pak.nomor_konversi,
            periode: pak.periode,
            ak: formatAk3(pak.jumlah_ak_diperoleh),
            kelebihan_pangkat: formatAk3(pak.kelebihan_pangkat),
            kelebihan_jenjang: pak.kelebihan_jenjang !== null && pak.kelebihan_jenjang !== undefined ? formatAk3(pak.kelebihan_jenjang) : null,
            pangkat_lama: pak.pangkat,
            pangkat_usulan: nextPangkat,
            jenis_kp: 'Kenaikan Pangkat Jabatan Fungsional',
            tmt_usulan: tmtUsulan,
            mkg: '04 Tahun 00 Bulan',
            jabatan: pak.jabatan,
            jenjang_lama: pak.jenjang_jf || 'Mahir',
            jenjang_usulan: nextJenjang,
            catatan: jenis === 'jenjang'
                ? `Pengusulan Kenaikan Jenjang Jabatan Fungsional (${pak.jenjang_jf} ke ${nextJenjang}) berdasarkan Penetapan Angka Kredit (PAK) Konversi No. ${pak.nomor_pak || '-'} Periode ${pak.periode || '-'}. Total Angka Kredit Kumulatif: ${formatAk3(pak.jumlah_ak_diperoleh)} AK (Syarat Jenjang: ${formatAk3(pak.syarat_min_jenjang || 0)} AK, Surplus: +${formatAk3(pak.kelebihan_jenjang || 0)} AK).`
                : `Pengusulan Kenaikan Pangkat Jabatan Fungsional (${pak.pangkat} ke ${nextPangkat}) berdasarkan Penetapan Angka Kredit (PAK) Konversi No. ${pak.nomor_pak || '-'} Periode ${pak.periode || '-'}. Total Angka Kredit Kumulatif: ${formatAk3(pak.jumlah_ak_diperoleh)} AK (Syarat Pangkat: ${formatAk3(pak.syarat_min_pangkat || 0)} AK, Surplus: +${formatAk3(pak.kelebihan_pangkat || 0)} AK).`
        };

        // 1. Pindahkan tampilan ke Menu Usulan yang sesuai
        if (typeof window.showSection === 'function') {
            window.showSection(targetSection);
        }

        // 2. Buka modal pembuatan usulan dan isikan seluruh data otomatis
        setTimeout(() => {
            const targetNipOrNama = pak.nip || pak.nip_nrk || pak.nama;
            if (typeof window.openModalUsulan === 'function') {
                window.openModalUsulan(jenis, targetNipOrNama, extraData);
            }
            if (typeof showToast === 'function') {
                showToast(`Pegawai ${pak.nama} berhasil diarahkan ke Formulir Usulan ${jenis === 'jenjang' ? 'Kenaikan Jenjang' : 'Kenaikan Pangkat'} (Data PAK terhubung).`, "success");
            }
        }, 250);
    };

    window.arahkanActivePakKeUsulan = function(jenisPreferred) {
        const cur = getCurrentPak();
        if (cur) {
            window.arahkanPakKeUsulan(cur, jenisPreferred);
        }
    };

    window.arahkanSimulatorKeUsulan = function(jenis) {
        const modalSimEl = document.getElementById('modalSimulatorPakKonversi');
        const modalSimInst = bootstrap.Modal.getInstance(modalSimEl);
        if (modalSimInst) modalSimInst.hide();

        const pIdx = $('#sim_pak_pegawai').val();
        let targetPegawai = null;
        if (pIdx !== '' && window.dataPegawai && window.dataPegawai[pIdx]) {
            targetPegawai = window.dataPegawai[pIdx];
        }

        if (targetPegawai) {
            window.arahkanPakKeUsulan(targetPegawai.nip || targetPegawai.nama, jenis);
        } else {
            window.arahkanActivePakKeUsulan(jenis);
        }
    };

    window.simpanDanArahkanKeUsulan = function(jenis) {
        // Simpan form saat ini
        if (typeof window.saveFormPakKonversi === 'function') {
            window.saveFormPakKonversi();
        }
        setTimeout(() => {
            window.arahkanPakKeUsulan(currentPakId, jenis);
        }, 300);
    };

    // =========================================================================
    // MODUL EDIT TAHUN & RIWAYAT LEMBAR AKUMULASI ANGKA KREDIT (DOKUMEN 2)
    // =========================================================================
    let tempEditTahunRows = [];

    window.openModalEditTahunAkumulasi = function() {
        const pak = getCurrentPak();
        if (!pak) {
            if (typeof showToast === 'function') showToast("Pilih dokumen PAK terlebih dahulu", "warning");
            return;
        }

        // Tampilkan info pegawai
        $('#modal_edit_tahun_nama').text(pak.nama || '-');
        $('#modal_edit_tahun_nip').text(`NIP: ${pak.nip_nrk || pak.nip || '-'}`);
        $('#modal_edit_tahun_doc_no').text(`No. ${pak.nomor_akumulasi || '116/KG.04.04'}`);

        // Ambil riwayat akumulasi yang ada atau buat default
        const existingRows = (pak.riwayat_akumulasi && pak.riwayat_akumulasi.length > 0)
            ? pak.riwayat_akumulasi
            : [
                { tahun: "Lalu", periodik: "AK Konversi Lama (Tahun Lalu)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: pak.ak_konversi_lama || 123.303 },
                { tahun: "Berjalan", periodik: pak.periode || "1 Januari - 31 Desember 2025", predikat: pak.predikat_kinerja || "Baik", persentase: (pak.persentase_kinerja || 100) + "%", koefisien: formatAk3(pak.koefisien_tahunan || 12.5), ak_didapat: pak.ak_kinerja_didapat || 12.500 }
            ];

        tempEditTahunRows = JSON.parse(JSON.stringify(existingRows));

        // Periode header & Tanggal penetapan
        $('#modal_edit_tahun_periode_header').val(pak.periode || 'Januari s.d Desember 2025');
        $('#modal_edit_tahun_tgl_penetapan').val(pak.tanggal_penetapan || '2 Januari 2026');

        window.renderEditTahunTableBody();

        const modalEl = document.getElementById('modalEditTahunAkumulasi');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    window.renderEditTahunTableBody = function() {
        const tbody = document.getElementById('tbody_edit_tahun_akumulasi');
        if (!tbody) return;

        let html = '';
        tempEditTahunRows.forEach((r, idx) => {
            html += `
                <tr data-idx="${idx}">
                    <td>
                        <input type="text" class="form-control form-control-sm text-center fw-bold row-tahun-input" value="${r.tahun || ''}" placeholder="Tahun" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <input type="text" class="form-control form-control-sm row-periodik-input" value="${r.periodik || ''}" placeholder="Contoh: 1 Januari - 31 Desember 2025" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <input type="text" class="form-control form-control-sm text-center row-predikat-input" value="${r.predikat || '-'}" placeholder="Predikat" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <input type="text" class="form-control form-control-sm text-center row-persentase-input" value="${r.persentase || '-'}" placeholder="100%" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <input type="text" class="form-control form-control-sm text-center row-koefisien-input" value="${typeof r.koefisien === 'number' ? formatAk3(r.koefisien) : (r.koefisien || '-')}" placeholder="Koef" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <input type="number" step="0.001" class="form-control form-control-sm text-end fw-bold font-monospace row-ak-input" value="${r.ak_didapat !== undefined ? r.ak_didapat : 0}" oninput="window.updateEditTahunRowData(${idx})">
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-danger btn-xs py-1 px-2 rounded-circle" onclick="window.hapusBarisTahunAkumulasi(${idx})" title="Hapus baris ini" ${tempEditTahunRows.length <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
        window.calcEditTahunTotal();
    };

    window.updateEditTahunRowData = function(idx) {
        const rowEl = $(`#tbody_edit_tahun_akumulasi tr[data-idx="${idx}"]`);
        if (!rowEl.length || !tempEditTahunRows[idx]) return;

        tempEditTahunRows[idx].tahun = rowEl.find('.row-tahun-input').val().trim();
        tempEditTahunRows[idx].periodik = rowEl.find('.row-periodik-input').val().trim();
        tempEditTahunRows[idx].predikat = rowEl.find('.row-predikat-input').val().trim() || '-';
        tempEditTahunRows[idx].persentase = rowEl.find('.row-persentase-input').val().trim() || '-';
        tempEditTahunRows[idx].koefisien = rowEl.find('.row-koefisien-input').val().trim() || '-';
        const akVal = parseFloat(rowEl.find('.row-ak-input').val());
        tempEditTahunRows[idx].ak_didapat = isNaN(akVal) ? 0 : akVal;

        window.calcEditTahunTotal();
    };

    window.tambahBarisTahunAkumulasi = function() {
        const pak = getCurrentPak();
        const koefVal = pak ? (pak.koefisien_tahunan || 12.5) : 12.5;
        const nextYear = new Date().getFullYear();
        tempEditTahunRows.push({
            tahun: String(nextYear),
            periodik: `1 Januari - 31 Desember ${nextYear}`,
            predikat: "Baik",
            persentase: "100%",
            koefisien: formatAk3(koefVal),
            ak_didapat: koefVal
        });
        window.renderEditTahunTableBody();
    };

    window.hapusBarisTahunAkumulasi = function(idx) {
        if (tempEditTahunRows.length <= 1) return;
        tempEditTahunRows.splice(idx, 1);
        window.renderEditTahunTableBody();
    };

    window.calcEditTahunTotal = function() {
        let total = 0;
        tempEditTahunRows.forEach(r => {
            total += (parseFloat(r.ak_didapat) || 0);
        });
        $('#calc_total_ak_akumulasi').text(formatAk3(total));
    };

    window.applyPresetTahunAkumulasi = function(presetKey) {
        const pak = getCurrentPak();
        const akLama = pak ? (pak.ak_konversi_lama || 123.303) : 123.303;
        const koef = pak ? (pak.koefisien_tahunan || 12.5) : 12.5;
        const predikat = pak ? (pak.predikat_kinerja || 'Baik') : 'Baik';
        const pct = pak ? ((pak.persentase_kinerja || 100) + '%') : '100%';
        const akBerjalan = pak ? (pak.ak_kinerja_didapat || 12.5) : 12.5;

        if (presetKey === 'lalu_berjalan') {
            tempEditTahunRows = [
                { tahun: "Lalu", periodik: "AK Konversi Lama (Tahun Lalu)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "Berjalan", periodik: pak ? (pak.periode || "1 Januari - 31 Desember 2025") : "1 Januari - 31 Desember 2025", predikat: predikat, persentase: pct, koefisien: formatAk3(koef), ak_didapat: akBerjalan }
            ];
        } else if (presetKey === '2024_2025') {
            tempEditTahunRows = [
                { tahun: "2024", periodik: "AK Konversi Lama (s.d. 31 Desember 2024)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "2025", periodik: "1 Januari - 31 Desember 2025", predikat: predikat, persentase: pct, koefisien: formatAk3(koef), ak_didapat: akBerjalan }
            ];
            $('#modal_edit_tahun_periode_header').val("Januari s.d Desember 2025");
            $('#modal_edit_tahun_tgl_penetapan').val("2 Januari 2026");
        } else if (presetKey === '2025_2026') {
            tempEditTahunRows = [
                { tahun: "2025", periodik: "AK Konversi Lama (s.d. 31 Desember 2025)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "2026", periodik: "1 Januari - 31 Desember 2026", predikat: predikat, persentase: pct, koefisien: formatAk3(koef), ak_didapat: akBerjalan }
            ];
            $('#modal_edit_tahun_periode_header').val("Januari s.d Desember 2026");
            $('#modal_edit_tahun_tgl_penetapan').val("2 Januari 2027");
        } else if (presetKey === '2023_2024') {
            tempEditTahunRows = [
                { tahun: "2023", periodik: "AK Konversi Lama (s.d. 31 Desember 2023)", predikat: "-", persentase: "-", koefisien: "-", ak_didapat: akLama },
                { tahun: "2024", periodik: "1 Januari - 31 Desember 2024", predikat: predikat, persentase: pct, koefisien: formatAk3(koef), ak_didapat: akBerjalan }
            ];
            $('#modal_edit_tahun_periode_header').val("Januari s.d Desember 2024");
            $('#modal_edit_tahun_tgl_penetapan').val("2 Januari 2025");
        }

        window.renderEditTahunTableBody();
    };

    window.simpanTahunAkumulasi = function() {
        const pak = getCurrentPak();
        if (!pak) return;

        // Pastikan update data dari input terkini
        $('#tbody_edit_tahun_akumulasi tr').each(function() {
            const idx = parseInt($(this).attr('data-idx'), 10);
            if (!isNaN(idx) && tempEditTahunRows[idx]) {
                tempEditTahunRows[idx].tahun = $(this).find('.row-tahun-input').val().trim();
                tempEditTahunRows[idx].periodik = $(this).find('.row-periodik-input').val().trim();
                tempEditTahunRows[idx].predikat = $(this).find('.row-predikat-input').val().trim() || '-';
                tempEditTahunRows[idx].persentase = $(this).find('.row-persentase-input').val().trim() || '-';
                tempEditTahunRows[idx].koefisien = $(this).find('.row-koefisien-input').val().trim() || '-';
                const akVal = parseFloat($(this).find('.row-ak-input').val());
                tempEditTahunRows[idx].ak_didapat = isNaN(akVal) ? 0 : akVal;
            }
        });

        // Hitung total angka kredit
        let sumAk = 0;
        tempEditTahunRows.forEach(r => {
            sumAk += (parseFloat(r.ak_didapat) || 0);
        });

        pak.riwayat_akumulasi = JSON.parse(JSON.stringify(tempEditTahunRows));
        pak.jumlah_ak_diperoleh = sumAk;
        pak.ak_konversi_baru_pak = sumAk;
        pak.ak_konversi_jumlah_pak = sumAk;

        const periodeHeader = $('#modal_edit_tahun_periode_header').val().trim();
        if (periodeHeader) {
            pak.periode = periodeHeader;
        }

        const tglPenetapan = $('#modal_edit_tahun_tgl_penetapan').val().trim();
        if (tglPenetapan) {
            pak.tanggal_penetapan = tglPenetapan;
        }

        // Perbarui selisih kelebihan kenaikan pangkat & jenjang
        const info = HIERARKI_JF[pak.jenjang_jf] || HIERARKI_JF['Mahir'];
        pak.syarat_min_pangkat = info.pangkat_min || 50.0;
        pak.syarat_min_jenjang = info.jenjang_min || 100.0;
        pak.kelebihan_pangkat = sumAk - pak.syarat_min_pangkat;
        pak.kelebihan_jenjang = pak.syarat_min_jenjang ? (sumAk - pak.syarat_min_jenjang) : null;

        savePakData();
        window.renderPakKonversiUI();

        const modalEl = document.getElementById('modalEditTahunAkumulasi');
        if (modalEl) {
            const inst = bootstrap.Modal.getInstance(modalEl);
            if (inst) inst.hide();
        }

        if (window.Swal) {
            Swal.fire({
                icon: 'success',
                title: 'Tahun Akumulasi Berhasil Disimpan',
                text: 'Tabel Hasil Penilaian Kinerja pada Lembar Akumulasi Angka Kredit telah diperbarui.',
                timer: 2000,
                showConfirmButton: false
            });
        } else if (typeof showToast === 'function') {
            showToast("Tahun Akumulasi Angka Kredit berhasil diperbarui!", "success");
        }
    };

    // =========================================================================
    // MODUL REKAPAN NILAI AK KUMULATIF TIAP TAHUN UNTUK SEMUA PEGAWAI
    // =========================================================================
    const STORAGE_KEY_REKAP_AK = 'simpeg_rekap_ak_tahunan_custom';

    function getCustomRekapAkData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_REKAP_AK) || '{}');
        } catch(e) {
            return {};
        }
    }

    function saveCustomRekapAkData(data) {
        try {
            localStorage.setItem(STORAGE_KEY_REKAP_AK, JSON.stringify(data));
        } catch(e) {
            console.error('Gagal menyimpan custom rekap AK:', e);
        }
    }

    // Helper deterministik angka kredit baseline integrasi berdasarkan NIP/Index
    function generateBaselineAkIntegrasi(pegawai, info) {
        const str = (pegawai.nip || pegawai.NIP || pegawai.nama || '12345').toString();
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFF;
        }
        const delta = (hash % 1000) / 100.0; // 0.00 - 9.99

        const gol = (pegawai.pangkat_gol || pegawai.golongan || pegawai.pangkat || '').toUpperCase();
        if (gol.includes('IV/')) {
            return parseFloat((240 + delta * 8).toFixed(3)); // ~240 - 320
        } else if (gol.includes('III/C') || gol.includes('III/D')) {
            return parseFloat((120 + delta * 6).toFixed(3)); // ~120 - 180
        } else if (gol.includes('III/A') || gol.includes('III/B')) {
            return parseFloat((60 + delta * 4).toFixed(3));  // ~60 - 100
        } else {
            return parseFloat((20 + delta * 2).toFixed(3));  // ~20 - 40
        }
    }

    // Ekstrak informasi Jenjang Jabatan Fungsional & Matriks AK
    function resolveJfInfo(pegawai) {
        const jbt = (pegawai.jabatan || pegawai.jabatan_orb || '').toLowerCase();
        const gol = (pegawai.pangkat_gol || pegawai.golongan || pegawai.pangkat || '').toUpperCase();

        let jenjang = 'Mahir';
        let kategori = 'Keterampilan';

        if (jbt.includes('ahli utama') || gol.includes('IV/D') || gol.includes('IV/E')) {
            jenjang = 'Ahli Utama';
            kategori = 'Keahlian';
        } else if (jbt.includes('ahli madya') || gol.includes('IV/A') || gol.includes('IV/B') || gol.includes('IV/C')) {
            jenjang = 'Ahli Madya';
            kategori = 'Keahlian';
        } else if (jbt.includes('ahli muda') || gol.includes('III/C') || gol.includes('III/D')) {
            jenjang = 'Ahli Muda';
            kategori = 'Keahlian';
        } else if (jbt.includes('ahli pertama') || (jbt.includes('dokter') && !jbt.includes('perawat')) || gol.includes('III/A') || gol.includes('III/B')) {
            jenjang = 'Ahli Pertama';
            kategori = 'Keahlian';
        } else if (jbt.includes('penyelia')) {
            jenjang = 'Penyelia';
            kategori = 'Keterampilan';
        } else if (jbt.includes('mahir')) {
            jenjang = 'Mahir';
            kategori = 'Keterampilan';
        } else if (jbt.includes('terampil') || gol.includes('II/B') || gol.includes('II/C') || gol.includes('II/D')) {
            jenjang = 'Terampil';
            kategori = 'Keterampilan';
        } else if (jbt.includes('pemula') || gol.includes('II/A')) {
            jenjang = 'Pemula';
            kategori = 'Keterampilan';
        }

        const info = HIERARKI_JF[jenjang] || HIERARKI_JF['Mahir'];
        return {
            jenjang: jenjang,
            kategori: kategori,
            koefisien: info.koefisien,
            pangkat_min: info.pangkat_min,
            jenjang_min: info.jenjang_min
        };
    }

    // Mengumpulkan dan Menghitung Rekapitulasi AK Kumulatif Seluruh Pegawai
    window.getAllPegawaiAkTahunanList = function() {
        let rawList = [];
        if (window.dataPegawai && Array.isArray(window.dataPegawai) && window.dataPegawai.length > 0) {
            rawList = JSON.parse(JSON.stringify(window.dataPegawai));
        } else {
            try {
                const local = JSON.parse(localStorage.getItem('simpeg_pkss_pegawai_db') || '[]');
                if (Array.isArray(local) && local.length > 0) {
                    rawList = local;
                }
            } catch(e) {}
        }

        // Jika dataPegawai masih kosong, fallback gunakan data komprehensif dari pakList
        if (rawList.length === 0 && pakList.length > 0) {
            rawList = pakList.map(p => ({
                nama: p.nama,
                nip: p.nip || p.nip_nrk,
                nrk: p.nrk,
                jabatan: p.jabatan,
                pangkat_gol: p.pangkat,
                status_pegawai: 'PNS'
            }));
        }

        // Pastikan semua pegawai yang ada di pakList terdaftar di rekap
        pakList.forEach(item => {
            const itemNip = (item.nip || item.nip_nrk || '').toString().trim().toLowerCase();
            const itemNama = (item.nama || '').trim().toLowerCase();
            const exists = rawList.some(p => {
                const pNip = (p.nip || p.NIP || '').toString().trim().toLowerCase();
                const pNama = (p.nama || '').trim().toLowerCase();
                return (itemNip && pNip && itemNip === pNip) || (itemNama && pNama && itemNama === pNama);
            });
            if (!exists) {
                rawList.push({
                    nama: item.nama,
                    nip: item.nip || item.nip_nrk,
                    nrk: item.nrk,
                    jabatan: item.jabatan,
                    pangkat_gol: item.pangkat,
                    status_pegawai: 'PNS'
                });
            }
        });

        const customData = getCustomRekapAkData();
        const results = [];

        rawList.forEach((pegawai, pIdx) => {
            const pNip = (pegawai.nip || pegawai.NIP || '').toString().trim();
            const pNama = (pegawai.nama || '').trim();
            const uniqueKey = pNip ? ('nip_' + pNip) : ('nama_' + pNama.replace(/[^a-zA-Z0-9]/g, '_'));

            const jfInfo = resolveJfInfo(pegawai);
            const koef = jfInfo.koefisien;

            // 1. Cek apakah ada Dokumen PAK Resmi yang sudah terbit di pakList
            let linkedPak = null;
            if (pakList && pakList.length > 0) {
                linkedPak = pakList.find(item => {
                    const iNip = (item.nip || item.nip_nrk || '').toString().trim().toLowerCase();
                    const iNama = (item.nama || '').trim().toLowerCase();
                    return (pNip && iNip && pNip.toLowerCase() === iNip) || (pNama && iNama && pNama.toLowerCase() === iNama);
                });
            }

            // 2. Tentukan Angka Kredit Tiap Periode
            let ak_lama = 0;
            let pred_2023 = 'baik';
            let ak_2023 = koef;
            let pred_2024 = 'baik';
            let ak_2024 = koef;
            let pred_2025 = 'baik';
            let ak_2025 = koef;
            let bulan_2026 = 3; // TW 1
            let pred_2026 = 'baik';
            let ak_2026 = parseFloat((koef * (bulan_2026 / 12)).toFixed(3));

            if (linkedPak) {
                // Ambil data resmi dari lembar akumulasi dokumen PAK
                if (linkedPak.riwayat_akumulasi && linkedPak.riwayat_akumulasi.length > 0) {
                    const row0 = linkedPak.riwayat_akumulasi[0];
                    ak_lama = parseFloat(row0.ak_didapat) || parseFloat(linkedPak.ak_konversi_lama_pak) || parseFloat(linkedPak.ak_integrasi_lama) || 0;

                    // Cari tahun-tahun di riwayat akumulasi
                    linkedPak.riwayat_akumulasi.forEach((r, rIdx) => {
                        if (rIdx === 0) return; // Row 0 adalah AK Konversi Lama
                        const th = (r.tahun || '').toString().trim();
                        const akVal = parseFloat(r.ak_didapat) || 0;
                        if (th === '2023') ak_2023 = akVal;
                        else if (th === '2024') ak_2024 = akVal;
                        else if (th === '2025') ak_2025 = akVal;
                        else if (th === '2026') ak_2026 = akVal;
                    });
                } else {
                    ak_lama = parseFloat(linkedPak.ak_konversi_lama_pak) || parseFloat(linkedPak.ak_integrasi_lama) || 0;
                    ak_2025 = parseFloat(linkedPak.ak_kinerja_didapat) || koef;
                }
            } else {
                // Nilai baseline terstandar
                ak_lama = generateBaselineAkIntegrasi(pegawai, jfInfo);
                ak_2023 = parseFloat(koef.toFixed(3));
                ak_2024 = parseFloat(koef.toFixed(3));
                ak_2025 = parseFloat(koef.toFixed(3));
                ak_2026 = parseFloat((koef * 0.25).toFixed(3));
            }

            // 3. Timpa jika ada custom override yang disimpan pengguna
            if (customData[uniqueKey]) {
                const c = customData[uniqueKey];
                if (c.ak_lama !== undefined) ak_lama = parseFloat(c.ak_lama) || 0;
                if (c.pred_2023) pred_2023 = c.pred_2023;
                if (c.ak_2023 !== undefined) ak_2023 = parseFloat(c.ak_2023) || 0;
                if (c.pred_2024) pred_2024 = c.pred_2024;
                if (c.ak_2024 !== undefined) ak_2024 = parseFloat(c.ak_2024) || 0;
                if (c.pred_2025) pred_2025 = c.pred_2025;
                if (c.ak_2025 !== undefined) ak_2025 = parseFloat(c.ak_2025) || 0;
                if (c.bulan_2026 !== undefined) bulan_2026 = parseInt(c.bulan_2026, 10) || 3;
                if (c.pred_2026) pred_2026 = c.pred_2026;
                if (c.ak_2026 !== undefined) ak_2026 = parseFloat(c.ak_2026) || 0;
            }

            const total_ak = parseFloat((ak_lama + ak_2023 + ak_2024 + ak_2025 + ak_2026).toFixed(3));
            const syarat_pangkat = jfInfo.pangkat_min;
            const syarat_jenjang = jfInfo.jenjang_min;
            const kelebihan_pangkat = parseFloat((total_ak - syarat_pangkat).toFixed(3));
            const kelebihan_jenjang = syarat_jenjang ? parseFloat((total_ak - syarat_jenjang).toFixed(3)) : null;

            let status_kelayakan = 'belum_memenuhi';
            let status_label = 'Belum Cukup';
            let status_badge = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';

            const isMemenuhiPangkat = kelebihan_pangkat >= 0;
            const isMemenuhiJenjang = syarat_jenjang && kelebihan_jenjang >= 0;

            if (isMemenuhiPangkat && isMemenuhiJenjang) {
                status_kelayakan = 'memenuhi_semua';
                status_label = 'Memenuhi Pangkat & Jenjang';
                status_badge = 'bg-success text-white shadow-xs';
            } else if (isMemenuhiJenjang) {
                status_kelayakan = 'memenuhi_jenjang';
                status_label = 'Memenuhi Syarat Jenjang';
                status_badge = 'bg-primary text-white shadow-xs';
            } else if (isMemenuhiPangkat) {
                status_kelayakan = 'memenuhi_pangkat';
                status_label = 'Memenuhi Syarat Pangkat';
                status_badge = 'bg-success-subtle text-success-emphasis border border-success-subtle';
            }

            results.push({
                index: pIdx,
                unique_key: uniqueKey,
                pegawai: pegawai,
                nama: pNama,
                nip: pNip,
                nrk: pegawai.nrk || '-',
                jabatan: pegawai.jabatan || pegawai.jabatan_orb || jfInfo.jenjang,
                status_pegawai: (pegawai.status_pegawai || 'PNS').toUpperCase(),
                golongan: pegawai.pangkat_gol || pegawai.golongan || pegawai.pangkat || 'III/a',
                jenjang_jf: jfInfo.jenjang,
                kategori_jf: jfInfo.kategori,
                koefisien: koef,
                ak_lama: ak_lama,
                pred_2023: pred_2023,
                ak_2023: ak_2023,
                pred_2024: pred_2024,
                ak_2024: ak_2024,
                pred_2025: pred_2025,
                ak_2025: ak_2025,
                bulan_2026: bulan_2026,
                pred_2026: pred_2026,
                ak_2026: ak_2026,
                total_ak: total_ak,
                syarat_pangkat: syarat_pangkat,
                syarat_jenjang: syarat_jenjang,
                kelebihan_pangkat: kelebihan_pangkat,
                kelebihan_jenjang: kelebihan_jenjang,
                status_kelayakan: status_kelayakan,
                status_label: status_label,
                status_badge: status_badge,
                linked_pak: linkedPak
            });
        });

        return results;
    };

    // Render Tabel & KPI Rekapitulasi AK Kumulatif Tahunan
    window.renderRekapAkTahunanUI = function() {
        const tbody = document.getElementById('tbody_rekap_ak_tahunan');
        if (!tbody) return;

        const allList = window.getAllPegawaiAkTahunanList();

        // 1. Update 4 Kartu Metrik Ringkasan KPI
        const totalPegawai = allList.length;
        const totalMemenuhiPangkat = allList.filter(i => i.kelebihan_pangkat >= 0).length;
        const totalMemenuhiJenjang = allList.filter(i => i.syarat_jenjang && i.kelebihan_jenjang >= 0).length;
        const sumTotalAk = allList.reduce((acc, curr) => acc + curr.total_ak, 0);
        const rataAk = totalPegawai > 0 ? (sumTotalAk / totalPegawai) : 0;

        const elTotal = document.getElementById('rekap_kpi_total_pegawai');
        if (elTotal) elTotal.textContent = totalPegawai;

        const elPangkat = document.getElementById('rekap_kpi_memenuhi_pangkat');
        if (elPangkat) elPangkat.textContent = totalMemenuhiPangkat;

        const elJenjang = document.getElementById('rekap_kpi_memenuhi_jenjang');
        if (elJenjang) elJenjang.textContent = totalMemenuhiJenjang;

        const elRata = document.getElementById('rekap_kpi_rata_ak');
        if (elRata) elRata.textContent = formatAk3(rataAk);

        // 2. Filter Tabel
        const searchVal = ($('#filter_rekap_search').val() || '').toLowerCase().trim();
        const statusVal = $('#filter_rekap_status').val() || 'all';
        const jenjangVal = $('#filter_rekap_jenjang').val() || 'all';
        const kepegawaianVal = $('#filter_rekap_kepegawaian').val() || 'all';

        const filteredList = allList.filter(item => {
            // Filter Search
            const matchSearch = !searchVal ||
                item.nama.toLowerCase().includes(searchVal) ||
                item.nip.toLowerCase().includes(searchVal) ||
                item.jabatan.toLowerCase().includes(searchVal);

            // Filter Status Kelayakan
            let matchStatus = true;
            if (statusVal === 'memenuhi_pangkat') {
                matchStatus = item.kelebihan_pangkat >= 0;
            } else if (statusVal === 'memenuhi_jenjang') {
                matchStatus = item.syarat_jenjang && item.kelebihan_jenjang >= 0;
            } else if (statusVal === 'memenuhi_semua') {
                matchStatus = item.kelebihan_pangkat >= 0 && (item.syarat_jenjang && item.kelebihan_jenjang >= 0);
            } else if (statusVal === 'belum_memenuhi') {
                matchStatus = item.kelebihan_pangkat < 0;
            }

            // Filter Jenjang JF
            let matchJenjang = true;
            if (jenjangVal !== 'all') {
                matchJenjang = item.jenjang_jf.toLowerCase() === jenjangVal.toLowerCase();
            }

            // Filter Kepegawaian
            let matchKepegawaian = true;
            if (kepegawaianVal !== 'all') {
                matchKepegawaian = item.status_pegawai.toLowerCase().includes(kepegawaianVal.toLowerCase());
            }

            return matchSearch && matchStatus && matchJenjang && matchKepegawaian;
        });

        // 3. Render Baris Tabel
        if (filteredList.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="13" class="text-center py-5 text-muted">
                        <i class="fas fa-search-minus fa-2x mb-2 d-block text-secondary opacity-50"></i>
                        Tidak ada data pegawai yang sesuai dengan kriteria filter atau pencarian.
                    </td>
                </tr>
            `;
        } else {
            let html = '';
            filteredList.forEach((item, idx) => {
                const isPakActive = item.linked_pak && item.linked_pak.id === currentPakId ? 'table-success bg-opacity-10' : '';
                const hasPak = !!item.linked_pak;

                html += `
                    <tr class="${isPakActive}">
                        <td class="text-center fw-semibold">${idx + 1}</td>
                        <td>
                            <div class="fw-bold text-dark">${item.nama}</div>
                            <div class="small text-muted font-monospace">${item.nip || 'Non-NIP'}</div>
                            <span class="badge bg-light text-secondary border px-1.5 py-0.5 mt-0.5" style="font-size: 0.72rem;">${item.status_pegawai}</span>
                            ${hasPak ? `<span class="badge bg-success-subtle text-success border border-success-subtle px-1.5 py-0.5 ms-1" style="font-size: 0.7rem;"><i class="fas fa-file-check me-0.5"></i>PAK Terbit</span>` : ''}
                        </td>
                        <td>
                            <div class="small fw-semibold text-dark">${item.jabatan}</div>
                            <div class="d-flex align-items-center gap-1 mt-0.5">
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-0.5" style="font-size: 0.73rem;">
                                    ${item.jenjang_jf}
                                </span>
                                <span class="text-muted font-monospace" style="font-size: 0.72rem;" title="Koefisien Angka Kredit Tahunan">(Koef: ${formatAk3(item.koefisien)})</span>
                            </div>
                        </td>
                        <td class="text-center">
                            <span class="badge bg-light text-dark border px-2 py-1 font-monospace" style="font-size: 0.78rem;">
                                ${item.golongan}
                            </span>
                        </td>
                        <td class="text-end font-monospace text-secondary">${formatAk3(item.ak_lama)}</td>
                        <td class="text-end font-monospace text-dark">${formatAk3(item.ak_2023)}</td>
                        <td class="text-end font-monospace text-dark">${formatAk3(item.ak_2024)}</td>
                        <td class="text-end font-monospace text-dark">${formatAk3(item.ak_2025)}</td>
                        <td class="text-end font-monospace text-dark bg-warning bg-opacity-10">
                            ${formatAk3(item.ak_2026)}
                            <small class="d-block text-muted" style="font-size: 0.68rem;">(${item.bulan_2026} bln)</small>
                        </td>
                        <td class="text-end font-monospace fw-bold fs-6 bg-success bg-opacity-10 text-success">
                            ${formatAk3(item.total_ak)}
                        </td>
                        <td class="text-center font-monospace" style="font-size: 0.78rem;">
                            <div>P: <strong>${formatAk3(item.syarat_pangkat)}</strong></div>
                            <div class="text-muted">J: <strong>${item.syarat_jenjang ? formatAk3(item.syarat_jenjang) : '-'}</strong></div>
                        </td>
                        <td class="text-center">
                            <span class="badge ${item.status_badge} px-2.5 py-1 text-wrap" style="font-size: 0.75rem;">
                                ${item.status_label}
                            </span>
                            <div class="font-monospace text-muted mt-0.5" style="font-size: 0.7rem;">
                                Selisih KP: ${item.kelebihan_pangkat >= 0 ? '+' : ''}${formatAk3(item.kelebihan_pangkat)}
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <button type="button" class="btn btn-outline-success px-2 py-1" title="${hasPak ? 'Buka Dokumen PAK Resmi' : 'Buat Dokumen PAK dari Data Ini'}" onclick="window.bukaAtauBuatPakDariRekap('${item.unique_key}')">
                                    <i class="fas ${hasPak ? 'fa-file-signature text-success' : 'fa-plus text-primary'}"></i>
                                </button>
                                <button type="button" class="btn btn-outline-secondary px-2 py-1" title="Rincian & Sesuaikan Nilai AK Tahunan" onclick="window.openModalDetailAkTahunan('${item.unique_key}')">
                                    <i class="fas fa-edit text-dark"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        // 4. Update TFoot Totals & Averages
        const tfoot = document.getElementById('tfoot_rekap_ak_tahunan');
        if (tfoot) {
            let sumLama = 0, sum2023 = 0, sum2024 = 0, sum2025 = 0, sum2026 = 0, sumTotal = 0;
            filteredList.forEach(i => {
                sumLama += i.ak_lama;
                sum2023 += i.ak_2023;
                sum2024 += i.ak_2024;
                sum2025 += i.ak_2025;
                sum2026 += i.ak_2026;
                sumTotal += i.total_ak;
            });

            tfoot.innerHTML = `
                <tr class="table-light">
                    <td colspan="4" class="text-end py-2">TOTAL AKUMULASI KESELURUHAN :</td>
                    <td class="text-end font-monospace text-secondary">${formatAk3(sumLama)}</td>
                    <td class="text-end font-monospace">${formatAk3(sum2023)}</td>
                    <td class="text-end font-monospace">${formatAk3(sum2024)}</td>
                    <td class="text-end font-monospace">${formatAk3(sum2025)}</td>
                    <td class="text-end font-monospace">${formatAk3(sum2026)}</td>
                    <td class="text-end font-monospace text-success fs-6">${formatAk3(sumTotal)}</td>
                    <td colspan="3"></td>
                </tr>
                <tr class="table-light text-muted" style="font-size: 0.76rem;">
                    <td colspan="4" class="text-end py-1">RATA-RATA PER PEGAWAI :</td>
                    <td class="text-end font-monospace">${formatAk3(filteredList.length ? sumLama / filteredList.length : 0)}</td>
                    <td class="text-end font-monospace">${formatAk3(filteredList.length ? sum2023 / filteredList.length : 0)}</td>
                    <td class="text-end font-monospace">${formatAk3(filteredList.length ? sum2024 / filteredList.length : 0)}</td>
                    <td class="text-end font-monospace">${formatAk3(filteredList.length ? sum2025 / filteredList.length : 0)}</td>
                    <td class="text-end font-monospace">${formatAk3(filteredList.length ? sum2026 / filteredList.length : 0)}</td>
                    <td class="text-end font-monospace text-success">${formatAk3(filteredList.length ? sumTotal / filteredList.length : 0)}</td>
                    <td colspan="3"></td>
                </tr>
            `;
        }

        const infoPagination = document.getElementById('rekap_pagination_info');
        if (infoPagination) {
            infoPagination.textContent = `Menampilkan ${filteredList.length} dari total ${allList.length} pegawai fungsional`;
        }
    };

    // Scroll mulus ke Card Rekapan Nilai AK Kumulatif
    window.scrollToRekapAkTahunan = function() {
        const el = document.getElementById('card_rekap_ak_tahunan_semua');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('shadow-lg');
            setTimeout(() => {
                el.classList.remove('shadow-lg');
            }, 1800);
        }
    };

    // Reset Filter
    window.resetFilterRekapAkTahunan = function() {
        $('#filter_rekap_search').val('');
        $('#filter_rekap_status').val('all');
        $('#filter_rekap_jenjang').val('all');
        $('#filter_rekap_kepegawaian').val('all');
        window.renderRekapAkTahunanUI();
    };

    // Modal Detail & Edit Riwayat Nilai AK Tiap Tahun
    let currentDetailRecord = null;

    window.openModalDetailAkTahunan = function(uniqueKey) {
        const allList = window.getAllPegawaiAkTahunanList();
        const record = allList.find(r => r.unique_key === uniqueKey);
        if (!record) return;

        currentDetailRecord = record;

        $('#modal_rekap_pegawai_id').val(uniqueKey);
        $('#modal_rekap_nama').text(record.nama);
        $('#modal_rekap_nip_nrk').text(`NIP: ${record.nip || '-'} | NRK: ${record.nrk || '-'}`);
        $('#modal_rekap_jabatan_display').text(`${record.jabatan} (Kategori ${record.kategori_jf})`);
        $('#modal_rekap_gol_display').text(`Gol. ${record.golongan} (${record.jenjang_jf})`);
        $('#modal_rekap_koef_display').text(`Koefisien: ${formatAk3(record.koefisien)} / tahun`);

        const avatarInitial = (record.nama || 'P').charAt(0).toUpperCase();
        $('#modal_rekap_avatar').text(avatarInitial);

        $('#modal_rekap_ak_lama').val(record.ak_lama);
        $('#modal_rekap_pred_2023').val(record.pred_2023 || 'baik');
        $('#modal_rekap_ak_2023').val(record.ak_2023);

        $('#modal_rekap_pred_2024').val(record.pred_2024 || 'baik');
        $('#modal_rekap_ak_2024').val(record.ak_2024);

        $('#modal_rekap_pred_2025').val(record.pred_2025 || 'baik');
        $('#modal_rekap_ak_2025').val(record.ak_2025);

        $('#modal_rekap_bulan_2026').val(record.bulan_2026 || 3);
        $('#modal_rekap_pred_2026').val(record.pred_2026 || 'baik');
        $('#modal_rekap_ak_2026').val(record.ak_2026);

        window.calcModalRekapTotal();

        const modalEl = document.getElementById('modalDetailAkTahunanPegawai');
        if (modalEl) {
            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        }
    };

    window.handleModalPredChange = function(year) {
        if (!currentDetailRecord) return;
        const koef = currentDetailRecord.koefisien;

        function getMultiplier(predVal) {
            if (predVal === 'sangat_baik') return 1.5;
            if (predVal === 'baik') return 1.0;
            if (predVal === 'butuh_perbaikan') return 0.75;
            if (predVal === 'kurang') return 0.5;
            return 1.0;
        }

        if (year === '2023') {
            const pred = $('#modal_rekap_pred_2023').val();
            if (pred !== 'custom') {
                const mult = getMultiplier(pred);
                $('#modal_rekap_persen_2023').text((mult * 100) + '%');
                $('#modal_rekap_ak_2023').val(parseFloat((koef * mult).toFixed(3)));
            }
        } else if (year === '2024') {
            const pred = $('#modal_rekap_pred_2024').val();
            if (pred !== 'custom') {
                const mult = getMultiplier(pred);
                $('#modal_rekap_persen_2024').text((mult * 100) + '%');
                $('#modal_rekap_ak_2024').val(parseFloat((koef * mult).toFixed(3)));
            }
        } else if (year === '2025') {
            const pred = $('#modal_rekap_pred_2025').val();
            if (pred !== 'custom') {
                const mult = getMultiplier(pred);
                $('#modal_rekap_persen_2025').text((mult * 100) + '%');
                $('#modal_rekap_ak_2025').val(parseFloat((koef * mult).toFixed(3)));
            }
        } else if (year === '2026') {
            const pred = $('#modal_rekap_pred_2026').val();
            const bulan = parseInt($('#modal_rekap_bulan_2026').val(), 10) || 3;
            if (pred !== 'custom') {
                const mult = getMultiplier(pred);
                const akVal = parseFloat((koef * mult * (bulan / 12)).toFixed(3));
                $('#modal_rekap_persen_2026').text(`${mult * 100}% (${bulan} bln)`);
                $('#modal_rekap_ak_2026').val(akVal);
            }
        }

        window.calcModalRekapTotal();
    };

    window.calcModalRekapTotal = function() {
        if (!currentDetailRecord) return;

        const lama = parseFloat($('#modal_rekap_ak_lama').val()) || 0;
        const ak23 = parseFloat($('#modal_rekap_ak_2023').val()) || 0;
        const ak24 = parseFloat($('#modal_rekap_ak_2024').val()) || 0;
        const ak25 = parseFloat($('#modal_rekap_ak_2025').val()) || 0;
        const ak26 = parseFloat($('#modal_rekap_ak_2026').val()) || 0;

        const total = parseFloat((lama + ak23 + ak24 + ak25 + ak26).toFixed(3));
        $('#modal_rekap_total_ak').text(formatAk3(total));

        const syaratP = currentDetailRecord.syarat_pangkat;
        const syaratJ = currentDetailRecord.syarat_jenjang;
        const diffP = parseFloat((total - syaratP).toFixed(3));
        const diffJ = syaratJ ? parseFloat((total - syaratJ).toFixed(3)) : null;

        $('#modal_syarat_pangkat_min').text(formatAk3(syaratP));
        $('#modal_syarat_jenjang_min').text(syaratJ ? formatAk3(syaratJ) : '-');

        // Status Pangkat
        const badgeP = $('#modal_badge_status_pangkat');
        const infoP = $('#modal_info_kelebihan_pangkat');
        if (diffP >= 0) {
            badgeP.attr('class', 'badge bg-success').text('Memenuhi Syarat');
            infoP.attr('class', 'small text-success fw-bold').text(`Kelebihan AK: +${formatAk3(diffP)}`);
        } else {
            badgeP.attr('class', 'badge bg-warning text-dark').text('Belum Cukup');
            infoP.attr('class', 'small text-danger').text(`Kekurangan AK: ${formatAk3(diffP)}`);
        }

        // Status Jenjang
        const badgeJ = $('#modal_badge_status_jenjang');
        const infoJ = $('#modal_info_kelebihan_jenjang');
        if (syaratJ) {
            if (diffJ >= 0) {
                badgeJ.attr('class', 'badge bg-primary').text('Memenuhi Syarat');
                infoJ.attr('class', 'small text-primary fw-bold').text(`Kelebihan AK: +${formatAk3(diffJ)} (Siap Uji Kompetensi)`);
            } else {
                badgeJ.attr('class', 'badge bg-secondary').text('Belum Cukup');
                infoJ.attr('class', 'small text-muted').text(`Kekurangan AK: ${formatAk3(diffJ)}`);
            }
        } else {
            badgeJ.attr('class', 'badge bg-light text-muted border').text('Jenjang Tertinggi / N/A');
            infoJ.attr('class', 'small text-muted').text('Tidak ada jenjang di atasnya');
        }
    };

    window.saveModalDetailAkTahunan = function() {
        if (!currentDetailRecord) return;
        const uniqueKey = currentDetailRecord.unique_key;

        const customData = getCustomRekapAkData();
        customData[uniqueKey] = {
            ak_lama: parseFloat($('#modal_rekap_ak_lama').val()) || 0,
            pred_2023: $('#modal_rekap_pred_2023').val(),
            ak_2023: parseFloat($('#modal_rekap_ak_2023').val()) || 0,
            pred_2024: $('#modal_rekap_pred_2024').val(),
            ak_2024: parseFloat($('#modal_rekap_ak_2024').val()) || 0,
            pred_2025: $('#modal_rekap_pred_2025').val(),
            ak_2025: parseFloat($('#modal_rekap_ak_2025').val()) || 0,
            bulan_2026: parseInt($('#modal_rekap_bulan_2026').val(), 10) || 3,
            pred_2026: $('#modal_rekap_pred_2026').val(),
            ak_2026: parseFloat($('#modal_rekap_ak_2026').val()) || 0,
            updated_at: new Date().toISOString()
        };

        saveCustomRekapAkData(customData);

        // Jika pegawai ini sudah memiliki dokumen di pakList, sinkronkan riwayat akumulasinya!
        if (currentDetailRecord.linked_pak) {
            const targetPak = currentDetailRecord.linked_pak;
            const updatedRows = [
                {
                    tahun: "s.d 2022",
                    periodik: "AK Konversi Lama",
                    predikat: "-",
                    persentase: "-",
                    koefisien: "-",
                    ak_didapat: customData[uniqueKey].ak_lama
                },
                {
                    tahun: "2023",
                    periodik: "Januari s.d Desember 2023",
                    predikat: (customData[uniqueKey].pred_2023 || 'Baik').toUpperCase(),
                    persentase: "100%",
                    koefisien: formatAk3(currentDetailRecord.koefisien),
                    ak_didapat: customData[uniqueKey].ak_2023
                },
                {
                    tahun: "2024",
                    periodik: "Januari s.d Desember 2024",
                    predikat: (customData[uniqueKey].pred_2024 || 'Baik').toUpperCase(),
                    persentase: "100%",
                    koefisien: formatAk3(currentDetailRecord.koefisien),
                    ak_didapat: customData[uniqueKey].ak_2024
                },
                {
                    tahun: "2025",
                    periodik: "Januari s.d Desember 2025",
                    predikat: (customData[uniqueKey].pred_2025 || 'Baik').toUpperCase(),
                    persentase: "100%",
                    koefisien: formatAk3(currentDetailRecord.koefisien),
                    ak_didapat: customData[uniqueKey].ak_2025
                },
                {
                    tahun: "2026",
                    periodik: `Januari s.d ${customData[uniqueKey].bulan_2026 === 3 ? 'Maret' : (customData[uniqueKey].bulan_2026 + ' Bulan')} 2026`,
                    predikat: (customData[uniqueKey].pred_2026 || 'Baik').toUpperCase(),
                    persentase: `${customData[uniqueKey].bulan_2026 * 100 / 12}%`,
                    koefisien: formatAk3(currentDetailRecord.koefisien),
                    ak_didapat: customData[uniqueKey].ak_2026
                }
            ];

            const sumTotal = updatedRows.reduce((acc, r) => acc + (parseFloat(r.ak_didapat) || 0), 0);
            targetPak.riwayat_akumulasi = updatedRows;
            targetPak.jumlah_ak_diperoleh = sumTotal;
            targetPak.ak_konversi_baru_pak = sumTotal;
            targetPak.ak_konversi_jumlah_pak = sumTotal;
            targetPak.ak_integrasi_lama = customData[uniqueKey].ak_lama;
            targetPak.ak_konversi_lama_pak = customData[uniqueKey].ak_lama;
            targetPak.kelebihan_pangkat = sumTotal - targetPak.syarat_min_pangkat;
            if (targetPak.syarat_min_jenjang) {
                targetPak.kelebihan_jenjang = sumTotal - targetPak.syarat_min_jenjang;
            }

            savePakData();
        }

        // Tutup modal
        const modalEl = document.getElementById('modalDetailAkTahunanPegawai');
        if (modalEl) {
            const inst = bootstrap.Modal.getInstance(modalEl);
            if (inst) inst.hide();
        }

        window.renderRekapAkTahunanUI();
        window.renderPakKonversiUI();

        if (window.Swal) {
            Swal.fire({
                icon: 'success',
                title: 'Data AK Tahunan Berhasil Disimpan',
                text: `Angka Kredit tahunan untuk ${currentDetailRecord.nama} telah diperbarui dan disinkronkan ke Dokumen PAK.`,
                timer: 2000,
                showConfirmButton: false
            });
        } else if (typeof showToast === 'function') {
            showToast("Data AK Tahunan berhasil diperbarui!", "success");
        }
    };

    window.bukaDokumenPakDariModalRekap = function() {
        if (!currentDetailRecord) return;
        const key = currentDetailRecord.unique_key;

        // Tutup modal dulu
        const modalEl = document.getElementById('modalDetailAkTahunanPegawai');
        if (modalEl) {
            const inst = bootstrap.Modal.getInstance(modalEl);
            if (inst) inst.hide();
        }

        window.bukaAtauBuatPakDariRekap(key);
    };

    // Buka atau Buat Dokumen PAK Resmi dari Tabel Rekap
    window.bukaAtauBuatPakDariRekap = function(uniqueKey) {
        const allList = window.getAllPegawaiAkTahunanList();
        const item = allList.find(r => r.unique_key === uniqueKey);
        if (!item) return;

        if (item.linked_pak) {
            // Sudah punya dokumen PAK resmi: langsung aktifkan dan tampilkan
            currentPakId = item.linked_pak.id;
            window.renderPakKonversiUI();

            const previewCard = document.getElementById('section_doc_view');
            if (previewCard) {
                previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (typeof showToast === 'function') {
                showToast(`Menampilkan Dokumen PAK Resmi untuk ${item.nama}`, "info");
            }
        } else {
            // Belum punya: otomatis buat dokumen PAK resmi baru dengan data akumulasi tahunan ini!
            const newId = "PAK-" + new Date().getFullYear() + "-" + String(pakList.length + 1).padStart(3, '0');
            const noKonv = `${115 + pakList.length}/KG.04.04`;
            const noAkum = `${116 + pakList.length}/KG.04.04`;
            const noPak = `${117 + pakList.length}/KG.04.04`;

            const riwayatAkumulasi = [
                {
                    tahun: "s.d 2022",
                    periodik: "AK Konversi Lama",
                    predikat: "-",
                    persentase: "-",
                    koefisien: "-",
                    ak_didapat: item.ak_lama
                },
                {
                    tahun: "2023",
                    periodik: "Januari s.d Desember 2023",
                    predikat: "BAIK",
                    persentase: "100%",
                    koefisien: formatAk3(item.koefisien),
                    ak_didapat: item.ak_2023
                },
                {
                    tahun: "2024",
                    periodik: "Januari s.d Desember 2024",
                    predikat: "BAIK",
                    persentase: "100%",
                    koefisien: formatAk3(item.koefisien),
                    ak_didapat: item.ak_2024
                },
                {
                    tahun: "2025",
                    periodik: "Januari s.d Desember 2025",
                    predikat: "BAIK",
                    persentase: "100%",
                    koefisien: formatAk3(item.koefisien),
                    ak_didapat: item.ak_2025
                },
                {
                    tahun: "2026",
                    periodik: `Januari s.d ${item.bulan_2026 === 3 ? 'Maret' : (item.bulan_2026 + ' Bulan')} 2026`,
                    predikat: "BAIK",
                    persentase: `${item.bulan_2026 * 100 / 12}%`,
                    koefisien: formatAk3(item.koefisien),
                    ak_didapat: item.ak_2026
                }
            ];

            const newPak = {
                id: newId,
                nomor_konversi: noKonv,
                nomor_akumulasi: noAkum,
                nomor_pak: noPak,
                instansi: "Dinas Kesehatan Provinsi DKI Jakarta",
                periode: "Januari s.d Desember 2025",
                nama: item.nama,
                nip_nrk: `${item.nip} / ${item.nrk}`,
                nip: item.nip,
                nrk: item.nrk,
                karpeg: item.pegawai.karpeg || "Q 123456",
                tempat_tgl_lahir: (item.pegawai.tempat_lahir ? `${item.pegawai.tempat_lahir}, ${item.pegawai.tanggal_lahir || ''}` : "Jakarta"),
                jenis_kelamin: item.pegawai.jenis_kelamin || "Perempuan",
                pendidikan: item.pegawai.pendidikan || "S-1 Keperawatan / Profesi",
                pangkat_gol_tmt: `${item.golongan} / 01.04.2023`,
                pangkat: item.golongan,
                tmt_pangkat: "01.04.2023",
                jabatan_tmt: `${item.jabatan} / 01.01.2022`,
                jabatan: item.jabatan,
                tmt_jabatan: "01.01.2022",
                unit_kerja: "Puskesmas Kepulauan Seribu Selatan",
                instansi_pegawai: "Dinas Kesehatan Provinsi DKI Jakarta",
                kategori_jf: item.kategori_jf,
                jenjang_jf: item.jenjang_jf,
                predikat_kinerja: "Baik",
                persentase_kinerja: 100,
                koefisien_tahunan: item.koefisien,
                ak_kinerja_didapat: item.ak_2025,
                durasi_bulan: 12,
                riwayat_akumulasi: riwayatAkumulasi,
                ak_integrasi_lama: item.ak_lama,
                ak_penyesuaian: 0,
                ak_konversi_lama_pak: item.ak_lama,
                ak_konversi_baru_pak: item.total_ak,
                ak_konversi_jumlah_pak: item.total_ak,
                jumlah_ak_diperoleh: item.total_ak,
                syarat_min_pangkat: item.syarat_pangkat,
                syarat_min_jenjang: item.syarat_jenjang,
                kelebihan_pangkat: item.kelebihan_pangkat,
                kelebihan_jenjang: item.kelebihan_jenjang,
                ditetapkan_di: "Jakarta",
                tanggal_penetapan: "2 Januari 2026",
                pejabat_nama: "dr. Daniel Arisandi, M.K.M.",
                pejabat_nip: "198004122006041008",
                pejabat_pangkat: "Pembina (IV/a)",
                pejabat_jabatan: "Kepala Puskesmas Kepulauan Seribu Selatan"
            };

            pakList.push(newPak);
            currentPakId = newId;
            savePakData();
            window.renderPakKonversiUI();

            const previewCard = document.getElementById('section_doc_view');
            if (previewCard) {
                previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (window.Swal) {
                Swal.fire({
                    icon: 'success',
                    title: 'Dokumen PAK Berhasil Diterbitkan',
                    text: `Dokumen Resmi PAK Konversi JF untuk ${item.nama} telah berhasil dibuat dan siap dicetak!`,
                    timer: 2500,
                    showConfirmButton: false
                });
            } else if (typeof showToast === 'function') {
                showToast(`Dokumen PAK untuk ${item.nama} berhasil diterbitkan!`, "success");
            }
        }
    };

    // Export Rekap AK Kumulatif ke Excel (.xlsx)
    window.exportRekapAkToExcel = function() {
        const allList = window.getAllPegawaiAkTahunanList();
        if (allList.length === 0) {
            alert("Tidak ada data untuk diexport.");
            return;
        }

        const exportData = allList.map((item, idx) => ({
            "No": idx + 1,
            "Nama Pegawai": item.nama,
            "NIP": item.nip || '-',
            "NRK": item.nrk || '-',
            "Status Pegawai": item.status_pegawai,
            "Jabatan": item.jabatan,
            "Jenjang JF": item.jenjang_jf,
            "Kategori JF": item.kategori_jf,
            "Gol/Pangkat": item.golongan,
            "Koefisien Tahunan": item.koefisien,
            "AK Integrasi (s.d 2022)": item.ak_lama,
            "AK Th 2023": item.ak_2023,
            "AK Th 2024": item.ak_2024,
            "AK Th 2025": item.ak_2025,
            "AK Th 2026 (Berjalan)": item.ak_2026,
            "Total AK Kumulatif": item.total_ak,
            "Syarat Min Pangkat": item.syarat_pangkat,
            "Kelebihan / Kekurangan Pangkat": item.kelebihan_pangkat,
            "Syarat Min Jenjang": item.syarat_jenjang || '-',
            "Kelebihan / Kekurangan Jenjang": item.kelebihan_jenjang !== null ? item.kelebihan_jenjang : '-',
            "Status Kelayakan": item.status_label
        }));

        const dateStr = new Date().toISOString().slice(0, 10);
        const fileName = `Rekapitulasi_AK_Kumulatif_Tahunan_PKSS_${dateStr}.xlsx`;

        if (typeof window.generateAndDownloadXLSX === 'function') {
            window.generateAndDownloadXLSX(exportData, "Rekap AK Tahunan", fileName);
        } else if (typeof XLSX !== 'undefined') {
            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Rekap AK Tahunan");
            XLSX.writeFile(wb, fileName);
        } else {
            window.exportRekapAkToCsv();
        }
    };

    // Export Rekap AK Kumulatif ke CSV
    window.exportRekapAkToCsv = function() {
        const allList = window.getAllPegawaiAkTahunanList();
        if (allList.length === 0) return;

        const headers = [
            "No", "Nama Pegawai", "NIP", "NRK", "Status Pegawai", "Jabatan", "Jenjang JF",
            "Gol/Pangkat", "Koefisien", "AK Integrasi s.d 2022", "AK 2023", "AK 2024",
            "AK 2025", "AK 2026 Berjalan", "Total AK Kumulatif", "Syarat Pangkat",
            "Kelebihan Pangkat", "Syarat Jenjang", "Kelebihan Jenjang", "Status Kelayakan"
        ];

        let csvContent = "\uFEFF" + headers.join(",") + "\n";

        allList.forEach((item, idx) => {
            const row = [
                idx + 1,
                `"${item.nama.replace(/"/g, '""')}"`,
                `"${item.nip}"`,
                `"${item.nrk}"`,
                `"${item.status_pegawai}"`,
                `"${item.jabatan.replace(/"/g, '""')}"`,
                `"${item.jenjang_jf}"`,
                `"${item.golongan}"`,
                item.koefisien,
                item.ak_lama,
                item.ak_2023,
                item.ak_2024,
                item.ak_2025,
                item.ak_2026,
                item.total_ak,
                item.syarat_pangkat,
                item.kelebihan_pangkat,
                item.syarat_jenjang || 0,
                item.kelebihan_jenjang !== null ? item.kelebihan_jenjang : 0,
                `"${item.status_label}"`
            ];
            csvContent += row.join(",") + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Rekapitulasi_AK_Kumulatif_Tahunan_PKSS_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Cetak Laporan Rekapitulasi AK Tahunan Resmi
    window.printRekapAkTahunan = function() {
        const allList = window.getAllPegawaiAkTahunanList();
        if (allList.length === 0) return;

        let rowsHtml = '';
        allList.forEach((item, idx) => {
            rowsHtml += `
                <tr>
                    <td style="text-align: center;">${idx + 1}</td>
                    <td><strong>${item.nama}</strong><br><small style="font-family: monospace;">NIP: ${item.nip || '-'}</small></td>
                    <td>${item.jabatan}<br><span style="font-size: 8pt; color: #555;">${item.jenjang_jf} (Koef: ${formatAk3(item.koefisien)})</span></td>
                    <td style="text-align: center;">${item.golongan}</td>
                    <td style="text-align: right; font-family: monospace;">${formatAk3(item.ak_lama)}</td>
                    <td style="text-align: right; font-family: monospace;">${formatAk3(item.ak_2023)}</td>
                    <td style="text-align: right; font-family: monospace;">${formatAk3(item.ak_2024)}</td>
                    <td style="text-align: right; font-family: monospace;">${formatAk3(item.ak_2025)}</td>
                    <td style="text-align: right; font-family: monospace;">${formatAk3(item.ak_2026)}</td>
                    <td style="text-align: right; font-family: monospace; font-weight: bold;">${formatAk3(item.total_ak)}</td>
                    <td style="text-align: center; font-size: 8pt;">P: ${formatAk3(item.syarat_pangkat)}<br>J: ${item.syarat_jenjang ? formatAk3(item.syarat_jenjang) : '-'}</td>
                    <td style="text-align: center; font-weight: bold; font-size: 8pt;">${item.status_label}</td>
                </tr>
            `;
        });

        const printWindow = window.open('', '_blank', 'width=1100,height=850');
        if (!printWindow) {
            alert('Silakan izinkan popup browser untuk mencetak dokumen.');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Rekapitulasi Nilai AK Kumulatif Tiap Tahun - Puskesmas Kepulauan Seribu Selatan</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 12mm 10mm 15mm 10mm;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 9pt;
                        line-height: 1.3;
                        color: #000;
                        margin: 0;
                        padding: 10px;
                    }
                    .header-table {
                        width: 100%;
                        border-bottom: 2px solid #000;
                        padding-bottom: 8px;
                        margin-bottom: 12px;
                    }
                    .logo-img {
                        width: 65px;
                        height: auto;
                    }
                    .instansi-title {
                        text-align: center;
                    }
                    .instansi-title h4 {
                        margin: 0;
                        font-size: 11pt;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .instansi-title h3 {
                        margin: 2px 0;
                        font-size: 13pt;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .instansi-title p {
                        margin: 0;
                        font-size: 8pt;
                    }
                    .doc-title {
                        text-align: center;
                        margin: 10px 0 15px 0;
                    }
                    .doc-title h3 {
                        margin: 0;
                        font-size: 12pt;
                        text-transform: uppercase;
                        text-decoration: underline;
                    }
                    .doc-title p {
                        margin: 3px 0 0 0;
                        font-size: 8.5pt;
                        color: #333;
                    }
                    table.data-table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 8pt;
                    }
                    table.data-table th, table.data-table td {
                        border: 1px solid #333;
                        padding: 4px 6px;
                    }
                    table.data-table th {
                        background-color: #f2f2f2;
                        text-align: center;
                        font-weight: bold;
                    }
                    .sign-table {
                        width: 100%;
                        margin-top: 25px;
                        page-break-inside: avoid;
                    }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="no-print" style="margin-bottom: 15px; padding: 10px; background: #e2e8f0; border-radius: 6px; text-align: center;">
                    <button onclick="window.print()" style="padding: 8px 20px; font-weight: bold; background: #16a34a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;">
                        🖨️ Cetak Dokumen Sekarang
                    </button>
                    <button onclick="window.close()" style="padding: 8px 15px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px; font-size: 13px;">
                        Tutup
                    </button>
                </div>

                <table class="header-table">
                    <tr>
                        <td style="width: 80px; text-align: center;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/450px-Coat_of_arms_of_Jakarta.svg.png" class="logo-img" alt="Logo DKI Jakarta">
                        </td>
                        <td class="instansi-title">
                            <h4>Pemerintah Provinsi Daerah Khusus Ibukota Jakarta</h4>
                            <h4>Dinas Kesehatan Provinsi DKI Jakarta</h4>
                            <h3>Puskesmas Kepulauan Seribu Selatan</h3>
                            <p>Jl. Pulau Panggang, Kel. Pulau Panggang, Kec. Kepulauan Seribu Selatan, DKI Jakarta 14530</p>
                        </td>
                    </tr>
                </table>

                <div class="doc-title">
                    <h3>Rekapitulasi Nilai Angka Kredit (AK) Kumulatif Tiap Tahun Pegawai Fungsional</h3>
                    <p>Berdasarkan PermenPAN-RB No. 1 Tahun 2023 tentang Jabatan Fungsional</p>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th rowspan="2" style="width: 25px;">No</th>
                            <th rowspan="2" style="width: 160px;">Nama Pegawai & NIP</th>
                            <th rowspan="2" style="width: 140px;">Jabatan & Jenjang</th>
                            <th rowspan="2" style="width: 60px;">Pangkat/Gol</th>
                            <th colspan="5">Rincian Nilai Angka Kredit Tiap Tahun</th>
                            <th rowspan="2" style="width: 75px;">Total AK Kumulatif</th>
                            <th rowspan="2" style="width: 70px;">Syarat Min. (P/J)</th>
                            <th rowspan="2" style="width: 110px;">Status Kelayakan</th>
                        </tr>
                        <tr>
                            <th style="width: 65px;">s.d 2022</th>
                            <th style="width: 55px;">2023</th>
                            <th style="width: 55px;">2024</th>
                            <th style="width: 55px;">2025</th>
                            <th style="width: 60px;">2026 (TW 1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>

                <table class="sign-table">
                    <tr>
                        <td style="width: 60%;"></td>
                        <td style="width: 40%; text-align: center;">
                            <div>Jakarta, 2 Januari 2026</div>
                            <div>Kepala Puskesmas Kepulauan Seribu Selatan</div>
                            <div style="height: 65px;"></div>
                            <div style="font-weight: bold; text-decoration: underline;">dr. Daniel Arisandi, M.K.M.</div>
                            <div>NIP. 198004122006041008</div>
                        </td>
                    </tr>
                </table>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    window.getCurrentPakId = function() { return currentPakId; };
    window.setCurrentPakId = function(id) { currentPakId = id; };
    window.getPakList = function() { return pakList; };
    window.setPakList = function(list) { pakList = list; };
    window.savePakData = savePakData;
    window.loadPakData = loadPakData;

    // Auto-init saat DOM siap
    document.addEventListener('DOMContentLoaded', function() {
        loadPakData();
    });

})();
