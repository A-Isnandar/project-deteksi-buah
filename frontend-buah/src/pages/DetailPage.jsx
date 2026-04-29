import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';
import { Card, Badge } from '../components/ui/index';
import { getRecommendation } from '../data/recommendations';

const borderColorMap = {
  green: 'border-l-green-500',
  orange: 'border-l-orange-500',
  red: 'border-l-red-500',
};

const iconBgMap = {
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
};

const StepCard = ({ step, index, color }) => (
  <div className={`flex gap-4 p-4 rounded-xl bg-gray-50 border-l-4 ${borderColorMap[color]}`}>
    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${iconBgMap[color]}`}>
      {index + 1}
    </div>
    <div>
      <p className="text-sm font-bold text-gray-800">{step.title}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
    </div>
  </div>
);

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { topResult, results } = location.state ?? {};

  // Fallback jika diakses langsung tanpa state
  const safeTopResult = topResult ?? { key: 'segar', label: 'Segar', percentage: 100, badgeType: 'segar' };
  const rec = getRecommendation(safeTopResult.key);

  const IconComp = safeTopResult.key === 'busuk'
    ? XCircle
    : safeTopResult.key === 'setengah'
      ? AlertTriangle
      : CheckCircle;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </button>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Detail Analisis</h2>
        <p className="text-sm text-gray-500 mt-0.5">Rekomendasi penanganan berdasarkan hasil deteksi CNN</p>
      </div>

      {/* Result Summary */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBgMap[rec.color]}`}>
          <IconComp className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl font-extrabold text-gray-900">{rec.icon} {rec.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge label={safeTopResult.label} type={safeTopResult.badgeType} />
            <span className="text-xs text-gray-500 font-medium">
              Confidence: <strong className="text-gray-800">{safeTopResult.percentage?.toFixed(1)}%</strong>
            </span>
          </div>
        </div>
      </Card>

      {/* Recommendation Steps */}
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 bg-brand-light rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-brand-green" />
          </div>
          <h3 className="font-bold text-gray-800">Langkah Penanganan yang Disarankan</h3>
        </div>
        <div className="space-y-3">
          {rec.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} color={rec.color} />
          ))}
        </div>
      </Card>

      {/* All Probabilities Table (if available) */}
      {results && results.length > 0 && (
        <Card>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Rincian Probabilitas Semua Kelas</h3>
          <div className="space-y-2">
            {results.map((r) => (
              <div key={r.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span>{r.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{r.label}</span>
                  {r.key === safeTopResult.key && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-brand-light text-brand-green rounded-full font-semibold">Tertinggi</span>
                  )}
                </div>
                <span className="text-sm font-bold text-gray-900">{r.percentage.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
