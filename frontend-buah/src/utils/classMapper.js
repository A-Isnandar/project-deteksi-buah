/**
 * Mapping output model CNN ke label yang human-readable.
 *
 * PENTING: Sesuaikan urutan CLASS_LABELS dengan urutan kelas
 * pada output model Teachable Machine-mu.
 * (Bisa dilihat pada file metadata.json dari Teachable Machine)
 */
export const CLASS_LABELS = [
  {
    key: 'segar',
    label: 'Segar',
    color: 'green',
    badgeType: 'segar',
    emoji: '🟢',
  },
  {
    key: 'setengah',
    label: 'Setengah Busuk',
    color: 'orange',
    badgeType: 'setengah',
    emoji: '🟡',
  },
  {
    key: 'busuk',
    label: 'Busuk',
    color: 'red',
    badgeType: 'busuk',
    emoji: '🔴',
  },
];

/**
 * Mengubah array probabilitas mentah dari model menjadi
 * array objek yang siap dirender UI.
 * @param {number[]} probabilities - Array angka 0-1 dari model output
 * @returns {{ key, label, probability, percentage, color, badgeType, emoji }[]}
 */
export function mapOutputToResults(probabilities) {
  return CLASS_LABELS.map((cls, index) => ({
    ...cls,
    probability: probabilities[index] ?? 0,
    percentage: (probabilities[index] ?? 0) * 100,
  }));
}

/**
 * Mendapatkan label top-1 dari array probabilitas.
 */
export function getTopLabel(probabilities) {
  const results = mapOutputToResults(probabilities);
  return results.reduce((a, b) => (a.probability > b.probability ? a : b));
}
