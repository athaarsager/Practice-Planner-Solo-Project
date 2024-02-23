import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getSelectedReflection(action) {
    // payload needs to be reflection id
    try {
        const getSelectedReflectionResponse = yield axios.get(`/api/reflections/${action.payload}`);
        yield put({ type: "SET_SELECTED_REFLECTION", payload: getSelectedReflectionResponse.data});
    } catch (error) {
        console.error("ERROR in getSelectedReflectin saga:", error);
    }
}

// should make get saga first...
function* addReflection() {
    try {

    } catch (error) {
        console.error("ERROR in addReflection saga:", error);
    }
}

function* reflectionsSaga() {
    yield takeLatest("GET_SELECTED_REFLECTION", getSelectedReflection);
}

export default reflectionsSaga;