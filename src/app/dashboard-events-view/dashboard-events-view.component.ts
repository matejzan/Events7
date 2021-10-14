import { Component, OnInit } from '@angular/core';
import { collection, query, getDocs, getFirestore, DocumentData, where, orderBy } from "firebase/firestore";
import { Router } from '@angular/router';
import { fetchEventsService } from '../dashboard-events/event.service';
import { fetchedEvents, filteredEvents } from '../state/events.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectAllEvents, selectEventsLength, selectLoadingEvents } from '../state/events.selector';

const db = getFirestore();

@Component({
  selector: 'app-dashboard-events-view',
  templateUrl: './dashboard-events-view.component.html',
  styleUrls: ['./dashboard-events-view.component.scss']
})

export class DashboardEventsViewComponent implements OnInit {

  constructor(private router: Router, private eventsService: fetchEventsService, private store: Store<AppState>) { }

  events$ = this.store.pipe(select(selectAllEvents));

  eventsLen$ = this.store.pipe(select(selectEventsLength));

  loading$ = this.store.pipe(select(selectLoadingEvents));

  fetchedEvents: DocumentData[] = [];

  fetchingEvents = false;

  deleteEventDialogOpen = false;

  eventToDelete: DocumentData = {};

  eventTypes = ['all', 'app', 'ads', 'crosspromo', 'liveops'];

  chosenEventType = 'all';

  openDeleteEventDialog(event: DocumentData) {
    this.eventToDelete = event;
    this.deleteEventDialogOpen = true;
  }

  eventDeleteDialogClosed(deletedDocument: Boolean) {
    this.deleteEventDialogOpen = false;
    if (deletedDocument) {
      //this.getData();
    }
  }

  openEventCardDetails(e: any, event: DocumentData) {
    if (e.target.nodeName !== 'path' && e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'svg') {
      this.router.navigate(['dashboard/event-details/event-'+event.id], { state: {data: event}});
    }
  }

  showEventType(type: string) {
    this.chosenEventType = type;
    this.eventsService
      .getFilteredEvents(this.chosenEventType)
      .subscribe((events) =>
        this.store.dispatch(filteredEvents({ events })),
      );
  }

  ngOnInit(): void {
    this.eventsService
      .getEvents()
      .subscribe((events) =>
        this.store.dispatch(fetchedEvents({ events })),
      );
  }
}
