import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-back',
  templateUrl: './dashboard-back.component.html',
  styleUrls: ['./dashboard-back.component.scss']
})
export class DashboardbackComponent {

  constructor(private router: Router) {}

  @Input() route = '';
  @Input() routeName = '';
  @Input() hidden = false;

  back() {
    this.router.navigate([this.route]);
  }
}
