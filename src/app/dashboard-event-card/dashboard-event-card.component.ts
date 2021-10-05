import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentData } from '@firebase/firestore';

@Component({
  selector: 'app-dashboard-event-card',
  templateUrl: './dashboard-event-card.component.html',
  styleUrls: ['./dashboard-event-card.component.scss']
})
export class DashboardEventCardComponent {

  @Input() event: DocumentData = {};
  @Input() cardType: string = '';
  @Output() openDeleteEventDialog = new EventEmitter<DocumentData>();

  openDialog(event: DocumentData) {
    this.openDeleteEventDialog.emit(event);
  }
}
