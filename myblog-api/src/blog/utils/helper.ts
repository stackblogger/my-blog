export function ConvertToSlug(str: string): string {
  return str
    .replace(/\s/g, '-') // replace all spaces with -
    .toLowerCase()
    .replace(/[^\w\s]/g, '-') // replace all special chars with -
    .replace(/[0-9]/g, '') // remove all numbers
    .replace(/\-{2,}/g, '-') // replace more than one - with single -
    .replace(/-$/, '') // replace last char if its -
    .trim() // remove any spaces from start or end
    .replace(/^-/, ''); // remove first - if there is any
}

const ALPHA_STRING = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function RandomString(length: number): string {
  let s = '';
  while (s.length < length) {
    s += ALPHA_STRING.charAt((Math.random() * 62) | 0);
  }
  return s.toLowerCase();
}
