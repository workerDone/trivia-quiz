import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Quizzes } from './quizzes';

describe('Quizzes', () => {
  let component: Quizzes;
  let fixture: ComponentFixture<Quizzes>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quizzes],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(Quizzes);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTesting.expectOne('https://opentdb.com/api_category.php').flush({ trivia_categories: [] });
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
