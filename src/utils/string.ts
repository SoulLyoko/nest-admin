/**
 * 首字母大写
 */
export const capitalize = (val: string) => {
  const [first, ...rest] = val;
  return [first.toUpperCase(), ...rest].join('');
};
