import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeScreenInfoComponent } from './welcome-screen-info.component';

describe('WelcomeScreenInfoComponent', () => {
  let component: WelcomeScreenInfoComponent;
  let fixture: ComponentFixture<WelcomeScreenInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeScreenInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeScreenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
