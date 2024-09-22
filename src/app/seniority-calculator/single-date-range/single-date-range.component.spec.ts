import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDateRangeComponent } from './single-date-range.component';

describe('SingleDateRangeComponent', () => {
  let component: SingleDateRangeComponent;
  let fixture: ComponentFixture<SingleDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDateRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
