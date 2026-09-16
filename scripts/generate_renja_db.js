import fs from 'fs';

const targetGaji = 6047993189;
const targetTkp = 5250964152;
const targetBpjs = 450545482;
const targetTrans = 958883152;
const targetPagu = 12708385975;

// The first 3 exact rows from the screenshot:
const initialRows = [
  {
    id: "RENJA-001",
    nama: "dr. William D Julius Sihombing",
    no_rekening: "Bank DKI belum diisi",
    jabatan: "Dokter Ahli Pertama",
    pendidikan: "S1 Profesi Kedokteran (S1)",
    tmt: "2019-02-04",
    gapok: 5102714,
    status_ptkp: "K2",
    total_gaji_14: 80010556,
    koef_tkp: 1.6,
    total_tkp_14: 114300788,
    bpjs_kes_12: 2743219,
    bpjs_tk_12: 4279422,
    transport_12: 12246514,
    total_anggaran: 213580499,
    status_pegawai: "NON ASN",
    kategori: "Tenaga Medis",
    nip: "",
    nik: "3171011502890001",
    terdaftar_simpeg: false
  },
  {
    id: "RENJA-002",
    nama: "dr. Wisnu Surya Pamungkas",
    no_rekening: "Bank DKI belum diisi",
    jabatan: "Dokter Ahli Pertama",
    pendidikan: "S1 Profesi Kedokteran (S1)",
    tmt: "2017-04-03",
    gapok: 5230282,
    status_ptkp: "K0",
    total_gaji_14: 73223948,
    koef_tkp: 1.6,
    total_tkp_14: 117158314,
    bpjs_kes_12: 2510535,
    bpjs_tk_12: 3916435,
    transport_12: 12552677,
    total_anggaran: 209361909,
    status_pegawai: "NON ASN",
    kategori: "Tenaga Medis",
    nip: "",
    nik: "3171020304870002",
    terdaftar_simpeg: false
  },
  {
    id: "RENJA-003",
    nama: "dr. Mahmudah",
    no_rekening: "Bank DKI belum diisi",
    jabatan: "Dokter Ahli Pertama",
    pendidikan: "S1 Profesi Kedokteran (S1)",
    tmt: "2013-01-02",
    gapok: 5495065,
    status_ptkp: "K3",
    total_gaji_14: 87701237,
    koef_tkp: 1.6,
    total_tkp_14: 123089456,
    bpjs_kes_12: 3006900,
    bpjs_tk_12: 4690763,
    transport_12: 13188156,
    total_anggaran: 231676512,
    status_pegawai: "PPPK PW",
    kategori: "Tenaga Medis",
    nip: "",
    nik: "3171030201830003",
    terdaftar_simpeg: false
  }
];

// Base list of remaining 84 employees
const roles = [
  { jabatan: "Dokter Gigi Ahli Pertama", pendidikan: "S1 Profesi Kedokteran Gigi (S1)", kategori: "Tenaga Medis", koef: 1.6, gapokBase: 5150000, transBase: 1020000 },
  { jabatan: "Dokter Spesialis Anak", pendidikan: "Spesialis Anak (Sp-1)", kategori: "Tenaga Medis", koef: 1.8, gapokBase: 5800000, transBase: 1250000 },
  { jabatan: "Apoteker Ahli Pertama", pendidikan: "Profesi Apoteker (S1)", kategori: "Tenaga Kesehatan Lainnya", koef: 1.4, gapokBase: 4900000, transBase: 950000 },
  { jabatan: "Perawat Ahli Pertama", pendidikan: "S1 Keperawatan + Ners", kategori: "Tenaga Keperawatan", koef: 1.2, gapokBase: 4650000, transBase: 850000 },
  { jabatan: "Perawat Terampil", pendidikan: "D3 Keperawatan", kategori: "Tenaga Keperawatan", koef: 1.0, gapokBase: 4300000, transBase: 750000 },
  { jabatan: "Bidan Ahli Pertama", pendidikan: "D4 / S1 Kebidanan", kategori: "Tenaga Kebidanan", koef: 1.2, gapokBase: 4600000, transBase: 850000 },
  { jabatan: "Bidan Terampil", pendidikan: "D3 Kebidanan", kategori: "Tenaga Kebidanan", koef: 1.0, gapokBase: 4250000, transBase: 750000 },
  { jabatan: "Pranata Laboratorium Terampil", pendidikan: "D3 Analis Kesehatan", kategori: "Tenaga Kesehatan Lainnya", koef: 1.0, gapokBase: 4250000, transBase: 750000 },
  { jabatan: "Nutrisionis Terampil", pendidikan: "D3 Gizi", kategori: "Tenaga Kesehatan Lainnya", koef: 1.0, gapokBase: 4250000, transBase: 750000 },
  { jabatan: "Sanitarian Terampil", pendidikan: "D3 Kesehatan Lingkungan", kategori: "Tenaga Kesehatan Lainnya", koef: 1.0, gapokBase: 4200000, transBase: 750000 },
  { jabatan: "Perekam Medis Terampil", pendidikan: "D3 Rekam Medis", kategori: "Tenaga Kesehatan Lainnya", koef: 1.0, gapokBase: 4250000, transBase: 750000 },
  { jabatan: "Pengelola Data & SIMPUS", pendidikan: "S1 Ilmu Komputer / Sistem Informasi", kategori: "Tenaga Penunjang / Administrasi", koef: 0.9, gapokBase: 4400000, transBase: 650000 },
  { jabatan: "Pengadministrasi Umum & Perkantoran", pendidikan: "SMA / SMK", kategori: "Tenaga Penunjang / Administrasi", koef: 0.8, gapokBase: 3900000, transBase: 550000 },
  { jabatan: "Operator Layanan Operasional", pendidikan: "SMA / SMK / D3", kategori: "Tenaga Penunjang / Administrasi", koef: 0.7, gapokBase: 3850000, transBase: 500000 },
  { jabatan: "Pengemudi Ambulans / Speedboat", pendidikan: "SMA / SMK", kategori: "Tenaga Penunjang / Administrasi", koef: 0.6, gapokBase: 3800000, transBase: 500000 },
  { jabatan: "Petugas Keamanan / Security", pendidikan: "SMA / SMK", kategori: "Tenaga Penunjang / Administrasi", koef: 0.5, gapokBase: 3750000, transBase: 450000 },
  { jabatan: "Pramu Kebersihan / Cleaning Service", pendidikan: "SMA / SMP", kategori: "Tenaga Penunjang / Administrasi", koef: 0.4, gapokBase: 3700000, transBase: 400000 }
];

const namesPool = [
  "dr. Siti Nur Azizah", "drg. Rizky Pratama", "dr. Hendra Gunawan", "drg. Maya Anggraini",
  "dr. Fajar Hidayat", "dr. Citra Lestari", "drg. Dimas Anugerah", "apt. Dian Kusuma, S.Farm",
  "apt. Wahyu Setiawan, S.Farm", "Ns. Tri Wahyuni, S.Kep", "Ns. Agus Supriyadi, S.Kep",
  "Ns. Dewi Sartika, S.Kep", "Ns. Rian Hidayat, S.Kep", "Rina Marlina, A.Md.Kep",
  "Budi Santoso, A.Md.Kep", "Eka Putri, A.Md.Kep", "Surya Saputra, A.Md.Kep",
  "Indah Permata, A.Md.Kep", "Nurul Hidayati, A.Md.Kep", "Hendra Wijaya, A.Md.Kep",
  "Sri Rahayu, A.Md.Keb", "Ani Suryani, A.Md.Keb", "Lestari Ningsih, A.Md.Keb",
  "Fitri Handayani, A.Md.Keb", "Wulan Dari, A.Md.Keb", "Novita Sari, A.Md.Keb",
  "Yuliana, A.Md.Keb", "Desi Ratnasari, A.Md.Keb", "Ahmad Fauzi, A.Md.AK",
  "Rizka Maulida, A.Md.AK", "Dian Novitasari, A.Md.Gz", "Taufik Hidayat, A.Md.KL",
  "Zainal Arifin, A.Md.RMIK", "Bayu Wicaksono, S.Kom", "Safriansyah, S.Kom",
  "Zulkarnain", "Ardian", "PIPIT APRIYANI, A.Md.Kep", "Mika Windani", "dr. Viny Octofiad",
  "Dedi Irawan", "Bambang Suherman", "Yusuf Maulana", "Ilham Ramadhan", "Haryanto",
  "Suhendra", "Mulyadi", "Gunawan Prasetyo", "Agung Nugroho", "Iskandar",
  "Rudi Hartono", "Slamet Riyadi", "Hasan Basri", "Firman Syahputra", "Doni Kurniawan",
  "Asep Saepudin", "Cecep Supriyatna", "Tatang Hermansyah", "Iwan Setiawan", "Dadang Darmawan",
  "Nur Rohim", "Ali Imron", "Mustofa Kamal", "Lukman Hakim", "Syamsul Bahri",
  "Fatmawati", "Kartini", "Dewi Sartika", "Megawati", "Kusumawardhani",
  "Rini Suwarni", "Endang Susilowati", "Ratna Juwita", "Siti Aisyah", "Nur Halimah",
  "Nur Asiyah", "Tri Astuti", "Sri Mulyani", "Herlina", "Rosita Dewi",
  "Yanti Susanti", "Eni Nuraeni", "Lia Yuliani", "Ida Farida", "Wiwin Winarni",
  "Neneng Hasanah", "Tuti Alawiyah"
];

const ptkpPool = ["TK0", "K0", "K1", "K2", "K3", "TK0", "K1", "K2"];
const tmtYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

const employees = [...initialRows];

let sumInitialGaji = initialRows.reduce((a, b) => a + b.total_gaji_14, 0);
let sumInitialTkp = initialRows.reduce((a, b) => a + b.total_tkp_14, 0);
let sumInitialBpjs = initialRows.reduce((a, b) => a + (b.bpjs_kes_12 + b.bpjs_tk_12), 0);
let sumInitialTrans = initialRows.reduce((a, b) => a + b.transport_12, 0);

const remGaji = targetGaji - sumInitialGaji;
const remTkp = targetTkp - sumInitialTkp;
const remBpjs = targetBpjs - sumInitialBpjs;
const remTrans = targetTrans - sumInitialTrans;

// We need 87 - 3 = 84 more employees
// Target total: 50 Non-ASN, 37 PPPK PW.
// In initialRows: 2 Non-ASN, 1 PPPK PW.
// So in remaining 84: 48 Non-ASN and 36 PPPK PW!
const countRem = 84;
let remNonAsn = 48;
let remPppk = 36;

const baseRows = [];
let rawGajiTotal = 0;
let rawTkpTotal = 0;
let rawBpjsTotal = 0;
let rawTransTotal = 0;

for (let i = 0; i < countRem; i++) {
  const role = roles[i % roles.length];
  const name = namesPool[i] || `Pegawai Non ASN ${i + 4}`;
  const isNonAsn = remNonAsn > 0 ? (remPppk > 0 ? (i % 2 === 0) : true) : false;
  if (isNonAsn) remNonAsn--;
  else remPppk--;

  const status_pegawai = isNonAsn ? "NON ASN" : "PPPK PW";
  const ptkp = ptkpPool[i % ptkpPool.length];
  const tmtY = tmtYears[i % tmtYears.length];
  const tmtM = ((i * 3) % 12) + 1;
  const tmtD = ((i * 5) % 27) + 1;
  const tmt = `${tmtY}-${String(tmtM).padStart(2, '0')}-${String(tmtD).padStart(2, '0')}`;

  // Variation in salary
  const varFactor = 0.95 + ((i * 7) % 20) * 0.01;
  const gapok = Math.round(role.gapokBase * varFactor);

  // Status PTKP multiplier
  let tunjKel = 0;
  if (ptkp === "K0") tunjKel = 0.10;
  else if (ptkp === "K1") tunjKel = 0.12;
  else if (ptkp === "K2" || ptkp === "K3") tunjKel = 0.14;

  const gajiBln = Math.round(gapok * (1 + tunjKel));
  const total_gaji = gajiBln * 14;

  const tkpBln = Math.round(gapok * role.koef);
  const total_tkp = tkpBln * 14;

  const bpjsKesBln = Math.round(gajiBln * 0.04);
  const bpjsTkBln = Math.round(gajiBln * 0.0624);
  const total_bpjs = (bpjsKesBln + bpjsTkBln) * 12;

  const transBln = Math.round(role.transBase * (0.9 + ((i * 3) % 25) * 0.01));
  const total_trans = transBln * 12;

  rawGajiTotal += total_gaji;
  rawTkpTotal += total_tkp;
  rawBpjsTotal += total_bpjs;
  rawTransTotal += total_trans;

  baseRows.push({
    id: `RENJA-${String(i + 4).padStart(3, '0')}`,
    nama: name,
    no_rekening: (i % 3 === 0) ? `Bank DKI: 501.23.${String(10000 + i * 37)}` : "Bank DKI belum diisi",
    jabatan: role.jabatan,
    pendidikan: role.pendidikan,
    tmt: tmt,
    gapok: gapok,
    status_ptkp: ptkp,
    raw_gaji: total_gaji,
    koef_tkp: role.koef,
    raw_tkp: total_tkp,
    raw_bpjs: total_bpjs,
    raw_trans: total_trans,
    status_pegawai: status_pegawai,
    kategori: role.kategori,
    nip: "",
    nik: `31710${String(i + 4).padStart(11, '0')}`,
    terdaftar_simpeg: (i < 10)
  });
}

// Rescale remaining to match targets exactly!
const scaleGaji = remGaji / rawGajiTotal;
const scaleTkp = remTkp / rawTkpTotal;
const scaleBpjs = remBpjs / rawBpjsTotal;
const scaleTrans = remTrans / rawTransTotal;

let runningGaji = sumInitialGaji;
let runningTkp = sumInitialTkp;
let runningBpjs = sumInitialBpjs;
let runningTrans = sumInitialTrans;

for (let i = 0; i < baseRows.length; i++) {
  const row = baseRows[i];
  let finalGaji = Math.round(row.raw_gaji * scaleGaji);
  let finalTkp = Math.round(row.raw_tkp * scaleTkp);
  let finalBpjs = Math.round(row.raw_bpjs * scaleBpjs);
  let finalTrans = Math.round(row.raw_trans * scaleTrans);

  // If last element, take exact remainder
  if (i === baseRows.length - 1) {
    finalGaji = targetGaji - runningGaji;
    finalTkp = targetTkp - runningTkp;
    finalBpjs = targetBpjs - runningBpjs;
    finalTrans = targetTrans - runningTrans;
  } else {
    runningGaji += finalGaji;
    runningTkp += finalTkp;
    runningBpjs += finalBpjs;
    runningTrans += finalTrans;
  }

  // Split finalBpjs into Kes (4/10.24) and TK (6.24/10.24)
  const bpjsKes = Math.round(finalBpjs * (4.0 / 10.24));
  const bpjsTk = finalBpjs - bpjsKes;

  const totalAnggaran = finalGaji + finalTkp + finalBpjs + finalTrans;

  employees.push({
    id: row.id,
    nama: row.nama,
    no_rekening: row.no_rekening,
    jabatan: row.jabatan,
    pendidikan: row.pendidikan,
    tmt: row.tmt,
    gapok: row.gapok,
    status_ptkp: row.status_ptkp,
    total_gaji_14: finalGaji,
    koef_tkp: row.koef_tkp,
    total_tkp_14: finalTkp,
    bpjs_kes_12: bpjsKes,
    bpjs_tk_12: bpjsTk,
    transport_12: finalTrans,
    total_anggaran: totalAnggaran,
    status_pegawai: row.status_pegawai,
    kategori: row.kategori,
    nip: row.nip,
    nik: row.nik,
    terdaftar_simpeg: row.terdaftar_simpeg
  });
}

// Verify totals:
const checkTotalGaji = employees.reduce((a, b) => a + b.total_gaji_14, 0);
const checkTotalTkp = employees.reduce((a, b) => a + b.total_tkp_14, 0);
const checkTotalBpjs = employees.reduce((a, b) => a + (b.bpjs_kes_12 + b.bpjs_tk_12), 0);
const checkTotalTrans = employees.reduce((a, b) => a + b.transport_12, 0);
const checkTotalPagu = employees.reduce((a, b) => a + b.total_anggaran, 0);

console.log("Employees generated:", employees.length);
console.log("Non-ASN count:", employees.filter(e => e.status_pegawai === "NON ASN").length);
console.log("PPPK PW count:", employees.filter(e => e.status_pegawai === "PPPK PW").length);
console.log("Check Total Gaji:", checkTotalGaji, "Target:", targetGaji, "Diff:", checkTotalGaji - targetGaji);
console.log("Check Total TKP:", checkTotalTkp, "Target:", targetTkp, "Diff:", checkTotalTkp - targetTkp);
console.log("Check Total BPJS:", checkTotalBpjs, "Target:", targetBpjs, "Diff:", checkTotalBpjs - targetBpjs);
console.log("Check Total Trans:", checkTotalTrans, "Target:", targetTrans, "Diff:", checkTotalTrans - targetTrans);
console.log("Check Total Pagu:", checkTotalPagu, "Target:", targetPagu, "Diff:", checkTotalPagu - targetPagu);

const renjaPayload = {
  settings: {
    tahun: 2027,
    tmt_cutoff: "2027-01-01",
    standar_regulasi: "Pergub 221 Tahun 2016",
    unit_tugas: "Puskesmas Kecamatan Kepulauan Seribu Selatan",
    koefisien_rules: {
      "Dokter Spesialis": 1.8,
      "Dokter Umum / Dokter Gigi": 1.6,
      "Apoteker / Ners": 1.4,
      "Tenaga Terampil D3": 1.0,
      "Administrasi / Pengelola Data": 0.8,
      "Penunjang / Operasional": 0.5
    }
  },
  pegawai: employees
};

fs.writeFileSync("./data_renja_db.json", JSON.stringify(renjaPayload, null, 2), "utf8");
console.log("Saved to data_renja_db.json successfully!");
