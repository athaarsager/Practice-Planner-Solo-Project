import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCalendarEvents() {
    try {
        const fetchCalendarResponse = yield axios.get("/api/calendar_events");
        yield put({ type: "SET_CALENDAR_EVENTS", payload: fetchCalendarResponse.data });
    } catch (error) {
        console.error("ERROR in fetchCalendarEvents saga:", error);
    }
}

function* fetchSelectedEvent(action) {
    try {
        console.log("This is the action.payload:", action.payload);
        console.log("This is the typeOf the action.payload:", typeof action.payload);
        const fetchSelectedEventResponse = yield axios.get(`/api/calendar_events/${action.payload}`);
        console.log("This is what we got back from the server:", fetchSelectedEventResponse);
        yield put({ type: "SET_SELECTED_EVENT", payload: fetchSelectedEventResponse.data[0]});
    } catch (error) {
        console.error("ERROR in fetchSelectedEvent saga", error);
    }
}

function* addCalendarEvent(action) {
    try {
        yield axios.post("/api/calendar_events", action.payload);
        yield put({ type: "FETCH_CALENDAR_EVENTS" });
    } catch (error) {
        console.error("ERROR in addCalendarEvent saga:", error);
    }
}

function* editCalendarEvent(action) {
    try {
        console.log("This is the action.payload:", action.payload);
        yield axios.put(`/api/calendar_events/${action.payload.id}`, action.payload);
        yield put({ type: "FETCH_CALENDAR_EVENTS" });
    } catch (error) {
        console.error("ERROR in editCalendarEvent saga:", error);
    }
}

function* deleteCalendarEvent(action) {
    try {
        yield axios.delete(`/api/calendar_events/${action.payload}`);
        yield put({ type: "FETCH_CALENDAR_EVENTS" });
    } catch (error) {
        console.error("ERROR in deleteCalendarEvent saga:", error);
    }
}

function* calendarEventsSaga() {
    yield takeLatest("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
    yield takeLatest("FETCH_SELECTED_EVENT", fetchSelectedEvent);
    yield takeLatest("ADD_CALENDAR_EVENT", addCalendarEvent);
    yield takeLatest("EDIT_CALENDAR_EVENT", editCalendarEvent);
    yield takeLatest("DELETE_CALENDAR_EVENT", deleteCalendarEvent);
}

export default calendarEventsSaga;