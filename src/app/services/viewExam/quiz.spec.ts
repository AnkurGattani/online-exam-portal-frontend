import { TestBed } from '@angular/core/testing';

class Quiz {}

describe('Quiz', () => {
  let service: Quiz;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Quiz]
    });
    service = TestBed.inject(Quiz);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
