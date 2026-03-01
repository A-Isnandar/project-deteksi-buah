import PropTypes from 'prop-types';
import { Database, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react'; // Tambah ArrowLeft

// Sekarang komponen ini nerima prop onBack
const DatasetTable = ({ onBack }) => {
  const dummyData = [
    {
      id: 1,
      jenis: 'Apel',
      kategori: 'Segar',
      jumlah: 60,
      status: 'bg-accent-green',
    },
    {
      id: 2,
      jenis: 'Pisang',
      kategori: 'Setengah Busuk',
      jumlah: 210,
      status: 'bg-accent-orange',
    },
    {
      id: 3,
      jenis: 'Jeruk',
      kategori: 'Setengah Busuk',
      jumlah: 115,
      status: 'bg-accent-orange',
    },
    {
      id: 4,
      jenis: 'Anggur',
      kategori: 'Busuk',
      jumlah: 180,
      status: 'bg-accent-red',
    },
    {
      id: 5,
      jenis: 'Apel',
      kategori: 'Busuk',
      jumlah: 45,
      status: 'bg-accent-red',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      {/* TOMBOL KEMBALI YANG BARU DITAMBAHIN */}
      <button
        onClick={() => onBack('dashboard')}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-brand-green transition font-medium"
      >
        <ArrowLeft size={20} /> Kembali ke Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-700">
          <Database className="text-brand-green" size={20} /> Manajemen Dataset
          Buah
        </h3>
        <button className="bg-brand-green hover:bg-brand-hover text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition text-sm">
          <Plus size={16} /> Tambah Data Buah
        </button>
      </div>

      {/* Wrapper buat tabel biar bisa di-scroll horizontal di HP */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-brand-green">
            <tr>
              <th scope="col" className="px-4 py-3 rounded-tl-lg">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Jenis Buah
              </th>
              <th scope="col" className="px-4 py-3">
                Kategori
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Jumlah Gambar
              </th>
              <th scope="col" className="px-4 py-3 rounded-tr-lg text-center">
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-4 py-4">{item.jenis}</td>
                <td className="px-4 py-4">
                  <span
                    className={`${item.status} text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                  >
                    {item.kategori}
                  </span>
                </td>
                <td className="px-4 py-4 text-center font-semibold">
                  {item.jumlah}
                </td>
                <td className="px-4 py-4 flex justify-center gap-2">
                  <button
                    className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination sederhana */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <p>Menampilkan 1-5 dari 20 data</p>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded bg-gray-100">Prev</button>
          <button className="px-3 py-1 border rounded bg-brand-green text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

DatasetTable.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default DatasetTable;
