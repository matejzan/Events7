import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBackToEventsComponent } from './dashboard-back-to-events.component';

describe('DashboardBackToEventsComponent', () => {
  let component: DashboardBackToEventsComponent;
  let fixture: ComponentFixture<DashboardBackToEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBackToEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBackToEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
