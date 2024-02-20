import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSelectedPracticeRecording(action) {
    // send id of practice plan in action.payload
    try {
    const SelectedPracticeRecordingResponse = yield axios.get(`/api/practice_recordings/${action.payload}`);
    yield put({type: "SET_SELECTED_PRACTICE_PLAN"});
    } catch(error) {
        console.error("ERROR in fetchSelectedPracticeRecording saga:", error);
    }
}

function* practiceRecordingsSaga() {
    yield takeLatest("FETCH_SELECTED_PRACTICE_RECORDING", fetchSelectedPracticeRecording);

}

export default practiceRecordingsSaga;