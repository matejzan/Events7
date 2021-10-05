import { Component } from '@angular/core';
import { getAuth, signOut } from '@firebase/auth';
import { environment } from 'src/environments/environment';
import { initializeApp } from '@firebase/app';

initializeApp(environment.firebase);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Logged out.")
    }).catch(() => {
      window.alert("An error occured. Please try again!");
    });
  }
}
