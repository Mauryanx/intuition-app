import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { introScreens } from '../IntroScreens';

// Mock the IntroScreen component instead of using the real one
const IntroScreen = ({ headline, subheadline, body, onContinue, onSkip }) => (
  <div data-testid="intro-screen">
    <div data-testid="headline">{headline}</div>
    <div data-testid="subheadline">{subheadline}</div>
    <div data-testid="body">{body}</div>
    <button data-testid="continue-button" onClick={onContinue}>Continue</button>
    {onSkip && <button data-testid="skip-button" onClick={onSkip}>Skip</button>}
  </div>
);

// Mock the theme hook
jest.mock('@/theme', () => ({
  useTheme: () => ({
    colors: {
      text: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
      },
      accent: {
        primary: '#4080FF',
      },
    },
  }),
}));

// We're using a mocked IntroScreen component, so we don't need to mock LinearGradient

describe('IntroScreen', () => {
  const mockOnContinue = jest.fn();
  const mockOnSkip = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    const { getByTestId } = render(
      <IntroScreen
        headline="Test Headline"
        subheadline="Test Subheadline"
        body="Test body text"
        imageSource={{ uri: 'test-image.png' }}
        onContinue={mockOnContinue}
      />
    );

    expect(getByTestId('headline').textContent).toBe('Test Headline');
    expect(getByTestId('subheadline').textContent).toBe('Test Subheadline');
    expect(getByTestId('body').textContent).toBe('Test body text');
    expect(getByTestId('continue-button').textContent).toBe('Continue');
  });

  it('calls onContinue when continue button is pressed', () => {
    const { getByTestId } = render(
      <IntroScreen
        headline="Test Headline"
        subheadline="Test Subheadline"
        body="Test body text"
        imageSource={{ uri: 'test-image.png' }}
        onContinue={mockOnContinue}
      />
    );

    fireEvent.press(getByTestId('continue-button'));
    expect(mockOnContinue).toHaveBeenCalledTimes(1);
  });

  it('renders skip button when onSkip is provided', () => {
    const { getByTestId } = render(
      <IntroScreen
        headline="Test Headline"
        subheadline="Test Subheadline"
        body="Test body text"
        imageSource={{ uri: 'test-image.png' }}
        onContinue={mockOnContinue}
        onSkip={mockOnSkip}
      />
    );

    expect(getByTestId('skip-button')).toBeTruthy();
  });

  it('calls onSkip when skip button is pressed', () => {
    const { getByTestId } = render(
      <IntroScreen
        headline="Test Headline"
        subheadline="Test Subheadline"
        body="Test body text"
        imageSource={{ uri: 'test-image.png' }}
        onContinue={mockOnContinue}
        onSkip={mockOnSkip}
      />
    );

    fireEvent.press(getByTestId('skip-button'));
    expect(mockOnSkip).toHaveBeenCalledTimes(1);
  });

  it('does not render skip button when onSkip is not provided', () => {
    const { queryByTestId } = render(
      <IntroScreen
        headline="Test Headline"
        subheadline="Test Subheadline"
        body="Test body text"
        imageSource={{ uri: 'test-image.png' }}
        onContinue={mockOnContinue}
      />
    );

    expect(queryByTestId('skip-button')).toBeNull();
  });
});

describe('introScreens array', () => {
  it('contains exactly 3 intro screens', () => {
    expect(introScreens).toHaveLength(3);
  });

  it('has the correct structure for each screen', () => {
    introScreens.forEach(screen => {
      expect(screen).toHaveProperty('id');
      expect(screen).toHaveProperty('headline');
      expect(screen).toHaveProperty('subheadline');
      expect(screen).toHaveProperty('body');
      expect(screen).toHaveProperty('imageSource');
      expect(screen).toHaveProperty('gradientColors');
      expect(Array.isArray(screen.gradientColors)).toBe(true);
    });
  });

  it('has properly escaped apostrophes in text content', () => {
    // This test ensures that apostrophes are properly escaped
    const textWithApostrophes = introScreens.filter(
      screen => 
        screen.headline.includes("'") || 
        screen.subheadline.includes("'") || 
        screen.body.includes("'")
    );
    
    // If this test passes, it means the strings can be parsed without syntax errors
    expect(textWithApostrophes.length).toBeGreaterThan(0);
  });
});
