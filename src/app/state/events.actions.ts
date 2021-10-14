import { createAction, props } from '@ngrx/store';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Event7 } from '../dashboard-events/event.model'; 
 
export const fetchedEvents = createAction(
  '[Events/API] Fetch events success',
  props<{ events: Event7[] }>()
);

export const filteredEvents = createAction(
  '[Events/API] Filter events success',
  props<{ events: Event7[] }>()
);