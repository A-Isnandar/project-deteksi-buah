import PropTypes from 'prop-types';
import { Leaf, Bell, User, Menu, Database } from 'lucide-react';

const Navbar = ({ onNavigate, activePage }) => {
  return (
    <nav className="bg-brand-green text-white px-4 md:px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onNavigate('dashboard')}
      >
        <div className="bg-white p-1.5 rounded-full text-brand-green">
          <Leaf size={20} />
        </div>
        {/* Sembunyiin teks panjang di HP, munculin di tablet ke atas (md:) */}
        <h1 className="font-bold text-lg tracking-wide hidden md:block">
          Sistem Deteksi Kualitas Buah
        </h1>
        <h1 className="font-bold text-lg tracking-wide md:hidden">
          Deteksi Buah
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Tombol Navigasi Tambahan */}
        <button
          onClick={() => onNavigate('dataset')}
          className={`p-2 rounded-full transition ${activePage === 'dataset' ? 'bg-brand-hover' : 'hover:bg-brand-hover'}`}
          title="Manajemen Dataset"
        >
          <Database size={20} />
        </button>

        <Bell
          size={20}
          className="cursor-pointer hover:text-gray-200 hidden md:block"
        />

        <div className="bg-orange-300 p-1 rounded-full cursor-pointer flex items-center gap-2 pr-2">
          <User size={20} className="text-orange-800" />
          <span className="text-xs font-bold text-orange-900 hidden md:block">
            Admin
          </span>
        </div>
        <Menu
          size={24}
          className="md:hidden cursor-pointer hover:text-gray-200"
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

export default Navbar;
