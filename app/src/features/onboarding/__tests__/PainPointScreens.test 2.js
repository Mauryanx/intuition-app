// Basic tests for pain point screens

describe('Pain Point Screens', () => {
  // Test 1: Check that painPointScreens has the correct structure
  test('painPointScreens array has the correct structure', () => {
    const { painPointScreens } = require('../PainPointScreens');
    
    // Check that we have exactly 3 pain point screens
    expect(painPointScreens.length).toBe(3);
    
    // Check that each screen has the required properties
    painPointScreens.forEach(screen => {
      expect(screen).toHaveProperty('id');
      expect(screen).toHaveProperty('headline');
      expect(screen).toHaveProperty('subheadline');
      expect(screen).toHaveProperty('body');
      expect(screen).toHaveProperty('imageSource');
      expect(screen).toHaveProperty('gradientColors');
    });
    
    // Check specific content of first screen
    expect(painPointScreens[0].id).toBe('bad-decisions');
    expect(painPointScreens[0].headline).toBe('When Intuition Leads You Astray');
    
    // Check specific content of second screen
    expect(painPointScreens[1].id).toBe('anxiety-judgment');
    
    // Check specific content of third screen
    expect(painPointScreens[2].id).toBe('imagination-vs-clarity');
  });
});
