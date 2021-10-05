import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventsViewComponent } from './dashboard-events-view.component';

describe('DashboardEventsViewComponent', () => {
  let component: DashboardEventsViewComponent;
  let fixture: ComponentFixture<DashboardEventsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEventsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
