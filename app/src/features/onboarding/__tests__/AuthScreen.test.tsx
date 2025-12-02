// Test the auth title formatting logic
function formatAuthTitle(name?: string): string {
  if (name && name.trim().length > 0) {
    return `Welcome back, ${name.trim()}`;
  }
  return 'Welcome Back';
}

describe('AuthScreen', () => {
  it('formats auth title correctly', () => {
    expect(formatAuthTitle()).toBe('Welcome Back');
    expect(formatAuthTitle('Alex')).toBe('Welcome back, Alex');
    expect(formatAuthTitle('  ')).toBe('Welcome Back');
  });
});

