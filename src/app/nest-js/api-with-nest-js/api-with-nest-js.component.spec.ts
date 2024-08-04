import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiWithNestJsComponent } from './api-with-nest-js.component';

describe('ApiWithNestJsComponent', () => {
  let component: ApiWithNestJsComponent;
  let fixture: ComponentFixture<ApiWithNestJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiWithNestJsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiWithNestJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
