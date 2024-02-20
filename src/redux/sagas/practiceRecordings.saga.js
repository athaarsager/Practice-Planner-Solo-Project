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

function* addNewPracticeRecording(action) {
    // action.payload needs to include file name and plan id 
    try {
        yield axios.post("/api/practice_recordings/upload_file", action.payload);
        // don't need to yield a fetch request since recording won't be viewable until
        // user looks at plan in edit mode, or sees it as the most recent recording
        // on main piece page
    } catch(error) {
        console.error("ERROR in addNewPracticeRecording saga:", error);
    }
}

function* practiceRecordingsSaga() {
    yield takeLatest("FETCH_SELECTED_PRACTICE_RECORDING", fetchSelectedPracticeRecording);
    yield takeLatest("FETCH_LATEST_PRACTICE_RECORDING", fetchLatestPracticeRecording);
    yield takeLatest("ADD_NEW_PRACTICE_RECORDING", addNewPracticeRecording);
}

export default practiceRecordingsSaga;