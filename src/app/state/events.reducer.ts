import { createReducer, on, Action } from '@ngrx/store';

import { fetchedEvents, filteredEvents } from './events.actions';
import { Event7 } from '../dashboard-events/event.model'; 
import { DocumentData } from 'rxfire/firestore/interfaces';

export const initialState: Event7[] = [];

export const eventsReducer = createReducer(
  initialState,
  on(fetchedEvents, (state, { events }) => [...events]),
  on(filteredEvents, (state, { events }) => [...events])
);