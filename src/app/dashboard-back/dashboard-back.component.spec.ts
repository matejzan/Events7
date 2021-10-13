import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbackComponent } from './dashboard-back.component';

describe('DashboardbackComponent', () => {
  let component: DashboardbackComponent;
  let fixture: ComponentFixture<DashboardbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
