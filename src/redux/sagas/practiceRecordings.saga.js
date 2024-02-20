import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSelectedPracticeRecording(action) {
    // send id of practice plan in action.payload
    try {
    const selectedPracticeRecordingResponse = yield axios.get(`/api/practice_recordings/${action.payload}`);
    yield put({ type: "SET_SELECTED_PRACTICE_RECORDING", payload: selectedPracticeRecordingResponse });
    } catch(error) {
        console.error("ERROR in fetchSelectedPracticeRecording saga:", error);
    }
}

function* fetchLatestPracticeRecording(action) {
    // action.payload needs to be the piece id
    try {
        const latestPracticeRecordingResponse = yield axios.get(`/api/practice_recordings/most_recent/${action.payload}`);
        yield put({ type: "SET_LATEST_PRACTICE_RECORDING", payload: latestPracticeRecordingResponse });
    } catch(error) {
        console.error("ERROR in fetchLatestPracticeRecording saga:", error);
    }
}

function* practiceRecordingsSaga() {
    yield takeLatest("FETCH_SELECTED_PRACTICE_RECORDING", fetchSelectedPracticeRecording);
    yield takeLatest("FETCH_LATEST_PRACTICE_RECORDING", fetchLatestPracticeRecording);
}

export default practiceRecordingsSaga;