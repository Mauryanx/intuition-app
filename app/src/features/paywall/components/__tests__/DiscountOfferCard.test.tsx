import { formatCountdown } from '../DiscountOfferCard';

describe('DiscountOfferCard', () => {
  it('formats countdown correctly', () => {
    expect(formatCountdown(300000)).toBe('05:00');
    expect(formatCountdown(0)).toBe('00:00');
    expect(formatCountdown(null)).toBe('00:00');
  });
});

