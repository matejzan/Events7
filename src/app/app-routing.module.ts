import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardEventsViewComponent } from './dashboard-events-view/dashboard-events-view.component';
import { DashboardEventEditComponent } from './dashboard-event-edit/dashboard-event-edit.component';
import { DashboardEventDetailsComponent } from './dashboard-event-details/dashboard-event-details.component';
import { AboutComponent } from './about/about.component';
import { GithubComponent } from './github/github.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', 
      component: WelcomeScreenComponent
    },
    {
      path: 'dashboard', 
      component: DashboardComponent,
      children: [
        {
          path: 'events', 
          component: DashboardEventsViewComponent,
        },
        {
          path: 'add-new-event', 
          component: DashboardEventEditComponent,
        },
        {
          path: 'edit-event/:event-id', 
          component: DashboardEventEditComponent,
        },
        {
          path: 'event-details/:event-id', 
          component: DashboardEventDetailsComponent,
        },
        {
          path: 'about', 
          component: AboutComponent
        },
        {
          path: 'code', 
          component: GithubComponent
        },
      ]
    },
  ], 
  {
    scrollPositionRestoration: 'top',
    scrollOffset: [0, 0],
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
