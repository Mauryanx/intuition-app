// Simple structure test for CinematicIntro
describe('CinematicIntro', () => {
  it('should include the Intuition Trainer welcome text', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CinematicIntro/index.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Check for main titles
    expect(fileContent).toContain("Welcome to Intuition Trainer");
    expect(fileContent).toContain("Train Your Gut Instinct");
    expect(fileContent).toContain("Backed by Science");
    
    // Check for subtitles
    expect(fileContent).toContain("calibrate your gut decisions");
    expect(fileContent).toContain("rapid-fire exercises");
    
    // Check for footer stats
    expect(fileContent).toContain("Decisions Logged");
  });

  it('should define the step-based visuals', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CinematicIntro/index.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Check for visual components
    expect(fileContent).toContain("Step0Visuals");
    expect(fileContent).toContain("Step1Visuals");
    expect(fileContent).toContain("Step2Visuals");
    expect(fileContent).toContain("TestimonialView");
    expect(fileContent).toContain("FishAnimationView");
  });
});

