import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const UploadBox = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  // Handle file yang dipilih
  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        // Kirim data gambar ke App.jsx (nanti buat dikirim ke backend)
        onImageSelected(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Event handlers buat drag-and-drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => inputRef.current.click();

  const resetPreview = (e) => {
    e.stopPropagation(); // Biar ga memicu klik upload box
    setPreview(null);
    onImageSelected(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-700">
          <ImageIcon className="text-blue-500" size={20} /> Upload Foto Buah
        </h3>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleChange}
      />

      <div
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 transition cursor-pointer min-h-[250px] relative
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
      >
        {preview ? (
          // Tampilan kalau udah ada preview gambar
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-[220px] w-auto object-contain rounded-lg shadow-sm"
            />
            <button
              onClick={resetPreview}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
              title="Hapus Foto"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          // Tampilan awal (kosong)
          <>
            <Upload size={40} className="text-gray-400 mb-3" />
            <p className="text-gray-500 font-medium mb-4 text-center">
              Drag & Drop Foto Buah Ke Sini <br />
              <span className="text-sm font-normal">
                atau klik untuk mencari
              </span>
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition shadow-sm">
              <ImageIcon size={18} /> Pilih File
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Format didukung: JPG, PNG, JPEG. Maks 5MB.
      </p>
    </div>
  );
};

UploadBox.propTypes = {
  onImageSelected: PropTypes.func.isRequired,
};

export default UploadBox;
