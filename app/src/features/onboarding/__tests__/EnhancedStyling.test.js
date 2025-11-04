// Tests for enhanced styling in onboarding screens

describe('Enhanced Styling Tests', () => {
  // Test 1: Verify the enhanced styling properties exist
  test('IntroScreen styles contain enhanced styling properties', () => {
    // Import the styles from IntroScreens
    const IntroScreensModule = require('../IntroScreens');
    const styles = IntroScreensModule.__styles;
    
    // If styles are not exported directly, we can extract them from the file content
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../IntroScreens.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Check for the presence of new style properties in the file
    expect(fileContent).toContain('patternOverlay');
    expect(fileContent).toContain('accentLine');
    expect(fileContent).toContain('divider');
    expect(fileContent).toContain('kicker');
    expect(fileContent).toContain('buttonBlur');
  });
  
  // Test 2: Check that gradient configurations are correct
  test('Gradient configurations are set correctly', () => {
    const fs = require('fs');
    const path = require('path');
    
    // Check IntroScreens gradient config
    const introFilePath = path.join(__dirname, '../IntroScreens.tsx');
    const introFileContent = fs.readFileSync(introFilePath, 'utf8');
    
    expect(introFileContent).toContain('start={{ x: 0.1, y: 0 }}');
    expect(introFileContent).toContain('end={{ x: 0.9, y: 1 }}');
    expect(introFileContent).toContain('as readonly [ColorValue, ColorValue]');
    
    // Check PainPointScreens gradient config
    const painFilePath = path.join(__dirname, '../PainPointScreens.tsx');
    const painFileContent = fs.readFileSync(painFilePath, 'utf8');
    
    expect(painFileContent).toContain('start={{ x: 0.1, y: 0 }}');
    expect(painFileContent).toContain('end={{ x: 0.9, y: 1 }}');
    expect(painFileContent).toContain('as readonly [ColorValue, ColorValue]');
  });
  
  // Test 3: Verify screen content structure
  test('Screen content has the expected structure', () => {
    // Import the content arrays
    const { introScreens } = require('../IntroScreens');
    const { painPointScreens } = require('../PainPointScreens');
    
    // Check introScreens structure
    expect(introScreens).toHaveLength(3);
    introScreens.forEach(screen => {
      expect(screen).toHaveProperty('id');
      expect(screen).toHaveProperty('headline');
      expect(screen).toHaveProperty('subheadline');
      expect(screen).toHaveProperty('body');
      expect(screen).toHaveProperty('gradientColors');
    });
    
    // Check painPointScreens structure
    expect(painPointScreens).toHaveLength(3);
    painPointScreens.forEach(screen => {
      expect(screen).toHaveProperty('id');
      expect(screen).toHaveProperty('headline');
      expect(screen).toHaveProperty('subheadline');
      expect(screen).toHaveProperty('body');
      expect(screen).toHaveProperty('gradientColors');
    });
  });
});
