import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuizResult } from './quiz-result';

describe('QuizResult', () => {
  let component: QuizResult;
  let fixture: ComponentFixture<QuizResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResult],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
