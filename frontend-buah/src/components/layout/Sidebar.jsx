import { useLocation, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Database,
  Leaf,
  ChevronRight,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/detail', icon: ScanLine, label: 'Detail Analisis' },
  { to: '/dataset', icon: Database, label: 'Manajemen Dataset' },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-64
          bg-gradient-to-b from-brand-green to-emerald-800
          flex flex-col shadow-2xl transition-transform duration-300
          md:translate-x-0 md:relative md:z-auto md:shadow-none md:flex-shrink-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">FruitVision</p>
              <p className="text-emerald-200 text-[10px] font-medium">AI Quality Detection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
            Menu
          </p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-brand-green" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-emerald-200 text-[10px] font-medium">Powered by</p>
            <p className="text-white text-xs font-bold">TensorFlow.js + MobileNet</p>
          </div>
        </div>
      </aside>
    </>
  );
}
