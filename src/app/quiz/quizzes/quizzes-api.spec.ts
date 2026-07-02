import { TestBed } from '@angular/core/testing';

import { QuizzesApi } from './quizzes-api';

describe('QuizzesApi', () => {
  let service: QuizzesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
