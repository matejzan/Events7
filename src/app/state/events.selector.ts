import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Event7 } from "../dashboard-events/event.model";
import { AppState } from "./app.state";

export const selectEvents = createSelector(
  (state: AppState) => state.events,
  (events: Array<Event7>) => events
);

export const selectLoading = createSelector(
  (state: AppState) => state.loading,
  (loading: boolean) => loading
);


export const selectAllEvents = createSelector(
  selectEvents,
  (allEvents: Array<Event7>) => {
    return allEvents;
  }
);

export const selectEventsLength = createSelector(
  selectAllEvents,
  (allEvents: Array<Event7>) => {
    return allEvents.length;
  }
);

export const selectLoadingEvents = createSelector(
  selectLoading,
  (loading: boolean) => {
    return loading;
  }
);