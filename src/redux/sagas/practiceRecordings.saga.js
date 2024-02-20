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
        // user reviews reflection page, or sees it as the most recent recording
        // on main piece page
    } catch(error) {
        console.error("ERROR in addNewPracticeRecording saga:", error);
    }
}

function* deletePracticeRecording(action) {
    // need recording id in action.payload
    try {
        yield axios.delete(`/api/practice_recordings/delete/${action.payload}`);
        // Executive decision: user can only delete from reflection page. When most recent recording is displayed
        // on practice entries screen, user will be able to press a button to view the related reflection
        yield put({ type: "SET_SELECTED_PRACTICE_RECORDING", payload: 0});
        // sending payload of 0 because the recording id can never equal 0. query will go through and return nothing
    } catch(error) {
        console.error("ERROR in deletePracticeRecording saga:", error);
    }
}

function* practiceRecordingsSaga() {
    yield takeLatest("FETCH_SELECTED_PRACTICE_RECORDING", fetchSelectedPracticeRecording);
    yield takeLatest("FETCH_LATEST_PRACTICE_RECORDING", fetchLatestPracticeRecording);
    yield takeLatest("ADD_NEW_PRACTICE_RECORDING", addNewPracticeRecording);
    yield takeLatest("DELETE_PRACTICE_RECORDING", deletePracticeRecording);
}

export default practiceRecordingsSaga;