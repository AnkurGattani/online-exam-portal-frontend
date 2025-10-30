import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCard } from './nav-card';

describe('NavCard', () => {
  let component: NavCard;
  let fixture: ComponentFixture<NavCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
