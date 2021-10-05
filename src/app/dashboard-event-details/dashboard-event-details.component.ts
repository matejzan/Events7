import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData, doc, getDoc, getDocs, query, where, collection, getFirestore } from '@firebase/firestore';

const db = getFirestore();

@Component({
  selector: 'app-dashboard-event-details',
  templateUrl: './dashboard-event-details.component.html',
  styleUrls: ['./dashboard-event-details.component.scss']
})
export class DashboardEventDetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.getEventData();
  }

  event: DocumentData = {};

  relatedEvents: DocumentData[] = [];

  fetchingEvent = true;
  
  fetchingRelatedEvents = false;

  routeParamsNotChangedYet = true;

  deleteEventDialogOpen = false;

  openDeleteEventDialog() {
    this.deleteEventDialogOpen = true;
  }

  eventDeleteDialogClosed() {
    this.deleteEventDialogOpen = false;
  }

  eventDeleted() {
    this.router.navigate(['dashboard/events']);
  }

  editEvent() {
    this.router.navigate(['dashboard/edit-event/event-'+this.event.id], { state: {prevLocation: 'dashboard/event-details/event-'+this.event.id}});
  }

  async fetchEvent(eventIdentifier: string) {
    this.fetchingEvent = true;
    const docRef = doc(db, "Events", eventIdentifier);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.event = {
        id: docSnap.data().id,
        name: docSnap.data().name,
        description: docSnap.data().description,
        type: docSnap.data().type,
        priority: docSnap.data().priority,
        related_events: docSnap.data().related_events,
      }
    } else {
      window.alert("Event does not exist!")
      this.router.navigate(['dashboard/events']);
    }
    this.fetchingEvent = false;
    if (this.event.related_events.length) {
      this.getRelatedEvents();
    }
  }

  openEventCardDetails(event: DocumentData) {
    this.router.navigate(['dashboard/event-details/event-'+event.id], { state: {data: event}});
  }

  async getRelatedEvents() {
    this.relatedEvents = [];
    this.fetchingRelatedEvents = true;
    const q = query(collection(db, "Events"), where("id", "in", this.event.related_events));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.relatedEvents.push(doc.data());
    });
    this.fetchingRelatedEvents = false;
  }

  getEventData() {
    const eventIdentifier = this.route.snapshot.paramMap.get('event-id');
    if (
      eventIdentifier 
      && this.router.getCurrentNavigation() 
      && this.router.getCurrentNavigation()!.extras.state 
      && this.router.getCurrentNavigation()!.extras.state!.data.id === parseInt(eventIdentifier.split('-')[1])
    ) 
    {
      this.event = this.router.getCurrentNavigation()!.extras.state!.data;
      this.fetchingEvent = false;
      if (this.event.related_events.length) {
        this.getRelatedEvents();
      } else {
        this.relatedEvents = [];
      }
    } else {
      if (eventIdentifier) {
        this.fetchEvent(eventIdentifier);
      } else {
        window.alert("There was an error. Please try again");
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      if (this.routeParamsNotChangedYet) {
        this.routeParamsNotChangedYet = false;
      } else {
        this.getEventData();
      }
    });
  }
}