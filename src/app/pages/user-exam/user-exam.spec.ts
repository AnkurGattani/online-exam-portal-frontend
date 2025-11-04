import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExam } from './user-exam';

describe('UserExam', () => {
  let component: UserExam;
  let fixture: ComponentFixture<UserExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
