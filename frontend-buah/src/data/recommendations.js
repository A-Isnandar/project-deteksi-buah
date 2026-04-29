/**
 * Rekomendasi penanganan buah berdasarkan kelas deteksi.
 * Digunakan di halaman Detail Analisis.
 */
export const recommendations = {
  segar: {
    title: 'Buah Segar — Siap Konsumsi / Distribusi',
    color: 'green',
    icon: '✅',
    steps: [
      {
        title: 'Simpan di Tempat Sejuk',
        desc: 'Simpan buah pada suhu 10–15°C untuk mempertahankan kesegaran optimal hingga 7–14 hari.',
      },
      {
        title: 'Siap Distribusi',
        desc: 'Buah layak untuk segera dikemas dan didistribusikan ke pasar atau konsumen akhir.',
      },
      {
        title: 'Pengemasan Standar',
        desc: 'Gunakan kemasan breathable (jaring atau kardus berlubang) agar sirkulasi udara tetap baik.',
      },
      {
        title: 'Cek Secara Berkala',
        desc: 'Lakukan pengecekan rutin tiap 2–3 hari untuk memastikan kualitas tetap terjaga.',
      },
    ],
  },
  setengah: {
    title: 'Setengah Busuk — Tindakan Segera Diperlukan',
    color: 'orange',
    icon: '⚠️',
    steps: [
      {
        title: 'Pisahkan dari Buah Segar',
        desc: 'Segera pisahkan dari tumpukan buah segar untuk mencegah penyebaran kontaminasi.',
      },
      {
        title: 'Prioritaskan Pengolahan',
        desc: 'Gunakan untuk pengolahan produk turunan (jus, selai, manisan) dalam 1–2 hari ke depan.',
      },
      {
        title: 'Sortir Bagian yang Masih Baik',
        desc: 'Potong dan buang bagian yang sudah mulai rusak, bagian yang masih segar bisa dimanfaatkan.',
      },
      {
        title: 'Pantau Suhu Penyimpanan',
        desc: 'Turunkan suhu penyimpanan ke 5–8°C untuk memperlambat proses pembusukan lebih lanjut.',
      },
    ],
  },
  busuk: {
    title: 'Busuk — Tidak Layak Konsumsi',
    color: 'red',
    icon: '❌',
    steps: [
      {
        title: 'Segera Buang / Karantina',
        desc: 'Buah tidak layak konsumsi. Segera pisahkan dan buang ke tempat sampah organik.',
      },
      {
        title: 'Sterilisasi Wadah',
        desc: 'Bersihkan dan sterilkan wadah, keranjang, atau area penyimpanan yang pernah digunakan.',
      },
      {
        title: 'Cegah Kontaminasi Silang',
        desc: 'Waspadai potensi kontaminasi ke buah lain di sekitarnya, segera periksa seluruh batch.',
      },
      {
        title: 'Evaluasi Proses Sortir',
        desc: 'Tinjau ulang proses sortir awal dan kondisi penyimpanan untuk mencegah kejadian serupa.',
      },
    ],
  },
};

/** Ambil rekomendasi berdasarkan key kelas */
export function getRecommendation(classKey) {
  return recommendations[classKey] ?? recommendations.segar;
}
