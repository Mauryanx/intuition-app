import { renderHook, act } from '@testing-library/react-hooks';

import { usePaywallLogic } from '../usePaywallLogic';
import { SuperwallMock } from '@/config/superwall';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('@/state/profile', () => ({
  useProfileStore: jest.fn(() => ({ age: 25 })),
}));

jest.mock('@/config/superwall', () => ({
  SuperwallMock: {
    shared: {
      register: jest.fn().mockResolvedValue(true),
    },
  },
}));

describe('usePaywallLogic', () => {
  it('calls Superwall when primary CTA pressed', async () => {
    const { result } = renderHook(() => usePaywallLogic());

    await act(async () => {
      result.current.pressedButton();
    });

    expect(SuperwallMock.shared.register).toHaveBeenCalled();
  });
});

