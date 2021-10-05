import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeScreenLoginRegisterComponent } from './welcome-screen-login-register.component';

describe('WelcomeScreenLoginRegisterComponent', () => {
  let component: WelcomeScreenLoginRegisterComponent;
  let fixture: ComponentFixture<WelcomeScreenLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeScreenLoginRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeScreenLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
