import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen-login-register',
  templateUrl: './welcome-screen-login-register.component.html',
  styleUrls: ['./welcome-screen-login-register.component.scss']
})

export class WelcomeScreenLoginRegisterComponent implements OnInit {

  constructor(private router: Router) {}

  registerForm!: FormGroup;

  loginForm!: FormGroup;

  welcomeAction = 'login';
  
  cardOpen = false;

  registerFormLoading = false;

  loginFormLoading = false;

  loginError = '';

  registerError = '';

  changeView(view: string) {
    this.welcomeAction = view;
  }

  handleKeyUp(e: KeyboardEvent, form: string) {
    if (e.code === 'Enter') {
      if (form === 'login') {
        this.login();
      } else if (form === 'register' && !this.registerForm.invalid) {
        this.register();
      }
    }
  }

  openLoginCard() {
    this.welcomeAction = 'login';
    this.cardOpen = true;
  }

  openRegisterCard() {
    this.welcomeAction = 'register';
    this.cardOpen = true;
  }

  closeCard() {
    this.cardOpen = false;
  }

  register() {
    this.registerFormLoading = true;
    const data = this.registerForm.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.registerEmail, data.registerPassword)
      .then(() => {
        this.setUsersDisplayName(data.fullName);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.registerError = 'Email already in use.'
        } else {
          window.alert("Something went wrong. Please try again");
        }
        this.registerFormLoading = false;
      });
  }

  login() {
    this.loginFormLoading = true;
    const data = this.loginForm.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        this.loginFormLoading = false;
        this.router.navigate(['dashboard/events'])
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
          this.loginError = 'Invalid email address. Please try again!';
        } else if (errorCode === 'auth/wrong-password') {
          this.loginError = 'Wrong password. Please try again!';
        } else {
          window.alert("Something went wrong. Please try again");
        }
        this.loginFormLoading = false;
      });
  }

  setUsersDisplayName(fullName: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: fullName
        }).then(() => {
          this.registerFormLoading = false;
          this.router.navigate(['dashboard/events'])
        }).catch(() => {
          window.alert('An error occured, please try again!');
          this.registerFormLoading = false;
        });
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      registerEmail: new FormControl('', [Validators.required, Validators.email]),
      registerPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  get fullName() { return this.registerForm.get('fullName'); }
  get registerEmail() { return this.registerForm.get('registerEmail'); }
  get registerPassword() { return this.registerForm.get('registerPassword'); }
}
