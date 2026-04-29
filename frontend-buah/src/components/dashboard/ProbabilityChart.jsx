import { ProgressBar } from '../ui/index';
import { BarChart3 } from 'lucide-react';

export default function ProbabilityChart({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-1">
        <BarChart3 className="w-4 h-4 text-brand-green" />
        <h3 className="text-sm font-bold text-gray-700">Distribusi Probabilitas</h3>
      </div>

      {results.map((item) => (
        <div key={item.key} className="space-y-1">
          <ProgressBar
            value={item.percentage}
            color={item.color}
            label={`${item.emoji} ${item.label}`}
            percentage={item.percentage}
          />
        </div>
      ))}

      <p className="text-[10px] text-gray-400 text-right pt-1">
        Total: {results.reduce((sum, r) => sum + r.percentage, 0).toFixed(1)}%
      </p>
    </div>
  );
}
