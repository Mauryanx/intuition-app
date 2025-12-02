import { formatAuthTitle } from '../AuthScreen';

describe('AuthScreen', () => {
  it('formats auth title correctly', () => {
    expect(formatAuthTitle()).toBe('Welcome Back');
    expect(formatAuthTitle('Alex')).toBe('Welcome back, Alex');
    expect(formatAuthTitle('  ')).toBe('Welcome Back');
  });
});

