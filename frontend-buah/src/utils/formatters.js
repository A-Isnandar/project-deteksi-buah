/**
 * Format angka probabilitas untuk tampilan UI.
 */

/** Konversi 0-1 ke persentase string: 0.8732 → "87.3%" */
export function formatPercent(value, decimals = 1) {
  return `${(value * 100).toFixed(decimals)}%`;
}

/** Konversi 0-100 ke string: 87.32 → "87.3%" */
export function formatPercentRaw(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

/** Format tanggal ke string lokal Indonesia */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Singkat nama file panjang */
export function truncateFilename(name, maxLen = 24) {
  if (name.length <= maxLen) return name;
  const ext = name.split('.').pop();
  return `${name.substring(0, maxLen - ext.length - 4)}...${ext}`;
}
