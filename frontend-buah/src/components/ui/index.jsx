// Atomic UI Components — Button, Card, Badge, Spinner, ProgressBar, Modal
// Each exported individually for clean imports

export function Button({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`card-base ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ label, type }) {
  const styles = {
    segar: 'bg-green-100 text-green-700',
    setengah: 'bg-orange-100 text-orange-600',
    busuk: 'bg-red-100 text-red-600',
    default: 'bg-gray-100 text-gray-600',
  };
  const cls = styles[type] ?? styles.default;
  return (
    <span className={`badge ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      {label}
    </span>
  );
}

export function Spinner({ size = 'md', color = 'brand-green' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-7 h-7', lg: 'w-10 h-10' };
  return (
    <div
      className={`${sizes[size]} border-2 border-gray-200 border-t-brand-green rounded-full animate-spin`}
    />
  );
}

export function ProgressBar({ value = 0, color = 'green', label, percentage }) {
  const colorMap = {
    green: 'bg-accent-green',
    orange: 'bg-accent-orange',
    red: 'bg-accent-red',
  };
  const trackMap = {
    green: 'bg-green-100',
    orange: 'bg-orange-100',
    red: 'bg-red-100',
  };
  return (
    <div className="w-full">
      {(label || percentage !== undefined) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {percentage !== undefined && (
            <span className="text-sm font-bold text-gray-800">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className={`w-full h-3 rounded-full ${trackMap[color]} overflow-hidden`}>
        <div
          className={`h-full rounded-full progress-fill ${colorMap[color]}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
