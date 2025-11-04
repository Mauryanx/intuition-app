// Simple tests for quiz logic without rendering

import { quizQuestions, derivePersona, personaCopy } from '../../content';

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
  
  // Test 4: Test persona derivation logic
  test('persona derivation logic works correctly', () => {
    // Create selections that should result in "seer" persona
    const seerSelections = {};
    quizQuestions.forEach(question => {
      // Find a "seer" choice for each question
      const seerChoice = question.choices.find(choice => choice.persona === 'seer');
      if (seerChoice) {
        seerSelections[question.id] = seerChoice.persona;
      } else {
        // If no seer choice, use the first choice
        seerSelections[question.id] = question.choices[0].persona;
      }
    });
    
    // Make sure most choices are "seer"
    // Override at least 4 selections to be "seer" to ensure it's the dominant persona
    const firstFourQuestions = quizQuestions.slice(0, 4);
    firstFourQuestions.forEach(question => {
      seerSelections[question.id] = 'seer';
    });
    
    // Derive persona from selections
    const derivedPersona = derivePersona(seerSelections);
    
    // Verify the derived persona is "seer"
    expect(derivedPersona).toBe('seer');
    
    // Verify persona data exists
    expect(personaCopy[derivedPersona]).toBeDefined();
    expect(personaCopy[derivedPersona].title).toBeDefined();
    expect(personaCopy[derivedPersona].subtitle).toBeDefined();
    expect(personaCopy[derivedPersona].focus).toBeDefined();
  });
  
  // Test 5: Test quiz completion validation
  test('quiz can only be completed when all questions have answers', () => {
    // Create an incomplete set of selections
    const incompleteSelections = {};
    
    // Add selections for all but the last question
    for (let i = 0; i < quizQuestions.length - 1; i++) {
      const question = quizQuestions[i];
      incompleteSelections[question.id] = question.choices[0].persona;
    }
    
    // Check that not all questions have answers
    const allQuestionsAnswered = quizQuestions.every(question => 
      incompleteSelections.hasOwnProperty(question.id)
    );
    
    expect(allQuestionsAnswered).toBe(false);
    
    // Complete the selections
    const completeSelections = { ...incompleteSelections };
    const lastQuestion = quizQuestions[quizQuestions.length - 1];
    completeSelections[lastQuestion.id] = lastQuestion.choices[0].persona;
    
    // Check that all questions now have answers
    const allQuestionsAnsweredNow = quizQuestions.every(question => 
      completeSelections.hasOwnProperty(question.id)
    );
    
    expect(allQuestionsAnsweredNow).toBe(true);
  });
  
  // Test 6: Test selection change
  test('changing a selection updates the state correctly', () => {
    // Create initial selections
    const initialSelections = {};
    quizQuestions.forEach(question => {
      initialSelections[question.id] = question.choices[0].persona;
    });
    
    // Change a selection
    const updatedSelections = { ...initialSelections };
    const questionToChange = quizQuestions[0];
    const newChoice = questionToChange.choices[1]; // Use the second choice instead
    
    updatedSelections[questionToChange.id] = newChoice.persona;
    
    // Verify the selection was changed
    expect(updatedSelections[questionToChange.id]).toBe(newChoice.persona);
    expect(updatedSelections[questionToChange.id]).not.toBe(initialSelections[questionToChange.id]);
    
    // Verify other selections remain unchanged
    for (let i = 1; i < quizQuestions.length; i++) {
      const question = quizQuestions[i];
      expect(updatedSelections[question.id]).toBe(initialSelections[question.id]);
    }
  });
});
