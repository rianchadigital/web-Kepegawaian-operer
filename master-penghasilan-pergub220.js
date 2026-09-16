/**
 * Modul Master Data Penghasilan Pergub 221 Tahun 2016
 * Lampiran I: Standar Gaji Pokok Pegawai Non-PNS Bidang Kesehatan
 * Provinsi DKI Jakarta
 */

(function() {
    // 68 Records Matriks Standar Penghasilan Pergub 221 Tahun 2016
    const DEFAULT_PERGUB_220_DATA = [
        // 1. 0 - 2 TH
        { id: 1, no: 1, masa_kerja: "0-2", status: "K3", sd: 2719298, smp: 3125756, slta: 3593003, d3_d4: 4129567, s1: 4746402, s2_dr_ners: 5454004, s3_spesialis: 6267067, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 2, no: 1, masa_kerja: "0-2", status: "K2", sd: 2642661, smp: 3037664, slta: 3491742, d3_d4: 4013185, s1: 4612645, s2_dr_ners: 5300295, s3_spesialis: 6090444, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 3, no: 1, masa_kerja: "0-2", status: "K1", sd: 2566024, smp: 2949572, slta: 3390482, d3_d4: 3896802, s1: 4478889, s2_dr_ners: 5146586, s3_spesialis: 5913821, keterangan: "Gapok + Nikah" },
        { id: 4, no: 1, masa_kerja: "0-2", status: "K0", sd: 2489387, smp: 2861479, slta: 3289222, d3_d4: 3780420, s1: 4345132, s2_dr_ners: 4992877, s3_spesialis: 5737198, keterangan: "Gapok" },

        // 2. 2 - 4 TH
        { id: 5, no: 2, masa_kerja: "2-4", status: "K3", sd: 2798158, smp: 3216403, slta: 3697200, d3_d4: 4249324, s1: 4884048, s2_dr_ners: 5612170, s3_spesialis: 6448812, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 6, no: 2, masa_kerja: "2-4", status: "K2", sd: 2719298, smp: 3125756, slta: 3593003, d3_d4: 4129567, s1: 4746402, s2_dr_ners: 5454004, s3_spesialis: 6267067, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 7, no: 2, masa_kerja: "2-4", status: "K1", sd: 2640438, smp: 3035110, slta: 3488807, d3_d4: 4009811, s1: 4608757, s2_dr_ners: 5295828, s3_spesialis: 6085308, keterangan: "Gapok + Nikah" },
        { id: 8, no: 2, masa_kerja: "2-4", status: "K0", sd: 2561579, smp: 2944462, slta: 3384609, d3_d4: 3890053, s1: 4471111, s2_dr_ners: 5137661, s3_spesialis: 5903562, keterangan: "Gapok" },

        // 3. 4 - 6 TH
        { id: 9, no: 3, masa_kerja: "4-6", status: "K3", sd: 2879305, smp: 3309679, slta: 3804419, d3_d4: 4372554, s1: 5025685, s2_dr_ners: 5774923, s3_spesialis: 6635828, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 10, no: 3, masa_kerja: "4-6", status: "K2", sd: 2798158, smp: 3216403, slta: 3697200, d3_d4: 4249324, s1: 4884048, s2_dr_ners: 5612170, s3_spesialis: 6448812, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 11, no: 3, masa_kerja: "4-6", status: "K1", sd: 2717011, smp: 3123127, slta: 3589982, d3_d4: 4126094, s1: 4742411, s2_dr_ners: 5449418, s3_spesialis: 6261797, keterangan: "Gapok + Nikah" },
        { id: 12, no: 3, masa_kerja: "4-6", status: "K0", sd: 2635865, smp: 3029851, slta: 3482763, d3_d4: 4002865, s1: 4600774, s2_dr_ners: 5286665, s3_spesialis: 6074781, keterangan: "Gapok" },

        // 4. 6 - 8 TH
        { id: 13, no: 4, masa_kerja: "6-8", status: "K3", sd: 2962805, smp: 3405660, slta: 3914747, d3_d4: 4499358, s1: 5171430, s2_dr_ners: 5942396, s3_spesialis: 6828267, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 14, no: 4, masa_kerja: "6-8", status: "K2", sd: 2879305, smp: 3309679, slta: 3804419, d3_d4: 4372554, s1: 5025685, s2_dr_ners: 5774923, s3_spesialis: 6635828, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 15, no: 4, masa_kerja: "6-8", status: "K1", sd: 2795805, smp: 3213699, slta: 3694091, d3_d4: 4245750, s1: 4879940, s2_dr_ners: 5607450, s3_spesialis: 6443388, keterangan: "Gapok + Nikah" },
        { id: 16, no: 4, masa_kerja: "6-8", status: "K0", sd: 2712305, smp: 3117717, slta: 3583764, d3_d4: 4118945, s1: 4734194, s2_dr_ners: 5439978, s3_spesialis: 6250949, keterangan: "Gapok" },

        // 5. 8 - 10 TH
        { id: 17, no: 5, masa_kerja: "8-10", status: "K3", sd: 3048726, smp: 3504424, slta: 4028275, d3_d4: 4629839, s1: 5321401, s2_dr_ners: 6114725, s3_spesialis: 7026287, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 18, no: 5, masa_kerja: "8-10", status: "K2", sd: 2962805, smp: 3405660, slta: 3914747, d3_d4: 4499358, s1: 5171430, s2_dr_ners: 5942396, s3_spesialis: 6828267, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 19, no: 5, masa_kerja: "8-10", status: "K1", sd: 2876883, smp: 3306896, slta: 3801219, d3_d4: 4368877, s1: 5021459, s2_dr_ners: 5770067, s3_spesialis: 6630247, keterangan: "Gapok + Nikah" },
        { id: 20, no: 5, masa_kerja: "8-10", status: "K0", sd: 2790962, smp: 3208132, slta: 3687691, d3_d4: 4238396, s1: 4871488, s2_dr_ners: 5597738, s3_spesialis: 6432226, keterangan: "Gapok" },

        // 6. 10 - 12 TH
        { id: 21, no: 6, masa_kerja: "10-12", status: "K3", sd: 3137139, smp: 3606052, slta: 4145095, d3_d4: 4764104, s1: 5475722, s2_dr_ners: 6292052, s3_spesialis: 7230049, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 22, no: 6, masa_kerja: "10-12", status: "K2", sd: 3048726, smp: 3504424, slta: 4028275, d3_d4: 4629839, s1: 5321401, s2_dr_ners: 6114725, s3_spesialis: 7026287, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 23, no: 6, masa_kerja: "10-12", status: "K1", sd: 2960313, smp: 3402796, slta: 3911455, d3_d4: 4495574, s1: 5167080, s2_dr_ners: 5937398, s3_spesialis: 6822524, keterangan: "Gapok + Nikah" },
        { id: 24, no: 6, masa_kerja: "10-12", status: "K0", sd: 2871900, smp: 3301168, slta: 3794634, d3_d4: 4361310, s1: 5012759, s2_dr_ners: 5760071, s3_spesialis: 6618762, keterangan: "Gapok" },

        // 7. 12 - 14 TH
        { id: 25, no: 7, masa_kerja: "12-14", status: "K3", sd: 3228116, smp: 3710628, slta: 4265303, d3_d4: 4902263, s1: 5634518, s2_dr_ners: 6474522, s3_spesialis: 7439720, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 26, no: 7, masa_kerja: "12-14", status: "K2", sd: 3137139, smp: 3606052, slta: 4145095, d3_d4: 4764104, s1: 5475722, s2_dr_ners: 6292052, s3_spesialis: 7230049, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 27, no: 7, masa_kerja: "12-14", status: "K1", sd: 3046162, smp: 3501476, slta: 4024886, d3_d4: 4625945, s1: 5316926, s2_dr_ners: 6109581, s3_spesialis: 7020379, keterangan: "Gapok + Nikah" },
        { id: 28, no: 7, masa_kerja: "12-14", status: "K0", sd: 2955185, smp: 3396899, slta: 3904678, d3_d4: 4487786, s1: 5158129, s2_dr_ners: 5927111, s3_spesialis: 6810708, keterangan: "Gapok" },

        // 8. 14 - 16 TH
        { id: 29, no: 8, masa_kerja: "14-16", status: "K3", sd: 3321732, smp: 3818236, slta: 4388996, d3_d4: 5044429, s1: 5797919, s2_dr_ners: 6662283, s3_spesialis: 7655472, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 30, no: 8, masa_kerja: "14-16", status: "K2", sd: 3228116, smp: 3710628, slta: 4265303, d3_d4: 4902263, s1: 5634518, s2_dr_ners: 6474522, s3_spesialis: 7439720, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 31, no: 8, masa_kerja: "14-16", status: "K1", sd: 3134501, smp: 3603020, slta: 4141609, d3_d4: 4760097, s1: 5471117, s2_dr_ners: 6286761, s3_spesialis: 7223968, keterangan: "Gapok + Nikah" },
        { id: 32, no: 8, masa_kerja: "14-16", status: "K0", sd: 3040885, smp: 3495411, slta: 4017915, d3_d4: 4617931, s1: 5307716, s2_dr_ners: 6099000, s3_spesialis: 7008216, keterangan: "Gapok" },

        // 9. 16 - 18 TH
        { id: 33, no: 9, masa_kerja: "16-18", status: "K3", sd: 3418062, smp: 3929000, slta: 4516277, d3_d4: 5190718, s1: 5966058, s2_dr_ners: 6855489, s3_spesialis: 7877481, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 34, no: 9, masa_kerja: "16-18", status: "K2", sd: 3321732, smp: 3818236, slta: 4388996, d3_d4: 5044429, s1: 5797919, s2_dr_ners: 6662283, s3_spesialis: 7655472, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 35, no: 9, masa_kerja: "16-18", status: "K1", sd: 3225402, smp: 3707472, slta: 4261715, d3_d4: 4898139, s1: 5629779, s2_dr_ners: 6469077, s3_spesialis: 7433463, keterangan: "Gapok + Nikah" },
        { id: 36, no: 9, masa_kerja: "16-18", status: "K0", sd: 3129073, smp: 3596708, slta: 4134434, d3_d4: 4751850, s1: 5461640, s2_dr_ners: 6275871, s3_spesialis: 7211454, keterangan: "Gapok" },

        // 10. 18 - 20 TH
        { id: 37, no: 10, masa_kerja: "18-20", status: "K3", sd: 3517186, smp: 4042941, slta: 4647249, d3_d4: 5341248, s1: 6139074, s2_dr_ners: 7054298, s3_spesialis: 8105928, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 38, no: 10, masa_kerja: "18-20", status: "K2", sd: 3418062, smp: 3929000, slta: 4516277, d3_d4: 5190718, s1: 5966058, s2_dr_ners: 6855489, s3_spesialis: 7877481, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 39, no: 10, masa_kerja: "18-20", status: "K1", sd: 3318938, smp: 3815059, slta: 4385304, d3_d4: 5040187, s1: 5793042, s2_dr_ners: 6656680, s3_spesialis: 7649034, keterangan: "Gapok + Nikah" },
        { id: 40, no: 10, masa_kerja: "18-20", status: "K0", sd: 3219814, smp: 3701118, slta: 4254332, d3_d4: 4889657, s1: 5620027, s2_dr_ners: 6457871, s3_spesialis: 7420587, keterangan: "Gapok" },

        // 11. 20 - 22 TH
        { id: 41, no: 11, masa_kerja: "20-22", status: "K3", sd: 3619184, smp: 4160187, slta: 4782020, d3_d4: 5496144, s1: 6317107, s2_dr_ners: 7258873, s3_spesialis: 8340999, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 42, no: 11, masa_kerja: "20-22", status: "K2", sd: 3517186, smp: 4042941, slta: 4647249, d3_d4: 5341248, s1: 6139074, s2_dr_ners: 7054298, s3_spesialis: 8105928, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 43, no: 11, masa_kerja: "20-22", status: "K1", sd: 3415188, smp: 3925696, slta: 4512477, d3_d4: 5186352, s1: 5961042, s2_dr_ners: 6849722, s3_spesialis: 7870857, keterangan: "Gapok + Nikah" },
        { id: 44, no: 11, masa_kerja: "20-22", status: "K0", sd: 3313190, smp: 3808450, slta: 4377706, d3_d4: 5031455, s1: 5783009, s2_dr_ners: 6645147, s3_spesialis: 7635786, keterangan: "Gapok" },

        // 12. 22 - 24 TH
        { id: 45, no: 12, masa_kerja: "22-24", status: "K3", sd: 3724141, smp: 4280832, slta: 4920698, d3_d4: 5655533, s1: 6500303, s2_dr_ners: 7469380, s3_spesialis: 8582889, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 46, no: 12, masa_kerja: "22-24", status: "K2", sd: 3619184, smp: 4160187, slta: 4782020, d3_d4: 5496144, s1: 6317107, s2_dr_ners: 7258873, s3_spesialis: 8340999, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 47, no: 12, masa_kerja: "22-24", status: "K1", sd: 3514228, smp: 4039542, slta: 4643342, d3_d4: 5336755, s1: 6133912, s2_dr_ners: 7048366, s3_spesialis: 8099108, keterangan: "Gapok + Nikah" },
        { id: 48, no: 12, masa_kerja: "22-24", status: "K0", sd: 3409271, smp: 3918896, slta: 4504664, d3_d4: 5177367, s1: 5950716, s2_dr_ners: 6837859, s3_spesialis: 7857218, keterangan: "Gapok" },

        // 13. 24 - 26 TH
        { id: 49, no: 13, masa_kerja: "24-26", status: "K3", sd: 3832141, smp: 4404976, slta: 5063398, d3_d4: 5819543, s1: 6688812, s2_dr_ners: 7685992, s3_spesialis: 8831792, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 50, no: 13, masa_kerja: "24-26", status: "K2", sd: 3724141, smp: 4280832, slta: 4920698, d3_d4: 5655533, s1: 6500303, s2_dr_ners: 7469380, s3_spesialis: 8582889, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 51, no: 13, masa_kerja: "24-26", status: "K1", sd: 3616142, smp: 4156688, slta: 4777998, d3_d4: 5491523, s1: 6311794, s2_dr_ners: 7252768, s3_spesialis: 8333987, keterangan: "Gapok + Nikah" },
        { id: 52, no: 13, masa_kerja: "24-26", status: "K0", sd: 3508142, smp: 4032545, slta: 4635297, d3_d4: 5327513, s1: 6123284, s2_dr_ners: 7036156, s3_spesialis: 8085084, keterangan: "Gapok" },

        // 14. 26 - 28 TH
        { id: 53, no: 14, masa_kerja: "26-28", status: "K3", sd: 3943273, smp: 4532721, slta: 5210237, d3_d4: 5988310, s1: 6882788, s2_dr_ners: 7908886, s3_spesialis: 9087914, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 54, no: 14, masa_kerja: "26-28", status: "K2", sd: 3832141, smp: 4404976, slta: 5063398, d3_d4: 5819543, s1: 6688812, s2_dr_ners: 7685992, s3_spesialis: 8831792, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 55, no: 14, masa_kerja: "26-28", status: "K1", sd: 3721010, smp: 4277231, slta: 4916559, d3_d4: 5650776, s1: 6494835, s2_dr_ners: 7463098, s3_spesialis: 8575671, keterangan: "Gapok + Nikah" },
        { id: 56, no: 14, masa_kerja: "26-28", status: "K0", sd: 3609878, smp: 4149486, slta: 4769721, d3_d4: 5482008, s1: 6300858, s2_dr_ners: 7240204, s3_spesialis: 8319549, keterangan: "Gapok" },

        // 15. 28 - 30 TH
        { id: 57, no: 15, masa_kerja: "28-30", status: "K3", sd: 4057628, smp: 4664169, slta: 5361334, d3_d4: 6161971, s1: 7082388, s2_dr_ners: 8138244, s3_spesialis: 9351464, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 58, no: 15, masa_kerja: "28-30", status: "K2", sd: 3943273, smp: 4532721, slta: 5210237, d3_d4: 5988310, s1: 6882788, s2_dr_ners: 7908886, s3_spesialis: 9087914, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 59, no: 15, masa_kerja: "28-30", status: "K1", sd: 3828918, smp: 4401272, slta: 5059140, d3_d4: 5814649, s1: 6683188, s2_dr_ners: 7679528, s3_spesialis: 8824364, keterangan: "Gapok + Nikah" },
        { id: 60, no: 15, masa_kerja: "28-30", status: "K0", sd: 3714564, smp: 4269824, slta: 4908043, d3_d4: 5640988, s1: 6483589, s2_dr_ners: 7450170, s3_spesialis: 8560814, keterangan: "Gapok" },

        // 16. 30 - 32 TH
        { id: 61, no: 16, masa_kerja: "30-32", status: "K3", sd: 4175299, smp: 4799430, slta: 5516812, d3_d4: 6340668, s1: 7287778, s2_dr_ners: 8374253, s3_spesialis: 9622656, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 62, no: 16, masa_kerja: "30-32", status: "K2", sd: 4057628, smp: 4664169, slta: 5361334, d3_d4: 6161971, s1: 7082388, s2_dr_ners: 8138244, s3_spesialis: 9351464, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 63, no: 16, masa_kerja: "30-32", status: "K1", sd: 3939957, smp: 4528908, slta: 5205856, d3_d4: 5983274, s1: 6876999, s2_dr_ners: 7902235, s3_spesialis: 9080272, keterangan: "Gapok + Nikah" },
        { id: 64, no: 16, masa_kerja: "30-32", status: "K0", sd: 3822286, smp: 4393647, slta: 5050378, d3_d4: 5804577, s1: 6671609, s2_dr_ners: 7666226, s3_spesialis: 8809080, keterangan: "Gapok" },

        // 17. 32 - 34 TH
        { id: 65, no: 17, masa_kerja: "32-34", status: "K3", sd: 4296383, smp: 4938614, slta: 5676800, d3_d4: 6524547, s1: 7499123, s2_dr_ners: 8617106, s3_spesialis: 9901713, keterangan: "Gapok + Nikah + 2 Anak" },
        { id: 66, no: 17, masa_kerja: "32-34", status: "K2", sd: 4175299, smp: 4799430, slta: 5516812, d3_d4: 6340668, s1: 7287778, s2_dr_ners: 8374253, s3_spesialis: 9622656, keterangan: "Gapok + Nikah + 1 Anak" },
        { id: 67, no: 17, masa_kerja: "32-34", status: "K1", sd: 4054215, smp: 4660246, slta: 5356824, d3_d4: 6156789, s1: 7076432, s2_dr_ners: 8131400, s3_spesialis: 9343600, keterangan: "Gapok + Nikah" },
        { id: 68, no: 17, masa_kerja: "32-34", status: "K0", sd: 3933131, smp: 4521063, slta: 5196836, d3_d4: 5972910, s1: 6865087, s2_dr_ners: 7888547, s3_spesialis: 9064544, keterangan: "Gapok" }
    ];

    window.DEFAULT_PERGUB_220_DATA = DEFAULT_PERGUB_220_DATA;

    // Helper Rupiah Formatter
    function formatRupiahVal(num) {
        if (num === null || num === undefined || isNaN(num)) return '-';
        return 'Rp ' + Number(num).toLocaleString('id-ID');
    }

    // Helper Indonesian Terbilang Algorithm
    function angkaTerbilang(nilai) {
        nilai = Math.floor(Math.abs(Number(nilai) || 0));
        const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
        if (nilai < 12) return huruf[nilai];
        if (nilai < 20) return angkaTerbilang(nilai - 10) + " Belas";
        if (nilai < 100) return angkaTerbilang(Math.floor(nilai / 10)) + " Puluh" + (nilai % 10 !== 0 ? " " + huruf[nilai % 10] : "");
        if (nilai < 200) return "Seratus" + (nilai - 100 !== 0 ? " " + angkaTerbilang(nilai - 100) : "");
        if (nilai < 1000) return angkaTerbilang(Math.floor(nilai / 100)) + " Ratus" + (nilai % 100 !== 0 ? " " + angkaTerbilang(nilai % 100) : "");
        if (nilai < 2000) return "Seribu" + (nilai - 1000 !== 0 ? " " + angkaTerbilang(nilai - 1000) : "");
        if (nilai < 1000000) return angkaTerbilang(Math.floor(nilai / 1000)) + " Ribu" + (nilai % 1000 !== 0 ? " " + angkaTerbilang(nilai % 1000) : "");
        if (nilai < 1000000000) return angkaTerbilang(Math.floor(nilai / 1000000)) + " Juta" + (nilai % 1000000 !== 0 ? " " + angkaTerbilang(nilai % 1000000) : "");
        if (nilai < 1000000000000) return angkaTerbilang(Math.floor(nilai / 1000000000)) + " Miliar" + (nilai % 1000000000 !== 0 ? " " + angkaTerbilang(nilai % 1000000000) : "");
        return "";
    }

    window.angkaTerbilangPergub = angkaTerbilang;

    // Inisialisasi Data
    window.initMasterPenghasilanPergub220 = function() {
        const saved = localStorage.getItem('simpeg_master_penghasilan_pergub220');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length === 68) {
                    window.masterPenghasilanPergub220List = parsed;
                    return;
                }
            } catch(e) {
                console.warn("Gagal parse localStorage simpeg_master_penghasilan_pergub220", e);
            }
        }
        window.masterPenghasilanPergub220List = JSON.parse(JSON.stringify(DEFAULT_PERGUB_220_DATA));
        window.saveMasterPenghasilanPergub220();
    };

    // Simpan ke Storage & Sync
    window.saveMasterPenghasilanPergub220 = function() {
        try {
            localStorage.setItem('simpeg_master_penghasilan_pergub220', JSON.stringify(window.masterPenghasilanPergub220List));
            if (typeof window.saveModuleDataToRumahweb === 'function') {
                window.saveModuleDataToRumahweb('saveMasterData', {
                    penghasilan_pergub220: window.masterPenghasilanPergub220List
                });
            }
        } catch(e) {
            console.warn("Gagal simpan master penghasilan", e);
        }
    };

    // Reset ke Standar Pergub
    window.resetPenghasilanToDefault = function() {
        if (!confirm("Apakah Anda yakin ingin me-reset seluruh standar nominal ke penetapan asli Pergub 221 Tahun 2016?")) {
            return;
        }
        window.masterPenghasilanPergub220List = JSON.parse(JSON.stringify(DEFAULT_PERGUB_220_DATA));
        window.saveMasterPenghasilanPergub220();
        window.renderMasterPenghasilan();
        window.calculateSimulasiGajiPergub();
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Standar Berhasil Direset',
                text: 'Data telah dikembalikan ke tabel ketetapan resmi Pergub 221 Tahun 2016.',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            alert('Standar Penghasilan Pergub 221 Tahun 2016 berhasil dikembalikan ke nilai default!');
        }
    };

    // Filter & Search
    window.filterMasterPenghasilan = function() {
        window.renderMasterPenghasilan();
    };

    // Render Tabel Matriks Master Penghasilan
    window.renderMasterPenghasilan = function() {
        if (!window.masterPenghasilanPergub220List || window.masterPenghasilanPergub220List.length === 0) {
            window.initMasterPenghasilanPergub220();
        }

        const masaFilter = $('#filterPergubMasaKerja').val() || 'all';
        const statusFilter = $('#filterPergubStatus').val() || 'all';
        const eduFilter = $('#filterPergubPendidikan').val() || 'all';
        const searchKeyword = ($('#searchPergubText').val() || '').toLowerCase().trim();

        // Tampilkan/sembunyikan kolom pendidikan jika filter spesifik
        const eduCols = ['sd', 'smp', 'slta', 'd3_d4', 's1', 's2_dr_ners', 's3_spesialis'];
        eduCols.forEach(col => {
            if (eduFilter === 'all' || eduFilter === col) {
                $(`.col-edu-${col}`).show();
            } else {
                $(`.col-edu-${col}`).hide();
            }
        });

        // Filter baris
        let filtered = window.masterPenghasilanPergub220List.filter(item => {
            if (masaFilter !== 'all' && item.masa_kerja !== masaFilter) return false;
            if (statusFilter !== 'all' && item.status !== statusFilter) return false;
            if (searchKeyword) {
                const combined = `${item.masa_kerja} ${item.status} ${item.keterangan} ${item.sd} ${item.smp} ${item.slta} ${item.d3_d4} ${item.s1} ${item.s2_dr_ners} ${item.s3_spesialis}`.toLowerCase();
                if (!combined.includes(searchKeyword)) return false;
            }
            return true;
        });

        $('#totalPergubRowsCount').text(filtered.length);

        const $tbody = $('#tbodyMasterPenghasilan');
        if (filtered.length === 0) {
            $tbody.html(`<tr><td colspan="12" class="text-center py-5 text-muted">
                <i class="fas fa-search fa-2x mb-2 text-secondary opacity-50"></i>
                <div>Tidak ada data standar gaji yang cocok dengan filter yang dipilih.</div>
            </td></tr>`);
            return;
        }

        let html = '';
        let lastNo = null;

        filtered.forEach(row => {
            const isFirstOfGroup = (row.status === 'K3' || row.no !== lastNo);
            lastNo = row.no;

            // Status Badge styling
            let statusBadge = 'badge bg-secondary';
            if (row.status === 'K3') statusBadge = 'badge bg-primary text-white';
            else if (row.status === 'K2') statusBadge = 'badge bg-info text-dark';
            else if (row.status === 'K1') statusBadge = 'badge bg-warning text-dark';
            else if (row.status === 'K0') statusBadge = 'badge bg-light text-dark border';

            const trClass = row.status === 'K3' ? 'table-light' : '';
            const trId = `pergub-row-${row.masa_kerja}-${row.status}`;

            html += `<tr id="${trId}" class="${trClass}" style="transition: background-color 0.3s ease;">
                <td class="text-center fw-bold text-muted">${row.no}</td>
                <td class="text-center fw-bold text-dark font-monospace">${row.masa_kerja} Th</td>
                <td class="text-center"><span class="${statusBadge} px-2 py-1">${row.status}</span></td>
                <td class="text-end font-monospace col-edu-sd fw-semibold text-dark">${formatRupiahVal(row.sd)}</td>
                <td class="text-end font-monospace col-edu-smp fw-semibold text-dark">${formatRupiahVal(row.smp)}</td>
                <td class="text-end font-monospace col-edu-slta fw-semibold text-dark">${formatRupiahVal(row.slta)}</td>
                <td class="text-end font-monospace col-edu-d3_d4 fw-semibold text-dark">${formatRupiahVal(row.d3_d4)}</td>
                <td class="text-end font-monospace col-edu-s1 fw-bold text-primary">${formatRupiahVal(row.s1)}</td>
                <td class="text-end font-monospace col-edu-s2_dr_ners fw-semibold text-dark">${formatRupiahVal(row.s2_dr_ners)}</td>
                <td class="text-end font-monospace col-edu-s3_spesialis fw-semibold text-dark">${formatRupiahVal(row.s3_spesialis)}</td>
                <td class="text-secondary small">${row.keterangan || '-'}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-xs btn-outline-primary rounded-2 px-2 py-1" title="Ubah Standar" onclick="window.openEditPergubModal(${row.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>`;
        });

        $tbody.html(html);

        // Apply column filter to newly rendered cells
        eduCols.forEach(col => {
            if (eduFilter !== 'all' && eduFilter !== col) {
                $(`.col-edu-${col}`).hide();
            }
        });
    };

    // Buka Modal Edit Row
    window.openEditPergubModal = function(rowId) {
        const item = (window.masterPenghasilanPergub220List || []).find(x => x.id === rowId);
        if (!item) return;

        $('#edit_pergub_id').val(item.id);
        $('#edit_pergub_masa').val(item.masa_kerja + ' Tahun (Kelompok ' + item.no + ')');
        $('#edit_pergub_status').val(item.status);
        $('#edit_pergub_ket').val(item.keterangan || '');

        $('#edit_pergub_sd').val(item.sd || 0);
        $('#edit_pergub_smp').val(item.smp || 0);
        $('#edit_pergub_slta').val(item.slta || 0);
        $('#edit_pergub_d3').val(item.d3_d4 || 0);
        $('#edit_pergub_s1').val(item.s1 || 0);
        $('#edit_pergub_s2').val(item.s2_dr_ners || 0);
        $('#edit_pergub_s3').val(item.s3_spesialis || 0);

        const modalEl = document.getElementById('modalEditPenghasilanPergub');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    // Simpan Edit Row
    window.saveEditPergubRow = function() {
        const id = parseInt($('#edit_pergub_id').val());
        const item = (window.masterPenghasilanPergub220List || []).find(x => x.id === id);
        if (!item) return;

        item.keterangan = $('#edit_pergub_ket').val().trim() || item.keterangan;
        item.sd = Number($('#edit_pergub_sd').val()) || 0;
        item.smp = Number($('#edit_pergub_smp').val()) || 0;
        item.slta = Number($('#edit_pergub_slta').val()) || 0;
        item.d3_d4 = Number($('#edit_pergub_d3').val()) || 0;
        item.s1 = Number($('#edit_pergub_s1').val()) || 0;
        item.s2_dr_ners = Number($('#edit_pergub_s2').val()) || 0;
        item.s3_spesialis = Number($('#edit_pergub_s3').val()) || 0;

        window.saveMasterPenghasilanPergub220();

        const modalEl = document.getElementById('modalEditPenghasilanPergub');
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        window.renderMasterPenghasilan();
        window.calculateSimulasiGajiPergub();

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Data Berhasil Diperbarui',
                text: `Standar gaji masa kerja ${item.masa_kerja} th status ${item.status} tersimpan.`,
                timer: 1800,
                showConfirmButton: false
            });
        }
    };

    // Kalkulator / Simulasi Standar Gaji Pergub
    window.calculateSimulasiGajiPergub = function() {
        if (!window.masterPenghasilanPergub220List || window.masterPenghasilanPergub220List.length === 0) {
            window.initMasterPenghasilanPergub220();
        }

        const pendidikan = $('#simulasiPergubPendidikan').val() || 's1';
        const masaKerja = $('#simulasiPergubMasaKerja').val() || '0-2';
        const status = $('#simulasiPergubStatus').val() || 'K3';

        const found = window.masterPenghasilanPergub220List.find(x => x.masa_kerja === masaKerja && x.status === status);
        if (!found) return;

        const nominal = Number(found[pendidikan] || 0);
        $('#simulasiHasilGaji').text(formatRupiahVal(nominal));
        $('#simulasiHasilKet').text(found.keterangan || status);

        const terbilangStr = angkaTerbilang(nominal);
        $('#simulasiHasilTerbilang').text(terbilangStr ? `"${terbilangStr} Rupiah"` : '');
    };

    // Sorot Baris pada Tabel Matriks
    window.highlightPergubRow = function() {
        const masaKerja = $('#simulasiPergubMasaKerja').val() || '0-2';
        const status = $('#simulasiPergubStatus').val() || 'K3';
        const trId = `pergub-row-${masaKerja}-${status}`;

        // Reset filter jika tersembunyi
        $('#filterPergubMasaKerja').val('all');
        $('#filterPergubStatus').val('all');
        $('#filterPergubPendidikan').val('all');
        $('#searchPergubText').val('');
        window.renderMasterPenghasilan();

        setTimeout(() => {
            const $targetRow = $(`#${trId}`);
            if ($targetRow.length) {
                const container = document.getElementById('table-pergub-scroll-container');
                if (container) {
                    const rowTop = $targetRow.position().top + container.scrollTop - 80;
                    container.scrollTo({ top: rowTop, behavior: 'smooth' });
                }
                $targetRow.css('background-color', '#fef08a'); // soft yellow highlight
                setTimeout(() => {
                    $targetRow.css('background-color', '');
                }, 2500);
            }
        }, 50);
    };

    // Export Excel / CSV
    window.exportPergubExcel = function() {
        if (!window.masterPenghasilanPergub220List || window.masterPenghasilanPergub220List.length === 0) {
            window.initMasterPenghasilanPergub220();
        }

        // Generate CSV with BOM
        let csvContent = "\uFEFFNO,MASA KERJA,STATUS,SD,SMP,SLTA,D3_D4,S1,S2_DR_NERS,S3_SPESIALIS,KETERANGAN\r\n";

        window.masterPenghasilanPergub220List.forEach(r => {
            const rowArr = [
                r.no,
                `"${r.masa_kerja} Th"`,
                `"${r.status}"`,
                r.sd,
                r.smp,
                r.slta,
                r.d3_d4,
                r.s1,
                r.s2_dr_ners,
                r.s3_spesialis,
                `"${r.keterangan || ''}"`
            ];
            csvContent += rowArr.join(',') + "\r\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Standar_Penghasilan_Pergub_221_Tahun_2016.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Cetak Dokumen Pergub Resmi
    window.printPergubDocument = function() {
        if (!window.masterPenghasilanPergub220List || window.masterPenghasilanPergub220List.length === 0) {
            window.initMasterPenghasilanPergub220();
        }

        const data = window.masterPenghasilanPergub220List;

        let tableRowsHtml = '';
        data.forEach(r => {
            tableRowsHtml += `
                <tr style="${r.status === 'K3' ? 'background-color: #f8fafc;' : ''}">
                    <td style="text-align: center; font-weight: bold; border: 1px solid #000; padding: 4px;">${r.no}</td>
                    <td style="text-align: center; border: 1px solid #000; padding: 4px;">${r.masa_kerja} Th</td>
                    <td style="text-align: center; font-weight: bold; border: 1px solid #000; padding: 4px;">${r.status}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.sd).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.smp).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.slta).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.d3_d4).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px; font-weight: bold;">${Number(r.s1).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.s2_dr_ners).toLocaleString('id-ID')}</td>
                    <td style="text-align: right; border: 1px solid #000; padding: 4px;">${Number(r.s3_spesialis).toLocaleString('id-ID')}</td>
                    <td style="border: 1px solid #000; padding: 4px; font-size: 8pt;">${r.keterangan || '-'}</td>
                </tr>
            `;
        });

        const printHtml = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>LAMPIRAN I PERGUB 221 TAHUN 2016</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 10mm;
                    }
                    body {
                        font-family: 'Times New Roman', serif;
                        font-size: 8.5pt;
                        color: #000;
                        margin: 0;
                        padding: 10px;
                    }
                    .header-box {
                        text-align: right;
                        margin-bottom: 12px;
                        line-height: 1.3;
                    }
                    .header-box .label {
                        font-size: 8pt;
                    }
                    .main-title {
                        text-align: center;
                        font-weight: bold;
                        font-size: 10.5pt;
                        margin-bottom: 15px;
                        line-height: 1.3;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 8pt;
                    }
                    th {
                        border: 1px solid #000;
                        padding: 5px;
                        text-align: center;
                        background-color: #f1f5f9;
                    }
                    .signature-box {
                        float: right;
                        margin-top: 25px;
                        text-align: center;
                        width: 320px;
                        font-size: 9pt;
                        line-height: 1.4;
                    }
                </style>
            </head>
            <body>
                <div class="header-box">
                    <div class="label">LAMPIRAN I: PERATURAN GUBERNUR DAERAH KHUSUS IBUKOTA JAKARTA</div>
                    <div class="label" style="font-weight: bold;">NOMOR 221 TAHUN 2016</div>
                </div>

                <div class="main-title">
                    GAJI PEGAWAI NON PEGAWAI NEGERI SIPIL PADA SATUAN KERJA PERANGKAT DAERAH /<br>
                    UNIT KERJA PERANGKAT DAERAH BIDANG KESEHATAN
                </div>

                <table>
                    <thead>
                        <tr>
                            <th rowspan="2" style="width: 30px;">NO</th>
                            <th rowspan="2" style="width: 60px;">MASA KERJA</th>
                            <th rowspan="2" style="width: 45px;">STATUS</th>
                            <th colspan="7">PENDIDIKAN</th>
                            <th rowspan="2" style="width: 120px;">KETERANGAN</th>
                        </tr>
                        <tr>
                            <th>SD</th>
                            <th>SMP</th>
                            <th>SLTA</th>
                            <th>D III / D IV</th>
                            <th>S1</th>
                            <th>S2/dr/drg/Apt/Ners</th>
                            <th>S3/dr.Spesialis</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                    </tbody>
                </table>

                <div class="signature-box">
                    <div>GUBERNUR PROVINSI DAERAH KHUSUS<br>IBUKOTA JAKARTA,</div>
                    <div style="margin-top: 50px; font-weight: bold; text-decoration: underline;">BASUKI T. PURNAMA</div>
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
            alert("Harap izinkan popup di browser Anda untuk mencetak dokumen Pergub.");
        }
    };
})();
