import { useState } from 'react';
import { Leaf, Info, ArrowLeft, CheckCircle, Database } from 'lucide-react';
import Navbar from './components/navbar';
import UploadBox from './components/UploadBox';
import DatasetTable from './components/DatasetTable';

// Data DUMMY untuk simulasi hasil deteksi
const MOCK_RESULT = {
  image_url:
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=300',
  prediksi_utama: 'Setengah Busuk',
  probabilitas_utama: 78,
  warna_utama: 'text-accent-orange',
  bg_bar_utama: 'bg-accent-orange',
  detail: [
    { label: 'Segar', prob: 12, color: 'bg-accent-green' },
    { label: 'Setengah Busuk', prob: 78, color: 'bg-accent-orange' },
    { label: 'Busuk', prob: 10, color: 'bg-accent-red' },
  ],
};

function App() {
  // STATE: Untuk mengatur halaman apa yang sedang aktif
  // Opsi: 'dashboard', 'dataset', 'detail'
  const [activePage, setActivePage] = useState('dashboard');

  // STATE: Menyimpan file gambar yang dipilih user
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // STATE: Menyimpan hasil deteksi (nanti dari backend)
  const [detectionResult, setDetectionResult] = useState(null);

  // Fungsi simulasi klik tombol "Deteksi"
  const handleSimulasiDeteksi = () => {
    if (!selectedImageFile) {
      alert('Pilih gambar dulu bro!');
      return;
    }
    // Ceritanya loading sebentar...
    setTimeout(() => {
      // Masukin data dummy seolah-olah dapet dari backend
      setDetectionResult(MOCK_RESULT);
    }, 500);
  };

  // --- KOMPONEN HALAMAN DASHBOARD UTAMA ---
  const DashboardView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* KOLOM KIRI: Upload */}
      <div className="flex flex-col gap-4">
        <UploadBox onImageSelected={setSelectedImageFile} />

        {/* Tombol Eksekusi Deteksi */}
        <button
          onClick={handleSimulasiDeteksi}
          disabled={!selectedImageFile}
          className={`w-full py-3 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition shadow-md
              ${selectedImageFile ? 'bg-brand-green hover:bg-brand-hover cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          <CheckCircle size={20} /> Lakukan Deteksi Kualitas
        </button>
      </div>

      {/* KOLOM KANAN: Hasil Deteksi (Muncul kalau sudah ada hasil) */}
      {detectionResult ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-700">
              <Leaf className="text-brand-green" size={20} /> Hasil Deteksi
            </h3>
            <span
              className={`font-bold text-2xl ${detectionResult.warna_utama}`}
            >
              {detectionResult.probabilitas_utama}%
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start">
            <img
              src={
                selectedImageFile
                  ? URL.createObjectURL(selectedImageFile)
                  : detectionResult.image_url
              }
              alt="Buah"
              className="w-40 h-40 object-cover rounded-xl border-4 border-gray-50 shadow-sm"
            />
            <div className="flex flex-col justify-center text-center sm:text-left">
              <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">
                PREDIKSI AI
              </p>
              <p
                className={`text-3xl font-extrabold ${detectionResult.warna_utama}`}
              >
                {detectionResult.prediksi_utama}
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Kualitas buah terdeteksi{' '}
                {detectionResult.prediksi_utama.toLowerCase()} berdasarkan
                analisis visual.
              </p>
            </div>
          </div>

          {/* PROGRESS BARS */}
          <div className="space-y-4 mb-8">
            {detectionResult.detail.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1 font-medium text-gray-600">
                  <span
                    className={
                      item.prob === detectionResult.probabilitas_utama
                        ? detectionResult.warna_utama + ' font-bold'
                        : ''
                    }
                  >
                    {item.label}
                  </span>
                  <span
                    className={
                      item.prob === detectionResult.probabilitas_utama
                        ? detectionResult.warna_utama + ' font-bold'
                        : ''
                    }
                  >
                    {item.prob}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.prob}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActivePage('detail')}
            className="w-full bg-brand-light text-brand-green hover:bg-green-100 py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition"
          >
            <Info size={18} /> Lihat Info Selengkapnya
          </button>
        </div>
      ) : (
        // Placeholder kalau belum ada hasil
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col items-center justify-center text-gray-400 opacity-70 min-h-[300px]">
          <Leaf size={60} className="mb-4 text-gray-300" />
          <p className="font-medium text-lg">
            Hasil deteksi akan muncul di sini
          </p>
          <p className="text-sm">Silakan upload foto buah terlebih dahulu.</p>
        </div>
      )}
    </div>
  );

  // --- KOMPONEN HALAMAN DETAIL (Sesuai Referensi Kanan Bawah) ---
  const DetailView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <button
        onClick={() => setActivePage('dashboard')}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-brand-green transition font-medium"
      >
        <ArrowLeft size={20} /> Kembali ke Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detail Kualitas Buah
          </h2>
          <div className="bg-brand-light p-4 rounded-lg mb-6">
            <h4 className="font-bold text-brand-green mb-3">
              Detail Probabilitas
            </h4>
            <div className="space-y-3 bg-white p-4 rounded-md">
              {detectionResult &&
                detectionResult.detail.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm font-medium border-b border-gray-50 last:border-0 pb-2 last:pb-0"
                  >
                    <span>{item.label}</span>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-24 h-3 rounded-full bg-gray-100 overflow-hidden`}
                      >
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${item.prob}%` }}
                        ></div>
                      </div>
                      <span
                        className={
                          item.prob > 50
                            ? item.color.replace('bg-', 'text-') + ' font-bold'
                            : ''
                        }
                      >
                        {item.prob}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">
              Rekomendasi Penanganan
            </h4>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-accent-orange">
              Buah terdeteksi <b>Setengah Busuk</b>. Disarankan untuk segera
              memisahkan bagian yang busuk. Bagian yang masih segar dapat
              digunakan untuk jus atau olahan selai segera. Jangan disimpan
              terlalu lama bersama buah segar lainnya.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl">
          <img
            src={
              selectedImageFile
                ? URL.createObjectURL(selectedImageFile)
                : detectionResult?.image_url
            }
            alt="Detail Buah"
            className="w-full max-w-sm object-cover rounded-xl shadow-md mb-6 border-4 border-white"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Visualisasi Input
          </h3>
          <p className="text-gray-500 text-center text-sm">
            Gambar asli yang dianalisis oleh sistem.
          </p>
        </div>
      </div>
    </div>
  );

  // --- RENDER UTAMA ---
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#F4F7F6]">
      {/* Navbar nerima fungsi buat ngubah halaman aktif */}
      <Navbar onNavigate={setActivePage} activePage={activePage} />

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Judul Halaman Berubah Sesuai State */}
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-brand-green flex items-center gap-2">
          {activePage === 'dashboard' && (
            <>
              <Leaf /> Dashboard Deteksi Kualitas
            </>
          )}
          {activePage === 'dataset' && (
            <>
              <Database /> Manajemen Dataset
            </>
          )}
          {activePage === 'detail' && 'Detail Analisis Lengkap'}
        </h2>
        {/* Logika Perpindahan Halaman (Conditional Rendering) */}
        {activePage === 'dashboard' && <DashboardView />}
        {activePage === 'dataset' && <DatasetTable onBack={setActivePage} />}
        {activePage === 'detail' && detectionResult && <DetailView />}
        {activePage === 'detail' &&
          !detectionResult &&
          setActivePage('dashboard')}{' '}
        {/* Safety balik ke dashboard kalau belum ada hasil */}
      </main>
    </div>
  );
}

export default App;
