import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-back-to-events',
  templateUrl: './dashboard-back-to-events.component.html',
  styleUrls: ['./dashboard-back-to-events.component.scss']
})
export class DashboardBackToEventsComponent {

  constructor(private router: Router) {}

  @Input() route = '';
  @Input() routeName = '';
  @Input() hidden = false;

  back() {
    this.router.navigate([this.route]);
  }
}
