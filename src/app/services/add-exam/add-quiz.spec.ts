import { TestBed } from '@angular/core/testing';

import { AddQuizService } from './add-quiz';

describe('AddQuiz', () => {
  let service: AddQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
