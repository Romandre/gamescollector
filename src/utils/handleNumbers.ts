const romanToArabicMap: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
  XIII: 13,
  XIV: 14,
  XV: 15,
  XVI: 16,
  XVII: 17,
  XVIII: 18,
  XIX: 19,
  XX: 20,
};

const arabicToRomanMap = Object.fromEntries(
  Object.entries(romanToArabicMap).map(([roman, arabic]) => [arabic, roman])
);

const convertToRoman = (num: number): string => arabicToRomanMap[num] || "";
const convertToArabic = (roman: string): number | null =>
  romanToArabicMap[roman] || null;

export const getSearchVariants = (value: string): string[] => {
  const variants = new Set<string>([value]);

  const arabicMatch = value.match(/\b\d+\b/);
  if (arabicMatch) {
    const num = parseInt(arabicMatch[0], 10);
    const romanEquivalent = convertToRoman(num);
    if (romanEquivalent)
      variants.add(value.replace(arabicMatch[0], romanEquivalent));
  }

  const romanMatch = value.match(/\b(I{1,3}|IV|V?I{0,3}|IX|X{1,3}|XL|L)\b/);
  if (romanMatch) {
    const arabicEquivalent = convertToArabic(romanMatch[0]);
    if (arabicEquivalent !== null)
      variants.add(value.replace(romanMatch[0], arabicEquivalent.toString()));
  }

  return Array.from(variants);
};

export const containsNumber = (value: string): boolean => {
  return (
    /\b\d+\b/.test(value) ||
    /\b(I{1,3}|IV|V?I{0,3}|IX|X{1,3}|XL|L)\b/.test(value)
  );
};
