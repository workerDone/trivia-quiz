import { TestBed } from '@angular/core/testing';

import { QuizApi } from './quiz-api';

describe('QuizApi', () => {
  let service: QuizApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
