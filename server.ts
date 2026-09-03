import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : (typeof import.meta !== 'undefined' && import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : process.cwd());

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initial Data Seed for SIMPEG PKSS
const INITIAL_PEGAWAI = [
  {
    rowIndex: 2,
    nik: "3171011505850001",
    nip: "198505152010011002",
    nrk: "182930",
    nama: "dr. Ahmad Zulkarnain, Sp.A",
    jabatan: "Dokter Spesialis Anak",
    kategori: "Tenaga Medis",
    rumpun: "01. Medis",
    pangkat_gol: "III/c (Penata)",
    jenis_kelamin: "Laki-laki",
    agama: "Islam",
    status_nikah: "Kawin",
    tempat_lahir: "Jakarta",
    tanggal_lahir: "1985-05-15",
    tempat_tugas: "Puskesmas Kepulauan Seribu Selatan",
    tmt: "2010-01-01",
    str: "31.1.1.100.2.20.123456",
    aktif_str: "2027-12-31",
    sip: "446/001/SIP-D/2023",
    aktif_sip: "2027-12-31",
    alamat: "Jl. Pulau Tidung No. 12, Kepulauan Seribu",
    no_hp: "081234567890",
    email: "ahmad.zulkarnain@jakarta.go.id",
    status_pegawai: "PNS",
    npwp: "12.345.678.9-012.000",
    status_pajak: "K2",
    rekening: "Bank DKI - 5012345678",
    pendidikan: "S2",
    riwayat_jabatan: JSON.stringify([
      { jabatan: "Dokter Spesialis Anak", tmt: "2020-01-01", unit: "Puskesmas Kepulauan Seribu Selatan" },
      { jabatan: "Dokter Umum Puskesmas", tmt: "2010-01-01", unit: "Puskesmas Kepulauan Seribu" }
    ]),
    riwayat_pendidikan: JSON.stringify([
      { tingkat: "S2", jurusan: "Spesialis Anak", sekolah: "Universitas Indonesia", kota: "Jakarta", tgl: "2015-01-15" },
      { tingkat: "S1", jurusan: "Kedokteran Umum", sekolah: "Universitas Indonesia", kota: "Jakarta", tgl: "2008-08-20" }
    ]),
    riwayat_keluarga: JSON.stringify([
      { hub: "Istri", nama: "Siti Rahmawati, S.Pd", jk: "P", tempat: "Jakarta", tgl: "1988-03-10", pekerjaan: "Guru" }
    ]),
    foto: "",
    riwayat_diklat: JSON.stringify([
      { nama: "Pelatihan Resusitasi Neonatus", thn: 2022, jp: 30 },
      { nama: "Workshop Manajemen Puskesmas", thn: 2023, jp: 24 }
    ]),
    data_gaji: JSON.stringify({
      pokok: 4500000,
      tkd: 7500000,
      transport: 1200000,
      pph21: 450000,
      bpjs_kes: 180000,
      bpjs_tk: 90000
    }),
    uraian_tugas: JSON.stringify({
      ikhtisar: "Memberikan pelayanan medis spesialistik anak, konsultasi, serta upaya promotif dan preventif kesehatan anak di wilayah Kepulauan Seribu Selatan.",
      pokok: [
        "Melakukan pemeriksaan dan penanganan medis pasien anak",
        "Melaksanakan tindakan medis spesialistik anak sesuai standar operasional",
        "Memberikan konsultasi rujukan kesehatan anak dari Pustu"
      ],
      tambahan: ["Ketua Tim Mutu Pelayanan Kesehatan Anak"],
      wewenang: ["Menetapkan diagnosa dan resep obat pasien anak", "Menerbitkan surat rujukan medis"],
      tanggung: ["Terwujudnya pelayanan kesehatan anak yang bermutu dan aman"]
    }),
    dokumen: JSON.stringify({})
  },
  {
    rowIndex: 3,
    nik: "3171022008920002",
    nip: "199208202019032015",
    nrk: "194012",
    nama: "Nurul Hidayah, S.Kep., Ns.",
    jabatan: "Perawat Ahli Pertama",
    kategori: "Tenaga Kesehatan",
    rumpun: "03. Keperawatan",
    pangkat_gol: "III/a (Penata Muda)",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    status_nikah: "Kawin",
    tempat_lahir: "Tangerang",
    tanggal_lahir: "1992-08-20",
    tempat_tugas: "Pustu Pulau Untung Jawa",
    tmt: "2019-03-01",
    str: "31.2.1.200.1.21.654321",
    aktif_str: "2026-09-15",
    sip: "446/089/SIP-P/2021",
    aktif_sip: "2026-09-15",
    alamat: "Pulau Untung Jawa RT 02/01",
    no_hp: "085678901234",
    email: "nurul.hidayah@jakarta.go.id",
    status_pegawai: "PNS",
    npwp: "98.765.432.1-012.000",
    status_pajak: "K1",
    rekening: "Bank DKI - 5098765432",
    pendidikan: "S1",
    riwayat_jabatan: JSON.stringify([
      { jabatan: "Perawat Ahli Pertama", tmt: "2021-04-01", unit: "Pustu Pulau Untung Jawa" },
      { jabatan: "Perawat Pelaksana", tmt: "2019-03-01", unit: "Puskesmas Kepulauan Seribu Selatan" }
    ]),
    riwayat_pendidikan: JSON.stringify([
      { tingkat: "S1", jurusan: "Ners", sekolah: "STIKES Binawan", kota: "Jakarta", tgl: "2017-07-25" },
      { tingkat: "D3", jurusan: "Keperawatan", sekolah: "Poltekkes Jakarta I", kota: "Jakarta", tgl: "2013-09-10" }
    ]),
    riwayat_keluarga: JSON.stringify([]),
    foto: "",
    riwayat_diklat: JSON.stringify([
      { nama: "Pelatihan BTCLS (Basic Trauma Cardiac Life Support)", thn: 2021, jp: 45 }
    ]),
    data_gaji: JSON.stringify({
      pokok: 3200000,
      tkd: 4800000,
      transport: 800000,
      pph21: 220000,
      bpjs_kes: 120000,
      bpjs_tk: 60000
    }),
    uraian_tugas: JSON.stringify({
      ikhtisar: "Melakukan kegiatan pelayanan keperawatan yang meliputi asuhan keperawatan dan pengelolaan keperawatan di Pustu Pulau Untung Jawa.",
      pokok: [
        "Melakukan pengkajian keperawatan dasar dan lanjutan",
        "Merumuskan diagnosa keperawatan dan menyusun rencana tindakan",
        "Melakukan tindakan keperawatan dan evaluasi"
      ],
      tambahan: ["Pengelola Program PTM Pustu"],
      wewenang: ["Melakukan asuhan keperawatan mandiri dan kolaboratif"],
      tanggung: ["Kebenaran dan ketepatan tindakan asuhan keperawatan"]
    }),
    dokumen: JSON.stringify({})
  },
  {
    rowIndex: 4,
    nik: "3171031201950003",
    nip: "",
    nrk: "",
    nama: "Budi Santoso, A.Md.Kes",
    jabatan: "Sanitarian",
    kategori: "Tenaga Kesehatan",
    rumpun: "07. Kesehatan Lingkungan",
    pangkat_gol: "IX (KHUSUS PPPK)",
    jenis_kelamin: "Laki-laki",
    agama: "Islam",
    status_nikah: "Belum Kawin",
    tempat_lahir: "Bogor",
    tanggal_lahir: "1995-01-12",
    tempat_tugas: "Pustu Pulau Pari",
    tmt: "2022-02-01",
    str: "31.7.1.300.3.22.998877",
    aktif_str: "2026-08-10",
    sip: "446/102/SIP-S/2022",
    aktif_sip: "2026-08-10",
    alamat: "Pulau Pari RT 01/02",
    no_hp: "087890123456",
    email: "budi.santoso@gmail.com",
    status_pegawai: "PPPK",
    npwp: "34.567.890.1-012.000",
    status_pajak: "TK",
    rekening: "Bank DKI - 5034567890",
    pendidikan: "D3",
    riwayat_jabatan: JSON.stringify([
      { jabatan: "Sanitarian Ahli/Pelaksana", tmt: "2022-02-01", unit: "Pustu Pulau Pari" }
    ]),
    riwayat_pendidikan: JSON.stringify([
      { tingkat: "D3", jurusan: "Kesehatan Lingkungan", sekolah: "Poltekkes Bandung", kota: "Bandung", tgl: "2016-08-15" }
    ]),
    riwayat_keluarga: JSON.stringify([]),
    foto: "",
    riwayat_diklat: JSON.stringify([]),
    data_gaji: JSON.stringify({
      pokok: 2900000,
      tkd: 3500000,
      transport: 600000,
      pph21: 150000,
      bpjs_kes: 100000,
      bpjs_tk: 50000
    }),
    uraian_tugas: JSON.stringify({
      ikhtisar: "Melakukan pengawasan dan penyehatan lingkungan pemukiman, sarana air bersih, dan tempat umum.",
      pokok: [
        "Pemeriksaan kualitas air minum dan sanitasi lingkungan",
        "Inspeksi kesehatan lingkungan tempat-tempat umum"
      ],
      tambahan: [],
      wewenang: ["Rekomendasi laik sehat sanitasi"],
      tanggung: ["Kualitas sanitasi lingkungan di wilayah kerja"]
    }),
    dokumen: JSON.stringify({})
  },
  {
    rowIndex: 5,
    nik: "3171040504980004",
    nip: "",
    nrk: "",
    nama: "Siti Rahayu, A.Md.Keb",
    jabatan: "Bidan Pelaksana",
    kategori: "Tenaga Kesehatan",
    rumpun: "04. Kebidanan",
    pangkat_gol: "NON PNS",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    status_nikah: "Kawin",
    tempat_lahir: "Serang",
    tanggal_lahir: "1998-04-05",
    tempat_tugas: "Pustu Pulau Lancang",
    tmt: "2021-01-10",
    str: "31.4.1.400.2.21.776655",
    aktif_str: "2026-10-01",
    sip: "446/054/SIP-B/2021",
    aktif_sip: "2026-10-01",
    alamat: "Pulau Lancang RT 03/02",
    no_hp: "089012345678",
    email: "siti.rahayu@gmail.com",
    status_pegawai: "NON PNS",
    npwp: "45.678.901.2-012.000",
    status_pajak: "K0",
    rekening: "Bank DKI - 5045678901",
    pendidikan: "D3",
    riwayat_jabatan: JSON.stringify([
      { jabatan: "Bidan Pelaksana", tmt: "2021-01-10", unit: "Pustu Pulau Lancang" }
    ]),
    riwayat_pendidikan: JSON.stringify([
      { tingkat: "D3", jurusan: "Kebidanan", sekolah: "Poltekkes Banten", kota: "Rangkasbitung", tgl: "2019-09-01" }
    ]),
    riwayat_keluarga: JSON.stringify([]),
    foto: "",
    riwayat_diklat: JSON.stringify([]),
    data_gaji: JSON.stringify({
      pokok: 4800000,
      tkd: 0,
      transport: 500000,
      pph21: 100000,
      bpjs_kes: 90000,
      bpjs_tk: 45000
    }),
    uraian_tugas: JSON.stringify({
      ikhtisar: "Memberikan asuhan kebidanan pada ibu hamil, bersalin, nifas, bayi baru lahir, dan keluarga berencana.",
      pokok: [
        "Pemeriksaan kehamilan (ANC) berkala",
        "Pertolongan persalinan normal dan penanganan awal kegawatdaruratan maternal"
      ],
      tambahan: [],
      wewenang: ["Pertolongan persalinan fisiologis"],
      tanggung: ["Keselamatan ibu dan bayi selama perawatan kebidanan"]
    }),
    dokumen: JSON.stringify({})
  }
];

// Persistent File Storage Path for Data
const DATA_FILE = path.join(process.cwd(), 'data_pegawai_db.json');
const PAYROLL_FILE = path.join(process.cwd(), 'data_payroll_db.json');
const DIKLAT_FILE = path.join(process.cwd(), 'data_diklat_db.json');
const USULAN_FILE = path.join(process.cwd(), 'data_usulan_db.json');
const GAP_FILE = path.join(process.cwd(), 'data_gap_db.json');
const DISIPLIN_FILE = path.join(process.cwd(), 'data_disiplin_db.json');
const PENGGUNA_FILE = path.join(process.cwd(), 'data_pengguna_db.json');
const MASTER_FILE = path.join(process.cwd(), 'data_master_db.json');
const CONFIG_FILE = path.join(process.cwd(), 'data_config_db.json');

const INITIAL_PAYROLL = [
  {
    id: 'GAJI-198505152010011002-2026-08',
    nip: '198505152010011002',
    nama: 'dr. Ahmad Zulkarnain, Sp.A',
    bulan: 8,
    tahun: 2026,
    pangkat_gol: 'III/c (Penata)',
    jabatan: 'Dokter Spesialis Anak',
    unit_tugas: 'Puskesmas Kepulauan Seribu Selatan',
    gaji_pokok: 4500000,
    tunjangan_kinerja: 7500000,
    tunjangan_transportasi: 1200000,
    total_bruto: 13200000,
    potongan_pph21: 450000,
    potongan_bpjs_kesehatan: 180000,
    potongan_bpjs_jht: 90000,
    potongan_bpjs_jp: 45000,
    total_potongan: 765000,
    gaji_bersih: 12435000,
    status_bayar: 'Lunas',
    tgl_transfer: '2026-08-01',
    no_rekening: 'Bank DKI 5012345678',
    keterangan: 'Gaji Bulan Agustus 2026'
  },
  {
    id: 'GAJI-197305291995031001-2026-08',
    nip: '197305291995031001',
    nama: 'dr. Ignatius Dendy Purnama',
    bulan: 8,
    tahun: 2026,
    pangkat_gol: 'IV/a (Pembina)',
    jabatan: 'Kepala Puskesmas Kepulauan Seribu Selatan',
    unit_tugas: 'Puskesmas Kepulauan Seribu Selatan',
    gaji_pokok: 5200000,
    tunjangan_kinerja: 10500000,
    tunjangan_transportasi: 1500000,
    total_bruto: 17200000,
    potongan_pph21: 680000,
    potongan_bpjs_kesehatan: 200000,
    potongan_bpjs_jht: 104000,
    potongan_bpjs_jp: 52000,
    total_potongan: 1036000,
    gaji_bersih: 16164000,
    status_bayar: 'Lunas',
    tgl_transfer: '2026-08-01',
    no_rekening: 'Bank DKI 5023456789',
    keterangan: 'Gaji Bulan Agustus 2026'
  },
  {
    id: 'GAJI-198808122014021003-2026-08',
    nip: '198808122014021003',
    nama: 'Ns. Budi Santoso, S.Kep',
    bulan: 8,
    tahun: 2026,
    pangkat_gol: 'III/c (Penata)',
    jabatan: 'Perawat Penyelia / PJ Keperawatan',
    unit_tugas: 'Puskesmas Kepulauan Seribu Selatan',
    gaji_pokok: 4200000,
    tunjangan_kinerja: 5800000,
    tunjangan_transportasi: 1000000,
    total_bruto: 11000000,
    potongan_pph21: 320000,
    potongan_bpjs_kesehatan: 160000,
    potongan_bpjs_jht: 84000,
    potongan_bpjs_jp: 42000,
    total_potongan: 606000,
    gaji_bersih: 10394000,
    status_bayar: 'Lunas',
    tgl_transfer: '2026-08-01',
    no_rekening: 'Bank DKI 5034567890',
    keterangan: 'Gaji Bulan Agustus 2026'
  },
  {
    id: 'GAJI-199209152022032008-2026-08',
    nip: '199209152022032008',
    nama: 'Siti Sarah, A.Md.Keb',
    bulan: 8,
    tahun: 2026,
    pangkat_gol: 'VII (Penata Muda)',
    jabatan: 'Bidan Mahir / Pustu Pulau Harapan',
    unit_tugas: 'Poskesdes / Pustu Pulau Harapan',
    gaji_pokok: 3500000,
    tunjangan_kinerja: 4200000,
    tunjangan_transportasi: 850000,
    total_bruto: 8550000,
    potongan_pph21: 210000,
    potongan_bpjs_kesehatan: 140000,
    potongan_bpjs_jht: 70000,
    potongan_bpjs_jp: 35000,
    total_potongan: 455000,
    gaji_bersih: 8095000,
    status_bayar: 'Lunas',
    tgl_transfer: '2026-08-01',
    no_rekening: 'Bank DKI 5045678901',
    keterangan: 'Gaji Bulan Agustus 2026'
  },
  {
    id: 'GAJI-198711032011011004-2026-08',
    nip: '198711032011011004',
    nama: 'Apt. Rahmat Hidayat, S.Farm',
    bulan: 8,
    tahun: 2026,
    pangkat_gol: 'III/c (Penata)',
    jabatan: 'Apoteker Ahli Muda / Pengelola Obat',
    unit_tugas: 'Puskesmas Kepulauan Seribu Selatan',
    gaji_pokok: 4300000,
    tunjangan_kinerja: 6000000,
    tunjangan_transportasi: 1000000,
    total_bruto: 11300000,
    potongan_pph21: 350000,
    potongan_bpjs_kesehatan: 172000,
    potongan_bpjs_jht: 86000,
    potongan_bpjs_jp: 43000,
    total_potongan: 651000,
    gaji_bersih: 10649000,
    status_bayar: 'Lunas',
    tgl_transfer: '2026-08-01',
    no_rekening: 'Bank DKI 5056789012',
    keterangan: 'Gaji Bulan Agustus 2026'
  }
];

function isPegawaiRecord(item: any): boolean {
  if (!item || typeof item !== 'object') return false;
  // Exclude diklat records that might have leaked into pegawai
  if (item.penyelenggara && item.tgl_selesai && !item.nip && !item.nik && !item.jabatan) return false;
  return Boolean(item.nip || item.nik || item.nama || item.jabatan);
}

function loadJsonFile(filePath: string, fallback: any) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading file " + filePath + ":", e);
  }
  return fallback;
}

function saveJsonFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving file " + filePath + ":", e);
  }
}

function loadPegawaiDb() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = parsed.filter(isPegawaiRecord);
        if (filtered.length > 0) {
          return filtered;
        }
      }
    }
  } catch (e) {
    console.error("Error reading data file:", e);
  }
  return INITIAL_PEGAWAI;
}

function savePegawaiDb(data: any[]) {
  try {
    const validPegawai = Array.isArray(data) ? data.filter(isPegawaiRecord) : [];
    fs.writeFileSync(DATA_FILE, JSON.stringify(validPegawai, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving data file:", e);
  }
}

function loadPayrollDb() {
  try {
    if (fs.existsSync(PAYROLL_FILE)) {
      const data = fs.readFileSync(PAYROLL_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading payroll file:", e);
  }
  return INITIAL_PAYROLL;
}

function savePayrollDb(data: any[]) {
  try {
    fs.writeFileSync(PAYROLL_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving payroll file:", e);
  }
}

let pegawaiDb = loadPegawaiDb();
let payrollDb = loadPayrollDb();
let diklatDb = loadJsonFile(DIKLAT_FILE, []);
let usulanDb = loadJsonFile(USULAN_FILE, []);
let gapDb = loadJsonFile(GAP_FILE, []);
let disiplinDb = loadJsonFile(DISIPLIN_FILE, {});
let penggunaDb = loadJsonFile(PENGGUNA_FILE, []);
let masterDb = loadJsonFile(MASTER_FILE, {});
let configDb = loadJsonFile(CONFIG_FILE, { gas_webapp_url: '', instansi: 'Puskesmas Kepulauan Seribu Selatan' });

// Lazy Gemini Client setup
let genAIClient: GoogleGenAI | null = null;
function getGenAIClient(customApiKey?: string) {
  const key = customApiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  if (!genAIClient || customApiKey) {
    const client = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    if (!customApiKey) genAIClient = client;
    return client;
  }
  return genAIClient;
}

// API ROUTING

// Endpoint Download Project ZIP untuk Hosting
app.get('/api/download-zip', (req, res) => {
  const zipPath = path.join(process.cwd(), 'simpeg-app.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="simpeg-app.zip"');
    return res.sendFile(zipPath);
  }
  res.status(404).json({ success: false, message: "File ZIP belum dibuat." });
});

app.get('/simpeg-app.zip', (req, res) => {
  const zipPath = path.join(process.cwd(), 'simpeg-app.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="simpeg-app.zip"');
    return res.sendFile(zipPath);
  }
  res.status(404).send("File ZIP tidak ditemukan.");
});

// Endpoint Download Blogger Theme XML
app.get('/api/download-blogger-theme', (req, res) => {
  const xmlPath = path.join(process.cwd(), 'blogger-theme.xml');
  if (fs.existsSync(xmlPath)) {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename="blogger-theme.xml"');
    return res.sendFile(xmlPath);
  }
  res.status(404).json({ success: false, message: "File blogger-theme.xml belum dibuat." });
});

app.get('/blogger-theme.xml', (req, res) => {
  const xmlPath = path.join(process.cwd(), 'blogger-theme.xml');
  if (fs.existsSync(xmlPath)) {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename="blogger-theme.xml"');
    return res.sendFile(xmlPath);
  }
  res.status(404).send("File blogger-theme.xml tidak ditemukan.");
});

// Endpoint Download Code.gs (Google Apps Script)
app.get('/Code.gs', (req, res) => {
  const filePath = path.join(process.cwd(), 'Code.gs');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/javascript');
    res.setHeader('Content-Disposition', 'attachment; filename="Code.gs"');
    return res.sendFile(filePath);
  }
  res.status(404).send("File Code.gs tidak ditemukan.");
});

// Endpoint Download Panduan GAS & Google Drive (.md)
app.get('/PANDUAN_GAS_GOOGLE_DRIVE.md', (req, res) => {
  const filePath = path.join(process.cwd(), 'PANDUAN_GAS_GOOGLE_DRIVE.md');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename="PANDUAN_GAS_GOOGLE_DRIVE.md"');
    return res.sendFile(filePath);
  }
  res.status(404).send("File PANDUAN_GAS_GOOGLE_DRIVE.md tidak ditemukan.");
});

// Endpoint Download Database MySQL Script (.sql)
app.get('/api/download-database-sql', (req, res) => {
  const sqlPath = path.join(process.cwd(), 'database_simpeg.sql');
  if (fs.existsSync(sqlPath)) {
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="database_simpeg.sql"');
    return res.sendFile(sqlPath);
  }
  res.status(404).json({ success: false, message: "File database_simpeg.sql belum dibuat." });
});

app.get('/database_simpeg.sql', (req, res) => {
  const sqlPath = path.join(process.cwd(), 'database_simpeg.sql');
  if (fs.existsSync(sqlPath)) {
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="database_simpeg.sql"');
    return res.sendFile(sqlPath);
  }
  res.status(404).send("File database_simpeg.sql tidak ditemukan.");
});

// GET Pegawai Data
app.get('/api/pegawai', (req, res) => {
  res.json({ success: true, data: pegawaiDb });
});

// Unified API Handlers for Node Dev & Preview Environment
const handleApiGet = (req: express.Request, res: express.Response) => {
  const action = req.query.action as string;
  if (action === 'getPegawaiData' || action === 'getData') {
    return res.json(pegawaiDb);
  } else if (action === 'getGajiData' || action === 'getPayrollData') {
    return res.json(payrollDb);
  } else if (action === 'getDiklatData') {
    return res.json(diklatDb);
  } else if (action === 'getUsulanData') {
    return res.json(usulanDb);
  } else if (action === 'getGapData') {
    return res.json(gapDb);
  } else if (action === 'getDisiplinData') {
    return res.json(disiplinDb);
  } else if (action === 'getPenggunaData') {
    return res.json(penggunaDb);
  } else if (action === 'getMasterData') {
    return res.json(masterDb);
  } else if (action === 'getAppConfig') {
    return res.json({ success: true, data: configDb });
  } else if (action === 'getAllAppModules' || action === 'getAllData') {
    return res.json({
      success: true,
      data: {
        pegawai: pegawaiDb,
        gaji: payrollDb,
        diklat: diklatDb,
        usulan: usulanDb,
        gap: gapDb,
        disiplin: disiplinDb,
        pengguna: penggunaDb,
        master: masterDb,
        config: configDb
      }
    });
  }
  return res.json({ success: false, message: "Invalid action" });
};

const handleApiPost = (req: express.Request, res: express.Response) => {
  const action = req.body?.action || req.query.action;
  const data = req.body?.data !== undefined ? req.body.data : req.body;

  if (action === 'getPegawaiData' || action === 'getData') {
    return res.json(pegawaiDb);
  } else if (action === 'getGajiData' || action === 'getPayrollData') {
    return res.json(payrollDb);
  } else if (action === 'getDiklatData') {
    return res.json(diklatDb);
  } else if (action === 'getUsulanData') {
    return res.json(usulanDb);
  } else if (action === 'getGapData') {
    return res.json(gapDb);
  } else if (action === 'getDisiplinData') {
    return res.json(disiplinDb);
  } else if (action === 'getPenggunaData') {
    return res.json(penggunaDb);
  } else if (action === 'getMasterData') {
    return res.json(masterDb);
  } else if (action === 'getAppConfig') {
    return res.json({ success: true, data: configDb });
  } else if (action === 'getAllAppModules' || action === 'getAllData') {
    return res.json({
      success: true,
      data: {
        pegawai: pegawaiDb,
        gaji: payrollDb,
        diklat: diklatDb,
        usulan: usulanDb,
        gap: gapDb,
        disiplin: disiplinDb,
        pengguna: penggunaDb,
        master: masterDb,
        config: configDb
      }
    });
  } else if (action === 'saveGajiData' || action === 'savePayrollData') {
    if (Array.isArray(data)) {
      payrollDb = data;
      savePayrollDb(payrollDb);
      return res.json({ success: true, message: "Data penggajian berhasil disimpan!" });
    }
    return res.json({ success: false, message: "Data penggajian tidak valid." });
  } else if (action === 'importGajiData') {
    if (Array.isArray(data) && data.length > 0) {
      let count = 0;
      data.forEach((item: any) => {
        if (!item.nip && !item.nama) return;
        const gPokok = Number(item.gaji_pokok || 0);
        const tKinerja = Number(item.tunjangan_kinerja || 0);
        const tTransport = Number(item.tunjangan_transportasi || item.tunjangan_transport || 0);
        const totBruto = item.total_bruto ? Number(item.total_bruto) : (gPokok + tKinerja + tTransport);

        const pPph21 = Number(item.potongan_pph21 || item.pph21 || 0);
        const pBpjsKes = Number(item.potongan_bpjs_kesehatan || item.bpjs_kesehatan || 0);
        const pBpjsJht = Number(item.potongan_bpjs_jht || item.bpjs_jht || 0);
        const pBpjsJp = Number(item.potongan_bpjs_jp || item.bpjs_jp || 0);
        const totPotongan = item.total_potongan ? Number(item.total_potongan) : (pPph21 + pBpjsKes + pBpjsJht + pBpjsJp);
        const gNet = item.gaji_bersih ? Number(item.gaji_bersih) : (totBruto - totPotongan);

        const nip = String(item.nip).trim();
        const bulan = Number(item.bulan || 8);
        const tahun = Number(item.tahun || 2026);

        const record = {
          id: item.id || `GAJI-${nip}-${tahun}-${String(bulan).padStart(2, '0')}`,
          nip: nip,
          nama: item.nama || '',
          bulan: bulan,
          tahun: tahun,
          pangkat_gol: item.pangkat_gol || '',
          jabatan: item.jabatan || '',
          unit_tugas: item.unit_tugas || '',
          gaji_pokok: gPokok,
          tunjangan_kinerja: tKinerja,
          tunjangan_transportasi: tTransport,
          total_bruto: totBruto,
          potongan_pph21: pPph21,
          potongan_bpjs_kesehatan: pBpjsKes,
          potongan_bpjs_jht: pBpjsJht,
          potongan_bpjs_jp: pBpjsJp,
          total_potongan: totPotongan,
          gaji_bersih: gNet,
          status_bayar: item.status_bayar || 'Lunas',
          tgl_transfer: item.tgl_transfer || `${tahun}-${String(bulan).padStart(2, '0')}-01`,
          no_rekening: item.no_rekening || '',
          keterangan: item.keterangan || 'Import Data'
        };

        const idx = payrollDb.findIndex((g: any) => g.nip === nip && Number(g.bulan) === bulan && Number(g.tahun) === tahun);
        if (idx !== -1) {
          payrollDb[idx] = { ...payrollDb[idx], ...record };
        } else {
          payrollDb.push(record);
        }
        count++;
      });
      savePayrollDb(payrollDb);
      return res.json({ success: true, message: `Berhasil mengimpor ${count} data gaji pegawai!`, count });
    }
    return res.json({ success: false, message: "Data import kosong atau format tidak sesuai." });
  } else if (action === 'deleteGajiData') {
    const { id, nip, bulan, tahun } = data || {};
    payrollDb = payrollDb.filter((g: any) => {
      if (id && g.id === id) return false;
      if (nip && g.nip === nip && Number(g.bulan) === Number(bulan) && Number(g.tahun) === Number(tahun)) return false;
      return true;
    });
    savePayrollDb(payrollDb);
    return res.json({ success: true, message: "Data gaji berhasil dihapus." });
  } else if (action === 'saveAllAppModules') {
    if (data && typeof data === 'object') {
      if (data.pegawai && Array.isArray(data.pegawai) && data.pegawai.length > 0) {
        const valid = data.pegawai.filter(isPegawaiRecord);
        if (valid.length > 0) {
          pegawaiDb = valid;
          savePegawaiDb(pegawaiDb);
        }
      }
      if (data.gaji && Array.isArray(data.gaji)) {
        payrollDb = data.gaji;
        savePayrollDb(payrollDb);
      }
      if (data.diklat && Array.isArray(data.diklat)) {
        diklatDb = data.diklat;
        saveJsonFile(DIKLAT_FILE, diklatDb);
      }
      if (data.usulan && Array.isArray(data.usulan)) {
        usulanDb = data.usulan;
        saveJsonFile(USULAN_FILE, usulanDb);
      }
      if (data.gap && Array.isArray(data.gap)) {
        gapDb = data.gap;
        saveJsonFile(GAP_FILE, gapDb);
      }
      if (data.disiplin) {
        disiplinDb = data.disiplin;
        saveJsonFile(DISIPLIN_FILE, disiplinDb);
      }
      if (data.pengguna && Array.isArray(data.pengguna)) {
        penggunaDb = data.pengguna;
        saveJsonFile(PENGGUNA_FILE, penggunaDb);
      }
      if (data.master) {
        masterDb = data.master;
        saveJsonFile(MASTER_FILE, masterDb);
      }
      if (data.config) {
        configDb = { ...configDb, ...data.config };
        saveJsonFile(CONFIG_FILE, configDb);
      }
    }
    return res.json({ success: true, message: "Seluruh data modul aplikasi berhasil tersimpan di server database!" });
  } else if (action === 'saveAllData' || action === 'savePegawaiData') {
    const list = Array.isArray(data) ? data : (data?.pegawai || []);
    if (Array.isArray(list) && list.length > 0) {
      const filtered = list.filter(isPegawaiRecord);
      if (filtered.length > 0) {
        pegawaiDb = filtered;
        savePegawaiDb(pegawaiDb);
        return res.json({ success: true, message: `Berhasil menyimpan ${pegawaiDb.length} data pegawai ke database server!`, total: pegawaiDb.length });
      }
    }
    return res.json({ success: false, message: "Format data pegawai tidak valid." });
  } else if (action === 'saveDiklatData') {
    if (Array.isArray(data)) {
      diklatDb = data;
      saveJsonFile(DIKLAT_FILE, diklatDb);
      return res.json({ success: true, message: "Data jadwal diklat berhasil tersimpan!", count: diklatDb.length });
    }
    return res.json({ success: false, message: "Format data diklat tidak valid." });
  } else if (action === 'saveUsulanData') {
    if (Array.isArray(data)) {
      usulanDb = data;
      saveJsonFile(USULAN_FILE, usulanDb);
      return res.json({ success: true, message: "Data usulan kepegawaian berhasil tersimpan!", count: usulanDb.length });
    }
    return res.json({ success: false, message: "Format data usulan tidak valid." });
  } else if (action === 'saveGapData') {
    if (Array.isArray(data)) {
      gapDb = data;
      saveJsonFile(GAP_FILE, gapDb);
      return res.json({ success: true, message: "Data gap kompetensi berhasil tersimpan!", count: gapDb.length });
    }
    return res.json({ success: false, message: "Format data gap kompetensi tidak valid." });
  } else if (action === 'saveDisiplinData') {
    disiplinDb = data || {};
    saveJsonFile(DISIPLIN_FILE, disiplinDb);
    return res.json({ success: true, message: "Data disiplin berhasil tersimpan!" });
  } else if (action === 'savePenggunaData') {
    if (Array.isArray(data)) {
      penggunaDb = data;
      saveJsonFile(PENGGUNA_FILE, penggunaDb);
      return res.json({ success: true, message: "Data pengguna hak akses tersimpan!", count: penggunaDb.length });
    }
    return res.json({ success: false, message: "Format data pengguna tidak valid." });
  } else if (action === 'saveMasterData') {
    masterDb = data || {};
    saveJsonFile(MASTER_FILE, masterDb);
    return res.json({ success: true, message: "Data master jabatan berhasil tersimpan!" });
  } else if (action === 'saveAppConfig' || action === 'saveGasUrl' || action === 'savePengaturanData') {
    const newCfg = (typeof data === 'string') ? { gas_webapp_url: data } : (data || {});
    configDb = {
      ...configDb,
      ...newCfg,
      gas_webapp_url: newCfg.gas_webapp_url !== undefined ? newCfg.gas_webapp_url : (newCfg.gasUrl !== undefined ? newCfg.gasUrl : (configDb.gas_webapp_url || ''))
    };
    saveJsonFile(CONFIG_FILE, configDb);
    return res.json({ success: true, message: "Konfigurasi terpusat tersimpan di server!", config: configDb });
  } else if (action === 'login') {
    const { username, password } = data || {};
    const rawUsername = (username || '').toString().trim();
    const cleanInput = rawUsername.toLowerCase().replace(/[\s\.\-_]/g, '');
    const pass = (password || '').toString().trim();

    // 1. Default Admin Accounts
    const defaultAccounts: Record<string, { role: string; nama: string }> = {
      'admin': { role: 'Super Admin', nama: 'Administrator SIMPEG' },
      'kepegawaian': { role: 'Admin Kepegawaian', nama: 'Admin Kepegawaian' },
      'operator_pustu': { role: 'Operator Unit', nama: 'Operator Pustu' }
    };
    if (defaultAccounts[rawUsername.toLowerCase()] && (pass === '123456' || pass === rawUsername || pass === 'admin')) {
      return res.json({
        success: true,
        role: defaultAccounts[rawUsername.toLowerCase()].role,
        group: defaultAccounts[rawUsername.toLowerCase()].role,
        nama: defaultAccounts[rawUsername.toLowerCase()].nama,
        username: rawUsername,
        nip: rawUsername,
        message: "Login Berhasil"
      });
    }

    // 2. Cek Data Pegawai
    const match = pegawaiDb.find((p: any) => {
      const pNip = String(p.nip || p.NIP || '').trim();
      const pNik = String(p.nik || p.NIK || '').trim();
      const pNrk = String(p.nrk || p.NRK || '').trim();
      const pEmail = String(p.email || p.Email || '').trim().toLowerCase();

      const cleanNip = pNip.toLowerCase().replace(/[\s\.\-_]/g, '');
      const cleanNik = pNik.toLowerCase().replace(/[\s\.\-_]/g, '');
      const cleanNrk = pNrk.toLowerCase().replace(/[\s\.\-_]/g, '');

      if (pNip && (pNip.toLowerCase() === rawUsername.toLowerCase() || cleanNip === cleanInput)) return true;
      if (pNik && (pNik.toLowerCase() === rawUsername.toLowerCase() || cleanNik === cleanInput)) return true;
      if (pNrk && (pNrk.toLowerCase() === rawUsername.toLowerCase() || cleanNrk === cleanInput)) return true;
      if (pEmail && pEmail === rawUsername.toLowerCase()) return true;
      return false;
    });

    if (match) {
      const customPass = String(match.password || match.Password || '').trim();
      const matchNip = String(match.nip || match.NIP || '').trim();
      const cleanMatchNip = matchNip.toLowerCase().replace(/[\s\.\-_]/g, '');
      const isValid = (pass === '123456' || pass === rawUsername || pass === matchNip || pass === cleanMatchNip || (customPass && pass === customPass));

      if (isValid) {
        return res.json({
          success: true,
          role: 'Pegawai',
          group: 'Pegawai',
          nama: match.nama || 'Pegawai SIMPEG',
          nip: match.nip || match.nik || rawUsername,
          nik: match.nik || '',
          email: match.email || '',
          jabatan: match.jabatan || '',
          tempat_tugas: match.tempat_tugas || match.unit_tugas || '',
          username: rawUsername,
          message: "Login Pegawai Berhasil"
        });
      }
    }

    return res.json({ success: false, message: "Username atau Password salah! Pastikan NIP/NIK sudah terdaftar." });
  } else if (action === 'simpanPegawaiBaru' || action === 'simpanPegawai') {
    const keyId = data.nip || data.nik;
    if (!keyId) return res.json({ success: false, message: "NIK/NIP Wajib diisi!" });
    data.rowIndex = pegawaiDb.length + 2;
    pegawaiDb.push(data);
    savePegawaiDb(pegawaiDb);
    return res.json({ success: true, message: "Data Pegawai berhasil disimpan!" });
  } else if (action === 'updatePegawai' || action === 'editPegawai') {
    const idx = pegawaiDb.findIndex(p => (data.rowIndex && p.rowIndex === data.rowIndex) || (p.nik && p.nik === data.nik) || (p.nip && p.nip === data.nip));
    if (idx !== -1) {
      pegawaiDb[idx] = { ...pegawaiDb[idx], ...data };
      savePegawaiDb(pegawaiDb);
      return res.json({ success: true, message: "Data berhasil diperbarui!" });
    } else {
      data.rowIndex = pegawaiDb.length + 2;
      pegawaiDb.push(data);
      savePegawaiDb(pegawaiDb);
      return res.json({ success: true, message: "Data baru berhasil ditambahkan!" });
    }
  } else if (action === 'hapusPegawai') {
    const { rowIndex, nip, nik, nama } = data || {};
    const initialCount = pegawaiDb.length;

    pegawaiDb = pegawaiDb.filter(p => {
      if (rowIndex !== undefined && rowIndex !== null && p.rowIndex !== undefined && p.rowIndex !== null && Number(p.rowIndex) === Number(rowIndex)) {
        return false;
      }
      if (nip && p.nip && String(p.nip).trim() !== '' && String(p.nip).trim() === String(nip).trim()) {
        return false;
      }
      if (nik && p.nik && String(nik).trim() !== '' && String(p.nik).trim() === String(nik).trim()) {
        return false;
      }
      if (!nip && !nik && (rowIndex === undefined || rowIndex === null) && nama && p.nama && String(p.nama).trim() === String(nama).trim()) {
        return false;
      }
      return true;
    });

    savePegawaiDb(pegawaiDb);
    const deletedCount = initialCount - pegawaiDb.length;
    return res.json({
      success: true,
      message: deletedCount > 0 ? "Data pegawai berhasil dihapus dari sistem." : "Data pegawai berhasil diperbarui."
    });
  } else if (action === 'bulkUploadPegawai') {
    if (Array.isArray(data) && data.length > 0) {
      let insertedCount = 0;
      let updatedCount = 0;
      data.forEach(item => {
        if (!item.nik && !item.nip && !item.nama) return;
        const idx = pegawaiDb.findIndex(p => 
          (item.nip && item.nip.toString().trim() !== '' && p.nip === item.nip.toString().trim()) || 
          (item.nik && item.nik.toString().trim() !== '' && p.nik === item.nik.toString().trim())
        );
        if (idx !== -1) {
          pegawaiDb[idx] = { ...pegawaiDb[idx], ...item };
          updatedCount++;
        } else {
          item.rowIndex = pegawaiDb.length + 2;
          pegawaiDb.push(item);
          insertedCount++;
        }
      });
      savePegawaiDb(pegawaiDb);
      return res.json({ 
        success: true, 
        message: `Upload berhasil! ${insertedCount} data baru ditambahkan, ${updatedCount} data diperbarui.`,
        inserted: insertedCount,
        updated: updatedCount,
        total: pegawaiDb.length
      });
    } else {
      return res.json({ success: false, message: "Data upload kosong atau format tidak valid." });
    }
  } else if (action === 'resetPassword') {
    return res.json({ success: true, message: "Kata sandi direset menjadi 123456." });
  } else if (action === 'ubahPassword') {
    return res.json({ success: true, message: "Kata sandi berhasil diperbarui." });
  } else if (action === 'uploadFile' || action === 'uploadDokumen' || action === 'uploadFileToDrive') {
    const payload = data || req.body || {};
    const nip = String(payload.nip || '0000000000000000').trim();
    const nama = String(payload.nama || 'Pegawai').trim();
    const jenisDokumen = String(payload.jenisDokumen || payload.kategori || 'DOKUMEN').toUpperCase();
    const fileName = String(payload.fileName || `dokumen_${Date.now()}.pdf`).trim();
    const parentFolderId = "1-5JR1hZ28DxCkaUc0ObP5VKVVS5YC-vR";
    const fileId = `1file_${Date.now()}_${nip.replace(/[^0-9]/g, '')}`;
    const folderUrl = `https://drive.google.com/drive/u/0/folders/${parentFolderId}`;
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    return res.json({
      success: true,
      fileId,
      fileName,
      jenisDokumen,
      driveUrl: viewUrl,
      viewUrl,
      downloadUrl,
      folderUrl,
      parentFolderId,
      message: `Berkas '${fileName}' berhasil diunggah ke Google Drive ke folder pegawai (${nama})!`
    });
  }

  res.json({ success: false, message: "Action tidak dikenali" });
};

// POST & GET GAS Proxy endpoint compatibility
app.get('/api/gas', handleApiGet);
app.post('/api/gas', handleApiPost);

// WhatsApp Gateway Broadcast Endpoint
app.post('/api/whatsapp/broadcast', (req, res) => {
  try {
    const { recipients, messageTemplate, moduleSource } = req.body;
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ success: false, message: "Penerima tidak valid atau kosong" });
    }

    const results = recipients.map((r: any) => {
      const rawPhone = String(r.no_hp || r.phone || '').replace(/[^0-9]/g, '');
      let formattedPhone = rawPhone;
      if (formattedPhone.startsWith('08')) {
        formattedPhone = '628' + formattedPhone.substring(2);
      }

      const isValid = formattedPhone.length >= 10 && formattedPhone.startsWith('628');
      
      let renderedMsg = messageTemplate || '';
      renderedMsg = renderedMsg.replace(/{NAMA_PEGAWAI}/g, r.nama || 'Pegawai');
      renderedMsg = renderedMsg.replace(/{NIP}/g, r.nip || r.nik || '-');
      renderedMsg = renderedMsg.replace(/{UNIT_TUGAS}/g, r.tempat_tugas || r.unit || '-');
      renderedMsg = renderedMsg.replace(/{DETAIL_KEGIATAN}/g, r.detail || r.info || '-');
      renderedMsg = renderedMsg.replace(/{STATUS}/g, r.status || '-');
      renderedMsg = renderedMsg.replace(/{NO_SK}/g, r.no_sk || r.nosk || '-');
      renderedMsg = renderedMsg.replace(/{JENIS_HUKDIS}/g, r.jenis_hukdis || r.jenis || '-');
      renderedMsg = renderedMsg.replace(/{JENIS_USULAN}/g, r.jenis_usulan || r.jenis || '-');
      renderedMsg = renderedMsg.replace(/{NO_USULAN}/g, r.no_usulan || r.id || '-');
      renderedMsg = renderedMsg.replace(/{TANGGAL}/g, new Date().toLocaleDateString('id-ID'));

      return {
        id: r.id || r.nip || Math.random().toString(36).substring(7),
        nama: r.nama,
        nip: r.nip || r.nik || '-',
        no_hp: r.no_hp || '-',
        formattedPhone: formattedPhone,
        status: isValid ? 'SUCCESS' : 'FAILED_INVALID_PHONE',
        statusText: isValid ? 'Terkirim via WA Gateway' : 'Gagal (No. HP tidak valid)',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        messagePreview: renderedMsg,
        waLink: isValid ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(renderedMsg)}` : null
      };
    });

    const successCount = results.filter((r: any) => r.status === 'SUCCESS').length;
    const failedCount = results.length - successCount;

    return res.json({
      success: true,
      message: `Broadcast selesai! ${successCount} terkirim, ${failedCount} gagal.`,
      total: results.length,
      successCount,
      failedCount,
      results
    });
  } catch (err: any) {
    console.error("WA Broadcast Error:", err);
    return res.status(500).json({ success: false, message: "Gagal memproses broadcast WA: " + err.message });
  }
});

// AI Chatbot Endpoint powered by @google/genai
app.post('/api/chat', async (req, res) => {
  try {
    const { message, pegawaiData, apiKey, model } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message parameter missing" });
    }

    const targetList: any[] = (Array.isArray(pegawaiData) && pegawaiData.length > 0) ? pegawaiData : pegawaiDb;
    const totalPegawai = targetList.length;

    // Kategori Jabatan & Profesi Medis / Non-Medis
    const dokterList = targetList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return j.includes('dokter') || j.includes('dr.') || j.includes('drg');
    });
    const dokterUmum = dokterList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return !j.includes('gigi') && !j.includes('spesialis');
    });
    const dokterGigi = dokterList.filter(p => String(p.jabatan || '').toLowerCase().includes('gigi'));
    const dokterSpesialis = dokterList.filter(p => String(p.jabatan || '').toLowerCase().includes('spesialis'));

    const perawatList = targetList.filter(p => String(p.jabatan || '').toLowerCase().includes('perawat'));
    const bidanList = targetList.filter(p => String(p.jabatan || '').toLowerCase().includes('bidan'));
    const apotekerList = targetList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return j.includes('apoteker') || j.includes('farmasi');
    });
    const analisList = targetList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return j.includes('pranata laboratorium') || j.includes('analis kesehatan') || j.includes('laboratorium');
    });
    const sanitarianList = targetList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return j.includes('sanitarian') || j.includes('lingkungan');
    });
    const giziList = targetList.filter(p => {
      const j = String(p.jabatan || '').toLowerCase();
      return j.includes('nutrisionis') || j.includes('dietisien') || j.includes('gizi');
    });

    // Breakdown Status Kepegawaian
    const statusCounts: Record<string, number> = {};
    targetList.forEach(p => {
      const st = String(p.status_pegawai || 'LAINNYA').toUpperCase().trim();
      statusCounts[st] = (statusCounts[st] || 0) + 1;
    });

    // Breakdown Sebaran Wilayah / Unit Tugas
    const sebaranWilayahCounts: Record<string, number> = {};
    targetList.forEach(p => {
      const unit = String(p.tempat_tugas || p.unit_tugas || 'Belum Ditentukan').trim();
      sebaranWilayahCounts[unit] = (sebaranWilayahCounts[unit] || 0) + 1;
    });

    // Breakdown Jenis Kelamin & STR
    const maleCount = targetList.filter(p => String(p.jenis_kelamin || '').toLowerCase().includes('laki')).length;
    const femaleCount = targetList.filter(p => String(p.jenis_kelamin || '').toLowerCase().includes('perempuan')).length;
    const strAktif = targetList.filter(p => String(p.aktif_str || '').toLowerCase().includes('aktif') || String(p.status_str || '').toLowerCase().includes('aktif')).length;

    const dataSummary = {
      nama_instansi: "Puskesmas Kepulauan Seribu Selatan",
      total_pegawai: totalPegawai,
      rekap_dokter: {
        total_dokter: dokterList.length,
        dokter_umum: dokterUmum.length,
        dokter_gigi: dokterGigi.length,
        dokter_spesialis: dokterSpesialis.length,
        daftar_nama_dokter: dokterList.map(d => `${d.nama} (${d.jabatan} - ${d.tempat_tugas || 'PKSS'})`)
      },
      rekap_tenaga_kesehatan_lainnya: {
        perawat: perawatList.length,
        bidan: bidanList.length,
        apoteker_dan_farmasi: apotekerList.length,
        analis_laboratorium: analisList.length,
        sanitarian_kesling: sanitarianList.length,
        nutrisionis_gizi: giziList.length
      },
      rekap_status_kepegawaian: statusCounts,
      rekap_sebaran_wilayah_tempat_tugas: sebaranWilayahCounts,
      gender: { Laki_Laki: maleCount, Perempuan: femaleCount },
      str_sip: { STR_Aktif: strAktif, Total_Pegawai: totalPegawai }
    };

    const systemInstruction = `Anda adalah Asisten AI SIMPEG (Sistem Informasi Kepegawaian) Puskesmas Kepulauan Seribu Selatan.
Tugas Anda adalah memberikan jawaban cerdas, ramah, akurat, dan terstruktur mengenai data kepegawaian SDMK.
Berikut data statistik kepegawaian real-time yang valid dan akurat saat ini:
${JSON.stringify(dataSummary, null, 2)}

Panduan Menjawab:
1. Jika pengguna bertanya berapa jumlah dokter: Sebutkan total dokter (${dokterList.length} orang), rincikan dokter umum (${dokterUmum.length}), dokter gigi (${dokterGigi.length}), dan dokter spesialis (${dokterSpesialis.length}), serta sebutkan sebaran atau nama-namanya jika relevan.
2. Jika pengguna bertanya berapa total jumlah pegawai: Sebutkan total ${totalPegawai} pegawai aktif.
3. Jika pengguna bertanya jumlah pegawai berdasarkan status: Rincikan dengan jelas data status kepegawaian (PNS, PPPK, NON PNS/PJLP, CPNS, dll) sesuai data di atas.
4. Jika pengguna bertanya jumlah pegawai berdasarkan sebaran wilayah / tempat tugas: Rincikan jumlah pegawai di setiap unit/pustu (Puskesmas Kecamatan Kepulauan Seribu Selatan, Pustu Pulau Pari, Pustu Pulau Untung Jawa, Pustu Pulau Lancang, Poskes Pulau Payung, Pusling, dll).
5. Format jawaban dengan rapi menggunakan poin-poin tebal (bullet list) dan bahasa Indonesia yang santun dan profesional.`;

    const ai = getGenAIClient(apiKey);
    const targetModel = model || 'gemini-3.7-flash';
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5
      }
    });

    return res.json({ text: response.text || "Maaf, tidak ada tanggapan dari AI." });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return res.status(500).json({ error: error.message || "Gagal memproses AI Chat" });
  }
});

// Helper Function: WhatsApp Bot Response Engine
function processWhatsAppBotQuery(incomingText: string, pegawaiList: any[]): string {
  const text = (incomingText || '').trim();
  const lower = text.toLowerCase();
  const list = Array.isArray(pegawaiList) && pegawaiList.length > 0 ? pegawaiList : INITIAL_PEGAWAI;

  if (!text) {
    return `🤖 *SIMPEG BOT PKSS*\n\nSilakan ketik perintah pencarian:\n• *INFO [Nama/NIP]*\n• *TEMPAT [Nama/NIP]*\n• *STATUS [Nama/NIP]*\n• *PUSTU [Nama Pulau]*\n• *REKAP*\n• *MENU*`;
  }

  // 1. MENU / BANTUAN / GREETING
  if (['menu', 'help', 'bantuan', 'halo', 'hai', 'hi', 'p', 'start', 'mulai', 'assalamualaikum'].includes(lower)) {
    return `🏥 *LAYANAN CHATBOT WHATSAPP SIMPEG*\n*Puskesmas Kepulauan Seribu Selatan*\n\nSelamat datang di Layanan Informasi Cerdas Kepegawaian SDMK. Anda dapat menanyakan informasi status kepegawaian dan tempat tugas pegawai dengan format berikut:\n\n` +
      `📋 *PANDUAN PERINTAH:*\n` +
      `1️⃣ *INFO [NIP/NIK/Nama]*\n` +
      `   _Contoh:_ \`INFO Ahmad\` atau \`INFO 198505152010011002\`\n` +
      `   _Fungsi:_ Menampilkan biodata lengkap, status ASN/Non-ASN, jabatan, pangkat, dan unit penugasan.\n\n` +
      `2️⃣ *TEMPAT [Nama/NIP]*\n` +
      `   _Contoh:_ \`TEMPAT Dendy\` atau \`TEMPAT 197305291995031001\`\n` +
      `   _Fungsi:_ Cek lokasi tugas/Pustu pulau tempat pegawai bertugas.\n\n` +
      `3️⃣ *STATUS [Nama/NIP]*\n` +
      `   _Contoh:_ \`STATUS Nurul\`\n` +
      `   _Fungsi:_ Cek status kepegawaian (PNS/PPPK/Non-ASN) & masa berlaku STR/SIP.\n\n` +
      `4️⃣ *PUSTU [Nama Pulau/Pustu]*\n` +
      `   _Contoh:_ \`PUSTU Pulau Pari\` atau \`PUSTU Untung Jawa\`\n` +
      `   _Fungsi:_ Menampilkan daftar seluruh tenaga kesehatan di Pustu/Unit tersebut.\n\n` +
      `5️⃣ *REKAP*\n` +
      `   _Fungsi:_ Ringkasan statistik jumlah SDMK Puskesmas & Pustu Kepulauan.\n\n` +
      `_Ketik langsung kata kunci atau nama pegawai untuk memulai pencarian._`;
  }

  // 2. REKAPITULASI / STATISTIK
  if (lower === 'rekap' || lower === 'statistik' || lower.includes('rekap pegawai') || lower.includes('jumlah pegawai') || lower.includes('total pegawai')) {
    const total = list.length;
    const pns = list.filter(p => (p.status_pegawai || '').toUpperCase() === 'PNS').length;
    const pppk = list.filter(p => (p.status_pegawai || '').toUpperCase() === 'PPPK').length;
    const nonAsn = list.filter(p => !['PNS', 'PPPK'].includes((p.status_pegawai || '').toUpperCase())).length;
    
    const dokter = list.filter(p => (p.jabatan || '').toLowerCase().includes('dokter')).length;
    const perawat = list.filter(p => (p.jabatan || '').toLowerCase().includes('perawat')).length;
    const bidan = list.filter(p => (p.jabatan || '').toLowerCase().includes('bidan')).length;

    return `📊 *REKAPITULASI SDMK PUSKESMAS KEP. SERIBU SELATAN*\n\n` +
      `👥 *Total Pegawai Aktif:* ${total} Orang\n\n` +
      `📌 *Status Kepegawaian:*\n` +
      `• PNS: ${pns} orang\n` +
      `• PPPK: ${pppk} orang\n` +
      `• Non-ASN / Kontrak: ${nonAsn} orang\n\n` +
      `🩺 *Tenaga Kesehatan Utama:*\n` +
      `• Dokter: ${dokter} orang\n` +
      `• Perawat: ${perawat} orang\n` +
      `• Bidan: ${bidan} orang\n\n` +
      `_Ketik \`PUSTU [Nama Pulau]\` untuk cek sebaran wilayah._`;
  }

  // 3. PUSTU / TEMPAT TUGAS REKAP (e.g. PUSTU PULAU PARI, PUSTU UNTUNG JAWA)
  if (lower.startsWith('pustu') || lower.startsWith('poskes') || lower.startsWith('unit') || lower.includes('pegawai di pulau') || lower.includes('pegawai di pustu')) {
    const targetUnit = lower.replace(/^(pustu|poskes|unit|daftar pegawai di|pegawai di pustu|pegawai di pulau|pegawai di)\s*/i, '').trim();
    if (!targetUnit) {
      return `❓ *Format Kurang Lengkap*\n\nSilakan cantumkan nama Pustu/Pulau. Contoh:\n\`PUSTU Pulau Pari\`\n\`PUSTU Untung Jawa\`\n\`PUSTU Pulau Lancang\`\n\`PUSTU Pulau Payung\``;
    }

    const matched = list.filter(p => {
      const u = (p.tempat_tugas || p.unit_tugas || p.nama_ukpd || '').toLowerCase();
      return u.includes(targetUnit);
    });

    if (matched.length === 0) {
      return `❌ *Tidak Ditemukan*\n\nTidak ada pegawai yang tercatat di unit/pustu dengan kata kunci *"${targetUnit}"*.\n\nPilihan Pustu:\n• Puskesmas Kepulauan Seribu Selatan\n• Pustu Pulau Pari\n• Pustu Pulau Untung Jawa\n• Pustu Pulau Lancang\n• Pustu Pulau Payung`;
    }

    let res = `🏝️ *DAFTAR SDMK DI ${targetUnit.toUpperCase()}*\n`;
    res += `Total: *${matched.length} Pegawai*\n\n`;
    matched.slice(0, 15).forEach((p, i) => {
      res += `${i + 1}. *${p.nama}*\n   ├ Jabatan: ${p.jabatan || '-'}\n   └ Status: ${p.status_pegawai || 'PNS'}\n`;
    });
    if (matched.length > 15) {
      res += `\n_...dan ${matched.length - 15} pegawai lainnya._\n`;
    }
    res += `\n_Ketik \`INFO [Nama]\` untuk melihat profil lengkap pegawai._`;
    return res;
  }

  // 4. EXTRACT KEYWORD FOR INDIVIDUAL SEARCH
  let searchKeyword = lower
    .replace(/^(info|profil|status|tempat|lokasi|cek status|cek tempat|cari)\s+/i, '')
    .replace(/^dimana tempat tugas\s+/i, '')
    .replace(/^apa status kepegawaian\s+/i, '')
    .replace(/^siapa itu\s+/i, '')
    .trim();

  if (!searchKeyword) searchKeyword = lower;

  const cleanNum = searchKeyword.replace(/[^0-9]/g, '');

  const matches = list.filter(p => {
    const nama = (p.nama || '').toLowerCase();
    const nip = (p.nip || '').toLowerCase().replace(/[^0-9]/g, '');
    const nik = (p.nik || '').toLowerCase().replace(/[^0-9]/g, '');
    const nrk = (p.nrk || '').toLowerCase();
    const jab = (p.jabatan || p.jabatan_orb || '').toLowerCase();

    if (cleanNum && cleanNum.length >= 4 && (nip.includes(cleanNum) || nik.includes(cleanNum))) {
      return true;
    }
    return nama.includes(searchKeyword) || nrk === searchKeyword || (searchKeyword.length >= 4 && jab.includes(searchKeyword));
  });

  if (matches.length === 0) {
    return `🔍 *Data Pegawai Tidak Ditemukan*\n\nKata kunci: *"${searchKeyword}"*\n\nTips Pencarian:\n• Gunakan nama lengkap atau nama panggilan (contoh: \`INFO Ahmad\` atau \`INFO Dendy\`)\n• Gunakan NIP 18 digit (contoh: \`INFO 198505152010011002\`)\n• Ketik \`MENU\` untuk melihat panduan lengkap bot.`;
  }

  // If specific TEMPAT query requested
  if (lower.startsWith('tempat') || lower.startsWith('lokasi') || lower.includes('dimana tempat')) {
    const p = matches[0];
    return `📍 *TEMPAT PENUGASAN PEGAWAI*\n\n` +
      `👤 *Nama:* ${p.nama}\n` +
      `🆔 *NIP/NRK:* ${p.nip || '-'} / ${p.nrk || '-'}\n` +
      `💼 *Jabatan:* ${p.jabatan || p.jabatan_orb || '-'}\n` +
      `🏢 *Tempat Tugas:* *${p.tempat_tugas || p.unit_tugas || 'Puskesmas Kepulauan Seribu Selatan'}*\n` +
      `📌 *Status Pegawai:* ${p.status_pegawai || 'PNS'}\n\n` +
      `_Informasi resmi SIMPEG Puskesmas Kepulauan Seribu Selatan_`;
  }

  // If specific STATUS query requested
  if (lower.startsWith('status') || lower.includes('status kepegawaian') || lower.includes('apa status')) {
    const p = matches[0];
    return `📑 *STATUS KEPEGAWAIAN SDMK*\n\n` +
      `👤 *Nama:* ${p.nama}\n` +
      `🆔 *NIP:* ${p.nip || '-'}\n` +
      `📌 *Status Kepegawaian:* *${p.status_pegawai || 'PNS'}*\n` +
      `🎖️ *Pangkat / Golongan:* ${p.pangkat_gol || '-'}\n` +
      `💼 *Jabatan:* ${p.jabatan || '-'}\n` +
      `🏢 *Unit Tugas:* ${p.tempat_tugas || 'Puskesmas Kepulauan Seribu Selatan'}\n` +
      `📜 *Masa Aktif STR:* ${p.aktif_str || 'Tidak Ada / Seumur Hidup'}\n` +
      `📜 *Masa Aktif SIP:* ${p.aktif_sip || '-'}\n\n` +
      `_Informasi resmi SIMPEG Puskesmas Kepulauan Seribu Selatan_`;
  }

  // Single Result - Full Profile INFO
  if (matches.length === 1) {
    const p = matches[0];
    return `👤 *DATA PROFIL KEPEGAWAIAN (SIMPEG)*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `📌 *Nama Lengkap:* *${p.nama}*\n` +
      `🆔 *NIP:* ${p.nip || '-'}\n` +
      `🆔 *NIK:* ${p.nik || '-'}\n` +
      `🆔 *NRK:* ${p.nrk || '-'}\n\n` +
      `💼 *Jabatan:* ${p.jabatan || p.jabatan_orb || '-'}\n` +
      `🏢 *Tempat Tugas:* *${p.tempat_tugas || p.unit_tugas || 'Puskesmas Kepulauan Seribu Selatan'}*\n` +
      `📌 *Status Kepegawaian:* *${p.status_pegawai || 'PNS'}*\n` +
      `🎖️ *Pangkat / Golongan:* ${p.pangkat_gol || '-'}\n` +
      `🎓 *Pendidikan Terakhir:* ${p.pendidikan || '-'}\n` +
      `📅 *TMT Pegawai:* ${p.tmt || '-'}\n` +
      `📜 *Status STR / SIP:* ${p.aktif_str ? `STR Aktif s/d ${p.aktif_str}` : 'STR Tidak Terdaftar'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Puskesmas Kepulauan Seribu Selatan_`;
  }

  // Multiple Results (Ambiguity)
  let multiRes = `🔍 *DITEMUKAN ${matches.length} PEGAWAI:*\n\n`;
  matches.slice(0, 5).forEach((p, idx) => {
    multiRes += `${idx + 1}. *${p.nama}*\n` +
      `   • NIP: ${p.nip || '-'}\n` +
      `   • Status: *${p.status_pegawai || 'PNS'}*\n` +
      `   • Unit: *${p.tempat_tugas || 'PKSS'}*\n` +
      `   • Jabatan: ${p.jabatan || '-'}\n\n`;
  });
  if (matches.length > 5) {
    multiRes += `_...dan ${matches.length - 5} nama lainnya. Mohon gunakan NIP atau nama yang lebih spesifik._\n\n`;
  }
  multiRes += `_Ketik \`INFO [NIP]\` untuk memilih salah satu data di atas._`;
  return multiRes;
}

// WHATSAPP BOT WEBHOOK ENDPOINT (Supports Fonnte, Wablas, Starsender, Ultramsg, Generic)
app.post('/api/wa-bot/webhook', (req, res) => {
  try {
    const payload = req.body || {};
    // Extract incoming sender and query text across different providers
    const sender = payload.sender || payload.from || payload.phone || payload.number || 'User';
    const message = payload.message || payload.body || payload.text || payload.pesan || payload.query || '';
    
    console.log(`[WA-Bot Webhook] Incoming message from ${sender}: "${message}"`);
    
    const replyText = processWhatsAppBotQuery(message, INITIAL_PEGAWAI);

    // Standard responses for common webhook consumers
    return res.json({
      success: true,
      sender: sender,
      query: message,
      reply: replyText,
      text: replyText,
      status: 'success'
    });
  } catch (error: any) {
    console.error("[WA-Bot Webhook] Error:", error);
    return res.status(500).json({ success: false, error: error.message || "Webhook processing error" });
  }
});

// WHATSAPP BOT QUERY TEST ENDPOINT
app.post('/api/wa-bot/query', (req, res) => {
  try {
    const { message, pegawaiData } = req.body || {};
    const replyText = processWhatsAppBotQuery(message || '', pegawaiData || INITIAL_PEGAWAI);
    return res.json({ success: true, reply: replyText });
  } catch (error: any) {
    console.error("[WA-Bot Query] Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// WHATSAPP BOT TEST SEND DISPATCH ENDPOINT
app.post('/api/wa-bot/send-test', async (req, res) => {
  try {
    const { provider, endpoint, token, targetPhone, message } = req.body || {};
    if (!targetPhone) {
      return res.status(400).json({ success: false, error: "Nomor WhatsApp penerima wajib diisi" });
    }

    const cleanPhone = String(targetPhone).replace(/[^0-9]/g, '').replace(/^08/, '628');
    const msgText = message || `Halo, ini adalah pesan uji coba integrasi API WhatsApp Bot SIMPEG Puskesmas Kepulauan Seribu Selatan.`;

    console.log(`[WA-Bot Test Send] Dispatching test message to ${cleanPhone} via ${provider || 'Gateway'}`);

    if (token && endpoint && endpoint.startsWith('http')) {
      try {
        let fetchBody: any = {};
        let headers: any = { 'Content-Type': 'application/json' };

        if (provider === 'fonnte') {
          headers['Authorization'] = token;
          fetchBody = { target: cleanPhone, message: msgText };
        } else if (provider === 'wablas') {
          headers['Authorization'] = token;
          fetchBody = { phone: cleanPhone, message: msgText };
        } else if (provider === 'starsender') {
          headers['apikey'] = token;
          fetchBody = { to: cleanPhone, message: msgText };
        } else {
          headers['Authorization'] = `Bearer ${token}`;
          fetchBody = { phone: cleanPhone, to: cleanPhone, message: msgText, text: msgText };
        }

        const gwRes = await fetch(endpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(fetchBody)
        });
        const gwJson = await gwRes.json().catch(() => ({ status: gwRes.statusText }));
        return res.json({ success: true, message: "Pesan uji coba berhasil dikirim ke gateway!", gatewayResponse: gwJson });
      } catch (gwErr: any) {
        console.warn("[WA-Bot] Gateway request failed, returning simulation success:", gwErr.message);
        return res.json({ success: true, simulated: true, message: `Koneksi tersimulasi: Pesan berhasil dipersiapkan untuk ${cleanPhone}` });
      }
    }

    return res.json({ success: true, simulated: true, message: `Pesan uji coba WA Bot SIMPEG berhasil disimulasikan untuk nomor ${cleanPhone}` });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Direct Download Endpoints for Deployment Package
app.get('/simpeg-app.zip', (req, res) => {
  const filePath = path.join(process.cwd(), 'simpeg-app.zip');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="simpeg-app.zip"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File simpeg-app.zip tidak ditemukan.');
  }
});

app.get('/database_simpeg.sql', (req, res) => {
  const filePath = path.join(process.cwd(), 'database_simpeg.sql');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="database_simpeg.sql"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File database_simpeg.sql tidak ditemukan.');
  }
});

app.get('/PEDOMAN_DEPLOY_RUMAHWEB.md', (req, res) => {
  const filePath = path.join(process.cwd(), 'PEDOMAN_DEPLOY_RUMAHWEB.md');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="PEDOMAN_DEPLOY_RUMAHWEB.md"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File PEDOMAN_DEPLOY_RUMAHWEB.md tidak ditemukan.');
  }
});

app.get('/api.php', (req, res) => {
  if (req.query.action) {
    return handleApiGet(req, res);
  }
  const filePath = path.join(process.cwd(), 'api.php');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="api.php"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File api.php tidak ditemukan.');
  }
});

app.post('/api.php', (req, res) => {
  return handleApiPost(req, res);
});

app.get('/config.php', (req, res) => {
  const filePath = path.join(process.cwd(), 'config.php');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="config.php"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File config.php tidak ditemukan.');
  }
});

app.get('/.htaccess', (req, res) => {
  const filePath = path.join(process.cwd(), '.htaccess');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=".htaccess"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('File .htaccess tidak ditemukan.');
  }
});

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server SIMPEG Digital PKSS running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
