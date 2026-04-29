import { useRef } from 'react';
import { UploadCloud, ImageIcon, X } from 'lucide-react';

export default function UploadZone({ isDragging, onDragOver, onDragLeave, onDrop, onFileChange, imageUrl, onReset }) {
  const fileInputRef = useRef(null);

  if (imageUrl) {
    return (
      <div className="relative rounded-2xl overflow-hidden border-2 border-brand-light bg-brand-light/40 animate-fade-in">
        <img
          src={imageUrl}
          alt="Preview buah"
          className="w-full h-64 object-contain"
        />
        <button
          onClick={onReset}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full p-1.5 shadow-md transition-all duration-200"
          title="Hapus gambar"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-3 px-4">
          <p className="text-white text-xs font-medium opacity-90 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            Gambar siap dianalisis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-4
        w-full h-56 rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-300 select-none
        ${isDragging
          ? 'border-brand-green bg-brand-light scale-[1.01] shadow-inner'
          : 'border-gray-300 bg-gray-50 hover:border-brand-green hover:bg-brand-light/60'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
        id="fruit-upload-input"
      />

      <div className={`
        w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
        ${isDragging ? 'bg-brand-green shadow-lg scale-110' : 'bg-brand-light'}
      `}>
        <UploadCloud className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-white' : 'text-brand-green'}`} />
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-700 text-sm">
          {isDragging ? 'Lepaskan gambar di sini...' : 'Drag & Drop gambar buah'}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          atau <span className="text-brand-green font-semibold underline">klik untuk pilih file</span>
        </p>
        <p className="text-gray-300 text-xs mt-2">JPG, PNG, WEBP • Maks. 10 MB</p>
      </div>
    </div>
  );
}
