import { useState } from 'react';
import { Database, Search, Download, TrendingUp, Leaf, AlertTriangle, XCircle } from 'lucide-react';
import { Card, Badge } from '../components/ui/index';
import { dummyHistory, dummySummary } from '../data/dummyHistory';
import { formatDate, truncateFilename } from '../utils/formatters';

export default function DatasetPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'segar' | 'setengah' | 'busuk'

  const filtered = dummyHistory.filter((row) => {
    const matchSearch = row.filename.toLowerCase().includes(search.toLowerCase()) ||
      row.topLabel.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || row.badgeType === filter;
    return matchSearch && matchFilter;
  });

  const summaryItems = [
    { label: 'Total Deteksi', value: dummySummary.total, icon: Database, color: 'text-brand-green bg-brand-light' },
    { label: 'Segar', value: dummySummary.segar, icon: Leaf, color: 'text-green-700 bg-green-50' },
    { label: 'Setengah Busuk', value: dummySummary.setengah, icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' },
    { label: 'Busuk', value: dummySummary.busuk, icon: XCircle, color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Manajemen Dataset</h2>
        <p className="text-sm text-gray-500 mt-0.5">Riwayat deteksi kualitas buah (data dummy)</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summaryItems.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="!p-4 text-center">
            <div className={`inline-flex p-2 rounded-xl ${color} mb-2`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card className="!p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama file atau label..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green w-full sm:w-60 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'segar', 'setengah', 'busuk'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === f
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-brand-light hover:text-brand-green'
                }`}
              >
                {f === 'all' ? 'Semua' : f === 'segar' ? 'Segar' : f === 'setengah' ? 'Setengah' : 'Busuk'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['#', 'Nama File', 'Tanggal', 'Hasil Deteksi', 'Confidence'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                    Tidak ada data yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{String(row.id).padStart(2, '0')}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-800">{truncateFilename(row.filename)}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(row.date)}</td>
                    <td className="px-4 py-3">
                      <Badge label={row.topLabel} type={row.badgeType} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.badgeType === 'segar' ? 'bg-accent-green' :
                              row.badgeType === 'setengah' ? 'bg-accent-orange' : 'bg-accent-red'
                            }`}
                            style={{ width: `${row.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{row.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400">
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{dummyHistory.length}</strong> entri
          </p>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:text-brand-hover transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </Card>
    </div>
  );
}
