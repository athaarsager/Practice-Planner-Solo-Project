import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchReferenceRecordings(action) {
    try {
    const recordingsResponse = yield axios.get(`/api/reference_recordings/${action.payload}`);
    yield put({ type: "SET_RECORDINGS", payload: recordingsResponse.data});

    } catch(error) {
        console.error("ERROR in fetchReferenceRecordings saga:", error);
    }
}

function* fetchSelectedRecording(action) {
    try {
        const recordingResponse = yield axios.get(`/api/reference_recordings/${action.payload}`);
        yield put({ type: "SET_SELECTED_RECORDING", payload: recordingResponse.data});

    } catch(error) {
        console.error("ERROR in fetchSelectedRecording saga:", error);
    }
}

function* addReferenceRecording(action) {
    try {
        yield axios.post("/api/reference_recordings/", action.payload);
        yield put({ type: "FETCH_REFERENCE_RECORDINGS"});
    } catch(error) {
        console.error("ERROR in addReferenceRecording saga:", error);
    }
}

function* editReferenceRecording(action) {
    try {
        yield axios.put(`/api/reference_recordings`)

    } catch(error) {
        console.error("ERROR in editReferenceRecording saga:", error);
    }
}

function* referenceRecordingsSaga() {
    yield takeLatest("FETCH_REFERENCE_RECORDINGS", fetchReferenceRecordings);
    yield takeLatest("FETCH_SELECTED_RECORDING", fetchSelectedRecording);
    yield takeLatest("ADD_REFERENCE_RECORDING");
}

export default referenceRecordingsSaga;