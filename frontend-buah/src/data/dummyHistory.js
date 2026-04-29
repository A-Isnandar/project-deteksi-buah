/**
 * Dummy history data untuk tabel Manajemen Dataset.
 * Format: { id, filename, date, topLabel, confidence, badgeType }
 */
export const dummyHistory = [
  { id: 1, filename: 'mangga_01.jpg', date: '2026-03-01T08:15:00', topLabel: 'Segar', confidence: 96.4, badgeType: 'segar' },
  { id: 2, filename: 'apel_merah_02.jpg', date: '2026-03-01T09:02:00', topLabel: 'Setengah Busuk', confidence: 78.1, badgeType: 'setengah' },
  { id: 3, filename: 'pisang_03.jpg', date: '2026-03-01T10:45:00', topLabel: 'Segar', confidence: 91.7, badgeType: 'segar' },
  { id: 4, filename: 'stroberi_04.png', date: '2026-03-01T11:30:00', topLabel: 'Busuk', confidence: 88.5, badgeType: 'busuk' },
  { id: 5, filename: 'jeruk_05.jpg', date: '2026-03-01T13:00:00', topLabel: 'Segar', confidence: 94.2, badgeType: 'segar' },
  { id: 6, filename: 'pepaya_06.jpg', date: '2026-03-01T14:22:00', topLabel: 'Setengah Busuk', confidence: 65.3, badgeType: 'setengah' },
  { id: 7, filename: 'anggur_07.jpg', date: '2026-03-01T15:10:00', topLabel: 'Segar', confidence: 97.8, badgeType: 'segar' },
  { id: 8, filename: 'semangka_08.jpg', date: '2026-03-01T16:45:00', topLabel: 'Busuk', confidence: 82.1, badgeType: 'busuk' },
  { id: 9, filename: 'nanas_09.jpg', date: '2026-03-02T07:00:00', topLabel: 'Segar', confidence: 89.9, badgeType: 'segar' },
  { id: 10, filename: 'alpukat_10.jpg', date: '2026-03-02T08:30:00', topLabel: 'Setengah Busuk', confidence: 71.4, badgeType: 'setengah' },
];

/** Statistik ringkasan dari dummy history */
export const dummySummary = {
  total: dummyHistory.length,
  segar: dummyHistory.filter((d) => d.badgeType === 'segar').length,
  setengah: dummyHistory.filter((d) => d.badgeType === 'setengah').length,
  busuk: dummyHistory.filter((d) => d.badgeType === 'busuk').length,
};
