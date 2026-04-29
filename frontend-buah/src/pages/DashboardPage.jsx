import { useRef, useCallback } from 'react';
import { Cpu, RefreshCw, ArrowRight, Zap, Activity, CheckCircle2 } from 'lucide-react';
import { Card, Spinner, Button } from '../components/ui/index';
import UploadZone from '../components/dashboard/UploadZone';
import ProbabilityChart from '../components/dashboard/ProbabilityChart';
import ResultCard from '../components/dashboard/ResultCard';
import useModelLoader from '../hooks/useModelLoader';
import useImageUpload from '../hooks/useImageUpload';
import usePrediction from '../hooks/usePrediction';
import { TEACHABLE_MACHINE_URL } from '../hooks/useModelLoader';
import { useNavigate } from 'react-router-dom';

// Status bar chip warna sesuai status model
const modelStatusConfig = {
  idle: { label: 'Menginisialisasi...', color: 'text-gray-500 bg-gray-100', dot: 'bg-gray-400' },
  loading: { label: 'Memuat Model...', color: 'text-amber-700 bg-amber-50', dot: 'bg-amber-500 animate-pulse' },
  ready: { label: 'Model Siap', color: 'text-green-700 bg-green-100', dot: 'bg-accent-green' },
  error: { label: 'Gagal Memuat Model', color: 'text-red-700 bg-red-100', dot: 'bg-accent-red' },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const { model, modelStatus, error: modelError } = useModelLoader();
  const { imageUrl, isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileChange, reset } = useImageUpload();
  const { results, topResult, predStatus, predError, predict, resetPrediction } = usePrediction(model);

  const statusCfg = modelStatusConfig[modelStatus];

  const handleAnalyze = useCallback(async () => {
    if (!imgRef.current) return;
    await predict(imgRef.current);
  }, [predict]);

  const handleReset = useCallback(() => {
    reset();
    resetPrediction();
  }, [reset, resetPrediction]);

  const isAnalyzing = predStatus === 'predicting';
  const isDone = predStatus === 'done';
  const canAnalyze = imageUrl && modelStatus === 'ready' && !isAnalyzing;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Analisis Kualitas Buah</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload foto buah untuk mendeteksi tingkat kesegaran menggunakan CNN MobileNet
          </p>
        </div>
        {/* Model Status Chip */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto ${statusCfg.color}`}>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusCfg.dot}`} />
          {statusCfg.label}
          {modelStatus === 'loading' && <Spinner size="sm" />}
        </div>
      </div>

      {/* Model Error Notice */}
      {modelError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <strong>Error Model:</strong> {modelError}
          <br />
          <span className="text-xs text-red-500">
            Pastikan URL Teachable Machine sudah benar di <code>hooks/useModelLoader.js</code>
          </span>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Cpu, label: 'Model', value: 'MobileNet CNN', color: 'text-brand-green bg-brand-light' },
          { icon: Zap, label: 'Inferensi', value: 'Client-Side', color: 'text-blue-600 bg-blue-50' },
          { icon: Activity, label: 'Kelas', value: '3 Kategori', color: 'text-purple-600 bg-purple-50' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="p-4 !py-3 !px-4 text-center">
            <div className={`inline-flex p-2 rounded-xl ${color} mb-2`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-xs font-bold text-gray-700">{value}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upload Panel */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-light rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-brand-green" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">Upload Gambar</h3>
          </div>

          <UploadZone
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileChange={handleFileChange}
            imageUrl={imageUrl}
            onReset={handleReset}
          />

          {/* Hidden img for TF.js fromPixels */}
          {imageUrl && (
            <img
              ref={imgRef}
              src={imageUrl}
              alt="TF.js source"
              crossOrigin="anonymous"
              className="hidden"
            />
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="flex-1 justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Spinner size="sm" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analisis Sekarang
                </>
              )}
            </Button>
            {imageUrl && (
              <Button onClick={handleReset} variant="secondary">
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {predError && (
            <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">⚠ {predError}</p>
          )}
        </Card>

        {/* Results Panel */}
        <Card className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-light rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-brand-green" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">Hasil Analisis</h3>
          </div>

          {/* Idle / Loading */}
          {predStatus === 'idle' && (
            <div className="flex flex-col items-center justify-center h-44 text-center gap-3 text-gray-400">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Activity className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm">Hasil deteksi akan muncul di sini.</p>
              <p className="text-xs">Upload gambar lalu klik <strong>Analisis Sekarang</strong></p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-44 gap-4">
              <Spinner size="lg" />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Menjalankan inferensi CNN...</p>
                <p className="text-xs text-gray-400 mt-1">TensorFlow.js sedang memproses gambar</p>
              </div>
            </div>
          )}

          {isDone && results && (
            <div className="space-y-4 animate-fade-in">
              <ResultCard topResult={topResult} />
              <ProbabilityChart results={results} />

              {/* Navigate to Detail */}
              <button
                onClick={() => navigate('/detail', { state: { topResult, results } })}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-hover border-t border-gray-100 pt-3 mt-2 transition-colors group"
              >
                <CheckCircle2 className="w-4 h-4" />
                Lihat Rekomendasi Detail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
