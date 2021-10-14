import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeScreenInfoComponent } from './welcome-screen-info/welcome-screen-info.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { WelcomeScreenLoginRegisterComponent } from './welcome-screen-login-register/welcome-screen-login-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavigationComponent } from './dashboard-navigation/dashboard-navigation.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { FullscreenLoaderComponent } from './fullscreen-loader/fullscreen-loader.component';
import { DashboardEventEditComponent } from './dashboard-event-edit/dashboard-event-edit.component';
import { DashboardEventsViewComponent } from './dashboard-events-view/dashboard-events-view.component';
import { DialogComponent } from './dialog/dialog.component';
import { DashboardEventDetailsComponent } from './dashboard-event-details/dashboard-event-details.component';
import { DashboardEventCardComponent } from './dashboard-event-card/dashboard-event-card.component';
import { DashboardEventDeleteDialogComponent } from './dashboard-event-delete-dialog/dashboard-event-delete-dialog.component';
import { DashboardbackComponent } from './dashboard-back/dashboard-back.component';
import { AboutComponent } from './about/about.component';
import { GithubComponent } from './github/github.component';
import { StoreModule } from '@ngrx/store';
import { eventsReducer } from './state/events.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenInfoComponent,
    WelcomeScreenComponent,
    WelcomeScreenLoginRegisterComponent,
    DashboardComponent,
    DashboardNavigationComponent,
    DashboardEventsComponent,
    FullscreenLoaderComponent,
    DashboardEventEditComponent,
    DashboardEventsViewComponent,
    DialogComponent,
    DashboardEventDetailsComponent,
    DashboardEventCardComponent,
    DashboardEventDeleteDialogComponent,
    DashboardbackComponent,
    AboutComponent,
    GithubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    StoreModule.forRoot({ events: eventsReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
