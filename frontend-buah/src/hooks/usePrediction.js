import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { CLASS_LABELS, mapOutputToResults } from '../utils/classMapper';

const IMAGE_SIZE = 224; // MobileNet input size

/**
 * Hook untuk menjalankan inference TF.js pada gambar yang diupload.
 * @param {tf.LayersModel | null} model - Model yang sudah di-load
 */
export default function usePrediction(model) {
  const [results, setResults] = useState(null);    // Array of { label, probability, color }
  const [predStatus, setPredStatus] = useState('idle'); // 'idle' | 'predicting' | 'done' | 'error'
  const [predError, setPredError] = useState(null);
  const [topResult, setTopResult] = useState(null); // { label, probability }

  const predict = useCallback(
    async (imageElement) => {
      if (!model) {
        setPredError('Model belum siap. Tunggu sebentar...');
        return;
      }
      if (!imageElement) {
        setPredError('Tidak ada gambar untuk dianalisis.');
        return;
      }

      setPredStatus('predicting');
      setPredError(null);

      try {
        // Preprocessing: convert to tensor, resize, normalize, add batch dim
        const tensor = tf.tidy(() => {
          const imgTensor = tf.browser.fromPixels(imageElement);
          const resized = tf.image.resizeBilinear(imgTensor, [IMAGE_SIZE, IMAGE_SIZE]);
          const normalized = resized.toFloat().div(tf.scalar(255));
          return normalized.expandDims(0); // shape: [1, 224, 224, 3]
        });

        const prediction = await model.predict(tensor);
        const probabilities = await prediction.data();

        tensor.dispose();
        prediction.dispose();

        const mapped = mapOutputToResults(Array.from(probabilities));
        const top = mapped.reduce((a, b) => (a.probability > b.probability ? a : b));

        setResults(mapped);
        setTopResult(top);
        setPredStatus('done');
      } catch (err) {
        console.error('[usePrediction] Error:', err);
        setPredError(err.message ?? 'Gagal menjalankan prediksi.');
        setPredStatus('error');
      }
    },
    [model]
  );

  const resetPrediction = useCallback(() => {
    setResults(null);
    setTopResult(null);
    setPredStatus('idle');
    setPredError(null);
  }, []);

  return { results, topResult, predStatus, predError, predict, resetPrediction };
}
