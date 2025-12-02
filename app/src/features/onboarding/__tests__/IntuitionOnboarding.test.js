// Basic structure tests for Intuition Onboarding Flow components
describe('Intuition Onboarding Flow', () => {
  
  it('WhyView should contain correct slide titles', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CalAI/WhyView.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Check for slide content
    expect(fileContent).toContain("Overthinking is a Trap");
    expect(fileContent).toContain("Analysis Paralysis");
    expect(fileContent).toContain("The Speed Advantage");
    expect(fileContent).toContain("Calibrate, Don't Guess");
  });

  it('OnboardingQuiz should contain question logic', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CalAI/OnboardingQuiz.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Check for questions
    expect(fileContent).toContain("What's your current decision style?");
    expect(fileContent).toContain("How often do you regret a choice?");
    
    // Check for fake calculation logic
    expect(fileContent).toContain("setTimeout");
    expect(fileContent).toContain("setIsCalculating");
  });

  it('FinalCalculateView should contain typewriter messages', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CalAI/FinalCalculateView.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Check for typewriter script
    expect(fileContent).toContain("Welcome to Intuition Trainer");
    expect(fileContent).toContain("invest in your mind");
    
    // Check for haptics usage
    expect(fileContent).toContain("Haptics.impactAsync");
  });
});

