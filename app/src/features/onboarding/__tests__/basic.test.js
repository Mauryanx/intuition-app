// Super basic test with minimal dependencies

describe('Basic Assertions', () => {
  test('true is true', () => {
    expect(true).toBe(true);
  });
  
  test('math works', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('strings can be compared', () => {
    expect('hello').toBe('hello');
  });
  
  test('arrays have expected length', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
  });
  
  test('objects have properties', () => {
    const obj = { name: 'Intuition App', version: '1.0.0' };
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('Intuition App');
  });
});
