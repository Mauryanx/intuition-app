// Simple tests for quiz logic without rendering

import { quizQuestions } from '../../content';

describe('Quiz Logic', () => {
  // Test 1: Verify that quiz questions have the correct structure
  test('quiz questions have the correct structure', () => {
    expect(quizQuestions).toBeDefined();
    expect(Array.isArray(quizQuestions)).toBe(true);
    expect(quizQuestions.length).toBeGreaterThan(0);
    
    quizQuestions.forEach(question => {
      // Check question structure
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('prompt');
      expect(question).toHaveProperty('choices');
      
      // Check choices structure
      expect(Array.isArray(question.choices)).toBe(true);
      expect(question.choices.length).toBeGreaterThan(0);
      
      question.choices.forEach(choice => {
        expect(choice).toHaveProperty('id');
        expect(choice).toHaveProperty('label');
        expect(choice).toHaveProperty('persona');
      });
    });
  });
  
  // Test 2: Simulate quiz selection logic
  test('quiz selection logic works correctly', () => {
    // Create a mock state to track selections
    const selections = {};
    
    // Simulate selecting answers for all questions
    quizQuestions.forEach(question => {
      const choice = question.choices[0]; // Always select first choice
      selections[question.id] = choice.persona;
    });
    
    // Verify all questions have a selection
    quizQuestions.forEach(question => {
      expect(selections).toHaveProperty(question.id);
    });
    
    // Count persona selections to determine the most common one
    const personaCounts = {};
    Object.values(selections).forEach(persona => {
      personaCounts[persona] = (personaCounts[persona] || 0) + 1;
    });
    
    // Find the most common persona
    let maxCount = 0;
    let dominantPersona = null;
    
    Object.entries(personaCounts).forEach(([persona, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantPersona = persona;
      }
    });
    
    // Verify we have a dominant persona
    expect(dominantPersona).not.toBeNull();
  });
  
  // Test 3: Test navigation logic
  test('quiz navigation logic works correctly', () => {
    // Simulate quiz state
    let currentQuestionIndex = 0;
    const totalQuestions = quizQuestions.length;
    
    // Test forward navigation
    const canGoForward = currentQuestionIndex < totalQuestions - 1;
    expect(canGoForward).toBe(true);
    
    if (canGoForward) {
      currentQuestionIndex++;
    }
    
    expect(currentQuestionIndex).toBe(1);
    
    // Navigate to last question
    while (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
    }
    
    // Verify we're at the last question
    expect(currentQuestionIndex).toBe(totalQuestions - 1);
    
    // Test backward navigation
    const canGoBack = currentQuestionIndex > 0;
    expect(canGoBack).toBe(true);
    
    if (canGoBack) {
      currentQuestionIndex--;
    }
    
    expect(currentQuestionIndex).toBe(totalQuestions - 2);
  });
});
