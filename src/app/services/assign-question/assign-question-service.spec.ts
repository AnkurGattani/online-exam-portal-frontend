import { TestBed } from '@angular/core/testing';

import { AssignQuestionService } from './assign-question-service';

describe('AssignQuestionService', () => {
  let service: AssignQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
