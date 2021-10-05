import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentData, deleteDoc, doc, getFirestore, updateDoc, where, query , collection, getDocs } from '@firebase/firestore';

const db = getFirestore();

@Component({
  selector: 'app-dashboard-event-delete-dialog',
  templateUrl: './dashboard-event-delete-dialog.component.html',
  styleUrls: ['./dashboard-event-delete-dialog.component.scss']
})
export class DashboardEventDeleteDialogComponent {

  @Input() deleteEventDialogOpen = false;
  @Input() eventToDelete: DocumentData = {};
  @Output() deleteDialogClose = new EventEmitter<string>();
  @Output() eventDeleted = new EventEmitter<string>();

  deletingEvent = false;

  closeDialogFromParentComponent = false;

  dialogClose() {
    this.deleteDialogClose.emit();
    this.closeDialogFromParentComponent = false;
  }

  closeDeleteEventDialog() {
    this.closeDialogFromParentComponent = true;
    document.getElementById('events7')?.classList.remove("overflowY-hidden");
  }

  async deleteEventFromOthersRelatedEvents(eventsToUpdate: DocumentData[]) {
    for (let event of eventsToUpdate) {
      event.related_events.splice(event.related_events.indexOf(this.eventToDelete.id), 1);
      await updateDoc(doc(db, "Events", "event-"+event.id), {
        related_events: event.related_events
      });
    }
  }

  async deleteEvent() {
    this.deletingEvent = true;
    const eventsWithDeletedEventAsRelatedEvent: DocumentData[] = [];
    await deleteDoc(doc(db, "Events", "event-"+this.eventToDelete.id));
    const q = query(collection(db, "Events"), where("related_events", "array-contains", this.eventToDelete.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      eventsWithDeletedEventAsRelatedEvent.push(doc.data());
    });
    await this.deleteEventFromOthersRelatedEvents(eventsWithDeletedEventAsRelatedEvent);
    this.deletingEvent = false;
    this.closeDeleteEventDialog();
    this.eventDeleted.emit();
  }
}
