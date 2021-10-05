import { Component, OnInit } from '@angular/core';
import { collection, query, getDocs, getFirestore, DocumentData, where, orderBy } from "firebase/firestore";
import { Router } from '@angular/router';

const db = getFirestore();

@Component({
  selector: 'app-dashboard-events-view',
  templateUrl: './dashboard-events-view.component.html',
  styleUrls: ['./dashboard-events-view.component.scss']
})

export class DashboardEventsViewComponent implements OnInit {

  constructor(private router: Router) { }

  fetchedEvents: DocumentData[] = [];

  fetchingEvents!: boolean;

  deleteEventDialogOpen = false;

  eventToDelete: DocumentData = {};

  eventTypes = ['all', 'app', 'adds', 'crosspromo', 'devops'];

  chosenEventType = 'all';

  openDeleteEventDialog(event: DocumentData) {
    this.eventToDelete = event;
    this.deleteEventDialogOpen = true;
  }

  eventDeleteDialogClosed(deletedDocument: Boolean) {
    this.deleteEventDialogOpen = false;
    if (deletedDocument) {
      this.getData();
    }
  }

  openEventCardDetails(e: any, event: DocumentData) {
    if (e.target.nodeName !== 'path' && e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'svg') {
      this.router.navigate(['dashboard/event-details/event-'+event.id], { state: {data: event}});
    }
  }

  showEventType(type: string) {
    this.chosenEventType = type;
    this.getData();
  }
  
  async getData() {
    this.fetchingEvents = true;
    this.fetchedEvents = [];
    let q = query(collection(db, "Events"), orderBy("priority", "desc"));
    if (this.chosenEventType !== 'all') {
      q = query(collection(db, "Events"), where("type", "==", this.chosenEventType));
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.fetchedEvents.push(doc.data());
    });
    this.fetchingEvents = false;
  }

  ngOnInit(): void {
    this.getData();
  }
}
