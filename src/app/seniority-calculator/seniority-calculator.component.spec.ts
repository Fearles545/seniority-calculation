import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorityCalculatorComponent } from './seniority-calculator.component';

describe('SeniorityCalculatorComponent', () => {
  let component: SeniorityCalculatorComponent;
  let fixture: ComponentFixture<SeniorityCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeniorityCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
