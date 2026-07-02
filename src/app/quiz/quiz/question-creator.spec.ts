import { getPossibleAnswers } from './question-creator';

describe('getPossibleAnswers', () => {
  it('should return shuffled answers for multiple choice', () => {
    const question = {
      type: 'multiple',
      correct_answer: 'A',
      incorrect_answers: ['B', 'C', 'D'],
    } as any;

    const result = getPossibleAnswers(question);
    expect(result.length).toBe(4);
    expect(result).toContain('A');
  });

  it('should return sorted answers for boolean', () => {
    const question = {
      type: 'boolean',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    } as any;

    expect(getPossibleAnswers(question)).toEqual(['False', 'True']);
  });
});
