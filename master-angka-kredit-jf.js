/**
 * Modul Master Data Angka Kredit Jabatan Fungsional (JF)
 * Berdasarkan Regulasi Jabatan Fungsional (PermenPAN-RB No. 1 Tahun 2023)
 * Menampilkan:
 * A. Matriks Angka Kredit Kumulatif Minimal Kenaikan Pangkat & Jenjang
 * B. Konversi Predikat Kinerja Tahunan Menjadi Angka Kredit Tahunan
 */

(function() {
    // 1. DATA TABEL A: ANGKA KREDIT JF
    const DATA_TABEL_A = [
        // Kategori Keahlian
        { id: 'A1', kategori: 'Keahlian', jenjang: 'Ahli Utama', pangkat: 'IV/d – IV/e', koefisien: 50, pangkat_min: 200, jenjang_min: null },
        { id: 'A2', kategori: 'Keahlian', jenjang: 'Ahli Madya', pangkat: 'IV/a – IV/b – IV/c', koefisien: 37.5, pangkat_min: 150, jenjang_min: 450 },
        { id: 'A3', kategori: 'Keahlian', jenjang: 'Ahli Muda', pangkat: 'III/c – III/d', koefisien: 25, pangkat_min: 100, jenjang_min: 200 },
        { id: 'A4', kategori: 'Keahlian', jenjang: 'Ahli Pertama', pangkat: 'III/a – III/b', koefisien: 12.5, pangkat_min: 50, jenjang_min: 100 },
        
        // Kategori Keterampilan
        { id: 'A5', kategori: 'Keterampilan', jenjang: 'Penyelia', pangkat: 'III/c – III/d', koefisien: 25, pangkat_min: 100, jenjang_min: null },
        { id: 'A6', kategori: 'Keterampilan', jenjang: 'Mahir', pangkat: 'III/a – III/b', koefisien: 12.5, pangkat_min: 50, jenjang_min: 100 },
        { id: 'A7', kategori: 'Keterampilan', jenjang: 'Terampil', pangkat: 'II/b – II/c – II/d', koefisien: 5, pangkat_min: 20, jenjang_min: 60 },
        { id: 'A8', kategori: 'Keterampilan', jenjang: 'Pemula', pangkat: 'II/a', koefisien: 3.75, pangkat_min: 15, jenjang_min: 15 }
    ];

    // 2. DATA TABEL B: KONVERSI PREDIKAT KINERJA TAHUNAN MENJADI ANGKA KREDIT TAHUNAN
    const DATA_TABEL_B = [
        // Keahlian
        { id: 'B1', kategori: 'Keahlian', jenjang: 'Ahli Pertama', koefisien_label: 'Ahli Pertama\n12,5', koefisien: 12.5, sangat_baik: 18.75, baik: 12.5, butuh_perbaikan: 9.38, kurang: 6.25, sangat_kurang: 3.13 },
        { id: 'B2', kategori: 'Keahlian', jenjang: 'Ahli Muda', koefisien_label: 'Ahli Muda\n25', koefisien: 25, sangat_baik: 37.50, baik: 25, butuh_perbaikan: 18.75, kurang: 12.50, sangat_kurang: 6.25 },
        { id: 'B3', kategori: 'Keahlian', jenjang: 'Ahli Madya', koefisien_label: 'Ahli Madya\n37,5', koefisien: 37.5, sangat_baik: 56.25, baik: 37.5, butuh_perbaikan: 28.13, kurang: 18.75, sangat_kurang: 9.375 },
        { id: 'B4', kategori: 'Keahlian', jenjang: 'Ahli Utama', koefisien_label: 'Ahli Utama\n50', koefisien: 50, sangat_baik: 75, baik: 50, butuh_perbaikan: 37.50, kurang: 25, sangat_kurang: 12.50 },
        
        // Keterampilan
        { id: 'B5', kategori: 'Keterampilan', jenjang: 'Pemula', koefisien_label: 'Pemula\n3,75', koefisien: 3.75, sangat_baik: 5.63, baik: 3.75, butuh_perbaikan: 2.81, kurang: 1.88, sangat_kurang: 0.94 },
        { id: 'B6', kategori: 'Keterampilan', jenjang: 'Terampil', koefisien_label: 'Terampil\n5', koefisien: 5, sangat_baik: 7.50, baik: 5, butuh_perbaikan: 3.75, kurang: 2.50, sangat_kurang: 1.25 },
        { id: 'B7', kategori: 'Keterampilan', jenjang: 'Mahir', koefisien_label: 'Mahir\n12,5', koefisien: 12.5, sangat_baik: 18.75, baik: 12.5, butuh_perbaikan: 9.38, kurang: 6.25, sangat_kurang: 3.13 },
        { id: 'B8', kategori: 'Keterampilan', jenjang: 'Penyelia', koefisien_label: 'Penyelia\n25', koefisien: 25, sangat_baik: 37.50, baik: 25, butuh_perbaikan: 18.75, kurang: 12.5, sangat_kurang: 6.25 }
    ];

    window.DATA_ANGKA_KREDIT_A = DATA_TABEL_A;
    window.DATA_ANGKA_KREDIT_B = DATA_TABEL_B;
    window.currentAngkaKreditFilter = 'all';

    // Helper format desimal Indonesia (koma)
    function formatNum(val) {
        if (val === null || val === undefined || val === '-') return '-';
        const str = String(val).replace('.', ',');
        return str;
    }

    // Inisialisasi Modul
    window.initMasterAngkaKredit = function() {
        window.renderMasterAngkaKredit();
        window.initSimulasiAngkaKredit();
    };

    // Filter Kategori (all, Keahlian, Keterampilan)
    window.filterAngkaKredit = function(kategori) {
        window.currentAngkaKreditFilter = kategori || 'all';
        $('.btn-filter-ak').removeClass('btn-primary active text-white').addClass('btn-outline-primary');
        $(`.btn-filter-ak[data-filter="${window.currentAngkaKreditFilter}"]`).removeClass('btn-outline-primary').addClass('btn-primary active text-white');
        window.renderMasterAngkaKredit();
    };

    // Render Tabel A dan Tabel B
    window.renderMasterAngkaKredit = function() {
        const filter = window.currentAngkaKreditFilter || 'all';

        // 1. Render Tabel A
        const tbodyA = document.getElementById('tbodyAngkaKreditA');
        if (tbodyA) {
            let listA = DATA_TABEL_A;
            if (filter !== 'all') {
                listA = DATA_TABEL_A.filter(x => x.kategori === filter);
            }

            // Hitung rowspan per kategori
            const countKeahlian = listA.filter(x => x.kategori === 'Keahlian').length;
            const countKeterampilan = listA.filter(x => x.kategori === 'Keterampilan').length;

            let htmlA = '';
            let renderedKeahlian = false;
            let renderedKeterampilan = false;

            listA.forEach((item, idx) => {
                htmlA += `<tr class="hover-row-highlight">`;
                
                // Kolom Kategori (Rowspan)
                if (item.kategori === 'Keahlian') {
                    if (!renderedKeahlian) {
                        htmlA += `<td rowspan="${countKeahlian}" class="align-middle text-center fw-bold bg-primary-soft text-primary border-end" style="background-color: #dbeafe; color: #1e40af; font-size: 1.05rem; writing-mode: vertical-lr; transform: rotate(180deg); letter-spacing: 2px;">
                            ${item.kategori.toUpperCase()}
                        </td>`;
                        renderedKeahlian = true;
                    }
                } else if (item.kategori === 'Keterampilan') {
                    if (!renderedKeterampilan) {
                        htmlA += `<td rowspan="${countKeterampilan}" class="align-middle text-center fw-bold bg-info-soft text-info-emphasis border-end" style="background-color: #e0f2fe; color: #0369a1; font-size: 1.05rem; writing-mode: vertical-lr; transform: rotate(180deg); letter-spacing: 2px;">
                            ${item.kategori.toUpperCase()}
                        </td>`;
                        renderedKeterampilan = true;
                    }
                }

                // Kolom Jenjang, Pangkat, Koefisien, Pangkat Min, Jenjang Min
                htmlA += `
                    <td class="align-middle fw-semibold text-dark px-3">${item.jenjang}</td>
                    <td class="align-middle text-center text-secondary px-3"><span class="badge bg-light text-dark border px-2.5 py-1.5 font-monospace">${item.pangkat}</span></td>
                    <td class="align-middle text-center fw-bold text-primary px-3 fs-6">${formatNum(item.koefisien)}</td>
                    <td class="align-middle text-center fw-bold text-success px-3 fs-6">${formatNum(item.pangkat_min)}</td>
                    <td class="align-middle text-center fw-bold text-dark px-3 fs-6">${formatNum(item.jenjang_min)}</td>
                </tr>`;
            });

            tbodyA.innerHTML = htmlA;
        }

        // 2. Render Tabel B
        const tbodyB = document.getElementById('tbodyAngkaKreditB');
        if (tbodyB) {
            let listB = DATA_TABEL_B;
            if (filter !== 'all') {
                listB = DATA_TABEL_B.filter(x => x.kategori === filter);
            }

            const countKeahlianB = listB.filter(x => x.kategori === 'Keahlian').length;
            const countKeterampilanB = listB.filter(x => x.kategori === 'Keterampilan').length;

            let htmlB = '';
            let renderedKeahlianB = false;
            let renderedKeterampilanB = false;

            listB.forEach((item) => {
                htmlB += `<tr class="hover-row-highlight">`;
                
                // Kolom Kategori (Rowspan)
                if (item.kategori === 'Keahlian') {
                    if (!renderedKeahlianB) {
                        htmlB += `<td rowspan="${countKeahlianB}" class="align-middle text-center fw-bold bg-primary-soft text-primary border-end" style="background-color: #dbeafe; color: #1e40af; font-size: 1.05rem; writing-mode: vertical-lr; transform: rotate(180deg); letter-spacing: 2px;">
                            ${item.kategori.toUpperCase()}
                        </td>`;
                        renderedKeahlianB = true;
                    }
                } else if (item.kategori === 'Keterampilan') {
                    if (!renderedKeterampilanB) {
                        htmlB += `<td rowspan="${countKeterampilanB}" class="align-middle text-center fw-bold bg-info-soft text-info-emphasis border-end" style="background-color: #e0f2fe; color: #0369a1; font-size: 1.05rem; writing-mode: vertical-lr; transform: rotate(180deg); letter-spacing: 2px;">
                            ${item.kategori.toUpperCase()}
                        </td>`;
                        renderedKeterampilanB = true;
                    }
                }

                // Kolom Simulasi/Koefisien per tahun
                htmlB += `
                    <td class="align-middle text-center px-3 py-2">
                        <div class="fw-bold text-dark">${item.jenjang}</div>
                        <div class="badge bg-primary-subtle text-primary border px-2 py-0.5 mt-1 fs-7">${formatNum(item.koefisien)} / Thn</div>
                    </td>
                    <td class="align-middle text-center fw-bold text-success px-3 fs-6" style="background-color: rgba(22, 163, 74, 0.04);">${formatNum(item.sangat_baik)}</td>
                    <td class="align-middle text-center fw-bold text-primary px-3 fs-6" style="background-color: rgba(37, 99, 235, 0.04);">${formatNum(item.baik)}</td>
                    <td class="align-middle text-center fw-bold text-warning-emphasis px-3 fs-6" style="background-color: rgba(234, 179, 8, 0.04);">${formatNum(item.butuh_perbaikan)}</td>
                    <td class="align-middle text-center fw-bold text-orange px-3 fs-6" style="background-color: rgba(249, 115, 22, 0.04); color: #ea580c;">${formatNum(item.kurang)}</td>
                    <td class="align-middle text-center fw-bold text-danger px-3 fs-6" style="background-color: rgba(239, 68, 68, 0.04);">${formatNum(item.sangat_kurang)}</td>
                </tr>`;
            });

            tbodyB.innerHTML = htmlB;
        }
    };

    // 3. KALKULATOR / SIMULASI INTERAKTIF ANGKA KREDIT
    window.initSimulasiAngkaKredit = function() {
        const selectJenjang = document.getElementById('sim_jenjang_ak');
        if (selectJenjang && selectJenjang.children.length <= 1) {
            selectJenjang.innerHTML = '';
            
            const optGroupKeahlian = document.createElement('optgroup');
            optGroupKeahlian.label = "--- KATEGORI KEAHLIAN ---";
            DATA_TABEL_A.filter(x => x.kategori === 'Keahlian').forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.jenjang;
                opt.textContent = `${item.jenjang} (${item.pangkat}) — Koef: ${formatNum(item.koefisien)}`;
                optGroupKeahlian.appendChild(opt);
            });
            selectJenjang.appendChild(optGroupKeahlian);

            const optGroupKeterampilan = document.createElement('optgroup');
            optGroupKeterampilan.label = "--- KATEGORI KETERAMPILAN ---";
            DATA_TABEL_A.filter(x => x.kategori === 'Keterampilan').forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.jenjang;
                opt.textContent = `${item.jenjang} (${item.pangkat}) — Koef: ${formatNum(item.koefisien)}`;
                optGroupKeterampilan.appendChild(opt);
            });
            selectJenjang.appendChild(optGroupKeterampilan);

            selectJenjang.value = 'Ahli Pertama';
        }

        window.calculateSimulasiAK();
    };

    window.calculateSimulasiAK = function() {
        const jenjang = document.getElementById('sim_jenjang_ak')?.value || 'Ahli Pertama';
        const predikat = document.getElementById('sim_predikat_ak')?.value || 'baik';
        const tahun = parseInt(document.getElementById('sim_tahun_ak')?.value || '1', 10);
        const saldoAwal = parseFloat(document.getElementById('sim_saldo_awal_ak')?.value || '0') || 0;

        const infoA = DATA_TABEL_A.find(x => x.jenjang === jenjang);
        const infoB = DATA_TABEL_B.find(x => x.jenjang === jenjang);

        if (!infoA || !infoB) return;

        let persenPredikat = 100;
        let akTahunan = infoB.baik;
        let predikatLabel = 'Baik (100%)';

        if (predikat === 'sangat_baik') {
            persenPredikat = 150;
            akTahunan = infoB.sangat_baik;
            predikatLabel = 'Sangat Baik (150%)';
        } else if (predikat === 'baik') {
            persenPredikat = 100;
            akTahunan = infoB.baik;
            predikatLabel = 'Baik (100%)';
        } else if (predikat === 'butuh_perbaikan') {
            persenPredikat = 75;
            akTahunan = infoB.butuh_perbaikan;
            predikatLabel = 'Butuh Perbaikan (75%)';
        } else if (predikat === 'kurang') {
            persenPredikat = 50;
            akTahunan = infoB.kurang;
            predikatLabel = 'Kurang (50%)';
        } else if (predikat === 'sangat_kurang') {
            persenPredikat = 25;
            akTahunan = infoB.sangat_kurang;
            predikatLabel = 'Sangat Kurang (25%)';
        }

        const akDiperolehTahun = akTahunan * tahun;
        const totalAkumulasi = saldoAwal + akDiperolehTahun;

        const syaratPangkat = infoA.pangkat_min;
        const syaratJenjang = infoA.jenjang_min;

        // Tampilkan ke DOM
        if (document.getElementById('res_sim_koefisien')) document.getElementById('res_sim_koefisien').textContent = formatNum(infoA.koefisien);
        if (document.getElementById('res_sim_predikat')) document.getElementById('res_sim_predikat').textContent = predikatLabel;
        if (document.getElementById('res_sim_tahunan')) document.getElementById('res_sim_tahunan').textContent = formatNum(akTahunan);
        if (document.getElementById('res_sim_total_periode')) document.getElementById('res_sim_total_periode').textContent = `${formatNum(akDiperolehTahun)} (${tahun} Thn)`;
        if (document.getElementById('res_sim_total_akumulasi')) document.getElementById('res_sim_total_akumulasi').textContent = formatNum(totalAkumulasi);

        // Kenaikan Pangkat
        const pctPangkat = Math.min(100, Math.round((totalAkumulasi / syaratPangkat) * 100));
        const barPangkat = document.getElementById('bar_progres_pangkat');
        if (barPangkat) {
            barPangkat.style.width = pctPangkat + '%';
            barPangkat.textContent = pctPangkat + '%';
            if (pctPangkat >= 100) {
                barPangkat.className = 'progress-bar bg-success progress-bar-striped progress-bar-animated';
            } else {
                barPangkat.className = 'progress-bar bg-primary';
            }
        }
        if (document.getElementById('text_status_pangkat')) {
            if (totalAkumulasi >= syaratPangkat) {
                document.getElementById('text_status_pangkat').innerHTML = `<span class="text-success fw-bold"><i class="fas fa-check-circle me-1"></i> Memenuhi Syarat Minimal Kenaikan Pangkat (Target: ${syaratPangkat} AK, Tercapai: ${formatNum(totalAkumulasi)} AK)</span>`;
            } else {
                const sisa = (syaratPangkat - totalAkumulasi).toFixed(2).replace('.', ',');
                document.getElementById('text_status_pangkat').innerHTML = `<span class="text-secondary">Dibutuhkan minimal <strong>${syaratPangkat} AK</strong>. Kurang <strong>${sisa} AK</strong> lagi.</span>`;
            }
        }

        // Kenaikan Jenjang
        const containerJenjang = document.getElementById('box_progres_jenjang');
        if (containerJenjang) {
            if (syaratJenjang === null || syaratJenjang === undefined) {
                containerJenjang.style.display = 'none';
            } else {
                containerJenjang.style.display = 'block';
                const pctJenjang = Math.min(100, Math.round((totalAkumulasi / syaratJenjang) * 100));
                const barJenjang = document.getElementById('bar_progres_jenjang');
                if (barJenjang) {
                    barJenjang.style.width = pctJenjang + '%';
                    barJenjang.textContent = pctJenjang + '%';
                    if (pctJenjang >= 100) {
                        barJenjang.className = 'progress-bar bg-success progress-bar-striped progress-bar-animated';
                    } else {
                        barJenjang.className = 'progress-bar bg-info';
                    }
                }
                if (document.getElementById('text_status_jenjang')) {
                    if (totalAkumulasi >= syaratJenjang) {
                        document.getElementById('text_status_jenjang').innerHTML = `<span class="text-success fw-bold"><i class="fas fa-check-circle me-1"></i> Memenuhi Syarat Minimal Kenaikan Jenjang (Target: ${syaratJenjang} AK, Tercapai: ${formatNum(totalAkumulasi)} AK)</span>`;
                    } else {
                        const sisaJ = (syaratJenjang - totalAkumulasi).toFixed(2).replace('.', ',');
                        document.getElementById('text_status_jenjang').innerHTML = `<span class="text-secondary">Dibutuhkan minimal <strong>${syaratJenjang} AK</strong>. Kurang <strong>${sisaJ} AK</strong> lagi.</span>`;
                    }
                }
            }
        }
    };

    // 4. EXPORT EXCEL / CSV
    window.exportAngkaKreditExcel = function() {
        let csvContent = "data:text/csv;charset=utf-8,";

        // Header Dokumen
        csvContent += "STANDAR ANGKA KREDIT JABATAN FUNGSIONAL (JF)\r\n";
        csvContent += "Ketetapan PermenPAN-RB No. 1 Tahun 2023\r\n\r\n";

        // Tabel A
        csvContent += "A. ANGKA KREDIT JF\r\n";
        csvContent += "Kategori,Jenjang,Pangkat,Koefisien Angka Kredit Tahunan,Minimal Kenaikan Pangkat,Minimal Kenaikan Jenjang\r\n";
        DATA_TABEL_A.forEach(item => {
            csvContent += `"${item.kategori}","${item.jenjang}","${item.pangkat}","${formatNum(item.koefisien)}","${formatNum(item.pangkat_min)}","${formatNum(item.jenjang_min)}"\r\n`;
        });
        csvContent += "*dapat bersifat proporsional berdasarkan pangkat awal jenjang jabatan pada saat menduduki JF\r\n\r\n";

        // Tabel B
        csvContent += "B. KONVERSI PREDIKAT KINERJA TAHUNAN MENJADI ANGKA KREDIT TAHUNAN\r\n";
        csvContent += "Kategori,Simulasi per tahun (Koefisien per tahun),Sangat Baik (150%),Baik (100%),Butuh Perbaikan (75%),Kurang (50%),Sangat Kurang (25%)\r\n";
        DATA_TABEL_B.forEach(item => {
            csvContent += `"${item.kategori}","${item.jenjang} (${formatNum(item.koefisien)})","${formatNum(item.sangat_baik)}","${formatNum(item.baik)}","${formatNum(item.butuh_perbaikan)}","${formatNum(item.kurang)}","${formatNum(item.sangat_kurang)}"\r\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Tabel_Standar_Angka_Kredit_JF_PermenPANRB.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 5. CETAK DOKUMEN RESMI ANGKA KREDIT JF
    window.printAngkaKreditDoc = function() {
        const rowsA = DATA_TABEL_A.map(item => `
            <tr>
                <td style="text-align: center; font-weight: bold; background-color: #f0f4f8;">${item.kategori}</td>
                <td>${item.jenjang}</td>
                <td style="text-align: center;">${item.pangkat}</td>
                <td style="text-align: center; font-weight: bold;">${formatNum(item.koefisien)}</td>
                <td style="text-align: center; font-weight: bold;">${formatNum(item.pangkat_min)}</td>
                <td style="text-align: center; font-weight: bold;">${formatNum(item.jenjang_min)}</td>
            </tr>
        `).join('');

        const rowsB = DATA_TABEL_B.map(item => `
            <tr>
                <td style="text-align: center; font-weight: bold; background-color: #f0f4f8;">${item.kategori}</td>
                <td style="text-align: center; font-weight: bold;">${item.jenjang}<br><span style="font-size: 8pt; font-weight: normal;">${formatNum(item.koefisien)}</span></td>
                <td style="text-align: center; font-weight: bold;">${formatNum(item.sangat_baik)}</td>
                <td style="text-align: center; font-weight: bold;">${formatNum(item.baik)}</td>
                <td style="text-align: center;">${formatNum(item.butuh_perbaikan)}</td>
                <td style="text-align: center;">${formatNum(item.kurang)}</td>
                <td style="text-align: center;">${formatNum(item.sangat_kurang)}</td>
            </tr>
        `).join('');

        const printHtml = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Standar Ketetapan Angka Kredit JF</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 15mm;
                    }
                    body {
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 9.5pt;
                        color: #111;
                        line-height: 1.3;
                    }
                    .header-title {
                        text-align: center;
                        font-weight: bold;
                        font-size: 13pt;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .section-title {
                        font-weight: bold;
                        font-size: 10.5pt;
                        margin-top: 18px;
                        margin-bottom: 8px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 6px;
                    }
                    th, td {
                        border: 1px solid #222;
                        padding: 6px 8px;
                    }
                    th {
                        background-color: #bcd4ee;
                        color: #0f172a;
                        text-align: center;
                        font-size: 9pt;
                    }
                    .footnote {
                        font-size: 8pt;
                        font-style: italic;
                        margin-bottom: 16px;
                        color: #333;
                    }
                    .signature-box {
                        float: right;
                        margin-top: 25px;
                        text-align: center;
                        width: 250px;
                        font-size: 9pt;
                    }
                </style>
            </head>
            <body>
                <div class="header-title">ANGKA KREDIT JF</div>

                <div class="section-title">A. ANGKA KREDIT JF</div>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2" style="width: 15%;">Kategori</th>
                            <th rowspan="2" style="width: 20%;">Jenjang</th>
                            <th rowspan="2" style="width: 22%;">Pangkat</th>
                            <th rowspan="2" style="width: 15%;">Koefisien<br>Angka Kredit<br>Tahunan</th>
                            <th colspan="2">Angka Kredit Kumulatif<br>Minimal Kenaikan</th>
                        </tr>
                        <tr>
                            <th style="width: 14%;">PANGKAT</th>
                            <th style="width: 14%;">JENJANG*</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsA}
                    </tbody>
                </table>
                <div class="footnote">*dapat bersifat proporsional berdasarkan pangkat awal jenjang jabatan pada saat menduduki JF</div>

                <div class="section-title">B. KONVERSI PREDIKAT KINERJA TAHUNAN MENJADI ANGKA KREDIT TAHUNAN</div>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2" style="width: 15%;">Kategori</th>
                            <th rowspan="2" style="width: 25%;">Simulasi<br>per tahun / Koefisien</th>
                            <th>Sangat Baik</th>
                            <th>Baik</th>
                            <th>Butuh<br>Perbaikan</th>
                            <th>Kurang</th>
                            <th>Sangat<br>Kurang</th>
                        </tr>
                        <tr>
                            <th style="width: 12%;">150%</th>
                            <th style="width: 12%;">100%</th>
                            <th style="width: 12%;">75%</th>
                            <th style="width: 12%;">50%</th>
                            <th style="width: 12%;">25%</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsB}
                    </tbody>
                </table>

                <div class="signature-box">
                    <div>Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div style="margin-top: 5px;">Mengetahui,<br>Pengelola Kepegawaian</div>
                    <div style="margin-top: 50px; font-weight: bold; text-decoration: underline;">SUBBAG TATA USAHA</div>
                    <div style="font-size: 8pt; color: #444;">Puskesmas Kecamatan Koja</div>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(printHtml);
            printWindow.document.close();
        } else {
            alert("Harap izinkan popup di browser untuk mencetak dokumen Angka Kredit JF.");
        }
    };

    // Auto initialize if DOM ready
    $(document).ready(function() {
        if (typeof window.initMasterAngkaKredit === 'function') {
            window.initMasterAngkaKredit();
        }
    });

})();
