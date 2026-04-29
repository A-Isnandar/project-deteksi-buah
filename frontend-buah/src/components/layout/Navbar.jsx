import { Menu, Bell, User, ChevronDown } from 'lucide-react';

export default function Navbar({ onMenuClick, pageTitle }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/80 px-4 md:px-6 h-16 flex items-center justify-between shadow-sm">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-green transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-gray-900 font-bold text-base leading-tight">{pageTitle}</h1>
          <p className="text-gray-400 text-xs hidden sm:block">
            Sistem Deteksi Kualitas Buah — AI
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-green transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-brand-light hover:border-brand-green transition-all duration-200">
          <div className="w-7 h-7 bg-brand-green rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
            <p className="text-[10px] text-gray-400">Researcher</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
