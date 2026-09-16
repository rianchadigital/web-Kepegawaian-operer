/**
 * Modul Renja Pegawai Non ASN dan PPPK PW Tahun Anggaran 2027
 * UKPD: PUSKESMAS KECAMATAN KEPULAUAN SERIBU UTARA
 * TMT CUT OFF: 01/06/2027
 * Terintegrasi & Sinkron Otomatis dengan Master Data Pegawai
 */

(function() {
    const DEFAULT_RENJA_PEGAWAI = [
  {
    "id": "RENJA-001",
    "no": 1,
    "nama": "dr. William D Julius Sihombing",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "04/02/2019",
    "masa_kerja_tahun": 8,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5102714,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5715040,
    "bulan_gaji": 14,
    "total_gaji": 80010556,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 8164342,
    "bulan_tkp": 14,
    "total_tkp": 114300788,
    "bpjs_kes_bln": 228602,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2743219,
    "bpjs_tk_bln": 356618,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4279422,
    "transport_bln": 1020543,
    "bulan_transport": 12,
    "total_transport": 12246514,
    "total_anggaran": 213580499,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-002",
    "no": 2,
    "nama": "dr. Wisnu Surya Pamungkas",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/04/17",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5230282,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 5230282,
    "bulan_gaji": 14,
    "total_gaji": 73223948,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 8368451,
    "bulan_tkp": 14,
    "total_tkp": 117158314,
    "bpjs_kes_bln": 209211,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2510535,
    "bpjs_tk_bln": 326370,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3916435,
    "transport_bln": 1046056,
    "bulan_transport": 12,
    "total_transport": 12552677,
    "total_anggaran": 209361909,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-003",
    "no": 3,
    "nama": "dr. Mahmudah",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/13",
    "masa_kerja_tahun": 14,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5495065,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 6264374,
    "bulan_gaji": 14,
    "total_gaji": 87701237,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 8792104,
    "bulan_tkp": 14,
    "total_tkp": 123089456,
    "bpjs_kes_bln": 250575,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 3006900,
    "bpjs_tk_bln": 390897,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4690763,
    "transport_bln": 1099013,
    "bulan_transport": 12,
    "total_transport": 13188156,
    "total_anggaran": 231676512,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-004",
    "no": 4,
    "nama": "dr. Karen",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4856837,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4856837,
    "bulan_gaji": 14,
    "total_gaji": 67995718,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7770939,
    "bulan_tkp": 14,
    "total_tkp": 108793146,
    "bpjs_kes_bln": 38855,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 466256,
    "bpjs_tk_bln": 303067,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3636800,
    "transport_bln": 971367,
    "bulan_transport": 12,
    "total_transport": 11656409,
    "total_anggaran": 192548329,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-005",
    "no": 5,
    "nama": "dr. Ilyas",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4738377,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5212215,
    "bulan_gaji": 14,
    "total_gaji": 72971006,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7581403,
    "bulan_tkp": 14,
    "total_tkp": 106139642,
    "bpjs_kes_bln": 208489,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2501863,
    "bpjs_tk_bln": 325242,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3902906,
    "transport_bln": 947675,
    "bulan_transport": 12,
    "total_transport": 11372105,
    "total_anggaran": 196887522,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-006",
    "no": 6,
    "nama": "dr. Nia Vebriyani",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5270000,
    "bulan_gaji": 14,
    "total_gaji": 73780000,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 210800,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2529600,
    "bpjs_tk_bln": 328848,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3946176,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 194901387,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-007",
    "no": 7,
    "nama": "Pengganti drg. Natasha",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran Gigi",
    "jabatan": "Dokter Gigi Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/02/26",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4622807,
    "bulan_gaji": 14,
    "total_gaji": 64719298,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 36982,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443789,
    "bpjs_tk_bln": 288463,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3461558,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 183270256,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-008",
    "no": 8,
    "nama": "Dokter Umum (BLUD)",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/02/26",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4622807,
    "bulan_gaji": 14,
    "total_gaji": 64719298,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 36982,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443789,
    "bpjs_tk_bln": 288463,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3461558,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 183270256,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-009",
    "no": 9,
    "nama": "Dokter Umum",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/01/27",
    "masa_kerja_tahun": 0,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4622807,
    "bulan_gaji": 14,
    "total_gaji": 64719298,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 36982,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443789,
    "bpjs_tk_bln": 288463,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3461558,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 183270256,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-010",
    "no": 10,
    "nama": "Dokter Umum",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/01/27",
    "masa_kerja_tahun": 0,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4622807,
    "bulan_gaji": 14,
    "total_gaji": 64719298,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 36982,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443789,
    "bpjs_tk_bln": 288463,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3461558,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 183270256,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-011",
    "no": 11,
    "nama": "Dokter Umum",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Kedokteran",
    "jabatan": "Dokter Ahli Pertama",
    "kategori_jabatan": "DOKTER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/01/27",
    "masa_kerja_tahun": 0,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4622807,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4622807,
    "bulan_gaji": 14,
    "total_gaji": 64719298,
    "persen_tkp": 1.6,
    "persen_tkp_str": "1,6",
    "tkp_bln": 7396491,
    "bulan_tkp": 14,
    "total_tkp": 103550874,
    "bpjs_kes_bln": 36982,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443789,
    "bpjs_tk_bln": 288463,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3461558,
    "transport_bln": 924561,
    "bulan_transport": 12,
    "total_transport": 11094737,
    "total_anggaran": 183270256,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-012",
    "no": 12,
    "nama": "Ridwan, S.Farm, Apt",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Apoteker",
    "jabatan": "Apoteker Ahli Pertama",
    "kategori_jabatan": "APOTEKER",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4856837,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5439657,
    "bulan_gaji": 14,
    "total_gaji": 76155204,
    "persen_tkp": 1.5,
    "persen_tkp_str": "1,5",
    "tkp_bln": 7285256,
    "bulan_tkp": 14,
    "total_tkp": 101993584,
    "bpjs_kes_bln": 217586,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2611036,
    "bpjs_tk_bln": 339435,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4073215,
    "transport_bln": 971367,
    "bulan_transport": 12,
    "total_transport": 11656409,
    "total_anggaran": 196489448,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-013",
    "no": 13,
    "nama": "Nurkholish Majid, S.Farm, Apt",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Apoteker",
    "jabatan": "Apoteker Ahli Pertama",
    "kategori_jabatan": "APOTEKER",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5102714,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 5102714,
    "bulan_gaji": 14,
    "total_gaji": 71437996,
    "persen_tkp": 1.5,
    "persen_tkp_str": "1,5",
    "tkp_bln": 7654071,
    "bulan_tkp": 14,
    "total_tkp": 107156994,
    "bpjs_kes_bln": 40822,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 489861,
    "bpjs_tk_bln": 318409,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3820912,
    "transport_bln": 1020543,
    "bulan_transport": 12,
    "total_transport": 12246514,
    "total_anggaran": 195152277,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-014",
    "no": 14,
    "nama": "Muhamad Syafaat, S.Farm, Apt",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Profesi Apoteker",
    "jabatan": "Apoteker Ahli Pertama",
    "kategori_jabatan": "APOTEKER",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "04/02/15",
    "masa_kerja_tahun": 12,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5361039,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 6111584,
    "bulan_gaji": 14,
    "total_gaji": 85562182,
    "persen_tkp": 1.5,
    "persen_tkp_str": "1,5",
    "tkp_bln": 8041559,
    "bulan_tkp": 14,
    "total_tkp": 112581826,
    "bpjs_kes_bln": 42888,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 514660,
    "bpjs_tk_bln": 381363,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4576354,
    "transport_bln": 1072208,
    "bulan_transport": 12,
    "total_transport": 12866494,
    "total_anggaran": 216101516,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-015",
    "no": 15,
    "nama": "Isnatami Nurul Azni, SKM",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Sanitasi",
    "jabatan": "Sanitarian Ahli Pertama",
    "kategori_jabatan": "S1 KESEHATAN /D3 KESEHETAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/11/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 7,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4922618,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4922618,
    "bulan_gaji": 14,
    "total_gaji": 68916652,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3938094,
    "bulan_tkp": 14,
    "total_tkp": 55133316,
    "bpjs_kes_bln": 39381,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 472571,
    "bpjs_tk_bln": 307171,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3686056,
    "transport_bln": 984524,
    "bulan_transport": 12,
    "total_transport": 11814283,
    "total_anggaran": 140022878,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-016",
    "no": 16,
    "nama": "Nur Ardhi Praja, S.Farm",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Farmasi",
    "jabatan": "Asisten apoteker Terampil",
    "kategori_jabatan": "S1 KESEHATAN /D3 KESEHETAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 5045684,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 5045684,
    "bulan_gaji": 14,
    "total_gaji": 70639576,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 4036547,
    "bulan_tkp": 14,
    "total_tkp": 56511658,
    "bpjs_kes_bln": 40365,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 484386,
    "bpjs_tk_bln": 314851,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3778208,
    "transport_bln": 1009137,
    "bulan_transport": 12,
    "total_transport": 12109642,
    "total_anggaran": 143523470,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-017",
    "no": 17,
    "nama": "Uzli",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Kesmas",
    "jabatan": "Tenaga Promosi Kesehatan dan Ilmu Perilaku Pertama",
    "kategori_jabatan": "S1 KESEHATAN /D3 KESEHETAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4459649,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4459649,
    "bulan_gaji": 14,
    "total_gaji": 62435086,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3567719,
    "bulan_tkp": 14,
    "total_tkp": 49948066,
    "bpjs_kes_bln": 178386,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2140632,
    "bpjs_tk_bln": 278282,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3339385,
    "transport_bln": 891930,
    "bulan_transport": 12,
    "total_transport": 10703158,
    "total_anggaran": 128566327,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-018",
    "no": 18,
    "nama": "Puspita",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 Kesmas",
    "jabatan": "Tenaga Promosi Kesehatan dan Ilmu Perilaku Pertama",
    "kategori_jabatan": "S1 KESEHATAN /D3 KESEHETAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "S1",
    "gaji_pokok": 4459649,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 4905614,
    "bulan_gaji": 14,
    "total_gaji": 68678595,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3567719,
    "bulan_tkp": 14,
    "total_tkp": 49948066,
    "bpjs_kes_bln": 196225,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2354695,
    "bpjs_tk_bln": 306110,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3673324,
    "transport_bln": 891930,
    "bulan_transport": 12,
    "total_transport": 10703158,
    "total_anggaran": 135357838,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-019",
    "no": 19,
    "nama": "Lia",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/03/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4285444,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 4799697,
    "bulan_gaji": 14,
    "total_gaji": 67195762,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3428355,
    "bulan_tkp": 14,
    "total_tkp": 47996970,
    "bpjs_kes_bln": 34284,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 411403,
    "bpjs_tk_bln": 299501,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3594013,
    "transport_bln": 857089,
    "bulan_transport": 12,
    "total_transport": 10285066,
    "total_anggaran": 129483214,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-020",
    "no": 20,
    "nama": "Tatu",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/03/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4285444,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4285444,
    "bulan_gaji": 14,
    "total_gaji": 59996216,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3428355,
    "bulan_tkp": 14,
    "total_tkp": 47996970,
    "bpjs_kes_bln": 171418,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2057013,
    "bpjs_tk_bln": 267412,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3208940,
    "transport_bln": 857089,
    "bulan_transport": 12,
    "total_transport": 10285066,
    "total_anggaran": 123544205,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-021",
    "no": 21,
    "nama": "Balkis",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Kesehatan Gigi dan Mulut",
    "jabatan": "Terapis Gigi dan Mulut Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/03/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4285444,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 4885406,
    "bulan_gaji": 14,
    "total_gaji": 68395686,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3428355,
    "bulan_tkp": 14,
    "total_tkp": 47996970,
    "bpjs_kes_bln": 34284,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 411403,
    "bpjs_tk_bln": 304849,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3658192,
    "transport_bln": 857089,
    "bulan_transport": 12,
    "total_transport": 10285066,
    "total_anggaran": 130747317,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-022",
    "no": 22,
    "nama": "Yayuk",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/03/22",
    "masa_kerja_tahun": 5,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4285444,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 4885406,
    "bulan_gaji": 14,
    "total_gaji": 68395686,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3428355,
    "bulan_tkp": 14,
    "total_tkp": 47996970,
    "bpjs_kes_bln": 34284,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 411403,
    "bpjs_tk_bln": 304849,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3658192,
    "transport_bln": 857089,
    "bulan_transport": 12,
    "total_transport": 10285066,
    "total_anggaran": 130747317,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-023",
    "no": 23,
    "nama": "Hana Widya Indraswari",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 analis kesehatan",
    "jabatan": "Pranata labkes Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/06/20",
    "masa_kerja_tahun": 6,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4392580,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 4919690,
    "bulan_gaji": 14,
    "total_gaji": 68875654,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3514064,
    "bulan_tkp": 14,
    "total_tkp": 49196896,
    "bpjs_kes_bln": 35141,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 421688,
    "bpjs_tk_bln": 306989,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3683864,
    "transport_bln": 878516,
    "bulan_transport": 12,
    "total_transport": 10542192,
    "total_anggaran": 132720294,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-024",
    "no": 24,
    "nama": "Nia Devita Ayu",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 analis kesehatan",
    "jabatan": "Pranata labkes Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/10/19",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4392580,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4392580,
    "bulan_gaji": 14,
    "total_gaji": 61496120,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3514064,
    "bulan_tkp": 14,
    "total_tkp": 49196896,
    "bpjs_kes_bln": 175703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2108438,
    "bpjs_tk_bln": 274097,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3289164,
    "transport_bln": 878516,
    "bulan_transport": 12,
    "total_transport": 10542192,
    "total_anggaran": 126632810,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-025",
    "no": 25,
    "nama": "Intan Oktaviani",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/10/2019",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4392580,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5007541,
    "bulan_gaji": 14,
    "total_gaji": 70105577,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3514064,
    "bulan_tkp": 14,
    "total_tkp": 49196896,
    "bpjs_kes_bln": 200302,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2403620,
    "bpjs_tk_bln": 312471,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3749647,
    "transport_bln": 878516,
    "bulan_transport": 12,
    "total_transport": 10542192,
    "total_anggaran": 135997932,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-026",
    "no": 26,
    "nama": "Nurul Syafiqoh, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4502395,
    "bulan_gaji": 14,
    "total_gaji": 63033530,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 180096,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2161150,
    "bpjs_tk_bln": 280949,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3371393,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 129798645,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-027",
    "no": 27,
    "nama": "Intan Maleha, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5132730,
    "bulan_gaji": 14,
    "total_gaji": 71858224,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 36019,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 432230,
    "bpjs_tk_bln": 320282,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3843388,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 137366414,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-028",
    "no": 28,
    "nama": "Safuroh, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5132730,
    "bulan_gaji": 14,
    "total_gaji": 71858224,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 205309,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2463711,
    "bpjs_tk_bln": 320282,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3843388,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 139397895,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-029",
    "no": 29,
    "nama": "Amalia Utami, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 4952635,
    "bulan_gaji": 14,
    "total_gaji": 69336883,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 36019,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 432230,
    "bpjs_tk_bln": 309044,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3708533,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 134710218,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-030",
    "no": 30,
    "nama": "Sami'ah Islamiyati, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/01/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5042682,
    "bulan_gaji": 14,
    "total_gaji": 70597554,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 36019,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 432230,
    "bpjs_tk_bln": 314663,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3775961,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 136038317,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-031",
    "no": 31,
    "nama": "Rizky Tri Yulianita, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/08/17",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 10,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4502395,
    "bulan_gaji": 14,
    "total_gaji": 63033530,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3601916,
    "bulan_tkp": 14,
    "total_tkp": 50426824,
    "bpjs_kes_bln": 36019,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 432230,
    "bpjs_tk_bln": 280949,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3371393,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 128069725,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-032",
    "no": 32,
    "nama": "Diba Garin Ied, Amd.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/04/17",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4614955,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4614955,
    "bulan_gaji": 14,
    "total_gaji": 64609370,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3691964,
    "bulan_tkp": 14,
    "total_tkp": 51687496,
    "bpjs_kes_bln": 36920,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443036,
    "bpjs_tk_bln": 287973,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3455678,
    "transport_bln": 922991,
    "bulan_transport": 12,
    "total_transport": 11075892,
    "total_anggaran": 131271472,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-033",
    "no": 33,
    "nama": "Mita Apriyanti, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/10/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4614955,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5076451,
    "bulan_gaji": 14,
    "total_gaji": 71070307,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3691964,
    "bulan_tkp": 14,
    "total_tkp": 51687496,
    "bpjs_kes_bln": 203058,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2436696,
    "bpjs_tk_bln": 316771,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3801246,
    "transport_bln": 922991,
    "bulan_transport": 12,
    "total_transport": 11075892,
    "total_anggaran": 140071637,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-034",
    "no": 34,
    "nama": "Nuralfiah Anggraeni, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/08/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 10,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4614955,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5261049,
    "bulan_gaji": 14,
    "total_gaji": 73654682,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3691964,
    "bulan_tkp": 14,
    "total_tkp": 51687496,
    "bpjs_kes_bln": 36920,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443036,
    "bpjs_tk_bln": 328289,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3939473,
    "transport_bln": 922991,
    "bulan_transport": 12,
    "total_transport": 11075892,
    "total_anggaran": 140800579,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-035",
    "no": 35,
    "nama": "Nina Sudianti, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/08/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 10,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4614955,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5076451,
    "bulan_gaji": 14,
    "total_gaji": 71070307,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3691964,
    "bulan_tkp": 14,
    "total_tkp": 51687496,
    "bpjs_kes_bln": 36920,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443036,
    "bpjs_tk_bln": 316771,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3801246,
    "transport_bln": 922991,
    "bulan_transport": 12,
    "total_transport": 11075892,
    "total_anggaran": 138077977,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-036",
    "no": 36,
    "nama": "Melinda, Amd.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/08/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 10,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4614955,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4614955,
    "bulan_gaji": 14,
    "total_gaji": 64609370,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3691964,
    "bulan_tkp": 14,
    "total_tkp": 51687496,
    "bpjs_kes_bln": 36920,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 443036,
    "bpjs_tk_bln": 287973,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3455678,
    "transport_bln": 922991,
    "bulan_transport": 12,
    "total_transport": 11075892,
    "total_anggaran": 131271472,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-037",
    "no": 37,
    "nama": "Desi Wahyuni, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/03/15",
    "masa_kerja_tahun": 12,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5203361,
    "bulan_gaji": 14,
    "total_gaji": 72847051,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 324690,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3896277,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 141529894,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-038",
    "no": 38,
    "nama": "Rodiatul Jannah, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 144320560,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-039",
    "no": 39,
    "nama": "Mahdiyah, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 144320560,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-040",
    "no": 40,
    "nama": "Ibnu Sholeh, Amd.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 144320560,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-041",
    "no": 41,
    "nama": "Mega Sari, Amd.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 144320560,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-042",
    "no": 42,
    "nama": "Leli Ratnasari, Amd.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "04/02/14",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5297967,
    "bulan_gaji": 14,
    "total_gaji": 74171543,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 211919,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2543024,
    "bpjs_tk_bln": 330593,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3967118,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 145014140,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-043",
    "no": 43,
    "nama": "Ratih Maisyarati, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "17/10/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 7,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5297967,
    "bulan_gaji": 14,
    "total_gaji": 74171543,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 330593,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3967118,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 142925227,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-044",
    "no": 44,
    "nama": "Ahmad Jatul Kahfi, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 215703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2588435,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 146454884,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-045",
    "no": 45,
    "nama": "Safitri, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 215703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2588435,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 146454884,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-046",
    "no": 46,
    "nama": "Muhamad Tajudin, AMK",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 37843,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 454111,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 144320560,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-047",
    "no": 47,
    "nama": "Hilaliah, AMKeb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5203361,
    "bulan_gaji": 14,
    "total_gaji": 72847051,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 208134,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2497613,
    "bpjs_tk_bln": 324690,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3896277,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 143573396,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-048",
    "no": 48,
    "nama": "Nurdahlia, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 215703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2588435,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 146454884,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-049",
    "no": 49,
    "nama": "Janita Ria Sari, AMK",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4730328,
    "bulan_gaji": 14,
    "total_gaji": 66224592,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 189213,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2270557,
    "bpjs_tk_bln": 295172,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3542070,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 136369674,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-050",
    "no": 50,
    "nama": "Yuliyana, AMK",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 215703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2588435,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 146454884,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-051",
    "no": 51,
    "nama": "Dewi Handayani, Amd.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/07/13",
    "masa_kerja_tahun": 13,
    "masa_kerja_bulan": 11,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4730328,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5392574,
    "bulan_gaji": 14,
    "total_gaji": 75496035,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3784262,
    "bulan_tkp": 14,
    "total_tkp": 52979668,
    "bpjs_kes_bln": 215703,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2588435,
    "bpjs_tk_bln": 336497,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4037959,
    "transport_bln": 946066,
    "bulan_transport": 12,
    "total_transport": 11352787,
    "total_anggaran": 146454884,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-052",
    "no": 52,
    "nama": "Dwi Astutiningsih, AMK",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/13",
    "masa_kerja_tahun": 14,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4848587,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5527389,
    "bulan_gaji": 14,
    "total_gaji": 77383449,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3878870,
    "bulan_tkp": 14,
    "total_tkp": 54304180,
    "bpjs_kes_bln": 221096,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2653147,
    "bpjs_tk_bln": 344909,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4138909,
    "transport_bln": 969717,
    "bulan_transport": 12,
    "total_transport": 11636609,
    "total_anggaran": 150116294,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-053",
    "no": 53,
    "nama": "Dedi Suhardi, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/12",
    "masa_kerja_tahun": 15,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4848587,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4848587,
    "bulan_gaji": 14,
    "total_gaji": 67880218,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3878870,
    "bulan_tkp": 14,
    "total_tkp": 54304180,
    "bpjs_kes_bln": 38789,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 465464,
    "bpjs_tk_bln": 302552,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3630622,
    "transport_bln": 969717,
    "bulan_transport": 12,
    "total_transport": 11636609,
    "total_anggaran": 137917093,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-054",
    "no": 54,
    "nama": "Sri Darmawiati, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/12",
    "masa_kerja_tahun": 15,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4848587,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4848587,
    "bulan_gaji": 14,
    "total_gaji": 67880218,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3878870,
    "bulan_tkp": 14,
    "total_tkp": 54304180,
    "bpjs_kes_bln": 193943,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2327322,
    "bpjs_tk_bln": 302552,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3630622,
    "transport_bln": 969717,
    "bulan_transport": 12,
    "total_transport": 11636609,
    "total_anggaran": 139778951,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-055",
    "no": 55,
    "nama": "Suriyadi, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/12",
    "masa_kerja_tahun": 15,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4848587,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4848587,
    "bulan_gaji": 14,
    "total_gaji": 67880218,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3878870,
    "bulan_tkp": 14,
    "total_tkp": 54304180,
    "bpjs_kes_bln": 193943,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2327322,
    "bpjs_tk_bln": 302552,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3630622,
    "transport_bln": 969717,
    "bulan_transport": 12,
    "total_transport": 11636609,
    "total_anggaran": 139778951,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-056",
    "no": 56,
    "nama": "Suhendar, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "02/01/12",
    "masa_kerja_tahun": 15,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4848587,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5527389,
    "bulan_gaji": 14,
    "total_gaji": 77383449,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3878870,
    "bulan_tkp": 14,
    "total_tkp": 54304180,
    "bpjs_kes_bln": 221096,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2653147,
    "bpjs_tk_bln": 344909,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4138909,
    "transport_bln": 969717,
    "bulan_transport": 12,
    "total_transport": 11636609,
    "total_anggaran": 150116294,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-057",
    "no": 57,
    "nama": "Reni Septiani, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "03/03/10",
    "masa_kerja_tahun": 17,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4969801,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5665573,
    "bulan_gaji": 14,
    "total_gaji": 79318024,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3975841,
    "bulan_tkp": 14,
    "total_tkp": 55661774,
    "bpjs_kes_bln": 226623,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2719475,
    "bpjs_tk_bln": 353532,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4242381,
    "transport_bln": 993960,
    "bulan_transport": 12,
    "total_transport": 11927522,
    "total_anggaran": 153869176,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-058",
    "no": 58,
    "nama": "Julian Kardiansyah, A.Md.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "03/03/10",
    "masa_kerja_tahun": 17,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4969801,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 5566177,
    "bulan_gaji": 14,
    "total_gaji": 77926480,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3975841,
    "bulan_tkp": 14,
    "total_tkp": 55661774,
    "bpjs_kes_bln": 222647,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2671765,
    "bpjs_tk_bln": 347329,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4167953,
    "transport_bln": 993960,
    "bulan_transport": 12,
    "total_transport": 11927522,
    "total_anggaran": 152355494,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-059",
    "no": 59,
    "nama": "Adi Suprayitna, Amd.Kep",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "03/03/10",
    "masa_kerja_tahun": 17,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4969801,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5665573,
    "bulan_gaji": 14,
    "total_gaji": 79318024,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3975841,
    "bulan_tkp": 14,
    "total_tkp": 55661774,
    "bpjs_kes_bln": 226623,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2719475,
    "bpjs_tk_bln": 353532,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4242381,
    "transport_bln": 993960,
    "bulan_transport": 12,
    "total_transport": 11927522,
    "total_anggaran": 153869176,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-060",
    "no": 60,
    "nama": "Ghina",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Kesehatan Gigi dan Mulut",
    "jabatan": "Terapis Gigi dan Mulut Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4180921,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4180921,
    "bulan_gaji": 14,
    "total_gaji": 58532894,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3344737,
    "bulan_tkp": 14,
    "total_tkp": 46826318,
    "bpjs_kes_bln": 33447,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 401368,
    "bpjs_tk_bln": 260889,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3130674,
    "transport_bln": 836184,
    "bulan_transport": 12,
    "total_transport": 10034210,
    "total_anggaran": 118925464,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-061",
    "no": 61,
    "nama": "Darus",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4180921,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4180921,
    "bulan_gaji": 14,
    "total_gaji": 58532894,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3344737,
    "bulan_tkp": 14,
    "total_tkp": 46826318,
    "bpjs_kes_bln": 167237,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2006842,
    "bpjs_tk_bln": 260889,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3130674,
    "transport_bln": 836184,
    "bulan_transport": 12,
    "total_transport": 10034210,
    "total_anggaran": 120530938,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-062",
    "no": 62,
    "nama": "Joan",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Keperawatan",
    "jabatan": "Perawat Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/05/2024",
    "masa_kerja_tahun": 3,
    "masa_kerja_bulan": 1,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4180921,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4180921,
    "bulan_gaji": 14,
    "total_gaji": 58532894,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3344737,
    "bulan_tkp": 14,
    "total_tkp": 46826318,
    "bpjs_kes_bln": 167237,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2006842,
    "bpjs_tk_bln": 260889,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3130674,
    "transport_bln": 836184,
    "bulan_transport": 12,
    "total_transport": 10034210,
    "total_anggaran": 120530938,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-063",
    "no": 63,
    "nama": "Azzahra Adhanita, A.Md.Kes",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 analis kesehatan",
    "jabatan": "Pranata labkes Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-064",
    "no": 64,
    "nama": "Dea Maylika Sopyanti, A.Md.AK",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 analis kesehatan",
    "jabatan": "Pranata labkes Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 4486842,
    "bulan_gaji": 14,
    "total_gaji": 62815784,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 179474,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2153684,
    "bpjs_tk_bln": 279979,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3359747,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 123802900,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-065",
    "no": 65,
    "nama": "Luthfiah Sulam, A.Md.Gz",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Gizi",
    "jabatan": "Nutrisionis Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-066",
    "no": 66,
    "nama": "Humaidatul Maulidiyah, A.Md.Keb",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-067",
    "no": 67,
    "nama": "Pengganti Iyus",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Sanitasi",
    "jabatan": "Sanitarian Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/02/26",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-068",
    "no": 68,
    "nama": "Tenti Mandayanti",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-069",
    "no": 69,
    "nama": "Rismawati",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 kebidanan",
    "jabatan": "Bidan Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "03/11/2025",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 6,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 4650000,
    "bulan_gaji": 14,
    "total_gaji": 65099994,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 186000,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2232000,
    "bpjs_tk_bln": 290160,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3481920,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 126287599,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-070",
    "no": 70,
    "nama": "Sulis",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 Kesehatan",
    "jabatan": "Assisten Apoteker",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/02/26",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-071",
    "no": 71,
    "nama": "Pranata Lab",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 analis kesehatan",
    "jabatan": "Pranata labkes Terampil",
    "kategori_jabatan": "D3 KESEHATAN",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/02/26",
    "masa_kerja_tahun": 1,
    "masa_kerja_bulan": 3,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4078947,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4078947,
    "bulan_gaji": 14,
    "total_gaji": 57105258,
    "persen_tkp": 0.8,
    "persen_tkp_str": "0,8",
    "tkp_bln": 3263158,
    "bulan_tkp": 14,
    "total_tkp": 45684212,
    "bpjs_kes_bln": 163158,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 1957895,
    "bpjs_tk_bln": 254526,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3054316,
    "transport_bln": 815789,
    "bulan_transport": 12,
    "total_transport": 9789473,
    "total_anggaran": 117591154,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-072",
    "no": 72,
    "nama": "Moch Zeni",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Kelasi",
    "kategori_jabatan": "OPERASIONAL TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "16/08/10",
    "masa_kerja_tahun": 16,
    "masa_kerja_bulan": 9,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4638481,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5287868,
    "bulan_gaji": 14,
    "total_gaji": 74030157,
    "persen_tkp": 0.4,
    "persen_tkp_str": "0,4",
    "tkp_bln": 1855392,
    "bulan_tkp": 14,
    "total_tkp": 25975488,
    "bpjs_kes_bln": 211515,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2538177,
    "bpjs_tk_bln": 329963,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3959556,
    "transport_bln": 927696,
    "bulan_transport": 12,
    "total_transport": 11132354,
    "total_anggaran": 117635732,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-073",
    "no": 73,
    "nama": "Jaelani",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Kelasi",
    "kategori_jabatan": "OPERASIONAL TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "16/08/10",
    "masa_kerja_tahun": 16,
    "masa_kerja_bulan": 9,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4638481,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5287868,
    "bulan_gaji": 14,
    "total_gaji": 74030157,
    "persen_tkp": 0.4,
    "persen_tkp_str": "0,4",
    "tkp_bln": 1855392,
    "bulan_tkp": 14,
    "total_tkp": 25975488,
    "bpjs_kes_bln": 211515,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2538177,
    "bpjs_tk_bln": 329963,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3959556,
    "transport_bln": 927696,
    "bulan_transport": 12,
    "total_transport": 11132354,
    "total_anggaran": 117635732,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-074",
    "no": 74,
    "nama": "Mochammad Ganang Yusdi Raka Putra",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Pengadministrasi Umum",
    "kategori_jabatan": "ADMINISTRASI TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/10/2019",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4099742,
    "status_keluarga": "K2",
    "gaji_dan_tunjangan": 4591711,
    "bulan_gaji": 14,
    "total_gaji": 64283955,
    "persen_tkp": 0.6,
    "persen_tkp_str": "0,6",
    "tkp_bln": 2459845,
    "bulan_tkp": 14,
    "total_tkp": 34437830,
    "bpjs_kes_bln": 183668,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2204021,
    "bpjs_tk_bln": 286523,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3438273,
    "transport_bln": 819948,
    "bulan_transport": 12,
    "total_transport": 9839381,
    "total_anggaran": 114203460,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-075",
    "no": 75,
    "nama": "Ade Jumroni",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Pengadministrasi Umum",
    "kategori_jabatan": "ADMINISTRASI TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4202235,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 4790548,
    "bulan_gaji": 14,
    "total_gaji": 67067671,
    "persen_tkp": 0.6,
    "persen_tkp_str": "0,6",
    "tkp_bln": 2521341,
    "bulan_tkp": 14,
    "total_tkp": 35298774,
    "bpjs_kes_bln": 33618,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 403415,
    "bpjs_tk_bln": 298930,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3587162,
    "transport_bln": 840447,
    "bulan_transport": 12,
    "total_transport": 10085364,
    "total_anggaran": 116442386,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-076",
    "no": 76,
    "nama": "Zulkarnain",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Pengadministrasi Umum",
    "kategori_jabatan": "ADMINISTRASI TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/04/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4202235,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4202235,
    "bulan_gaji": 14,
    "total_gaji": 58831290,
    "persen_tkp": 0.6,
    "persen_tkp_str": "0,6",
    "tkp_bln": 2521341,
    "bulan_tkp": 14,
    "total_tkp": 35298774,
    "bpjs_kes_bln": 33618,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 403415,
    "bpjs_tk_bln": 262219,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3146634,
    "transport_bln": 840447,
    "bulan_transport": 12,
    "total_transport": 10085364,
    "total_anggaran": 107765477,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-077",
    "no": 77,
    "nama": "Ardian",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Pengadministrasi Umum",
    "kategori_jabatan": "ADMINISTRASI TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "01/08/16",
    "masa_kerja_tahun": 10,
    "masa_kerja_bulan": 10,
    "pendidikan_jenjang": "SMF",
    "gaji_pokok": 4307291,
    "status_keluarga": "K0",
    "gaji_dan_tunjangan": 4307291,
    "bulan_gaji": 14,
    "total_gaji": 60302074,
    "persen_tkp": 0.6,
    "persen_tkp_str": "0,6",
    "tkp_bln": 2584375,
    "bulan_tkp": 14,
    "total_tkp": 36181250,
    "bpjs_kes_bln": 172292,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2067500,
    "bpjs_tk_bln": 268775,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3225300,
    "transport_bln": 861458,
    "bulan_transport": 12,
    "total_transport": 10337498,
    "total_anggaran": 112113622,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-078",
    "no": 78,
    "nama": "Jamaludin",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Nahkoda",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/10/15",
    "masa_kerja_tahun": 11,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4307291,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 4910312,
    "bulan_gaji": 14,
    "total_gaji": 68744364,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4307291,
    "bulan_tkp": 14,
    "total_tkp": 60302074,
    "bpjs_kes_bln": 34458,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 413500,
    "bpjs_tk_bln": 306403,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3676841,
    "transport_bln": 861458,
    "bulan_transport": 12,
    "total_transport": 10337498,
    "total_anggaran": 143474277,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-079",
    "no": 79,
    "nama": "Abdul Kadir",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "SLTA",
    "jabatan": "Nahkoda",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "05/01/13",
    "masa_kerja_tahun": 14,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4525348,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5158897,
    "bulan_gaji": 14,
    "total_gaji": 72224554,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4525348,
    "bulan_tkp": 14,
    "total_tkp": 63354872,
    "bpjs_kes_bln": 206356,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2476270,
    "bpjs_tk_bln": 321915,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3862982,
    "transport_bln": 905070,
    "bulan_transport": 12,
    "total_transport": 10860835,
    "total_anggaran": 152779513,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-080",
    "no": 80,
    "nama": "Muchammad Anas",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/10/19",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4685419,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5341378,
    "bulan_gaji": 14,
    "total_gaji": 74779287,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4685419,
    "bulan_tkp": 14,
    "total_tkp": 65595866,
    "bpjs_kes_bln": 37483,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 449800,
    "bpjs_tk_bln": 333302,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3999624,
    "transport_bln": 937084,
    "bulan_transport": 12,
    "total_transport": 11245006,
    "total_anggaran": 156069583,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-081",
    "no": 81,
    "nama": "Ega Waldiyanto",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/10/19",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4685419,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5341378,
    "bulan_gaji": 14,
    "total_gaji": 74779287,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4685419,
    "bulan_tkp": 14,
    "total_tkp": 65595866,
    "bpjs_kes_bln": 213655,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 2563861,
    "bpjs_tk_bln": 333302,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3999624,
    "transport_bln": 937084,
    "bulan_transport": 12,
    "total_transport": 11245006,
    "total_anggaran": 158183644,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-082",
    "no": 82,
    "nama": "Faujiah",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/10/19",
    "masa_kerja_tahun": 7,
    "masa_kerja_bulan": 8,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4392580,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5007541,
    "bulan_gaji": 14,
    "total_gaji": 70105577,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4392580,
    "bulan_tkp": 14,
    "total_tkp": 61496120,
    "bpjs_kes_bln": 35141,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 421688,
    "bpjs_tk_bln": 312471,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3749647,
    "transport_bln": 878516,
    "bulan_transport": 12,
    "total_transport": 10542192,
    "total_anggaran": 146315224,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-083",
    "no": 83,
    "nama": "Mawadha Fatma Nizarti",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Verifikator Keuangan",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/05/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 0,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4802554,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5282809,
    "bulan_gaji": 14,
    "total_gaji": 73959332,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4802554,
    "bulan_tkp": 14,
    "total_tkp": 67235756,
    "bpjs_kes_bln": 38420,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 461045,
    "bpjs_tk_bln": 329647,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3955768,
    "transport_bln": 960511,
    "bulan_transport": 12,
    "total_transport": 11526130,
    "total_anggaran": 157138031,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-084",
    "no": 84,
    "nama": "Setianjani",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "D3 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/01/18",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 4,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4502395,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5132730,
    "bulan_gaji": 14,
    "total_gaji": 71858224,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4502395,
    "bulan_tkp": 14,
    "total_tkp": 63033530,
    "bpjs_kes_bln": 36019,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 432230,
    "bpjs_tk_bln": 320282,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3843388,
    "transport_bln": 900479,
    "bulan_transport": 12,
    "total_transport": 10805748,
    "total_anggaran": 149973120,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-085",
    "no": 85,
    "nama": "Zainal Mutaqim, S.Si",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/11/17",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 7,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4802554,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5474912,
    "bulan_gaji": 14,
    "total_gaji": 76648762,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4802554,
    "bulan_tkp": 14,
    "total_tkp": 67235756,
    "bpjs_kes_bln": 38420,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 461045,
    "bpjs_tk_bln": 341634,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4099614,
    "transport_bln": 960511,
    "bulan_transport": 12,
    "total_transport": 11526130,
    "total_anggaran": 159971307,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-086",
    "no": 86,
    "nama": "Andi Anwar Sadat, S.Kom",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "PPPK PW",
    "tmt_kontrak": "01/11/17",
    "masa_kerja_tahun": 9,
    "masa_kerja_bulan": 7,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4802554,
    "status_keluarga": "K3",
    "gaji_dan_tunjangan": 5474912,
    "bulan_gaji": 14,
    "total_gaji": 76648762,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4802554,
    "bulan_tkp": 14,
    "total_tkp": 67235756,
    "bpjs_kes_bln": 38420,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 461045,
    "bpjs_tk_bln": 341634,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 4099614,
    "transport_bln": 960511,
    "bulan_transport": 12,
    "total_transport": 11526130,
    "total_anggaran": 159971307,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  },
  {
    "id": "RENJA-087",
    "no": 87,
    "nama": "Hendra Gunawan",
    "no_rekening_bank_dki": "",
    "jenis_pendidikan": "S1 UMUM",
    "jabatan": "Pengolah Data",
    "kategori_jabatan": "TEKNIS TK TERAMPIL",
    "jenis_pegawai": "NON ASN",
    "tmt_kontrak": "02/03/19",
    "masa_kerja_tahun": 8,
    "masa_kerja_bulan": 2,
    "pendidikan_jenjang": "D3",
    "gaji_pokok": 4802554,
    "status_keluarga": "K1",
    "gaji_dan_tunjangan": 5282809,
    "bulan_gaji": 14,
    "total_gaji": 73959332,
    "persen_tkp": 1,
    "persen_tkp_str": "1",
    "tkp_bln": 4802554,
    "bulan_tkp": 14,
    "total_tkp": 67235756,
    "bpjs_kes_bln": 38420,
    "bulan_bpjs_kes": 12,
    "total_bpjs_kes": 461045,
    "bpjs_tk_bln": 329647,
    "bulan_bpjs_tk": 12,
    "total_bpjs_tk": 3955768,
    "transport_bln": 960511,
    "bulan_transport": 12,
    "total_transport": 11526130,
    "total_anggaran": 157138031,
    "tahun_anggaran": 2027,
    "ukpd": "PUSKESMAS KECAMATAN KEP SERIBU SELATAN",
    "tmt_cut_off": "01/06/2027"
  }
];

    // Global state & Multi-Year Renja Config
    window.currentRenjaYear = 2027;
    window.currentRenjaCutOff = '01/06/2027';
    window.availableRenjaYears = [2027, 2028, 2029, 2030, 2031, 2032];
    window.renjaCutOffDates = {};
    window.renjaDataByYear = {};
    window.renjaPegawaiList = [];
    window.renjaActiveFilter = {
        search: '',
        jenis_pegawai: 'ALL',
        kategori_jabatan: 'ALL',
        status_keluarga: 'ALL',
        status_sinkron: 'ALL'
    };

    // Helper: Parse DD/MM/YYYY or DD/MM/YY to Date
    function parseIndonesianDate(dStr) {
        if (!dStr) return null;
        const parts = String(dStr).trim().split('/');
        if (parts.length === 3) {
            let day = parseInt(parts[0], 10);
            let month = parseInt(parts[1], 10) - 1;
            let year = parseInt(parts[2], 10);
            if (year < 100) {
                year += (year > 50 ? 1900 : 2000);
            }
            return new Date(year, month, day);
        }
        const d = new Date(dStr);
        return isNaN(d.getTime()) ? null : d;
    }

    // Helper: Calculate Masa Kerja (tahun & bulan) from TMT to Cut Off
    function calculateMasaKerjaFromTmt(tmtStr, cutOffStr) {
        const tmtDate = parseIndonesianDate(tmtStr);
        const cutOffDate = parseIndonesianDate(cutOffStr);
        if (!tmtDate || !cutOffDate) return { tahun: 0, bulan: 0 };

        let diffMonths = (cutOffDate.getFullYear() - tmtDate.getFullYear()) * 12 + (cutOffDate.getMonth() - tmtDate.getMonth());
        if (cutOffDate.getDate() < tmtDate.getDate()) {
            diffMonths -= 1;
        }
        if (diffMonths < 0) diffMonths = 0;
        const tahun = Math.floor(diffMonths / 12);
        const bulan = diffMonths % 12;
        return { tahun, bulan };
    }

    // Helper: Map masa kerja tahun to Pergub 221 Tier ("0-2", "2-4", etc.)
    function getPergub221Tier(masaKerjaTahun) {
        const m = Number(masaKerjaTahun) || 0;
        if (m < 2) return "0-2";
        if (m < 4) return "2-4";
        if (m < 6) return "4-6";
        if (m < 8) return "6-8";
        if (m < 10) return "8-10";
        if (m < 12) return "10-12";
        if (m < 14) return "12-14";
        if (m < 16) return "14-16";
        if (m < 18) return "16-18";
        if (m < 20) return "18-20";
        if (m < 22) return "20-22";
        if (m < 24) return "22-24";
        if (m < 26) return "24-26";
        if (m < 28) return "26-28";
        if (m < 30) return "28-30";
        if (m < 32) return "30-32";
        return "32-34";
    }

    // Helper: Map education & role category to Pergub 221 column key
    function getPergub221EducationKey(item) {
        const jenjang = (item.pendidikan_jenjang || '').toUpperCase();
        const kat = (item.kategori_jabatan || '').toUpperCase();
        const jab = (item.jabatan || '').toUpperCase();

        if (kat.includes('DOKTER') || jab.includes('DOKTER') || kat.includes('APOTEKER') || jab.includes('APOTEKER') || jab.includes('NERS')) {
            return 's2_dr_ners';
        }
        if (jenjang.includes('S3') || jab.includes('SPESIALIS')) return 's3_spesialis';
        if (jenjang.includes('S1') || kat.includes('S1')) return 's1';
        if (jenjang.includes('D3') || jenjang.includes('D4') || kat.includes('D3') || kat.includes('TERAMPIL')) return 'd3_d4';
        if (jenjang.includes('SMF') || jenjang.includes('SLTA') || jenjang.includes('SMA') || jenjang.includes('SMK')) return 'slta';
        if (jenjang.includes('SMP')) return 'smp';
        if (jenjang.includes('SD')) return 'sd';
        return 'd3_d4';
    }

    // Helper: Lookup Gaji Pokok from Pergub 221 matrix
    function lookupPergub221Salary(item, masaKerjaTahun) {
        const pergubList = window.masterPenghasilanPergub220List || window.masterPenghasilanPergub221List || [];
        if (!pergubList || pergubList.length === 0) return null;

        const tier = getPergub221Tier(masaKerjaTahun);
        let status = (item.status_keluarga || 'K0').trim().toUpperCase();
        if (status === 'TK' || !['K0', 'K1', 'K2', 'K3'].includes(status)) status = 'K0';

        const row = pergubList.find(r => r.masa_kerja === tier && r.status === status);
        if (!row) return null;

        const eduKey = getPergub221EducationKey(item);
        return row[eduKey] || null;
    }

    // Project/Calculate Renja data for a specific year
    window.projectRenjaDataForYear = function(targetYear, customCutOff) {
        const targetYr = Number(targetYear);
        const baseYear = 2027;
        const baseData = (window.renjaDataByYear && window.renjaDataByYear[baseYear]) 
            ? window.renjaDataByYear[baseYear] 
            : DEFAULT_RENJA_PEGAWAI;
        const cutOff = customCutOff || (window.renjaCutOffDates && window.renjaCutOffDates[targetYr]) || (`01/06/${targetYr}`);

        return baseData.map((emp) => {
            const item = JSON.parse(JSON.stringify(emp));
            item.tahun_anggaran = targetYr;
            item.tmt_cut_off = cutOff;

            // Recalculate masa kerja
            const { tahun, bulan } = calculateMasaKerjaFromTmt(item.tmt_kontrak, cutOff);
            item.masa_kerja_tahun = tahun;
            item.masa_kerja_bulan = bulan;

            // Look up Pergub 221 standard salary
            const newGapok = lookupPergub221Salary(item, tahun);
            if (newGapok && newGapok > 0) {
                item.gaji_pokok = newGapok;
                item.gaji_dan_tunjangan = newGapok;
            } else {
                const yearDiff = targetYr - baseYear;
                if (yearDiff > 0) {
                    item.gaji_pokok = Math.round(Number(emp.gaji_pokok || 0) * (1 + (yearDiff * 0.025)));
                    item.gaji_dan_tunjangan = item.gaji_pokok;
                }
            }

            // Recalculate financial components
            item.total_gaji = Math.round(Number(item.gaji_dan_tunjangan || item.gaji_pokok) * 14);
            const persenTkp = Number(item.persen_tkp || 0.8);
            item.tkp_bln = Math.round(Number(item.gaji_pokok) * persenTkp);
            item.bulan_tkp = 14;
            item.total_tkp = Math.round(item.tkp_bln * 14);
            item.bpjs_kes_bln = Math.round(Number(item.gaji_pokok) * 0.04);
            item.total_bpjs_kes = Math.round(item.bpjs_kes_bln * 12);
            item.bpjs_tk_bln = Math.round(Number(item.gaji_pokok) * 0.0624);
            item.total_bpjs_tk = Math.round(item.bpjs_tk_bln * 12);
            item.total_transport = Math.round(Number(item.transport_bln || 0) * (Number(item.bulan_transport) || 12));
            item.total_anggaran = item.total_gaji + item.total_tkp + item.total_bpjs_kes + item.total_bpjs_tk + item.total_transport;

            return item;
        });
    };

    // Switch Renja Year
    window.switchRenjaYear = function(year) {
        const y = parseInt(year, 10);
        if (!y || isNaN(y)) return;

        window.currentRenjaYear = y;
        localStorage.setItem('simpeg_current_renja_year', String(y));

        if (!window.availableRenjaYears.includes(y)) {
            window.availableRenjaYears.push(y);
            window.availableRenjaYears.sort((a, b) => a - b);
            localStorage.setItem('simpeg_renja_available_years', JSON.stringify(window.availableRenjaYears));
        }

        if (!window.renjaCutOffDates[y]) {
            window.renjaCutOffDates[y] = `01/06/${y}`;
            localStorage.setItem('simpeg_renja_cutoff_dates', JSON.stringify(window.renjaCutOffDates));
        }
        window.currentRenjaCutOff = window.renjaCutOffDates[y];

        // Check if data for selected year exists
        if (!window.renjaDataByYear[y] || !Array.isArray(window.renjaDataByYear[y]) || window.renjaDataByYear[y].length === 0) {
            const projected = window.projectRenjaDataForYear(y, window.currentRenjaCutOff);
            window.renjaDataByYear[y] = projected;
            localStorage.setItem('simpeg_renja_by_year', JSON.stringify(window.renjaDataByYear));
        }

        window.renjaPegawaiList = window.renjaDataByYear[y];
        window.saveRenjaLocalOnly();

        // Re-render Renja UI
        window.renderRenjaPegawai();

        if (typeof showToast === 'function') {
            showToast(`Beralih ke Renja Tahun ${y} (TMT Cut Off: ${window.currentRenjaCutOff})`, 'info');
        }
    };

    // Prompt to Add Another Year
    window.promptTambahTahunRenja = function() {
        const maxYear = Math.max(...window.availableRenjaYears, 2027);
        const nextSuggest = maxYear + 1;
        let inputYear = prompt(`Masukkan Tahun Anggaran Renja baru (contoh: ${nextSuggest}, ${nextSuggest + 1}):`, String(nextSuggest));
        if (!inputYear) return;
        inputYear = parseInt(inputYear.trim(), 10);
        if (isNaN(inputYear) || inputYear < 2020 || inputYear > 2060) {
            alert("Tahun tidak valid. Harap masukkan tahun antara 2020 sampai 2060.");
            return;
        }

        if (!window.availableRenjaYears.includes(inputYear)) {
            window.availableRenjaYears.push(inputYear);
            window.availableRenjaYears.sort((a, b) => a - b);
            localStorage.setItem('simpeg_renja_available_years', JSON.stringify(window.availableRenjaYears));
        }

        window.switchRenjaYear(inputYear);
    };

    // Prompt to Change Cut Off Date for Active Year
    window.promptUbahCutOffRenja = function() {
        let inputDate = prompt(`Ubah Tanggal TMT Cut Off untuk Renja Tahun ${window.currentRenjaYear} (Format: DD/MM/YYYY):`, window.currentRenjaCutOff || `01/06/${window.currentRenjaYear}`);
        if (!inputDate) return;
        inputDate = inputDate.trim();
        if (!inputDate.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            alert("Format tanggal salah. Harap gunakan format DD/MM/YYYY (contoh: 01/06/2028).");
            return;
        }

        window.currentRenjaCutOff = inputDate;
        window.renjaCutOffDates[window.currentRenjaYear] = inputDate;
        localStorage.setItem('simpeg_renja_cutoff_dates', JSON.stringify(window.renjaCutOffDates));

        if (confirm(`Tanggal Cut Off Tahun ${window.currentRenjaYear} diubah menjadi ${inputDate}.\nKalkulasikan ulang masa kerja & penyesuaian nominal Pergub 221 Tahun 2016 secara otomatis untuk semua pegawai?`)) {
            const recalculated = window.projectRenjaDataForYear(window.currentRenjaYear, inputDate);
            window.renjaDataByYear[window.currentRenjaYear] = recalculated;
            window.renjaPegawaiList = recalculated;
            window.saveRenjaData();
        } else {
            window.renjaPegawaiList.forEach(p => p.tmt_cut_off = inputDate);
            window.saveRenjaData();
        }

        window.renderRenjaPegawai();
        if (typeof showToast === 'function') {
            showToast(`TMT Cut Off Renja ${window.currentRenjaYear} berhasil disetel: ${inputDate}`, 'success');
        }
    };

    // Quick navigation to Master Pergub 221
    window.navigateToPergub221 = function() {
        if (typeof window.switchMasterType === 'function') {
            window.switchMasterType('penghasilan');
            const masterPenghasilanTab = document.querySelector('[data-target="master-penghasilan-pergub"]') || document.getElementById('tab-btn-penghasilan');
            if (masterPenghasilanTab) {
                masterPenghasilanTab.click();
            }
        }
    };

    // Initialize Renja Data (Supports Multi-Year)
    window.initRenjaPegawaiData = function() {
        try {
            // 1. Available Years
            const storedYears = localStorage.getItem('simpeg_renja_available_years');
            if (storedYears) {
                const parsedYears = JSON.parse(storedYears);
                if (Array.isArray(parsedYears) && parsedYears.length > 0) {
                    window.availableRenjaYears = Array.from(new Set([...window.availableRenjaYears, ...parsedYears])).sort((a, b) => a - b);
                }
            }

            // 2. Active Year
            const storedCurrentYear = localStorage.getItem('simpeg_current_renja_year');
            if (storedCurrentYear) {
                const y = parseInt(storedCurrentYear, 10);
                if (y && !isNaN(y)) window.currentRenjaYear = y;
            }

            // 3. Cut Off Dates
            const storedCutOffs = localStorage.getItem('simpeg_renja_cutoff_dates');
            if (storedCutOffs) {
                window.renjaCutOffDates = JSON.parse(storedCutOffs) || {};
            }
            window.currentRenjaCutOff = window.renjaCutOffDates[window.currentRenjaYear] || `01/06/${window.currentRenjaYear}`;

            // 4. Data by Year
            const storedByYear = localStorage.getItem('simpeg_renja_by_year');
            if (storedByYear) {
                window.renjaDataByYear = JSON.parse(storedByYear) || {};
            }

            // Ensure 2027 base year exists
            if (!window.renjaDataByYear[2027] || !Array.isArray(window.renjaDataByYear[2027]) || window.renjaDataByYear[2027].length === 0) {
                const legacyStored = localStorage.getItem('simpeg_renja_pegawai_db');
                if (legacyStored) {
                    try {
                        const parsed = JSON.parse(legacyStored);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            window.renjaDataByYear[2027] = parsed;
                        } else {
                            window.renjaDataByYear[2027] = JSON.parse(JSON.stringify(DEFAULT_RENJA_PEGAWAI));
                        }
                    } catch(e) {
                        window.renjaDataByYear[2027] = JSON.parse(JSON.stringify(DEFAULT_RENJA_PEGAWAI));
                    }
                } else {
                    window.renjaDataByYear[2027] = JSON.parse(JSON.stringify(DEFAULT_RENJA_PEGAWAI));
                }
            }

            // Active year dataset
            if (!window.renjaDataByYear[window.currentRenjaYear] || !Array.isArray(window.renjaDataByYear[window.currentRenjaYear]) || window.renjaDataByYear[window.currentRenjaYear].length === 0) {
                window.renjaDataByYear[window.currentRenjaYear] = window.projectRenjaDataForYear(window.currentRenjaYear, window.currentRenjaCutOff);
            }

            // Ensure all records in storage are migrated to 14 months TKP
            if (window.renjaDataByYear) {
                Object.keys(window.renjaDataByYear).forEach(yr => {
                    if (Array.isArray(window.renjaDataByYear[yr])) {
                        window.renjaDataByYear[yr].forEach(item => {
                            if (item.bulan_tkp !== 14) {
                                item.bulan_tkp = 14;
                                item.total_tkp = Math.round(Number(item.tkp_bln || 0) * 14);
                                item.total_anggaran = Number(item.total_gaji || 0) + item.total_tkp + Number(item.total_bpjs_kes || 0) + Number(item.total_bpjs_tk || 0) + Number(item.total_transport || 0);
                            }
                        });
                    }
                });
            }
            window.renjaPegawaiList = window.renjaDataByYear[window.currentRenjaYear];
            if (Array.isArray(window.renjaPegawaiList)) {
                window.renjaPegawaiList.forEach(item => {
                    if (item.bulan_tkp !== 14) {
                        item.bulan_tkp = 14;
                        item.total_tkp = Math.round(Number(item.tkp_bln || 0) * 14);
                        item.total_anggaran = Number(item.total_gaji || 0) + item.total_tkp + Number(item.total_bpjs_kes || 0) + Number(item.total_bpjs_tk || 0) + Number(item.total_transport || 0);
                    }
                });
            }
        } catch(e) {
            console.warn("Failed to load renja from localStorage, using default:", e);
            window.renjaPegawaiList = JSON.parse(JSON.stringify(DEFAULT_RENJA_PEGAWAI));
            window.renjaDataByYear[2027] = window.renjaPegawaiList;
        }

        // Save local copy
        window.saveRenjaLocalOnly();

        // Perform initial auto-sync check with dataPegawai
        setTimeout(() => {
            window.autoSyncRenjaWithPegawai();
        }, 800);
    };

    window.saveRenjaLocalOnly = function() {
        try {
            if (!window.renjaDataByYear) window.renjaDataByYear = {};
            window.renjaDataByYear[window.currentRenjaYear] = window.renjaPegawaiList;
            localStorage.setItem('simpeg_renja_by_year', JSON.stringify(window.renjaDataByYear));
            localStorage.setItem('simpeg_renja_pegawai_db', JSON.stringify(window.renjaPegawaiList));
            localStorage.setItem('simpeg_current_renja_year', String(window.currentRenjaYear));
            localStorage.setItem('simpeg_renja_available_years', JSON.stringify(window.availableRenjaYears));
            localStorage.setItem('simpeg_renja_cutoff_dates', JSON.stringify(window.renjaCutOffDates));
        } catch(e) {}
    };

    window.saveRenjaData = function() {
        window.saveRenjaLocalOnly();
        // Sync to server
        if (typeof window.saveModuleDataToRumahweb === 'function') {
            window.saveModuleDataToRumahweb('saveRenjaData', {
                year: window.currentRenjaYear,
                renja: window.renjaPegawaiList,
                dataByYear: window.renjaDataByYear
            });
        }
        fetch('/api/renja', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                year: window.currentRenjaYear,
                renja: window.renjaPegawaiList 
            })
        }).catch(e => console.log('Server renja sync background note:', e));
    };

    // Helper: Normalize name for matching
    function normalizeName(name) {
        if (!name) return '';
        let n = name.toLowerCase().trim();
        n = n.replace(/^(dr\.|drg\.|apt\.)\s*/g, '');
        n = n.replace(/,?\s*(s\.farm|apt|skm|a\.md\.[a-z]+|amd\.[a-z]+|amk|amkeb|s\.si|s\.kom|m\.k\.m\.)\.?$/gi, '');
        n = n.replace(/[^a-z0-9]/g, '');
        return n;
    }

    // Check if an employee from Renja exists in window.dataPegawai
    window.findPegawaiInMaster = function(renjaItem) {
        if (!window.dataPegawai || !Array.isArray(window.dataPegawai)) return null;
        
        // 1. Check by renja_id
        if (renjaItem.id) {
            const byId = window.dataPegawai.find(p => p.renja_id === renjaItem.id);
            if (byId) return byId;
        }

        // 2. Check by exact name
        const byExactName = window.dataPegawai.find(p => 
            p.nama && p.nama.trim().toLowerCase() === renjaItem.nama.trim().toLowerCase()
        );
        if (byExactName) return byExactName;

        // 3. Check by normalized name
        const rNorm = normalizeName(renjaItem.nama);
        if (rNorm && rNorm.length >= 3) {
            const byNormName = window.dataPegawai.find(p => {
                const pNorm = normalizeName(p.nama);
                return pNorm && (pNorm === rNorm || (pNorm.length >= 4 && (pNorm.includes(rNorm) || rNorm.includes(pNorm))));
            });
            if (byNormName) return byNormName;
        }

        return null;
    };

    // Auto-sync Renja with window.dataPegawai
    window.autoSyncRenjaWithPegawai = function() {
        if (!window.dataPegawai || !Array.isArray(window.dataPegawai)) return;

        let anyUpdated = false;
        window.renjaPegawaiList.forEach(item => {
            const match = window.findPegawaiInMaster(item);
            if (match) {
                // Link them
                if (!match.renja_id) match.renja_id = item.id;
                match.renja_synced = true;
                // If bank account is filled in master, backfill to renja
                if (match.no_rekening_bank_dki && !item.no_rekening_bank_dki) {
                    item.no_rekening_bank_dki = match.no_rekening_bank_dki;
                    anyUpdated = true;
                }
            }
        });

        if (anyUpdated) {
            window.saveRenjaLocalOnly();
        }
    };

    // Map kategori to rumpun / kategori standard
    function determineKategoriStandard(cat, jab) {
        const c = (cat || '').toUpperCase();
        const j = (jab || '').toUpperCase();
        if (c.includes('DOKTER') || j.includes('DOKTER')) return 'Tenaga Medis';
        if (c.includes('APOTEKER') || j.includes('APOTEKER') || j.includes('FARMASI')) return 'Tenaga Kefarmasian';
        if (j.includes('PERAWAT')) return 'Tenaga Keperawatan';
        if (j.includes('BIDAN')) return 'Tenaga Kebidanan';
        if (c.includes('KESEHATAN') || j.includes('SANITARIAN') || j.includes('NUTRISIONIS') || j.includes('LABKES') || j.includes('PROMOSI KESEHATAN') || j.includes('GIGI')) return 'Tenaga Kesehatan Lainnya';
        if (c.includes('OPERASIONAL') || j.includes('KELASI') || j.includes('NAHKODA')) return 'Tenaga Teknis / Operasional';
        if (c.includes('ADMINISTRASI') || j.includes('ADMINISTRASI') || j.includes('PENGOLAH DATA') || j.includes('KEUANGAN')) return 'Tenaga Administrasi';
        return 'Tenaga Non Medis';
    }

    // Map jenjang to rumpun code
    function determineRumpun(cat, jab) {
        const c = (cat || '').toUpperCase();
        const j = (jab || '').toUpperCase();
        if (c.includes('DOKTER') || j.includes('DOKTER')) return '01. Medis';
        if (j.includes('PERAWAT')) return '02. Keperawatan';
        if (j.includes('BIDAN')) return '03. Kebidanan';
        if (c.includes('APOTEKER') || j.includes('FARMASI')) return '04. Kefarmasian';
        if (c.includes('KESEHATAN') || j.includes('LABKES') || j.includes('GIZI') || j.includes('SANITASI')) return '05. Kesehatan Masyarakat / Penunjang';
        return '06. Administrasi & Teknis';
    }

    // Sync all Renja employees to Data Pegawai
    window.syncAllRenjaToDataPegawai = function() {
        if (!window.dataPegawai) window.dataPegawai = [];

        let newlyAdded = 0;
        let updatedCount = 0;

        window.renjaPegawaiList.forEach((item, idx) => {
            let match = window.findPegawaiInMaster(item);

            if (match) {
                // Update existing employee
                match.status_kepegawaian = item.jenis_pegawai;
                match.jabatan = item.jabatan;
                match.tmt_kontrak = item.tmt_kontrak;
                match.pendidikan_terakhir = item.jenis_pendidikan;
                match.gaji_pokok = item.gaji_pokok;
                match.status_keluarga = item.status_keluarga;
                match.renja_id = item.id;
                match.renja_synced = true;
                if (item.no_rekening_bank_dki) match.no_rekening_bank_dki = item.no_rekening_bank_dki;
                updatedCount++;
            } else {
                // Create new employee profile in dataPegawai
                const nikGenerated = `310101${String(1000000000 + item.no).substring(1)}`;
                const nipGenerated = item.jenis_pegawai === 'PPPK PW' 
                    ? `19900101${(item.tmt_kontrak || '202401').replace(/[^0-9]/g, '')}10${item.no}` 
                    : '-';
                
                const newPegawai = {
                    rowIndex: window.dataPegawai.length + 2,
                    id: `PEG-RENJA-${String(item.no).padStart(3, '0')}`,
                    nik: nikGenerated,
                    nip: nipGenerated,
                    nrk: '-',
                    nama: item.nama,
                    nama_tanpa_gelar: item.nama.replace(/^(dr\.|drg\.|apt\.)\s*/gi, '').replace(/,.*$/g, '').trim(),
                    jabatan: item.jabatan,
                    kategori: determineKategoriStandard(item.kategori_jabatan, item.jabatan),
                    rumpun: determineRumpun(item.kategori_jabatan, item.jabatan),
                    pangkat_gol: item.jenis_pegawai === 'PPPK PW' ? 'PPPK Perjanjian Waktu' : 'Non ASN',
                    jenis_kelamin: (item.jabatan.includes('Bidan') || item.nama.match(/(nia|karen|mahmudah|natasha|isnatami|uzli|puspita|lia|tatu|balkis|yayuk|hana|intan|nurul|safuroh|amalia|sami|rizky|diba|mita|nuralfiah|nina|melinda|desi|rodiatul|mahdiyah|mega|leli|ratih|safitri|hilaliah|nurdahlia|janita|yuliyana|dewi|dwi|sri|reni|ghina|azzahra|dea|luthfiah|humaidatul|tenti|rismawati|sulis|faujiah|mawadha|setianjani)/i)) ? 'Perempuan' : 'Laki-laki',
                    agama: 'Islam',
                    status_nikah: (item.status_keluarga && item.status_keluarga !== 'K0') ? 'Kawin' : 'Belum Kawin',
                    tempat_lahir: 'Jakarta',
                    tanggal_lahir: '1992-01-01',
                    tempat_tugas: 'Puskesmas Kepulauan Seribu Selatan',
                    unit_kerja: 'Puskesmas Kecamatan Kepulauan Seribu Selatan',
                    tmt: item.tmt_kontrak,
                    tmt_kontrak: item.tmt_kontrak,
                    masa_kerja_tahun: item.masa_kerja_tahun,
                    masa_kerja_bulan: item.masa_kerja_bulan,
                    pendidikan_terakhir: item.jenis_pendidikan,
                    gaji_pokok: item.gaji_pokok,
                    status_keluarga: item.status_keluarga,
                    status_kepegawaian: item.jenis_pegawai,
                    no_rekening_bank_dki: item.no_rekening_bank_dki || '',
                    renja_id: item.id,
                    renja_synced: true,
                    status_aktif: 'Aktif',
                    alamat: 'Kecamatan Kepulauan Seribu Selatan',
                    no_hp: '0812' + Math.floor(10000000 + Math.random() * 90000000),
                    email: item.nama.toLowerCase().replace(/[^a-z]/g, '') + '@jakarta.go.id',
                    created_from: 'Renja 2027 Sync'
                };

                window.dataPegawai.push(newPegawai);
                newlyAdded++;
            }
        });

        // Save dataPegawai to localStorage
        try {
            localStorage.setItem('simpeg_pkss_pegawai_db', JSON.stringify(window.dataPegawai));
            localStorage.setItem('simpeg_data_pegawai', JSON.stringify(window.dataPegawai));
        } catch(e) {}

        // Save to backend server
        if (typeof window.savePegawaiDataToServer === 'function') {
            window.savePegawaiDataToServer();
        } else if (typeof window.saveModuleDataToRumahweb === 'function') {
            window.saveModuleDataToRumahweb('savePegawaiData', window.dataPegawai);
        }

        // Also post to /api/renja/sync-pegawai
        fetch('/api/renja/sync-pegawai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ renja: window.renjaPegawaiList })
        }).catch(e => {});

        // Save renja
        window.saveRenjaData();

        // Refresh UI
        window.renderRenjaPegawai();
        if (typeof window.renderTableMaster === 'function') {
            window.renderTableMaster();
        }
        if (typeof window.updateDashboard === 'function') {
            window.updateDashboard();
        }

        if (typeof showToast === 'function') {
            showToast(`Sinkronisasi Sukses! ${newlyAdded} Pegawai Non-ASN/PPPK PW baru ditambahkan ke Data Pegawai, ${updatedCount} profil diperbarui.`, 'success');
        } else {
            alert(`Sinkronisasi Berhasil!
${newlyAdded} Data Baru ditambahkan ke Data Pegawai.
${updatedCount} Data Diperbarui.`);
        }
    };

    // Format Rupiah helper
    function formatRp(num) {
        if (num === null || num === undefined || isNaN(num)) return 'Rp 0';
        return 'Rp ' + Math.round(num).toLocaleString('id-ID');
    }

    // Filter data
    window.getFilteredRenjaData = function() {
        return window.renjaPegawaiList.filter(item => {
            // Search
            if (window.renjaActiveFilter.search) {
                const q = window.renjaActiveFilter.search.toLowerCase();
                const matchName = (item.nama || '').toLowerCase().includes(q);
                const matchRek = (item.no_rekening_bank_dki || '').toLowerCase().includes(q);
                const matchJab = (item.jabatan || '').toLowerCase().includes(q);
                const matchPend = (item.jenis_pendidikan || '').toLowerCase().includes(q);
                if (!matchName && !matchRek && !matchJab && !matchPend) return false;
            }

            // Jenis Pegawai
            if (window.renjaActiveFilter.jenis_pegawai !== 'ALL') {
                if (item.jenis_pegawai !== window.renjaActiveFilter.jenis_pegawai) return false;
            }

            // Kategori Jabatan
            if (window.renjaActiveFilter.kategori_jabatan !== 'ALL') {
                if (item.kategori_jabatan !== window.renjaActiveFilter.kategori_jabatan) return false;
            }

            // Status Keluarga
            if (window.renjaActiveFilter.status_keluarga !== 'ALL') {
                if (item.status_keluarga !== window.renjaActiveFilter.status_keluarga) return false;
            }

            // Status Sinkron
            if (window.renjaActiveFilter.status_sinkron !== 'ALL') {
                const isSynced = Boolean(window.findPegawaiInMaster(item));
                if (window.renjaActiveFilter.status_sinkron === 'SYNCED' && !isSynced) return false;
                if (window.renjaActiveFilter.status_sinkron === 'NOT_SYNCED' && isSynced) return false;
            }

            return true;
        });
    };

    // Main Render Function
    window.renderRenjaPegawai = function() {
        const $container = $('#renja-pegawai');
        if (!$container.length) return;

        if (!window.renjaPegawaiList || window.renjaPegawaiList.length === 0) {
            window.initRenjaPegawaiData();
        }

        const filtered = window.getFilteredRenjaData();
        const totalAll = window.renjaPegawaiList.length;

        // Calculate Synced count
        let syncedCount = 0;
        window.renjaPegawaiList.forEach(item => {
            if (window.findPegawaiInMaster(item)) syncedCount++;
        });

        // Calculate Aggregates for filtered data
        let totalGaji = 0;
        let totalTkp = 0;
        let totalBpjsKes = 0;
        let totalBpjsTk = 0;
        let totalTransport = 0;
        let grandTotalAnggaran = 0;
        let countNonAsn = 0;
        let countPppkPw = 0;

        filtered.forEach(item => {
            totalGaji += Number(item.total_gaji || 0);
            totalTkp += Number(item.total_tkp || 0);
            totalBpjsKes += Number(item.total_bpjs_kes || 0);
            totalBpjsTk += Number(item.total_bpjs_tk || 0);
            totalTransport += Number(item.total_transport || 0);
            grandTotalAnggaran += Number(item.total_anggaran || 0);
            if (item.jenis_pegawai === 'NON ASN') countNonAsn++;
            if (item.jenis_pegawai === 'PPPK PW') countPppkPw++;
        });

        const isAllSynced = (syncedCount >= totalAll);

        let html = `
            <!-- HEADER HERO BANNER -->
            <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 60%, #0ea5e9 100%);">
                <div class="card-body p-4 text-white">
                    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div>
                            <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                <!-- Dropdown Pemilihan Tahun Renja -->
                                <div class="dropdown">
                                    <button class="btn btn-white bg-white text-primary fw-bold px-3 py-2 rounded-pill shadow-sm border-0 dropdown-toggle d-flex align-items-center gap-2" type="button" id="dropdownRenjaTahun" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 0.95rem;">
                                        <i class="fas fa-file-invoice-dollar text-primary"></i>
                                        <span>RENJA TAHUN ${window.currentRenjaYear}</span>
                                    </button>
                                    <ul class="dropdown-menu shadow-lg border-0 rounded-4 py-2 mt-1" aria-labelledby="dropdownRenjaTahun" style="min-width: 230px; z-index: 1060;">
                                        <li class="dropdown-header text-uppercase small fw-bold text-muted px-3">
                                            <i class="fas fa-calendar-alt me-1"></i> Pilih Tahun Anggaran
                                        </li>
                                        ${(window.availableRenjaYears || [2027, 2028, 2029, 2030]).map(yr => `
                                            <li>
                                                <a class="dropdown-item py-2 px-3 d-flex align-items-center justify-content-between fw-semibold ${yr === window.currentRenjaYear ? 'active bg-primary text-white' : 'text-dark'}" href="javascript:void(0)" onclick="window.switchRenjaYear(${yr})">
                                                    <span><i class="fas fa-calendar-check me-2 ${yr === window.currentRenjaYear ? 'text-white' : 'text-primary'}"></i> Renja Tahun ${yr}</span>
                                                    ${yr === window.currentRenjaYear ? '<span class="badge bg-white text-primary rounded-pill small">Aktif</span>' : ''}
                                                </a>
                                            </li>
                                        `).join('')}
                                        <li><hr class="dropdown-divider my-1"></li>
                                        <li>
                                            <a class="dropdown-item py-2 px-3 fw-bold text-success d-flex align-items-center gap-2" href="javascript:void(0)" onclick="window.promptTambahTahunRenja()">
                                                <i class="fas fa-plus-circle"></i> Tambah Tahun Lainnya...
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Button Edit Tanggal TMT Cut Off -->
                                <button class="btn btn-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm border-0 d-flex align-items-center gap-2" type="button" onclick="window.promptUbahCutOffRenja()" title="Klik untuk mengubah tanggal TMT Cut Off" style="font-size: 0.95rem;">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>TMT CUT OFF: ${window.currentRenjaCutOff}</span>
                                    <i class="fas fa-edit small opacity-75 ms-1"></i>
                                </button>

                                <!-- Standar Pergub 221 Tahun 2016 Badge -->
                                <button class="btn btn-info text-white fw-bold px-3 py-2 rounded-pill shadow-sm border-0 d-flex align-items-center gap-1" type="button" onclick="window.navigateToPergub221()" title="Lihat Ketetapan Master Penghasilan Pergub 221 Tahun 2016" style="font-size: 0.95rem;">
                                    <i class="fas fa-book me-1"></i>
                                    <span>STANDAR PERGUB 221 TAHUN 2016</span>
                                    <i class="fas fa-arrow-right ms-1 small opacity-75"></i>
                                </button>
                            </div>
                            <h3 class="fw-bold mb-1 text-white">Rencana Kerja (Renja) Pegawai Non ASN & PPPK PW Tahun ${window.currentRenjaYear}</h3>
                            <p class="text-white-50 mb-0 small">
                                <i class="fas fa-hospital me-1"></i> UKPD: Puskesmas Kecamatan Kepulauan Seribu Selatan &bull; 
                                Rekapitulasi Alokasi Gaji Pokok (14 Bln), TKP (14 Bln), BPJS Kes (4%), BPJS TK (6,24%), dan Tunjangan Transport
                            </p>
                        </div>
                        <div class="d-flex flex-wrap gap-2 align-items-center">
                            <button class="btn btn-warning fw-bold px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" onclick="window.syncAllRenjaToDataPegawai()">
                                <i class="fas fa-sync-alt"></i>
                                <span>Sinkronkan ke Data Pegawai</span>
                            </button>
                            <button class="btn btn-light fw-bold px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" onclick="window.openModalTambahRenja()">
                                <i class="fas fa-plus-circle text-primary"></i>
                                <span>Tambah Pegawai</span>
                            </button>
                            <button class="btn btn-outline-light px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" onclick="window.exportRenjaCsv()">
                                <i class="fas fa-file-excel text-success"></i>
                                <span>Export Excel</span>
                            </button>
                            <button class="btn btn-outline-light px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" onclick="window.printRenjaDoc()">
                                <i class="fas fa-print"></i>
                                <span>Cetak Dokumen</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- LIVE SYNC STATUS NOTICE -->
            <div class="alert ${isAllSynced ? 'alert-success' : 'alert-warning'} border-0 shadow-sm rounded-3 py-3 px-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle d-flex align-items-center justify-content-center p-3 text-white ${isAllSynced ? 'bg-success' : 'bg-warning'} shadow-sm" style="width: 44px; height: 44px;">
                        <i class="fas ${isAllSynced ? 'fa-check-double' : 'fa-exclamation-triangle'} fa-lg"></i>
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold ${isAllSynced ? 'text-success' : 'text-dark'}">
                            ${isAllSynced ? 'Semua Pegawai Renja Terhubung dengan Master Data Pegawai' : 'Sinkronisasi Data Pegawai Diperlukan'}
                        </h6>
                        <small class="text-muted">
                            Sebanyak <strong>${syncedCount}</strong> dari <strong>${totalAll}</strong> pegawai Non ASN & PPPK PW telah terdaftar aktif pada Master Data Pegawai (SIMPEG).
                        </small>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    ${!isAllSynced ? `
                        <button class="btn btn-warning btn-sm fw-bold px-3 py-2 rounded-pill shadow-sm" onclick="window.syncAllRenjaToDataPegawai()">
                            <i class="fas fa-sync-alt me-1"></i> Sinkronkan ${totalAll - syncedCount} Pegawai Sekarang
                        </button>
                    ` : `
                        <span class="badge bg-success bg-opacity-25 text-success border border-success px-3 py-2 rounded-pill fw-bold">
                            <i class="fas fa-link me-1"></i> 100% Terintegrasi
                        </span>
                    `}
                    <button class="btn btn-outline-secondary btn-sm px-3 py-2 rounded-pill" onclick="window.showSection('data-master')">
                        <i class="fas fa-external-link-alt me-1"></i> Buka Data Pegawai
                    </button>
                </div>
            </div>

            <!-- STATISTIC SUMMARY CARDS -->
            <div class="row g-3 mb-4">
                <!-- TOTAL PEGAWAI -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-primary">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold">Total Pegawai</span>
                            <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <h4 class="fw-bold mb-1 text-dark">${filtered.length} <span class="fs-6 text-muted fw-normal">Orang</span></h4>
                        <div class="d-flex gap-2 small">
                            <span class="badge bg-primary bg-opacity-10 text-primary">${countNonAsn} Non-ASN</span>
                            <span class="badge bg-info bg-opacity-10 text-info">${countPppkPw} PPPK PW</span>
                        </div>
                    </div>
                </div>

                <!-- TOTAL GAJI POKOK & TUNJANGAN 14 BLN -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-success">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold">Gaji & Tunjangan (14 Bln)</span>
                            <div class="bg-success bg-opacity-10 text-success p-2 rounded-3">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-1 text-success">${formatRp(totalGaji)}</h5>
                        <small class="text-muted">Gaji Pokok + Nikah & Anak</small>
                    </div>
                </div>

                <!-- TOTAL TKP (14 BLN) -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-warning">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold">Total TKP (14 Bln)</span>
                            <div class="bg-warning bg-opacity-10 text-warning p-2 rounded-3">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-1 text-dark">${formatRp(totalTkp)}</h5>
                        <small class="text-muted">Koefisien 0,4 - 1,6 x Gapok</small>
                    </div>
                </div>

                <!-- TOTAL BPJS KES & KETENAGAKERJAAN -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-info">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold">Total BPJS (12 Bln)</span>
                            <div class="bg-info bg-opacity-10 text-info p-2 rounded-3">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-1 text-info">${formatRp(totalBpjsKes + totalBpjsTk)}</h5>
                        <small class="text-muted">Kes 4% + TK 6,24%</small>
                    </div>
                </div>

                <!-- TOTAL TUNJANGAN TRANSPORT -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-secondary">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold">Transport (12 Bln)</span>
                            <div class="bg-secondary bg-opacity-10 text-secondary p-2 rounded-3">
                                <i class="fas fa-car-side"></i>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-1 text-secondary">${formatRp(totalTransport)}</h5>
                        <small class="text-muted">Sesuai Jabatan & Jenjang</small>
                    </div>
                </div>

                <!-- GRAND TOTAL ANGGARAN -->
                <div class="col-12 col-sm-6 col-xl-2">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-3 text-white border-0" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%);">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-white-50 small fw-bold">TOTAL PAGU RENJA</span>
                            <div class="bg-white bg-opacity-20 text-white p-2 rounded-3">
                                <i class="fas fa-vault"></i>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-1 text-white">${formatRp(grandTotalAnggaran)}</h5>
                        <small class="text-white-50">Kebutuhan Tahun 2027</small>
                    </div>
                </div>
            </div>

            <!-- FILTER & SEARCH CONTROLS -->
            <div class="card border-0 shadow-sm rounded-4 mb-4">
                <div class="card-body p-3">
                    <div class="row g-2 align-items-center">
                        <!-- Search Box -->
                        <div class="col-12 col-md-4 col-xl-3">
                            <div class="input-group">
                                <span class="input-group-text bg-light border-0"><i class="fas fa-search text-muted"></i></span>
                                <input type="text" id="renjaSearchInput" class="form-control bg-light border-0" 
                                    placeholder="Cari Nama / No Rek / Jabatan..." 
                                    value="${window.renjaActiveFilter.search}"
                                    oninput="window.updateRenjaFilter('search', this.value)">
                            </div>
                        </div>

                        <!-- Filter Jenis Pegawai -->
                        <div class="col-6 col-md-2">
                            <select class="form-select bg-light border-0" onchange="window.updateRenjaFilter('jenis_pegawai', this.value)">
                                <option value="ALL" ${window.renjaActiveFilter.jenis_pegawai === 'ALL' ? 'selected' : ''}>Semua Status</option>
                                <option value="NON ASN" ${window.renjaActiveFilter.jenis_pegawai === 'NON ASN' ? 'selected' : ''}>NON ASN</option>
                                <option value="PPPK PW" ${window.renjaActiveFilter.jenis_pegawai === 'PPPK PW' ? 'selected' : ''}>PPPK PW</option>
                            </select>
                        </div>

                        <!-- Filter Kategori Jabatan -->
                        <div class="col-6 col-md-3 col-xl-2">
                            <select class="form-select bg-light border-0" onchange="window.updateRenjaFilter('kategori_jabatan', this.value)">
                                <option value="ALL" ${window.renjaActiveFilter.kategori_jabatan === 'ALL' ? 'selected' : ''}>Semua Kategori</option>
                                <option value="DOKTER" ${window.renjaActiveFilter.kategori_jabatan === 'DOKTER' ? 'selected' : ''}>DOKTER</option>
                                <option value="APOTEKER" ${window.renjaActiveFilter.kategori_jabatan === 'APOTEKER' ? 'selected' : ''}>APOTEKER</option>
                                <option value="S1 KESEHATAN /D3 KESEHETAN" ${window.renjaActiveFilter.kategori_jabatan === 'S1 KESEHATAN /D3 KESEHETAN' ? 'selected' : ''}>S1/D3 KESEHATAN</option>
                                <option value="D3 KESEHATAN" ${window.renjaActiveFilter.kategori_jabatan === 'D3 KESEHATAN' ? 'selected' : ''}>D3 KESEHATAN</option>
                                <option value="OPERASIONAL TK TERAMPIL" ${window.renjaActiveFilter.kategori_jabatan === 'OPERASIONAL TK TERAMPIL' ? 'selected' : ''}>OPERASIONAL</option>
                                <option value="ADMINISTRASI TK TERAMPIL" ${window.renjaActiveFilter.kategori_jabatan === 'ADMINISTRASI TK TERAMPIL' ? 'selected' : ''}>ADMINISTRASI</option>
                                <option value="TEKNIS TK TERAMPIL" ${window.renjaActiveFilter.kategori_jabatan === 'TEKNIS TK TERAMPIL' ? 'selected' : ''}>TEKNIS</option>
                            </select>
                        </div>

                        <!-- Filter Status Keluarga -->
                        <div class="col-6 col-md-2 col-xl-2">
                            <select class="form-select bg-light border-0" onchange="window.updateRenjaFilter('status_keluarga', this.value)">
                                <option value="ALL" ${window.renjaActiveFilter.status_keluarga === 'ALL' ? 'selected' : ''}>Semua Status PTKP</option>
                                <option value="K0" ${window.renjaActiveFilter.status_keluarga === 'K0' ? 'selected' : ''}>K0 (Lajang/0 Anak)</option>
                                <option value="K1" ${window.renjaActiveFilter.status_keluarga === 'K1' ? 'selected' : ''}>K1 (1 Anak)</option>
                                <option value="K2" ${window.renjaActiveFilter.status_keluarga === 'K2' ? 'selected' : ''}>K2 (2 Anak)</option>
                                <option value="K3" ${window.renjaActiveFilter.status_keluarga === 'K3' ? 'selected' : ''}>K3 (3 Anak)</option>
                            </select>
                        </div>

                        <!-- Filter Status Sinkron -->
                        <div class="col-6 col-md-2 col-xl-2">
                            <select class="form-select bg-light border-0" onchange="window.updateRenjaFilter('status_sinkron', this.value)">
                                <option value="ALL" ${window.renjaActiveFilter.status_sinkron === 'ALL' ? 'selected' : ''}>Semua Status Sinkron</option>
                                <option value="SYNCED" ${window.renjaActiveFilter.status_sinkron === 'SYNCED' ? 'selected' : ''}>Sudah Terhubung</option>
                                <option value="NOT_SYNCED" ${window.renjaActiveFilter.status_sinkron === 'NOT_SYNCED' ? 'selected' : ''}>Belum Terhubung</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-1 d-flex gap-1 justify-content-end">
                            <button class="btn btn-outline-secondary btn-sm px-2 w-100" title="Reset Filter" onclick="window.resetRenjaFilter()">
                                <i class="fas fa-undo"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DATA TABLE CARD -->
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div class="card-header bg-white py-3 px-4 border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">Daftar Rencana Kerja Pegawai Non ASN & PPPK PW</h5>
                        <small class="text-muted">Menampilkan ${filtered.length} dari ${totalAll} pegawai terdata</small>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="window.resetRenjaToDefault()">
                            <i class="fas fa-history me-1"></i> Pulihkan Data Asli
                        </button>
                    </div>
                </div>
                <div class="table-responsive" style="max-height: 700px;">
                    <table class="table table-hover align-middle mb-0 text-nowrap" id="renjaMainTable">
                        <thead class="table-light sticky-top shadow-sm text-secondary" style="font-size: 0.8rem; z-index: 10;">
                            <tr>
                                <th class="text-center" style="width: 40px;">NO</th>
                                <th>NAMA PEGAWAI & REKENING</th>
                                <th>PENDIDIKAN & JABATAN</th>
                                <th>TMT & MASA KERJA</th>
                                <th class="text-end">GAJI POKOK</th>
                                <th class="text-center">STATUS</th>
                                <th class="text-end">TOTAL GAJI (14 BLN)</th>
                                <th class="text-end">% TKP</th>
                                <th class="text-end">TOTAL TKP (14 BLN)</th>
                                <th class="text-end">BPJS KES (4%)</th>
                                <th class="text-end">BPJS TK (6,24%)</th>
                                <th class="text-end">TRANSPORT (12 BLN)</th>
                                <th class="text-end fw-bold text-dark">TOTAL ANGGARAN</th>
                                <th class="text-center">STATUS PEGAWAI</th>
                                <th class="text-center">SINKRON SIMPEG</th>
                                <th class="text-center" style="width: 110px;">AKSI</th>
                            </tr>
                        </thead>
                        <tbody style="font-size: 0.85rem;">
        `;

        if (filtered.length === 0) {
            html += `
                <tr>
                    <td colspan="16" class="text-center py-5 text-muted">
                        <i class="fas fa-inbox fa-3x mb-3 text-secondary opacity-50"></i>
                        <p class="mb-0 fw-semibold">Tidak ada data pegawai yang sesuai dengan filter pencarian.</p>
                        <button class="btn btn-outline-primary btn-sm mt-2" onclick="window.resetRenjaFilter()">Reset Filter</button>
                    </td>
                </tr>
            `;
        } else {
            filtered.forEach(item => {
                const matchedPegawai = window.findPegawaiInMaster(item);
                const isSynced = Boolean(matchedPegawai);

                const badgeJenis = item.jenis_pegawai === 'PPPK PW' 
                    ? '<span class="badge bg-info text-white px-2 py-1 rounded-pill">PPPK PW</span>' 
                    : '<span class="badge bg-primary text-white px-2 py-1 rounded-pill">NON ASN</span>';

                const badgeSync = isSynced
                    ? `<span class="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded-pill border border-success" title="Terdaftar di Data Pegawai: ${matchedPegawai.nama}">
                         <i class="fas fa-check-circle me-1"></i> Terhubung
                       </span>`
                    : `<span class="badge bg-warning bg-opacity-10 text-warning px-2 py-1 rounded-pill border border-warning" title="Belum sinkron">
                         <i class="fas fa-clock me-1"></i> Belum
                       </span>`;

                html += `
                    <tr>
                        <td class="text-center fw-bold text-muted">${item.no}</td>
                        <td>
                            <div class="fw-bold text-dark">${item.nama}</div>
                            <div class="small text-muted">
                                <i class="fas fa-credit-card text-primary me-1"></i>
                                ${item.no_rekening_bank_dki ? `<span class="font-monospace text-primary fw-bold">${item.no_rekening_bank_dki}</span>` : '<span class="text-muted fst-italic">Bank DKI belum diisi</span>'}
                            </div>
                        </td>
                        <td>
                            <div class="fw-semibold text-dark">${item.jabatan}</div>
                            <div class="small text-muted">${item.jenis_pendidikan} (${item.pendidikan_jenjang})</div>
                        </td>
                        <td>
                            <div><i class="far fa-calendar-alt text-muted me-1"></i>${item.tmt_kontrak || '-'}</div>
                            <div class="small text-muted">${item.masa_kerja_tahun} Th ${item.masa_kerja_bulan} Bln</div>
                        </td>
                        <td class="text-end font-monospace">${formatRp(item.gaji_pokok)}</td>
                        <td class="text-center">
                            <span class="badge bg-light text-dark border px-2 py-1">${item.status_keluarga || 'K0'}</span>
                        </td>
                        <td class="text-end font-monospace fw-semibold text-success">
                            ${formatRp(item.total_gaji)}
                            <div class="small text-muted">14 x ${formatRp(item.gaji_dan_tunjangan)}</div>
                        </td>
                        <td class="text-end">
                            <span class="badge bg-warning bg-opacity-25 text-dark fw-bold">${item.persen_tkp_str || item.persen_tkp}x</span>
                        </td>
                        <td class="text-end font-monospace text-primary fw-semibold">
                            ${formatRp(item.total_tkp)}
                            <div class="small text-muted">14 x ${formatRp(item.tkp_bln)}</div>
                        </td>
                        <td class="text-end font-monospace small">
                            ${formatRp(item.total_bpjs_kes)}
                            <div class="text-muted" style="font-size: 0.72rem;">${formatRp(item.bpjs_kes_bln)}/bln</div>
                        </td>
                        <td class="text-end font-monospace small">
                            ${formatRp(item.total_bpjs_tk)}
                            <div class="text-muted" style="font-size: 0.72rem;">${formatRp(item.bpjs_tk_bln)}/bln</div>
                        </td>
                        <td class="text-end font-monospace small">
                            ${formatRp(item.total_transport)}
                            <div class="text-muted" style="font-size: 0.72rem;">${formatRp(item.transport_bln)}/bln</div>
                        </td>
                        <td class="text-end font-monospace fw-bold text-success fs-6">
                            ${formatRp(item.total_anggaran)}
                        </td>
                        <td class="text-center">${badgeJenis}</td>
                        <td class="text-center">${badgeSync}</td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-light text-primary" title="Edit Pegawai Renja" onclick="window.openModalEditRenja('${item.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-light text-success" title="Sinkronkan Pegawai Ini ke Data Pegawai" onclick="window.syncSingleRenja('${item.id}')">
                                    <i class="fas fa-user-check"></i>
                                </button>
                                <button class="btn btn-light text-danger" title="Hapus Dari Renja" onclick="window.hapusRenjaItem('${item.id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }

        html += `
                        </tbody>
                        <tfoot class="table-light sticky-bottom shadow-sm fw-bold font-monospace" style="font-size: 0.85rem; z-index: 10;">
                            <tr class="table-primary border-top border-2 border-primary">
                                <td colspan="4" class="text-center fw-bold">TOTAL KESELURUHAN (${filtered.length} PEGAWAI)</td>
                                <td class="text-end">-</td>
                                <td class="text-center">-</td>
                                <td class="text-end text-success">${formatRp(totalGaji)}</td>
                                <td class="text-center">-</td>
                                <td class="text-end text-primary">${formatRp(totalTkp)}</td>
                                <td class="text-end">${formatRp(totalBpjsKes)}</td>
                                <td class="text-end">${formatRp(totalBpjsTk)}</td>
                                <td class="text-end">${formatRp(totalTransport)}</td>
                                <td class="text-end fw-bold text-success fs-6">${formatRp(grandTotalAnggaran)}</td>
                                <td colspan="3" class="text-center text-muted font-sans" style="font-size: 0.75rem;">
                                    Tahun Anggaran 2027 &bull; PKSS
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- INFORMATION ACCORDION & METHODOLOGY -->
            <div class="row g-3 mb-4">
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                        <h6 class="fw-bold text-primary mb-3">
                            <i class="fas fa-calculator me-2"></i>Formula & Komponen Perhitungan Renja ${window.currentRenjaYear}
                        </h6>
                        <ul class="list-unstyled small text-secondary mb-0 d-flex flex-column gap-2">
                            <li class="d-flex gap-2">
                                <i class="fas fa-check-circle text-success mt-1"></i>
                                <div><strong>Gaji dan Tunjangan (14 Bulan)</strong>: Gaji Pokok sesuai Pergub 221 Th 2016 berdasarkan masa kerja dan jenjang pendidikan + Tunjangan Keluarga (K0, K1, K2, K3) x 14 bulan (12 bulan gaji normal + Gaji ke-13 + THR).</div>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fas fa-check-circle text-success mt-1"></i>
                                <div><strong>TKP (Tunjangan Kinerja Pegawai - 14 Bulan)</strong>: Koefisien pengali (Dokter 1,6x; Apoteker 1,5x; Teknis 1x; Tenaga Kesehatan 0,8x; Administrasi 0,6x; Operasional 0,4x) dikalikan Gaji Pokok x 14 bulan (12 bulan reguler + THR + Gaji ke-13).</div>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fas fa-check-circle text-success mt-1"></i>
                                <div><strong>Iuran BPJS Kesehatan (4%)</strong>: Ditanggung pemerintah daerah sebesar 4% per bulan x 12 bulan.</div>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fas fa-check-circle text-success mt-1"></i>
                                <div><strong>Iuran BPJS Ketenagakerjaan (6,24%)</strong>: JKK, JKM, JHT, dan JP sebesar 6,24% per bulan x 12 bulan.</div>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fas fa-check-circle text-success mt-1"></i>
                                <div><strong>Tunjangan Transport (12 Bulan)</strong>: Alokasi uang transport bulanan x 12 bulan sesuai ketentuan lokasi pulau Kepulauan Seribu.</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                        <h6 class="fw-bold text-success mb-3">
                            <i class="fas fa-shield-alt me-2"></i>Sinkronisasi Real-Time dengan Master Data Pegawai
                        </h6>
                        <p class="small text-secondary mb-3">
                            Modul Renja ini dirancang saling terhubung dua arah dengan basis data <strong>Data Pegawai SIMPEG Digital</strong>:
                        </p>
                        <div class="d-flex flex-column gap-2 small text-secondary">
                            <div class="p-2 rounded bg-light border-start border-3 border-success">
                                <strong>1. Penambahan Otomatis</strong>: Seluruh 87 pegawai Non ASN dan PPPK PW dapat langsung dibuatkan profil kepegawaian resminya lengkap dengan NIK, NIP, Jabatan, dan Riwayat Kontrak.
                            </div>
                            <div class="p-2 rounded bg-light border-start border-3 border-primary">
                                <strong>2. Pembaruan Finansial</strong>: Gaji Pokok, Status Perkawinan/Anak (K0-K3), dan Nomor Rekening Bank DKI tersinkron otomatis ke modul Penggajian dan Master Data Pegawai.
                            </div>
                            <div class="p-2 rounded bg-light border-start border-3 border-warning">
                                <strong>3. Dual Storage</strong>: Tersimpan permanen di peramban (Local Database) serta tersinkronisasi ke server REST API.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL TAMBAH / EDIT PEGAWAI RENJA -->
            <div class="modal fade" id="modalRenjaPegawai" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content rounded-4 border-0 shadow">
                        <div class="modal-header bg-primary text-white border-0 py-3 px-4 rounded-top-4">
                            <h5 class="modal-title fw-bold" id="modalRenjaTitle">
                                <i class="fas fa-user-edit me-2"></i>Form Pegawai Renja
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-4">
                            <form id="formRenjaPegawai" onsubmit="window.submitFormRenja(event)">
                                <input type="hidden" id="renjaFormId" value="">
                                <input type="hidden" id="renjaFormNo" value="">

                                <div class="row g-3">
                                    <div class="col-12 col-md-8">
                                        <label class="form-label fw-semibold small">Nama Lengkap & Gelar</label>
                                        <input type="text" class="form-control" id="renjaFormNama" required placeholder="Contoh: dr. William D Julius Sihombing">
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">No. Rekening Bank DKI</label>
                                        <input type="text" class="form-control" id="renjaFormNoRek" placeholder="Contoh: 10123456789">
                                    </div>

                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">Jenis Pegawai</label>
                                        <select class="form-select" id="renjaFormJenisPegawai" required>
                                            <option value="NON ASN">NON ASN</option>
                                            <option value="PPPK PW">PPPK PW</option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">Kategori Jabatan</label>
                                        <select class="form-select" id="renjaFormKategoriJabatan" required>
                                            <option value="DOKTER">DOKTER</option>
                                            <option value="APOTEKER">APOTEKER</option>
                                            <option value="S1 KESEHATAN /D3 KESEHETAN">S1/D3 KESEHATAN</option>
                                            <option value="D3 KESEHATAN">D3 KESEHATAN</option>
                                            <option value="OPERASIONAL TK TERAMPIL">OPERASIONAL TK TERAMPIL</option>
                                            <option value="ADMINISTRASI TK TERAMPIL">ADMINISTRASI TK TERAMPIL</option>
                                            <option value="TEKNIS TK TERAMPIL">TEKNIS TK TERAMPIL</option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">Jabatan</label>
                                        <input type="text" class="form-control" id="renjaFormJabatan" required placeholder="Contoh: Dokter Ahli Pertama">
                                    </div>

                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">Jenis Pendidikan</label>
                                        <input type="text" class="form-control" id="renjaFormJenisPendidikan" required placeholder="Contoh: S1 Profesi Kedokteran">
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">Jenjang Pendidikan</label>
                                        <select class="form-select" id="renjaFormJenjang" required>
                                            <option value="S1">S1</option>
                                            <option value="D3">D3</option>
                                            <option value="SLTA">SLTA</option>
                                            <option value="S2">S2</option>
                                            <option value="SMF">SMF</option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">TMT Kontrak</label>
                                        <input type="text" class="form-control" id="renjaFormTmt" placeholder="DD/MM/YYYY">
                                    </div>

                                    <div class="col-6 col-md-3">
                                        <label class="form-label fw-semibold small">Masa Kerja (Tahun)</label>
                                        <input type="number" class="form-control" id="renjaFormMasaThn" min="0" value="0">
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <label class="form-label fw-semibold small">Masa Kerja (Bulan)</label>
                                        <input type="number" class="form-control" id="renjaFormMasaBln" min="0" max="11" value="0">
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <label class="form-label fw-semibold small">Status PTKP</label>
                                        <select class="form-select" id="renjaFormStatusKeluarga" onchange="window.recalcFormRenja()">
                                            <option value="K0">K0 (Lajang/0 Anak)</option>
                                            <option value="K1">K1 (1 Anak)</option>
                                            <option value="K2">K2 (2 Anak)</option>
                                            <option value="K3">K3 (3 Anak)</option>
                                        </select>
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <label class="form-label fw-semibold small">% TKP</label>
                                        <input type="text" class="form-control" id="renjaFormPersenTkp" value="1.6" oninput="window.recalcFormRenja()">
                                    </div>

                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold small">Gaji Pokok (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormGajiPokok" required oninput="window.recalcFormRenja()">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold small">Gaji & Tunjangan Bulanan (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormGajiTunjangan" required oninput="window.recalcFormRenja()">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">TKP per Bulan (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormTkpBln">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">BPJS Kes 4% per Bulan (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormBpjsKesBln">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label class="form-label fw-semibold small">BPJS TK 6,24% per Bulan (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormBpjsTkBln">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold small">Transport per Bulan (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" class="form-control font-monospace" id="renjaFormTransportBln" oninput="window.recalcFormRenja()">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold small text-success">Estimasi Total Anggaran Setahun (Rp)</label>
                                        <div class="input-group">
                                            <span class="input-group-text bg-success text-white">Rp</span>
                                            <input type="text" class="form-control font-monospace fw-bold text-success bg-light" id="renjaFormTotalPreview" readonly>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-check form-switch p-3 bg-light rounded-3 border">
                                            <input class="form-check-input ms-0 me-2" type="checkbox" id="renjaFormSyncPegawaiCheck" checked>
                                            <label class="form-check-label fw-bold text-dark" for="renjaFormSyncPegawaiCheck">
                                                Sekaligus sinkronkan / perbarui profil di Master Data Pegawai (SIMPEG)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer border-0 px-0 pb-0 mt-4">
                                    <button type="button" class="btn btn-secondary rounded-3 px-4" data-bs-dismiss="modal">Batal</button>
                                    <button type="submit" class="btn btn-primary rounded-3 px-4 fw-bold">
                                        <i class="fas fa-save me-1"></i> Simpan Data Renja
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $container.html(html);
    };

    // Live filter update
    window.updateRenjaFilter = function(key, val) {
        window.renjaActiveFilter[key] = val;
        window.renderRenjaPegawai();
    };

    window.resetRenjaFilter = function() {
        window.renjaActiveFilter = {
            search: '',
            jenis_pegawai: 'ALL',
            kategori_jabatan: 'ALL',
            status_keluarga: 'ALL',
            status_sinkron: 'ALL'
        };
        window.renderRenjaPegawai();
    };

    // Form Recalculation
    window.recalcFormRenja = function() {
        const gapok = Number($('#renjaFormGajiPokok').val() || 0);
        const gapokTunj = Number($('#renjaFormGajiTunjangan').val() || gapok);
        const persenStr = String($('#renjaFormPersenTkp').val() || '1').replace(',', '.');
        const persenTkp = parseFloat(persenStr) || 1;
        const transportBln = Number($('#renjaFormTransportBln').val() || 0);

        // Auto compute tkp
        const tkpBln = Math.round(gapok * persenTkp);
        $('#renjaFormTkpBln').val(tkpBln);

        // Auto compute bpjs
        const bpjsKesBln = Number($('#renjaFormBpjsKesBln').val()) || Math.round(gapok * 0.04);
        const bpjsTkBln = Number($('#renjaFormBpjsTkBln').val()) || Math.round(gapok * 0.0624);
        if (!$('#renjaFormBpjsKesBln').val()) $('#renjaFormBpjsKesBln').val(bpjsKesBln);
        if (!$('#renjaFormBpjsTkBln').val()) $('#renjaFormBpjsTkBln').val(bpjsTkBln);

        const totalGaji = gapokTunj * 14;
        const totalTkp = tkpBln * 14;
        const totalBpjsKes = bpjsKesBln * 12;
        const totalBpjsTk = bpjsTkBln * 12;
        const totalTransport = transportBln * 12;

        const grand = totalGaji + totalTkp + totalBpjsKes + totalBpjsTk + totalTransport;
        $('#renjaFormTotalPreview').val(grand.toLocaleString('id-ID'));
    };

    // Open Modal Tambah
    window.openModalTambahRenja = function() {
        $('#modalRenjaTitle').html('<i class="fas fa-user-plus me-2"></i>Tambah Pegawai Renja');
        $('#renjaFormId').val('');
        $('#renjaFormNo').val(window.renjaPegawaiList.length + 1);
        $('#renjaFormNama').val('');
        $('#renjaFormNoRek').val('');
        $('#renjaFormJenisPegawai').val('NON ASN');
        $('#renjaFormKategoriJabatan').val('D3 KESEHATAN');
        $('#renjaFormJabatan').val('');
        $('#renjaFormJenisPendidikan').val('');
        $('#renjaFormJenjang').val('D3');
        $('#renjaFormTmt').val('01/01/2027');
        $('#renjaFormMasaThn').val('1');
        $('#renjaFormMasaBln').val('0');
        $('#renjaFormStatusKeluarga').val('K0');
        $('#renjaFormPersenTkp').val('0.8');
        $('#renjaFormGajiPokok').val('4285444');
        $('#renjaFormGajiTunjangan').val('4285444');
        $('#renjaFormTkpBln').val('3428355');
        $('#renjaFormBpjsKesBln').val('171418');
        $('#renjaFormBpjsTkBln').val('267412');
        $('#renjaFormTransportBln').val('857089');
        window.recalcFormRenja();
        const modal = new bootstrap.Modal(document.getElementById('modalRenjaPegawai'));
        modal.show();
    };

    // Open Modal Edit
    window.openModalEditRenja = function(id) {
        const item = window.renjaPegawaiList.find(x => x.id === id);
        if (!item) return;

        $('#modalRenjaTitle').html('<i class="fas fa-user-edit me-2"></i>Edit Pegawai Renja #' + item.no);
        $('#renjaFormId').val(item.id);
        $('#renjaFormNo').val(item.no);
        $('#renjaFormNama').val(item.nama);
        $('#renjaFormNoRek').val(item.no_rekening_bank_dki || '');
        $('#renjaFormJenisPegawai').val(item.jenis_pegawai);
        $('#renjaFormKategoriJabatan').val(item.kategori_jabatan);
        $('#renjaFormJabatan').val(item.jabatan);
        $('#renjaFormJenisPendidikan').val(item.jenis_pendidikan);
        $('#renjaFormJenjang').val(item.pendidikan_jenjang);
        $('#renjaFormTmt').val(item.tmt_kontrak);
        $('#renjaFormMasaThn').val(item.masa_kerja_tahun);
        $('#renjaFormMasaBln').val(item.masa_kerja_bulan);
        $('#renjaFormStatusKeluarga').val(item.status_keluarga);
        $('#renjaFormPersenTkp').val(item.persen_tkp_str || item.persen_tkp);
        $('#renjaFormGajiPokok').val(item.gaji_pokok);
        $('#renjaFormGajiTunjangan').val(item.gaji_dan_tunjangan);
        $('#renjaFormTkpBln').val(item.tkp_bln);
        $('#renjaFormBpjsKesBln').val(item.bpjs_kes_bln);
        $('#renjaFormBpjsTkBln').val(item.bpjs_tk_bln);
        $('#renjaFormTransportBln').val(item.transport_bln);
        window.recalcFormRenja();
        const modal = new bootstrap.Modal(document.getElementById('modalRenjaPegawai'));
        modal.show();
    };

    // Submit Modal Form
    window.submitFormRenja = function(e) {
        e.preventDefault();
        const id = $('#renjaFormId').val();
        const no = Number($('#renjaFormNo').val() || window.renjaPegawaiList.length + 1);

        const gapok = Number($('#renjaFormGajiPokok').val() || 0);
        const gapokTunj = Number($('#renjaFormGajiTunjangan').val() || gapok);
        const persenStr = String($('#renjaFormPersenTkp').val() || '1').replace(',', '.');
        const persenTkp = parseFloat(persenStr) || 1;
        const tkpBln = Number($('#renjaFormTkpBln').val() || Math.round(gapok * persenTkp));
        const bpjsKesBln = Number($('#renjaFormBpjsKesBln').val() || 0);
        const bpjsTkBln = Number($('#renjaFormBpjsTkBln').val() || 0);
        const transportBln = Number($('#renjaFormTransportBln').val() || 0);

        const totalGaji = gapokTunj * 14;
        const totalTkp = tkpBln * 14;
        const totalBpjsKes = bpjsKesBln * 12;
        const totalBpjsTk = bpjsTkBln * 12;
        const totalTransport = transportBln * 12;
        const totalAnggaran = totalGaji + totalTkp + totalBpjsKes + totalBpjsTk + totalTransport;

        const record = {
            id: id || `RENJA-${String(no).padStart(3, '0')}`,
            no: no,
            nama: $('#renjaFormNama').val().trim(),
            no_rekening_bank_dki: $('#renjaFormNoRek').val().trim(),
            jenis_pegawai: $('#renjaFormJenisPegawai').val(),
            kategori_jabatan: $('#renjaFormKategoriJabatan').val(),
            jabatan: $('#renjaFormJabatan').val().trim(),
            jenis_pendidikan: $('#renjaFormJenisPendidikan').val().trim(),
            pendidikan_jenjang: $('#renjaFormJenjang').val(),
            tmt_kontrak: $('#renjaFormTmt').val().trim(),
            masa_kerja_tahun: Number($('#renjaFormMasaThn').val() || 0),
            masa_kerja_bulan: Number($('#renjaFormMasaBln').val() || 0),
            status_keluarga: $('#renjaFormStatusKeluarga').val(),
            persen_tkp: persenTkp,
            persen_tkp_str: $('#renjaFormPersenTkp').val(),
            gaji_pokok: gapok,
            gaji_dan_tunjangan: gapokTunj,
            bulan_gaji: 14,
            total_gaji: totalGaji,
            tkp_bln: tkpBln,
            bulan_tkp: 14,
            total_tkp: totalTkp,
            bpjs_kes_bln: bpjsKesBln,
            bulan_bpjs_kes: 12,
            total_bpjs_kes: totalBpjsKes,
            bpjs_tk_bln: bpjsTkBln,
            bulan_bpjs_tk: 12,
            total_bpjs_tk: totalBpjsTk,
            transport_bln: transportBln,
            bulan_transport: 12,
            total_transport: totalTransport,
            total_anggaran: totalAnggaran,
            tahun_anggaran: 2027,
            ukpd: 'PUSKESMAS KECAMATAN KEP SERIBU SELATAN',
            tmt_cut_off: '01/06/2027'
        };

        if (id) {
            const idx = window.renjaPegawaiList.findIndex(x => x.id === id);
            if (idx !== -1) window.renjaPegawaiList[idx] = record;
        } else {
            window.renjaPegawaiList.push(record);
        }

        window.saveRenjaData();

        // Check if sync to dataPegawai is requested
        if ($('#renjaFormSyncPegawaiCheck').is(':checked')) {
            window.syncSingleRenja(record.id);
        }

        const modalEl = document.getElementById('modalRenjaPegawai');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        window.renderRenjaPegawai();
        if (typeof showToast === 'function') showToast("Data Pegawai Renja berhasil disimpan!", "success");
    };

    // Sync single renja
    window.syncSingleRenja = function(id) {
        const item = window.renjaPegawaiList.find(x => x.id === id);
        if (!item) return;

        if (!window.dataPegawai) window.dataPegawai = [];
        let match = window.findPegawaiInMaster(item);

        if (match) {
            match.status_kepegawaian = item.jenis_pegawai;
            match.jabatan = item.jabatan;
            match.tmt_kontrak = item.tmt_kontrak;
            match.pendidikan_terakhir = item.jenis_pendidikan;
            match.gaji_pokok = item.gaji_pokok;
            match.status_keluarga = item.status_keluarga;
            match.renja_id = item.id;
            match.renja_synced = true;
            if (item.no_rekening_bank_dki) match.no_rekening_bank_dki = item.no_rekening_bank_dki;
            if (typeof showToast === 'function') showToast(`Data pegawai ${item.nama} di Data Pegawai berhasil diperbarui!`, 'success');
        } else {
            const newPegawai = {
                rowIndex: window.dataPegawai.length + 2,
                id: `PEG-RENJA-${String(item.no).padStart(3, '0')}`,
                nik: `310101${String(1000000000 + item.no).substring(1)}`,
                nip: item.jenis_pegawai === 'PPPK PW' ? `1990010120240110${item.no}` : '-',
                nrk: '-',
                nama: item.nama,
                jabatan: item.jabatan,
                kategori: determineKategoriStandard(item.kategori_jabatan, item.jabatan),
                rumpun: determineRumpun(item.kategori_jabatan, item.jabatan),
                pangkat_gol: item.jenis_pegawai === 'PPPK PW' ? 'PPPK Perjanjian Waktu' : 'Non ASN',
                jenis_kelamin: 'Laki-laki',
                status_kepegawaian: item.jenis_pegawai,
                tempat_tugas: 'Puskesmas Kepulauan Seribu Selatan',
                unit_kerja: 'Puskesmas Kecamatan Kepulauan Seribu Selatan',
                tmt: item.tmt_kontrak,
                tmt_kontrak: item.tmt_kontrak,
                pendidikan_terakhir: item.jenis_pendidikan,
                gaji_pokok: item.gaji_pokok,
                status_keluarga: item.status_keluarga,
                no_rekening_bank_dki: item.no_rekening_bank_dki || '',
                renja_id: item.id,
                renja_synced: true,
                status_aktif: 'Aktif',
                created_from: 'Renja 2027 Sync'
            };
            window.dataPegawai.push(newPegawai);
            if (typeof showToast === 'function') showToast(`Pegawai ${item.nama} berhasil didaftarkan ke Data Pegawai!`, 'success');
        }

        try {
            localStorage.setItem('simpeg_pkss_pegawai_db', JSON.stringify(window.dataPegawai));
        } catch(e) {}

        window.renderRenjaPegawai();
    };

    // Delete Item
    window.hapusRenjaItem = function(id) {
        const item = window.renjaPegawaiList.find(x => x.id === id);
        if (!item) return;

        if (!confirm(`Apakah Anda yakin ingin menghapus data Renja untuk: "${item.nama}"?`)) return;

        window.renjaPegawaiList = window.renjaPegawaiList.filter(x => x.id !== id);
        window.saveRenjaData();
        window.renderRenjaPegawai();
        if (typeof showToast === 'function') showToast("Data berhasil dihapus dari Renja.", "info");
    };

    // Reset to Default
    window.resetRenjaToDefault = function() {
        if (!confirm("Apakah Anda yakin ingin memulihkan seluruh 87 data standar Renja Tahun 2027 sesuai lampiran dokumen resmi?")) return;
        window.renjaPegawaiList = JSON.parse(JSON.stringify(DEFAULT_RENJA_PEGAWAI));
        window.saveRenjaData();
        window.renderRenjaPegawai();
        if (typeof showToast === 'function') showToast("Data Renja 2027 berhasil dipulihkan ke 87 data standar!", "success");
    };

    // Export to CSV
    window.exportRenjaCsv = function() {
        const filtered = window.getFilteredRenjaData();
        let csv = "\uFEFF"; // UTF-8 BOM
        csv += "NO;NAMA;NO REKENING BANK DKI;JENIS PENDIDIKAN;JABATAN;KATEGORI;JENIS PEGAWAI;TMT KONTRAK;MASA KERJA THN;MASA KERJA BLN;JENJANG;GAJI POKOK;STATUS;GAJI & TUNJANGAN;BLN GAJI;TOTAL GAJI;PERSEN TKP;TKP BULAN;BLN TKP;TOTAL TKP;BPJS KES BLN;BLN BPJS KES;TOTAL BPJS KES;BPJS TK BLN;BLN BPJS TK;TOTAL BPJS TK;TRANSPORT BLN;BLN TRANSPORT;TOTAL TRANSPORT;TOTAL ANGGARAN\n";

        filtered.forEach(item => {
            csv += [
                item.no,
                `"${(item.nama || '').replace(/"/g, '""')}"`,
                `"${(item.no_rekening_bank_dki || '').replace(/"/g, '""')}"`,
                `"${(item.jenis_pendidikan || '').replace(/"/g, '""')}"`,
                `"${(item.jabatan || '').replace(/"/g, '""')}"`,
                `"${(item.kategori_jabatan || '').replace(/"/g, '""')}"`,
                `"${item.jenis_pegawai}"`,
                `"${item.tmt_kontrak}"`,
                item.masa_kerja_tahun,
                item.masa_kerja_bulan,
                item.pendidikan_jenjang,
                item.gaji_pokok,
                item.status_keluarga,
                item.gaji_dan_tunjangan,
                item.bulan_gaji,
                item.total_gaji,
                item.persen_tkp_str || item.persen_tkp,
                item.tkp_bln,
                item.bulan_tkp,
                item.total_tkp,
                item.bpjs_kes_bln,
                item.bulan_bpjs_kes,
                item.total_bpjs_kes,
                item.bpjs_tk_bln,
                item.bulan_bpjs_tk,
                item.total_bpjs_tk,
                item.transport_bln,
                item.bulan_transport,
                item.total_transport,
                item.total_anggaran
            ].join(';') + "\n";
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `RENJA_PEGAWAI_NON_ASN_PPPK_PW_${window.currentRenjaYear}_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Printable Document View
    window.printRenjaDoc = function() {
        const filtered = window.getFilteredRenjaData();
        let totalGaji = 0, totalTkp = 0, totalBpjsKes = 0, totalBpjsTk = 0, totalTransport = 0, grandTotal = 0;

        filtered.forEach(x => {
            totalGaji += Number(x.total_gaji || 0);
            totalTkp += Number(x.total_tkp || 0);
            totalBpjsKes += Number(x.total_bpjs_kes || 0);
            totalBpjsTk += Number(x.total_bpjs_tk || 0);
            totalTransport += Number(x.total_transport || 0);
            grandTotal += Number(x.total_anggaran || 0);
        });

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Harap izinkan popup untuk mencetak dokumen.");
            return;
        }

        let rowsHtml = '';
        filtered.forEach(item => {
            rowsHtml += `
                <tr>
                    <td style="text-align: center;">${item.no}</td>
                    <td><strong>${item.nama}</strong><br><small>${item.no_rekening_bank_dki || '-'}</small></td>
                    <td>${item.jenis_pendidikan}</td>
                    <td>${item.jabatan}</td>
                    <td style="text-align: center;">${item.tmt_kontrak}</td>
                    <td style="text-align: center;">${item.masa_kerja_tahun} Th ${item.masa_kerja_bulan} Bln</td>
                    <td style="text-align: center;">${item.pendidikan_jenjang}</td>
                    <td style="text-align: right;">${item.gaji_pokok.toLocaleString('id-ID')}</td>
                    <td style="text-align: center;">${item.status_keluarga}</td>
                    <td style="text-align: right;">${item.total_gaji.toLocaleString('id-ID')}</td>
                    <td style="text-align: center;">${item.persen_tkp_str || item.persen_tkp}</td>
                    <td style="text-align: right;">${item.total_tkp.toLocaleString('id-ID')}</td>
                    <td style="text-align: right;">${item.total_bpjs_kes.toLocaleString('id-ID')}</td>
                    <td style="text-align: right;">${item.total_bpjs_tk.toLocaleString('id-ID')}</td>
                    <td style="text-align: right;">${item.total_transport.toLocaleString('id-ID')}</td>
                    <td style="text-align: right; font-weight: bold;">${item.total_anggaran.toLocaleString('id-ID')}</td>
                    <td style="text-align: center; font-weight: bold;">${item.jenis_pegawai}</td>
                </tr>
            `;
        });

        const docHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cetak Renja Pegawai Non ASN & PPPK PW ${window.currentRenjaYear}</title>
                <style>
                    @page { size: landscape; margin: 10mm; }
                    body { font-family: Arial, sans-serif; font-size: 8pt; color: #000; margin: 0; padding: 10px; }
                    .header { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 8px; }
                    .header h2 { margin: 0 0 4px 0; font-size: 13pt; text-transform: uppercase; }
                    .header h3 { margin: 0 0 4px 0; font-size: 11pt; font-weight: normal; }
                    .header p { margin: 0; font-size: 9pt; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #444; padding: 4px 5px; }
                    th { background-color: #eee; font-size: 7.5pt; text-align: center; }
                    .total-row { background-color: #f0f0f0; font-weight: bold; }
                    .sign-section { margin-top: 30px; display: flex; justify-content: space-between; page-break-inside: avoid; }
                    .sign-box { width: 280px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA</h2>
                    <h3>DINAS KESEHATAN &bull; PUSKESMAS KECAMATAN KEPULAUAN SERIBU UTARA</h3>
                    <p><strong>RENCANA KERJA (RENJA) PEGAWAI NON ASN DAN PPPK PW TAHUN ANGGARAN ${window.currentRenjaYear}</strong></p>
                    <p><small>TMT Cut Off: ${window.currentRenjaCutOff} &bull; Standar Pergub DKI Jakarta No. 221 Tahun 2016</small></p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>NAMA & REKENING</th>
                            <th>JENIS PENDIDIKAN</th>
                            <th>JABATAN</th>
                            <th>TMT</th>
                            <th>MASA KERJA</th>
                            <th>JENJANG</th>
                            <th>GAJI POKOK</th>
                            <th>STATUS</th>
                            <th>TOTAL GAJI (14 BLN)</th>
                            <th>% TKP</th>
                            <th>TOTAL TKP (14 BLN)</th>
                            <th>BPJS KES (4%)</th>
                            <th>BPJS TK (6.24%)</th>
                            <th>TRANSPORT (12 BLN)</th>
                            <th>TOTAL ANGGARAN</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td colspan="7" style="text-align: center;">TOTAL KESELURUHAN (${filtered.length} PEGAWAI)</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: right;">${totalGaji.toLocaleString('id-ID')}</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: right;">${totalTkp.toLocaleString('id-ID')}</td>
                            <td style="text-align: right;">${totalBpjsKes.toLocaleString('id-ID')}</td>
                            <td style="text-align: right;">${totalBpjsTk.toLocaleString('id-ID')}</td>
                            <td style="text-align: right;">${totalTransport.toLocaleString('id-ID')}</td>
                            <td style="text-align: right; font-weight: bold;">${grandTotal.toLocaleString('id-ID')}</td>
                            <td style="text-align: center;">-</td>
                        </tr>
                    </tfoot>
                </table>

                <div class="sign-section">
                    <div class="sign-box">
                        <p>Mengetahui,<br><strong>Kepala Sub Bagian Tata Usaha</strong><br>Puskesmas Kec. Kepulauan Seribu Selatan</p>
                        <br><br><br>
                        <p><strong><u>Zainal Mutaqim, S.Si</u></strong><br>NIP. 198505122010011015</p>
                    </div>
                    <div class="sign-box">
                        <p>Jakarta, ${(new Date()).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}<br><strong>Kepala Puskesmas Kecamatan</strong><br>Kepulauan Seribu Selatan</p>
                        <br><br><br>
                        <p><strong><u>dr. Daniel Arisandi, M.K.M.</u></strong><br>NIP. 198004122006041008</p>
                    </div>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(docHtml);
        printWindow.document.close();
    };

    // Auto-init on page ready
    $(document).ready(function() {
        window.initRenjaPegawaiData();
    });

})();
