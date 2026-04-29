import { useRef } from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, ScanLine } from 'lucide-react';
import { Badge } from '../ui/index';

const iconMap = {
  segar: { Icon: CheckCircle, bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100', iconColor: 'text-accent-green', ringColor: 'ring-green-200' },
  setengah: { Icon: AlertTriangle, bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100', iconColor: 'text-accent-orange', ringColor: 'ring-orange-200' },
  busuk: { Icon: XCircle, bgColor: 'bg-gradient-to-br from-red-50 to-rose-100', iconColor: 'text-accent-red', ringColor: 'ring-red-200' },
};

export default function ResultCard({ topResult }) {
  if (!topResult) return null;

  const { Icon, bgColor, iconColor, ringColor } = iconMap[topResult.key] ?? iconMap.segar;

  return (
    <div className={`${bgColor} rounded-2xl p-5 ring-1 ${ringColor} animate-slide-up`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-white/60 flex items-center justify-center shadow-sm ring-1 ${ringColor}`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
            <ScanLine className="w-3.5 h-3.5" />
            Hasil Deteksi Utama
          </p>
          <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
            {topResult.label}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge label={topResult.label} type={topResult.badgeType} />
            <span className="flex items-center gap-1 text-xs text-gray-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
              Confidence: {topResult.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
