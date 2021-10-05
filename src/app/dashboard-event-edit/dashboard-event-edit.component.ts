import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, query, where, getDocs, getDoc, doc, setDoc, orderBy, limit, getFirestore, DocumentData } from "firebase/firestore";
import { Location } from '@angular/common'

const db = getFirestore();

@Component({
  selector: 'app-dashboard-event-edit',
  templateUrl: './dashboard-event-edit.component.html',
  styleUrls: ['./dashboard-event-edit.component.scss']
})

export class DashboardEventEditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private location: Location) {  }

  eventEditForm!: FormGroup;

  relatedEventsDialogNotOpenYet = true;

  editingEvent = false;

  fetchingEvent = false;

  formErrors = {
    eventNameError: '',
    eventDescriptionError: '',
    eventTypeError: '',
  }

  formValid = false;

  eventTypes = ['app', 'ads', 'crosspromo', 'liveops'];

  fetchingRelatedEvents = false;

  savingEvent = false;

  relatedEventsArray: number[] = [];

  relatedEventsDialogOpen = false;

  relatedEventsCandidates: DocumentData[] = [];

  backRoute = '';

  backText = '';

  eventData = {
    eventId: -1,
    eventName: '',
    eventDescription: '',
    eventType: '',
    eventPriority: 0,
    relatedEvents: this.relatedEventsArray,
  }

  setEventTypeChecked(type: string) {
    this.eventData.eventType = type;
    this.validateEventType();
  }

  increasePriority() {
    this.eventData.eventPriority = this.eventData.eventPriority < 10 ? this.eventData.eventPriority + 1 : 10;
  }

  decreasePriority() {
    this.eventData.eventPriority = this.eventData.eventPriority > 0 ? this.eventData.eventPriority - 1 : 0;
  }

  dialogClose() {
    this.relatedEventsDialogOpen = false;
  }

  openRelatedEventsDialog() {
    this.relatedEventsDialogOpen = true;
    if (this.relatedEventsDialogNotOpenYet === true) {
      this.getRelatedEventsCandidates();
      this.relatedEventsDialogNotOpenYet = false;
    }
  }

  selectRelatedEvent(id: number) {
    if (this.eventData.relatedEvents.includes(id)) {
      this.eventData.relatedEvents.splice(this.eventData.relatedEvents.indexOf(id), 1);
    } else {
      this.eventData.relatedEvents.push(id);
    }
  }

  validateForm() {
    this.validateEventName();
    this.validateEventDescription();
    this.validateEventType();

    if (!this.formErrors.eventTypeError.length && !this.formErrors.eventNameError.length && !this.formErrors.eventDescriptionError.length) {
      this.formValid = true;
    }
  }

  validateEventName() {
    const formData = this.eventEditForm.value;
    if (!formData.eventName.length) {
      this.formErrors.eventNameError = 'Event name can not be empty!'
    } else {
      this.formErrors.eventNameError = '';
      this.eventData.eventName = formData.eventName;
    }
  }

  validateEventDescription() {
    const formData = this.eventEditForm.value;
    if (!formData.eventDescription.length) {
      this.formErrors.eventDescriptionError = 'Event description can not be empty!'
    } else {
      this.formErrors.eventDescriptionError = '';
      this.eventData.eventDescription = formData.eventDescription;
    }
  }

  validateEventType() {
    if (!this.eventData.eventType.length) {
      this.formErrors.eventTypeError = 'Event type must be selected!'
    } else {
      this.formErrors.eventTypeError = '';
    }
  }

  getGoBackData() {
    if (this.route.snapshot.params.back && this.route.snapshot.params.back === 'details') {
      this.backRoute = 'dashboard/event-details/event-'+this.eventData.eventId;
      this.backText = 'event'
    }
    else {
      this.backRoute = 'dashboard/events';
      this.backText = 'events'
    }

    return this.backRoute;
  }

  goBack() {
    this.router.navigate([this.getGoBackData()])
  }

  async fetchEvent(slug: string) {
    this.fetchingEvent = true;
    const docRef = doc(db, "Events", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.eventData = {
        eventId: docSnap.data().id,
        eventName: docSnap.data().name,
        eventDescription: docSnap.data().description,
        eventType: docSnap.data().type,
        eventPriority: docSnap.data().priority,
        relatedEvents: docSnap.data().related_events,
      }
      this.eventEditForm.patchValue({
        eventName: docSnap.data().name,
        eventDescription: docSnap.data().description,
      })
    } else {
      window.alert("Event does not exist!")
      this.router.navigate(['dashboard/events']);
    }
    this.fetchingEvent = false;
    this.getGoBackData();
  }

  async saveEvent() {
    this.savingEvent = true;
    this.validateForm();

    if (this.formValid) {
      const q = query(collection(db, "Events"), orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!this.editingEvent) {
        if (querySnapshot.docs[0]) {
          let lastEventId = querySnapshot.docs[0].data().id
          this.eventData.eventId = lastEventId + 1;
        } else {
          this.eventData.eventId = 0;
        }
      }
      await setDoc(doc(db, "Events", "event-" + this.eventData.eventId), {
        id: this.eventData.eventId,
        name: this.eventData.eventName,
        description: this.eventData.eventDescription,
        type: this.eventData.eventType,
        priority: this.eventData.eventPriority,
        related_events: this.eventData.relatedEvents
      });
      this.router.navigate(['/dashboard/events']);
    }
    this.savingEvent = false;
  }

  async getRelatedEventsCandidates() {
    this.fetchingRelatedEvents = true;
    const q = query(collection(db, "Events"), where("id", "!=", this.eventData.eventId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.relatedEventsCandidates.push(doc.data());
    });
    this.fetchingRelatedEvents = false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eventId = routeParams.get('event-id');
    if (eventId) {
      this.editingEvent = true;
      this.fetchEvent(eventId);
    } else {
      this.getGoBackData();
    }
    this.eventEditForm = new FormGroup({
      eventName: new FormControl(this.eventData.eventName),
      eventDescription: new FormControl(this.eventData.eventDescription),
    })
  }
}
