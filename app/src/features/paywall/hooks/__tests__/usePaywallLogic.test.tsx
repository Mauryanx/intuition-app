import { determinePlacement } from '../usePaywallLogic';

describe('determinePlacement', () => {
  it('falls back to default when age is missing', () => {
    expect(determinePlacement()).toBe('age23to28');
  });
});

