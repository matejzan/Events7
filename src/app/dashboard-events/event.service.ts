import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event7 } from './event.model'; 
import { getFirestore, query, collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions, where } from "firebase/firestore";
import { collectionData } from 'rxfire/firestore';

const db = getFirestore();
 
@Injectable({ providedIn: 'root' })
export class fetchEventsService {

  eventConverter = {
    toFirestore(event: Event7): DocumentData {
      return {
        description: event.description, 
        id: event.id, 
        name: event.name, 
        priority: event.priority, 
        related_events: event.related_events, 
        type: event.type};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Event7 {
      const data = snapshot.data(options)!;
      return new Event7(data.description, data.id, data.name, data.priority, data.related_events, data.type);
    }
  }

  getEvents(): Observable<Event7[]> {
    const q = query(collection(db, 'Events')).withConverter(this.eventConverter);    
    let fetched = collectionData(q).pipe(tap());

    return fetched;
  }

  getFilteredEvents(filter: string): Observable<Event7[]> {
    let q = query(collection(db, 'Events')).withConverter(this.eventConverter);  
    if (filter !== 'all') {
      q = query(collection(db, "Events"), where("type", "==", filter)).withConverter(this.eventConverter);
    }  
    let fetched = collectionData(q).pipe(tap());

    return fetched;
  }
}