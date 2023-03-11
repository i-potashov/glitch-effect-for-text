type RndStringFunc = (array: string[], diff: number, chance: number, symbolsArr: string[]) => string[];

const getRndChance = (chance: number): boolean => (Math.random() >= chance ? true : false);

export const getRndFromArr = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getRndString: RndStringFunc = (array, diff, chance, symbolsArr) =>
  array.map((v, i) => {
    if (i < diff) return getRndChance(chance) ? `<span>${getRndFromArr(symbolsArr)}</span>` : v;
    return '';
  });

export const getIncRndString: RndStringFunc = (array, diff, chance, symbolsArr) =>
  array.map((v, i) => {
    if (i <= diff) return getRndChance(chance) ? v : `<span>${getRndFromArr(symbolsArr)}</span>`;
    return '';
  });

export const getDecrRndString: RndStringFunc = (array, diff, chance, symbolsArr) =>
  array.map((v, i) => {
    if (i < diff) return getRndChance(chance) ? v : `<span>${getRndFromArr(symbolsArr)}</span>`;
    return '';
  });
