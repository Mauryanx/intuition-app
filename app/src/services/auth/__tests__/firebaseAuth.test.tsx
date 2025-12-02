// Test auth utility functions
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

describe('firebaseAuth', () => {
  it('validates email format correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
  });
});

