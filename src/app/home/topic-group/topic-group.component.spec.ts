import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGroupComponent } from './topic-group.component';

describe('TopicGroupComponent', () => {
  let component: TopicGroupComponent;
  let fixture: ComponentFixture<TopicGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
