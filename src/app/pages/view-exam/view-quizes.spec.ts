import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQuizes } from './view-quizes';

describe('ViewQuizes', () => {
  let component: ViewQuizes;
  let fixture: ComponentFixture<ViewQuizes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
