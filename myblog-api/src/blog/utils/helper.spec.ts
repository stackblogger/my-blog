import { ConvertToSlug, RandomString } from './helper';

describe('Helper', () => {
  it('should convert an alphanumeric string to slug', () => {
    const str = 'hey this is a simple string';
    const result = ConvertToSlug(str);
    expect(result).toEqual('hey-this-is-a-simple-string');
  });

  it('should generate some random string', () => {
    const randomString = RandomString(10);
    const randomString2 = RandomString(10);
    expect(randomString).toHaveLength(10);
    expect(randomString2).not.toEqual(randomString);
  });
});
