import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

// ============================================================
// KONFIGURASI MODEL — Ganti URL di sini dengan URL Teachable
// Machine milikmu, atau ganti ke path lokal jika sudah offline.
// ============================================================
export const TEACHABLE_MACHINE_URL =
  'https://teachablemachine.withgoogle.com/models/A64Wk4D4b/';
// Untuk mode offline (lokal), gunakan:
// export const LOCAL_MODEL_URL = '/src/assets/model/model.json';
// ============================================================

export default function useModelLoader() {
  const [model, setModel] = useState(null);
  const [modelStatus, setModelStatus] = useState('idle'); // 'idle' | 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);
  const modelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadModel() {
      setModelStatus('loading');
      setError(null);
      try {
        // Construct model.json URL from the base Teachable Machine URL
        const modelURL = TEACHABLE_MACHINE_URL + 'model.json';
        const loaded = await tf.loadLayersModel(modelURL);
        if (!cancelled) {
          modelRef.current = loaded;
          setModel(loaded);
          setModelStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[useModelLoader] Gagal memuat model:', err);
          setError(err.message ?? 'Gagal memuat model CNN.');
          setModelStatus('error');
        }
      }
    }

    loadModel();

    return () => {
      cancelled = true;
    };
  }, []);

  return { model, modelStatus, error };
}
