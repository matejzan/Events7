import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss']
})
export class DashboardNavigationComponent implements OnInit {
  
  credentialsShown = false;
  userDisplayName = '';
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        this.userDisplayName = user.displayName;
      }
    });    
  }
}
