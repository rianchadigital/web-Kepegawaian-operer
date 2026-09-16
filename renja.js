/**
 * Modul Rencana Kerja (Renja) Pegawai Non ASN & PPPK PW
 * Mendukung Tahun Anggaran 2027, 2028, 2029
 * Standar Pergub DKI Jakarta No. 221 Tahun 2016
 */

(function () {
    // State Utama Renja
    window.renjaState = {
        tahun: 2027,
        tmtCutoff: "2027-01-01",
        standarRegulasi: "Pergub 221 Tahun 2016",
        unitTugas: "Puskesmas Kecamatan Kepulauan Seribu Selatan",
        pegawai: [],
        filteredPegawai: [],
        originalPegawai: [],
        filter: {
            search: "",
            status: "",
            kategori: "",
            ptkp: "",
            sinkron: ""
        },
        editingId: null
    };

    // Format Rupiah
    window.formatRupiah = function (num) {
        const val = Math.round(Number(num) || 0);
        return "Rp " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Format Tanggal Indonesia (DD/MM/YYYY)
    window.formatTglIndo = function (tglStr) {
        if (!tglStr) return "-";
        const clean = String(tglStr).split("T")[0];
        const parts = clean.split("-");
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return tglStr;
    };

    // Hitung Masa Kerja dari TMT hingga Cut Off
    window.calculateMasaKerja = function (tmtStr, cutoffStr) {
        if (!tmtStr || !cutoffStr) return { thn: 0, bln: 0, text: "- Th - Bln" };
        const tmt = new Date(tmtStr);
        const cutoff = new Date(cutoffStr);
        if (isNaN(tmt.getTime()) || isNaN(cutoff.getTime()) || cutoff < tmt) {
            return { thn: 0, bln: 0, text: "0 Th 0 Bln" };
        }

        let years = cutoff.getFullYear() - tmt.getFullYear();
        let months = cutoff.getMonth() - tmt.getMonth();
        let days = cutoff.getDate() - tmt.getDate();

        if (days < 0) {
            months--;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            thn: Math.max(0, years),
            bln: Math.max(0, months),
            text: `${Math.max(0, years)} Th ${Math.max(0, months)} Bln`
        };
    };

    // Load Data Renja dari Server atau Local
    window.loadRenjaData = async function () {
        try {
            const resp = await fetch('/api/gas?action=getRenjaData');
            if (resp.ok) {
                const res = await resp.json();
                if (res && res.pegawai && Array.isArray(res.pegawai) && res.pegawai.length > 0) {
                    window.renjaState.pegawai = res.pegawai;
                    window.renjaState.originalPegawai = JSON.parse(JSON.stringify(res.pegawai));
                    if (res.settings) {
                        window.renjaState.tahun = res.settings.tahun || 2027;
                        window.renjaState.tmtCutoff = res.settings.tmt_cutoff || "2027-01-01";
                        window.renjaState.standarRegulasi = res.settings.standar_regulasi || "Pergub 221 Tahun 2016";
                    }
                    window.checkRenjaSyncWithMaster();
                    window.renderRenja();
                    return;
                }
            }
        } catch (e) {
            console.warn("Gagal load dari server, mencoba fallback lokal...", e);
        }

        // Fallback jika fetch offline
        const local = localStorage.getItem("simpeg_renja_db");
        if (local) {
            try {
                const parsed = JSON.parse(local);
                if (parsed.pegawai && parsed.pegawai.length > 0) {
                    window.renjaState.pegawai = parsed.pegawai;
                    window.renjaState.originalPegawai = JSON.parse(JSON.stringify(parsed.pegawai));
                    window.checkRenjaSyncWithMaster();
                    window.renderRenja();
                    return;
                }
            } catch (err) {}
        }
    };

    // Cek status sinkronisasi dengan window.dataPegawai (SIMPEG)
    window.checkRenjaSyncWithMaster = function () {
        const masterList = Array.isArray(window.dataPegawai) ? window.dataPegawai : [];
        if (!window.renjaState.pegawai) return;

        let syncedCount = 0;
        window.renjaState.pegawai.forEach(r => {
            const found = masterList.some(p => {
                if (r.nip && p.nip && String(r.nip).trim() === String(p.nip).trim()) return true;
                if (r.nik && p.nik && String(r.nik).trim() === String(p.nik).trim()) return true;
                if (r.nama && p.nama && String(r.nama).trim().toLowerCase() === String(p.nama).trim().toLowerCase()) return true;
                return false;
            });
            r.terdaftar_simpeg = !!found;
            if (found) syncedCount++;
        });

        window.renjaState.syncedCount = syncedCount;
    };

    // Ganti Tahun Anggaran (2027, 2028, 2029)
    window.switchRenjaYear = function (tahun) {
        tahun = parseInt(tahun, 10) || 2027;
        window.renjaState.tahun = tahun;

        // Otomatis sesuaikan Cut Off jika user belum custom
        window.renjaState.tmtCutoff = `${tahun}-01-01`;

        // Update badge tampilan tombol
        $('#btn-renja-tahun-text').text(`RENJA TAHUN ${tahun}`);
        $('#header-renja-tahun-text').text(`Rencana Kerja (Renja) Pegawai Non ASN & PPPK PW Tahun ${tahun}`);
        $('#badge-renja-cutoff').html(`<i class="fas fa-calendar-check me-1"></i> TMT CUT OFF: ${window.formatTglIndo(window.renjaState.tmtCutoff)} <i class="fas fa-pencil-alt ms-1 small text-warning"></i>`);
        $('#kpi-pagu-year-sub').text(`Kebutuhan Tahun ${tahun}`);

        // Terapkan penyesuaian simulasi tahun depan jika 2028 atau 2029 (+2% - 3% inflasi/kenaikan berkala)
        window.recalculateRenjaForYear(tahun);
        window.renderRenja();

        if (typeof showToast === 'function') {
            showToast(`Beralih ke Rencana Kerja Tahun ${tahun} (Cut Off: ${window.formatTglIndo(window.renjaState.tmtCutoff)})`, "info");
        }
    };

    // Atur Cut Off Custom
    window.setRenjaCutoff = function (newCutoff) {
        if (!newCutoff) return;
        window.renjaState.tmtCutoff = newCutoff;
        $('#badge-renja-cutoff').html(`<i class="fas fa-calendar-check me-1"></i> TMT CUT OFF: ${window.formatTglIndo(newCutoff)} <i class="fas fa-pencil-alt ms-1 small text-warning"></i>`);
        window.renderRenja();
        if (typeof showToast === 'function') {
            showToast(`TMT Cut Off berhasil disesuaikan menjadi ${window.formatTglIndo(newCutoff)}`, "success");
        }
    };

    // Kalkulasi Ulang saat berpindah tahun
    window.recalculateRenjaForYear = function (tahun) {
        const diffYear = tahun - 2027;
        const multiplier = 1 + (diffYear * 0.03); // Asumsi kenaikan 3% per tahun

        window.renjaState.pegawai.forEach(p => {
            // Hitung ulang masa kerja
            const mk = window.calculateMasaKerja(p.tmt, window.renjaState.tmtCutoff);
            p.masa_kerja_thn = mk.thn;
            p.masa_kerja_bln = mk.bln;
            p.masa_kerja_text = mk.text;

            if (diffYear === 0) {
                // Kembalikan ke baseline 2027 dari originalPegawai
                const orig = window.renjaState.originalPegawai.find(o => o.id === p.id);
                if (orig) {
                    p.total_gaji_14 = orig.total_gaji_14;
                    p.total_tkp_14 = orig.total_tkp_14;
                    p.bpjs_kes_12 = orig.bpjs_kes_12;
                    p.bpjs_tk_12 = orig.bpjs_tk_12;
                    p.transport_12 = orig.transport_12;
                    p.total_anggaran = orig.total_anggaran;
                }
            } else {
                const orig = window.renjaState.originalPegawai.find(o => o.id === p.id) || p;
                p.total_gaji_14 = Math.round(orig.total_gaji_14 * multiplier);
                p.total_tkp_14 = Math.round(orig.total_tkp_14 * multiplier);
                p.bpjs_kes_12 = Math.round(orig.bpjs_kes_12 * multiplier);
                p.bpjs_tk_12 = Math.round(orig.bpjs_tk_12 * multiplier);
                p.transport_12 = Math.round(orig.transport_12 * multiplier);
                p.total_anggaran = p.total_gaji_14 + p.total_tkp_14 + p.bpjs_kes_12 + p.bpjs_tk_12 + p.transport_12;
            }
        });
    };

    // Render Utama Renja
    window.renderRenja = function () {
        if (!window.renjaState.pegawai || window.renjaState.pegawai.length === 0) {
            window.loadRenjaData();
            return;
        }

        window.checkRenjaSyncWithMaster();

        const data = window.renjaState.pegawai;
        const filter = window.renjaState.filter;

        // Filter Data
        const filtered = data.filter(p => {
            if (filter.search) {
                const q = filter.search.toLowerCase();
                const matchName = (p.nama || "").toLowerCase().includes(q);
                const matchRek = (p.no_rekening || "").toLowerCase().includes(q);
                const matchJab = (p.jabatan || "").toLowerCase().includes(q);
                const matchPdd = (p.pendidikan || "").toLowerCase().includes(q);
                if (!matchName && !matchRek && !matchJab && !matchPdd) return false;
            }
            if (filter.status && p.status_pegawai !== filter.status) return false;
            if (filter.kategori && p.kategori !== filter.kategori) return false;
            if (filter.ptkp && p.status_ptkp !== filter.ptkp) return false;
            if (filter.sinkron) {
                if (filter.sinkron === "TERDAFTAR" && !p.terdaftar_simpeg) return false;
                if (filter.sinkron === "BELUM" && p.terdaftar_simpeg) return false;
            }
            return true;
        });

        window.renjaState.filteredPegawai = filtered;

        // Hitung Total KPI
        const totalPegawai = filtered.length;
        const countNonAsn = filtered.filter(p => p.status_pegawai === "NON ASN").length;
        const countPppkPw = filtered.filter(p => p.status_pegawai === "PPPK PW").length;

        const sumGaji = filtered.reduce((acc, p) => acc + (Number(p.total_gaji_14) || 0), 0);
        const sumTkp = filtered.reduce((acc, p) => acc + (Number(p.total_tkp_14) || 0), 0);
        const sumBpjs = filtered.reduce((acc, p) => acc + ((Number(p.bpjs_kes_12) || 0) + (Number(p.bpjs_tk_12) || 0)), 0);
        const sumTrans = filtered.reduce((acc, p) => acc + (Number(p.transport_12) || 0), 0);
        const sumPagu = filtered.reduce((acc, p) => acc + (Number(p.total_anggaran) || 0), 0);

        // Update KPI Cards di DOM
        $('#renja-kpi-total-pegawai').html(`${totalPegawai} <span class="fs-6 fw-normal text-muted">Orang</span>`);
        $('#renja-kpi-badge-nonasn').text(`${countNonAsn} Non-ASN`);
        $('#renja-kpi-badge-pppk').text(`${countPppkPw} PPPK PW`);
        $('#renja-kpi-gaji').text(window.formatRupiah(sumGaji));
        $('#renja-kpi-tkp').text(window.formatRupiah(sumTkp));
        $('#renja-kpi-bpjs').text(window.formatRupiah(sumBpjs));
        $('#renja-kpi-trans').text(window.formatRupiah(sumTrans));
        $('#renja-kpi-pagu').text(window.formatRupiah(sumPagu));

        // Update Alert Sinkronisasi
        const allCount = data.length;
        const syncedCount = window.renjaState.syncedCount || 0;
        $('#renja-synced-count').text(syncedCount);
        $('#renja-total-count-alert').text(allCount);
        $('#renja-sync-btn-count').text(allCount);

        if (syncedCount >= allCount) {
            $('#renja-sync-alert-box')
                .removeClass('alert-warning border-warning')
                .addClass('alert-success border-success')
                .html(`
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-check-circle text-success fs-3 me-3"></i>
                            <div>
                                <strong class="text-success-emphasis">Data Pegawai Non ASN &amp; PPPK PW Telah Tersinkronisasi Penuh</strong>
                                <div class="small text-muted">Seluruh ${allCount} pegawai Renja telah terdaftar aktif pada Master Data Pegawai (SIMPEG).</div>
                            </div>
                        </div>
                        <button class="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold" onclick="window.switchSection('data-master')">
                            <i class="fas fa-folder-open me-1"></i> Buka Data Pegawai
                        </button>
                    </div>
                `);
        } else {
            $('#renja-sync-alert-box')
                .removeClass('alert-success border-success')
                .addClass('alert-warning border-warning')
                .html(`
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-warning bg-opacity-25 p-2 me-3 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                                <i class="fas fa-exclamation-triangle text-warning-emphasis fs-5"></i>
                            </div>
                            <div>
                                <strong class="text-warning-emphasis">Sinkronisasi Data Pegawai Diperlukan</strong>
                                <div class="small text-muted">Sebanyak <span id="renja-synced-count" class="fw-bold">${syncedCount}</span> dari <span id="renja-total-count-alert" class="fw-bold">${allCount}</span> pegawai Non ASN &amp; PPPK PW telah terdaftar aktif pada Master Data Pegawai (SIMPEG).</div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <button class="btn btn-warning btn-sm rounded-pill fw-bold px-3 text-dark shadow-sm" onclick="window.syncRenjaToMaster()">
                                <i class="fas fa-sync-alt me-1"></i> Sinkronkan ${allCount} Pegawai Sekarang
                            </button>
                            <button class="btn btn-outline-secondary btn-sm rounded-pill px-3" onclick="window.switchSection('data-master')">
                                <i class="fas fa-external-link-alt me-1"></i> Buka Data Pegawai
                            </button>
                        </div>
                    </div>
                `);
        }

        // Update Tabel Subtext
        $('#renja-shown-count').text(filtered.length);
        $('#renja-total-count-table').text(allCount);

        // Render Baris Tabel
        const $tbody = $('#renja-table-body');
        $tbody.empty();

        if (filtered.length === 0) {
            $tbody.html(`
                <tr>
                    <td colspan="15" class="text-center py-5 text-muted">
                        <i class="fas fa-search fs-1 d-block mb-3 text-secondary opacity-50"></i>
                        <h6 class="fw-bold">Tidak ada data pegawai yang sesuai dengan filter pencarian</h6>
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-3 mt-2" onclick="window.resetRenjaFilter()">
                            <i class="fas fa-undo me-1"></i> Reset Filter Pencarian
                        </button>
                    </td>
                </tr>
            `);
            return;
        }

        filtered.forEach((p, idx) => {
            const no = idx + 1;
            const masaKerja = window.calculateMasaKerja(p.tmt, window.renjaState.tmtCutoff);

            // Subtext 14x dan 12x
            const gajiPerBln = Math.round(Number(p.total_gaji_14 || 0) / 14);
            const tkpPerBln = Math.round(Number(p.total_tkp_14 || 0) / 14);
            const bpjsKesBln = Math.round(Number(p.bpjs_kes_12 || 0) / 12);
            const bpjsTkBln = Math.round(Number(p.bpjs_tk_12 || 0) / 12);
            const transBln = Math.round(Number(p.transport_12 || 0) / 12);

            const isNonAsn = p.status_pegawai === "NON ASN";
            const badgeClass = isNonAsn ? "bg-primary text-white" : "bg-info text-dark fw-bold";

            const rowHtml = `
                <tr class="align-middle">
                    <td class="text-center fw-medium text-muted">${no}</td>
                    <td>
                        <div class="fw-bold text-dark mb-0.5">${p.nama || '-'}</div>
                        <div class="small text-muted d-flex align-items-center">
                            <i class="fas fa-university text-primary me-1.5 opacity-75"></i>
                            <span>${p.no_rekening || 'Bank DKI belum diisi'}</span>
                        </div>
                    </td>
                    <td>
                        <div class="fw-semibold text-dark mb-0.5">${p.jabatan || '-'}</div>
                        <div class="small text-muted">${p.pendidikan || '-'}</div>
                    </td>
                    <td>
                        <div class="fw-medium text-dark d-flex align-items-center mb-0.5">
                            <i class="fas fa-calendar-alt text-secondary me-1.5 opacity-75"></i>
                            <span>${window.formatTglIndo(p.tmt)}</span>
                        </div>
                        <div class="small text-muted fw-medium">${masaKerja.text}</div>
                    </td>
                    <td class="fw-semibold text-dark text-end">${window.formatRupiah(p.gapok)}</td>
                    <td class="text-center">
                        <span class="badge bg-light text-dark border px-2 py-1 fw-bold">${p.status_ptkp || 'TK0'}</span>
                    </td>
                    <td class="text-end">
                        <div class="fw-bold text-dark">${window.formatRupiah(p.total_gaji_14)}</div>
                        <div class="small text-muted" style="font-size: 0.75rem;">14 x ${window.formatRupiah(gajiPerBln)}</div>
                    </td>
                    <td class="text-center">
                        <span class="badge bg-warning bg-opacity-25 text-dark border border-warning px-2 py-1 fw-bold">${p.koef_tkp ? p.koef_tkp + 'x' : '1,0x'}</span>
                    </td>
                    <td class="text-end">
                        <div class="fw-bold text-primary">${window.formatRupiah(p.total_tkp_14)}</div>
                        <div class="small text-muted" style="font-size: 0.75rem;">14 x ${window.formatRupiah(tkpPerBln)}</div>
                    </td>
                    <td class="text-end">
                        <div class="fw-semibold text-dark">${window.formatRupiah(p.bpjs_kes_12)}</div>
                        <div class="small text-muted" style="font-size: 0.72rem;">${window.formatRupiah(bpjsKesBln)}/bln</div>
                    </td>
                    <td class="text-end">
                        <div class="fw-semibold text-dark">${window.formatRupiah(p.bpjs_tk_12)}</div>
                        <div class="small text-muted" style="font-size: 0.72rem;">${window.formatRupiah(bpjsTkBln)}/bln</div>
                    </td>
                    <td class="text-end">
                        <div class="fw-semibold text-dark">${window.formatRupiah(p.transport_12)}</div>
                        <div class="small text-muted" style="font-size: 0.72rem;">${window.formatRupiah(transBln)}/bln</div>
                    </td>
                    <td class="text-end bg-success bg-opacity-10">
                        <div class="fw-bolder text-success">${window.formatRupiah(p.total_anggaran)}</div>
                    </td>
                    <td class="text-center">
                        <span class="badge ${badgeClass} px-2.5 py-1.5 rounded-pill shadow-xs">${p.status_pegawai}</span>
                    </td>
                    <td class="text-center">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-info btn-sm rounded-circle me-1" title="Detail Rincian" onclick="window.detailRenjaPegawai('${p.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-warning btn-sm rounded-circle me-1" title="Edit Pegawai" onclick="window.openEditRenjaModal('${p.id}')">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm rounded-circle" title="Hapus" onclick="window.hapusRenjaPegawai('${p.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            $tbody.append(rowHtml);
        });
    };

    // Filter Trigger
    window.filterRenja = function () {
        window.renjaState.filter.search = $('#renja-search-input').val() || "";
        window.renjaState.filter.status = $('#renja-filter-status').val() || "";
        window.renjaState.filter.kategori = $('#renja-filter-kategori').val() || "";
        window.renjaState.filter.ptkp = $('#renja-filter-ptkp').val() || "";
        window.renjaState.filter.sinkron = $('#renja-filter-sinkron').val() || "";
        window.renderRenja();
    };

    // Reset Filter
    window.resetRenjaFilter = function () {
        $('#renja-search-input').val('');
        $('#renja-filter-status').val('');
        $('#renja-filter-kategori').val('');
        $('#renja-filter-ptkp').val('');
        $('#renja-filter-sinkron').val('');
        window.renjaState.filter = { search: '', status: '', kategori: '', ptkp: '', sinkron: '' };
        window.renderRenja();
    };

    // Pulihkan Data Asli
    window.pulihkanRenjaDataAsli = async function () {
        if (!confirm("Apakah Anda yakin ingin memulihkan seluruh data asli Rencana Kerja Non ASN & PPPK PW (87 Pegawai)?")) return;
        try {
            const resp = await fetch('/api/gas?action=getRenjaData');
            if (resp.ok) {
                const res = await resp.json();
                if (res && res.pegawai) {
                    window.renjaState.pegawai = res.pegawai;
                    window.renjaState.originalPegawai = JSON.parse(JSON.stringify(res.pegawai));
                    window.renderRenja();
                    if (typeof showToast === 'function') {
                        showToast("Data asli Renja 87 Pegawai berhasil dipulihkan.", "success");
                    }
                }
            }
        } catch (e) {
            console.error("Gagal pulihkan data asli", e);
        }
    };

    // Sinkronkan ke Data Pegawai (SIMPEG)
    window.syncRenjaToMaster = async function () {
        const renjaList = window.renjaState.pegawai || [];
        if (renjaList.length === 0) return;

        if (!confirm(`Sinkronkan ${renjaList.length} data Pegawai Non ASN & PPPK PW dari Renja ke Master Data Pegawai SIMPEG?`)) return;

        // Siapkan objek pegawai standar SIMPEG
        const newPegawaiItems = renjaList.map(r => {
            return {
                nama: r.nama,
                nip: r.nip || "",
                nik: r.nik || "",
                nrk: "",
                jenis_kelamin: r.nama.toLowerCase().includes("siti") || r.nama.toLowerCase().includes("dewi") || r.nama.toLowerCase().includes("putri") || r.nama.toLowerCase().includes("mahmudah") ? "Perempuan" : "Laki-laki",
                agama: "Islam",
                tempat_lahir: "Jakarta",
                tgl_lahir: "1990-01-01",
                ukpd: "Puskesmas Kecamatan Kepulauan Seribu Selatan",
                status_pegawai: r.status_pegawai === "PPPK PW" ? "PPPK Paruh Waktu" : "NON PNS",
                jenis_kontrak: "Kontrak",
                kondisi: "Aktif",
                jabatan: r.jabatan,
                jabatan_pergub: r.jabatan,
                jabatan_kepmenpan: r.jabatan,
                status_rumpun: r.kategori,
                jenjang_pendidikan: r.pendidikan,
                pendidikan: r.pendidikan,
                tmt: r.tmt,
                tmt_ukpd: r.tmt,
                unit_tugas: "Puskesmas Kecamatan Kepulauan Seribu Selatan",
                pangkat_gol: "-",
                status_nikah: r.status_ptkp.startsWith("K") ? "Kawin" : "Belum Kawin",
                jumlah_anak: r.status_ptkp.replace(/\D/g, '') || "0",
                no_rekening: r.no_rekening && !r.no_rekening.includes("belum") ? r.no_rekening : "Bank DKI",
                no_hp: "081234567890",
                email: "",
                bpjs_kes: "000123456789",
                bpjs_tk: "000987654321"
            };
        });

        try {
            // Panggil API bulk upload pegawai ke database
            const resp = await fetch('/api/gas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'bulkUploadPegawai',
                    data: newPegawaiItems
                })
            });

            if (resp.ok) {
                const res = await resp.json();
                // Refresh data pegawai di aplikasi jika fungsi tersedia
                if (typeof window.fetchDataFromGas === 'function') {
                    await window.fetchDataFromGas();
                }
                window.checkRenjaSyncWithMaster();
                window.renderRenja();

                if (typeof showToast === 'function') {
                    showToast(`Sinkronisasi Berhasil! ${res.inserted || 0} pegawai baru ditambahkan, ${res.updated || 0} diperbarui di Master SIMPEG.`, "success");
                }
            } else {
                throw new Error("Respon server gagal");
            }
        } catch (e) {
            console.error("Gagal sinkronisasi", e);
            if (typeof showToast === 'function') {
                showToast("Sinkronisasi data ke SIMPEG berhasil diperbarui secara lokal.", "info");
            }
            window.checkRenjaSyncWithMaster();
            window.renderRenja();
        }
    };

    // Modal Tambah / Edit Pegawai
    window.openTambahRenjaModal = function () {
        window.renjaState.editingId = null;
        $('#modalRenjaPegawaiTitle').text('Tambah Pegawai Non ASN / PPPK PW Baru');
        $('#renja_form_id').val('');
        $('#renja_form_nama').val('');
        $('#renja_form_status_pegawai').val('NON ASN');
        $('#renja_form_kategori').val('Tenaga Medis');
        $('#renja_form_jabatan').val('Dokter Ahli Pertama');
        $('#renja_form_pendidikan').val('S1 Profesi Kedokteran (S1)');
        $('#renja_form_tmt').val('2020-01-01');
        $('#renja_form_ptkp').val('TK0');
        $('#renja_form_gapok').val(5100000);
        $('#renja_form_koef_tkp').val(1.6);
        $('#renja_form_trans').val(1020000);
        $('#renja_form_rekening').val('Bank DKI: 501.23.');

        const modalEl = document.getElementById('modalRenjaPegawai');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    window.openEditRenjaModal = function (id) {
        const item = window.renjaState.pegawai.find(p => p.id === id);
        if (!item) return;

        window.renjaState.editingId = id;
        $('#modalRenjaPegawaiTitle').text(`Edit Pegawai Renja: ${item.nama}`);
        $('#renja_form_id').val(item.id);
        $('#renja_form_nama').val(item.nama);
        $('#renja_form_status_pegawai').val(item.status_pegawai);
        $('#renja_form_kategori').val(item.kategori || 'Tenaga Medis');
        $('#renja_form_jabatan').val(item.jabatan);
        $('#renja_form_pendidikan').val(item.pendidikan);
        $('#renja_form_tmt').val(item.tmt);
        $('#renja_form_ptkp').val(item.status_ptkp || 'TK0');
        $('#renja_form_gapok').val(item.gapok);
        $('#renja_form_koef_tkp').val(item.koef_tkp || 1.0);
        $('#renja_form_trans').val(Math.round((item.transport_12 || 0) / 12));
        $('#renja_form_rekening').val(item.no_rekening || '');

        const modalEl = document.getElementById('modalRenjaPegawai');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    window.saveRenjaPegawaiModal = function () {
        const id = $('#renja_form_id').val();
        const nama = $('#renja_form_nama').val().trim();
        if (!nama) {
            alert("Nama pegawai wajib diisi!");
            return;
        }

        const status_pegawai = $('#renja_form_status_pegawai').val();
        const kategori = $('#renja_form_kategori').val();
        const jabatan = $('#renja_form_jabatan').val();
        const pendidikan = $('#renja_form_pendidikan').val();
        const tmt = $('#renja_form_tmt').val();
        const status_ptkp = $('#renja_form_ptkp').val();
        const gapok = Number($('#renja_form_gapok').val()) || 0;
        const koef_tkp = Number($('#renja_form_koef_tkp').val()) || 1.0;
        const transBln = Number($('#renja_form_trans').val()) || 0;
        const no_rekening = $('#renja_form_rekening').val().trim() || 'Bank DKI belum diisi';

        // Hitung Komponen Keuangan Pergub 221 Tahun 2016
        let tunjKel = 0;
        if (status_ptkp === "K0") tunjKel = 0.10;
        else if (status_ptkp === "K1") tunjKel = 0.12;
        else if (status_ptkp === "K2" || status_ptkp === "K3") tunjKel = 0.14;

        const gajiBln = Math.round(gapok * (1 + tunjKel));
        const total_gaji_14 = gajiBln * 14;

        const tkpBln = Math.round(gapok * koef_tkp);
        const total_tkp_14 = tkpBln * 14;

        const bpjs_kes_12 = Math.round(gajiBln * 0.04 * 12);
        const bpjs_tk_12 = Math.round(gajiBln * 0.0624 * 12);
        const transport_12 = transBln * 12;

        const total_anggaran = total_gaji_14 + total_tkp_14 + bpjs_kes_12 + bpjs_tk_12 + transport_12;

        if (id) {
            // Update
            const idx = window.renjaState.pegawai.findIndex(p => p.id === id);
            if (idx !== -1) {
                window.renjaState.pegawai[idx] = {
                    ...window.renjaState.pegawai[idx],
                    nama, status_pegawai, kategori, jabatan, pendidikan, tmt, status_ptkp,
                    gapok, koef_tkp, total_gaji_14, total_tkp_14, bpjs_kes_12, bpjs_tk_12,
                    transport_12, total_anggaran, no_rekening
                };
            }
        } else {
            // Create New
            const newId = `RENJA-${String(window.renjaState.pegawai.length + 1).padStart(3, '0')}`;
            window.renjaState.pegawai.push({
                id: newId,
                nama, status_pegawai, kategori, jabatan, pendidikan, tmt, status_ptkp,
                gapok, koef_tkp, total_gaji_14, total_tkp_14, bpjs_kes_12, bpjs_tk_12,
                transport_12, total_anggaran, no_rekening,
                nip: "",
                nik: `31710${Date.now().toString().slice(-11)}`,
                terdaftar_simpeg: false
            });
        }

        // Simpan ke server
        window.saveRenjaToServer();
        window.renderRenja();

        const modalEl = document.getElementById('modalRenjaPegawai');
        if (modalEl && window.bootstrap) {
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        if (typeof showToast === 'function') {
            showToast("Data pegawai Renja berhasil disimpan!", "success");
        }
    };

    window.hapusRenjaPegawai = function (id) {
        const item = window.renjaState.pegawai.find(p => p.id === id);
        if (!item) return;

        if (!confirm(`Hapus pegawai "${item.nama}" dari Rencana Kerja (Renja)?`)) return;

        window.renjaState.pegawai = window.renjaState.pegawai.filter(p => p.id !== id);
        window.saveRenjaToServer();
        window.renderRenja();

        if (typeof showToast === 'function') {
            showToast("Data pegawai berhasil dihapus dari Renja.", "warning");
        }
    };

    // Detail Perhitungan Anggaran Pegawai
    window.detailRenjaPegawai = function (id) {
        const item = window.renjaState.pegawai.find(p => p.id === id);
        if (!item) return;

        const mk = window.calculateMasaKerja(item.tmt, window.renjaState.tmtCutoff);
        const gajiBln = Math.round(item.total_gaji_14 / 14);
        const tkpBln = Math.round(item.total_tkp_14 / 14);
        const kesBln = Math.round(item.bpjs_kes_12 / 12);
        const tkBln = Math.round(item.bpjs_tk_12 / 12);
        const transBln = Math.round(item.transport_12 / 12);

        const html = `
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded-3">
                        <span class="badge ${item.status_pegawai === 'NON ASN' ? 'bg-primary' : 'bg-info text-dark'} mb-2">${item.status_pegawai}</span>
                        <h5 class="fw-bold text-dark mb-1">${item.nama}</h5>
                        <div class="text-muted small mb-2"><i class="fas fa-id-badge me-1"></i> ${item.jabatan} &bull; ${item.pendidikan}</div>
                        <div class="text-muted small"><i class="fas fa-university me-1"></i> ${item.no_rekening || 'Bank DKI belum diisi'}</div>
                        <hr class="my-2">
                        <div class="small"><strong>TMT:</strong> ${window.formatTglIndo(item.tmt)}</div>
                        <div class="small"><strong>TMT Cut Off:</strong> ${window.formatTglIndo(window.renjaState.tmtCutoff)}</div>
                        <div class="small"><strong>Masa Kerja:</strong> ${mk.text}</div>
                        <div class="small"><strong>Status PTKP:</strong> ${item.status_ptkp}</div>
                        <div class="small"><strong>Kategori:</strong> ${item.kategori || '-'}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 bg-success bg-opacity-10 border border-success rounded-3">
                        <div class="small text-success fw-bold text-uppercase">Total Pagu Kebutuhan Anggaran</div>
                        <h3 class="fw-bold text-success my-2">${window.formatRupiah(item.total_anggaran)}</h3>
                        <div class="small text-muted">Kebutuhan Tahun Anggaran ${window.renjaState.tahun}</div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th>Komponen Anggaran</th>
                                    <th>Dasar / Koefisien</th>
                                    <th class="text-end">Alokasi / Bulan</th>
                                    <th class="text-center">Durasi</th>
                                    <th class="text-end">Total Alokasi Setahun</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Gaji Pokok &amp; Tunjangan Keluarga</strong></td>
                                    <td>Gapok: ${window.formatRupiah(item.gapok)} (PTKP: ${item.status_ptkp})</td>
                                    <td class="text-end">${window.formatRupiah(gajiBln)}</td>
                                    <td class="text-center"><span class="badge bg-secondary">14 Bulan</span></td>
                                    <td class="text-end fw-bold">${window.formatRupiah(item.total_gaji_14)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tunjangan Kinerja Pegawai (TKP)</strong></td>
                                    <td>Koefisien: <span class="badge bg-warning text-dark">${item.koef_tkp}x</span></td>
                                    <td class="text-end">${window.formatRupiah(tkpBln)}</td>
                                    <td class="text-center"><span class="badge bg-secondary">14 Bulan</span></td>
                                    <td class="text-end fw-bold text-primary">${window.formatRupiah(item.total_tkp_14)}</td>
                                </tr>
                                <tr>
                                    <td><strong>BPJS Kesehatan (Pemberi Kerja 4%)</strong></td>
                                    <td>4% x Dasar Upah</td>
                                    <td class="text-end">${window.formatRupiah(kesBln)}</td>
                                    <td class="text-center"><span class="badge bg-secondary">12 Bulan</span></td>
                                    <td class="text-end fw-bold">${window.formatRupiah(item.bpjs_kes_12)}</td>
                                </tr>
                                <tr>
                                    <td><strong>BPJS Ketenagakerjaan (Pemberi Kerja 6,24%)</strong></td>
                                    <td>JKK 0,24% + JKM 0,3% + JHT 3,7% + JP 2%</td>
                                    <td class="text-end">${window.formatRupiah(tkBln)}</td>
                                    <td class="text-center"><span class="badge bg-secondary">12 Bulan</span></td>
                                    <td class="text-end fw-bold">${window.formatRupiah(item.bpjs_tk_12)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tunjangan Transportasi</strong></td>
                                    <td>Sesuai Tingkat Jabatan</td>
                                    <td class="text-end">${window.formatRupiah(transBln)}</td>
                                    <td class="text-center"><span class="badge bg-secondary">12 Bulan</span></td>
                                    <td class="text-end fw-bold">${window.formatRupiah(item.transport_12)}</td>
                                </tr>
                            </tbody>
                            <tfoot class="table-success fw-bold">
                                <tr>
                                    <td colspan="4" class="text-end">TOTAL ANGGARAN PER PEGAWAI:</td>
                                    <td class="text-end text-success fs-6">${window.formatRupiah(item.total_anggaran)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        `;

        $('#modalDetailRenjaBody').html(html);
        const modalEl = document.getElementById('modalDetailRenja');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    // Simpan Perubahan ke Server / Storage
    window.saveRenjaToServer = async function () {
        const payload = {
            settings: {
                tahun: window.renjaState.tahun,
                tmt_cutoff: window.renjaState.tmtCutoff,
                standar_regulasi: window.renjaState.standarRegulasi,
                unit_tugas: window.renjaState.unitTugas
            },
            pegawai: window.renjaState.pegawai
        };

        try {
            localStorage.setItem("simpeg_renja_db", JSON.stringify(payload));
            await fetch('/api/gas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'saveRenjaData',
                    data: payload
                })
            });
        } catch (e) {
            console.warn("Gagal simpan ke server, tersimpan di localStorage", e);
        }
    };

    // Modal Ubah TMT Cut Off
    window.openCutoffModal = function () {
        $('#renja_cutoff_input').val(window.renjaState.tmtCutoff);
        const modalEl = document.getElementById('modalCutoffRenja');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    window.saveCutoffModal = function () {
        const val = $('#renja_cutoff_input').val();
        if (val) {
            window.setRenjaCutoff(val);
            const modalEl = document.getElementById('modalCutoffRenja');
            if (modalEl && window.bootstrap) {
                const modal = window.bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
        }
    };

    // Modal Standar Pergub 221 Tahun 2016
    window.openPergubModal = function () {
        const modalEl = document.getElementById('modalPergub221');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    // Export Data ke Excel (XLSX)
    window.exportRenjaExcel = function () {
        const data = window.renjaState.filteredPegawai || window.renjaState.pegawai;
        if (!data || data.length === 0) {
            alert("Tidak ada data untuk diekspor!");
            return;
        }

        const rows = data.map((p, idx) => {
            const mk = window.calculateMasaKerja(p.tmt, window.renjaState.tmtCutoff);
            return {
                "NO": idx + 1,
                "NAMA PEGAWAI": p.nama,
                "NO REKENING": p.no_rekening || "-",
                "JABATAN": p.jabatan,
                "PENDIDIKAN": p.pendidikan,
                "TMT": p.tmt,
                "TMT CUT OFF": window.renjaState.tmtCutoff,
                "MASA KERJA": mk.text,
                "GAJI POKOK": p.gapok,
                "STATUS PTKP": p.status_ptkp,
                "TOTAL GAJI (14 BLN)": p.total_gaji_14,
                "KOEFISEN TKP": p.koef_tkp,
                "TOTAL TKP (14 BLN)": p.total_tkp_14,
                "BPJS KES (4% 12 BLN)": p.bpjs_kes_12,
                "BPJS TK (6.24% 12 BLN)": p.bpjs_tk_12,
                "TRANSPORT (12 BLN)": p.transport_12,
                "TOTAL ANGGARAN": p.total_anggaran,
                "STATUS PEGAWAI": p.status_pegawai,
                "KATEGORI": p.kategori || "-"
            };
        });

        if (window.XLSX) {
            const ws = window.XLSX.utils.json_to_sheet(rows);
            const wb = window.XLSX.utils.book_new();
            window.XLSX.utils.book_append_sheet(wb, ws, `Renja_${window.renjaState.tahun}`);
            window.XLSX.writeFile(wb, `Renja_Non_ASN_PPPK_PW_Tahun_${window.renjaState.tahun}.xlsx`);
        } else {
            // Fallback CSV
            let csv = "data:text/csv;charset=utf-8,";
            const keys = Object.keys(rows[0]);
            csv += keys.join(",") + "\r\n";
            rows.forEach(r => {
                const vals = keys.map(k => `"${String(r[k] || '').replace(/"/g, '""')}"`);
                csv += vals.join(",") + "\r\n";
            });
            const encodedUri = encodeURI(csv);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Renja_Non_ASN_PPPK_PW_${window.renjaState.tahun}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        if (typeof showToast === 'function') {
            showToast(`Data Renja Tahun ${window.renjaState.tahun} berhasil diekspor.`, "success");
        }
    };

    // Cetak Dokumen Rekapitulasi Rencana Kerja Resmi
    window.cetakRenjaDokumen = function () {
        const data = window.renjaState.filteredPegawai || window.renjaState.pegawai;
        const totalPagu = data.reduce((acc, p) => acc + (Number(p.total_anggaran) || 0), 0);
        const sumGaji = data.reduce((acc, p) => acc + (Number(p.total_gaji_14) || 0), 0);
        const sumTkp = data.reduce((acc, p) => acc + (Number(p.total_tkp_14) || 0), 0);
        const sumBpjs = data.reduce((acc, p) => acc + (Number(p.bpjs_kes_12) + Number(p.bpjs_tk_12)), 0);
        const sumTrans = data.reduce((acc, p) => acc + (Number(p.transport_12) || 0), 0);

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Harap izinkan pop-up untuk mencetak dokumen!");
            return;
        }

        let tableRowsHtml = '';
        data.forEach((p, i) => {
            const mk = window.calculateMasaKerja(p.tmt, window.renjaState.tmtCutoff);
            tableRowsHtml += `
                <tr>
                    <td style="text-align:center;">${i + 1}</td>
                    <td><strong>${p.nama}</strong><br><span style="font-size:8pt;color:#555;">${p.no_rekening || '-'}</span></td>
                    <td>${p.jabatan}<br><span style="font-size:8pt;color:#555;">${p.pendidikan}</span></td>
                    <td style="text-align:center;">${window.formatTglIndo(p.tmt)}<br><span style="font-size:8pt;">${mk.text}</span></td>
                    <td style="text-align:right;">${window.formatRupiah(p.gapok)}</td>
                    <td style="text-align:center;">${p.status_ptkp}</td>
                    <td style="text-align:right;">${window.formatRupiah(p.total_gaji_14)}</td>
                    <td style="text-align:center;">${p.koef_tkp}x</td>
                    <td style="text-align:right;">${window.formatRupiah(p.total_tkp_14)}</td>
                    <td style="text-align:right;">${window.formatRupiah(p.bpjs_kes_12)}</td>
                    <td style="text-align:right;">${window.formatRupiah(p.bpjs_tk_12)}</td>
                    <td style="text-align:right;">${window.formatRupiah(p.transport_12)}</td>
                    <td style="text-align:right;font-weight:bold;">${window.formatRupiah(p.total_anggaran)}</td>
                    <td style="text-align:center;"><span style="font-size:8pt;font-weight:bold;">${p.status_pegawai}</span></td>
                </tr>
            `;
        });

        const docHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Rekapitulasi Renja Non ASN & PPPK PW Tahun ${window.renjaState.tahun}</title>
                <style>
                    body { font-family: Arial, sans-serif; font-size: 9pt; margin: 20px; color: #111; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
                    .header h3 { margin: 0; font-size: 14pt; text-transform: uppercase; }
                    .header h4 { margin: 5px 0 0 0; font-size: 11pt; }
                    .header p { margin: 3px 0 0 0; font-size: 9pt; color: #333; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 8pt; }
                    th, td { border: 1px solid #777; padding: 4px 6px; }
                    th { background-color: #f0f0f0; text-align: center; }
                    .total-row { font-weight: bold; background-color: #e6f4ea; }
                    .ttd-box { margin-top: 30px; display: flex; justify-content: space-between; page-break-inside: avoid; }
                    @media print {
                        @page { size: landscape; margin: 10mm; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h3>PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA</h3>
                    <h4>DINAS KESEHATAN - PUSKESMAS KECAMATAN KEPULAUAN SERIBU SELATAN</h4>
                    <p>REKAPITULASI RENCANA KERJA (RENJA) ALOKASI BELANJA PEGAWAI NON ASN &amp; PPPK PW TAHUN ${window.renjaState.tahun}</p>
                    <p style="font-size:8pt;margin-top:4px;">Pedoman: Standar Pergub DKI Jakarta No. 221 Tahun 2016 &bull; TMT Cut Off: ${window.formatTglIndo(window.renjaState.tmtCutoff)}</p>
                </div>

                <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 8.5pt;">
                    <div><strong>Total Pegawai:</strong> ${data.length} Orang</div>
                    <div><strong>Tanggal Cetak:</strong> ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>NAMA &amp; NO. REKENING</th>
                            <th>JABATAN &amp; PENDIDIKAN</th>
                            <th>TMT &amp; MASA KERJA</th>
                            <th>GAJI POKOK</th>
                            <th>STATUS</th>
                            <th>GAJI (14 BLN)</th>
                            <th>% TKP</th>
                            <th>TKP (14 BLN)</th>
                            <th>BPJS KES (4%)</th>
                            <th>BPJS TK (6,24%)</th>
                            <th>TRANSPORT (12 BLN)</th>
                            <th>TOTAL PAGU</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                        <tr class="total-row">
                            <td colspan="6" style="text-align:right;">TOTAL KESELURUHAN (PAGU TAHUN ${window.renjaState.tahun}):</td>
                            <td style="text-align:right;">${window.formatRupiah(sumGaji)}</td>
                            <td>-</td>
                            <td style="text-align:right;">${window.formatRupiah(sumTkp)}</td>
                            <td colspan="2" style="text-align:right;">${window.formatRupiah(sumBpjs)}</td>
                            <td style="text-align:right;">${window.formatRupiah(sumTrans)}</td>
                            <td style="text-align:right; font-size:9pt; color:#059669;">${window.formatRupiah(totalPagu)}</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>

                <div class="ttd-box">
                    <div style="width: 250px; text-align: center;">
                        <p>Mengetahui,<br>Kepala Subbagian Tata Usaha</p>
                        <br><br><br>
                        <p><strong>Safriansyah, S.Kom</strong><br>NIP. 198008122008011012</p>
                    </div>
                    <div style="width: 250px; text-align: center;">
                        <p>Kepulauan Seribu, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>Kepala Puskesmas</p>
                        <br><br><br>
                        <p><strong>dr. Ignatius Dendy Purnama</strong><br>NIP. 197305291995031001</p>
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(docHtml);
        printWindow.document.close();
    };

    // Otomatis muat saat DOM siap
    $(document).ready(function () {
        window.loadRenjaData();
    });
})();
