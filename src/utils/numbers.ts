// Utilitaires pour gérer les valeurs numériques et prévenir les erreurs NaN
export const safeNumber = (value: any, fallback = 0): number => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

export const parseNumberInput = (value: string): number => {
  if (!value || value.trim() === '') return 0;
  const cleaned = value.replace(/[^0-9.,]/g, '');
  const parsed = parseFloat(cleaned.replace(',', '.'));
  return isNaN(parsed) ? 0 : parsed;
};

export const formatNumber = (value: number): string => {
  return isNaN(value) ? '0' : value.toString();
};