import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventDeleteDialogComponent } from './dashboard-event-delete-dialog.component';

describe('DashboardEventDeleteDialogComponent', () => {
  let component: DashboardEventDeleteDialogComponent;
  let fixture: ComponentFixture<DashboardEventDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEventDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
