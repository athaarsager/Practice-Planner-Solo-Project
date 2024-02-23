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


function* addReflection(action) {
    // payload needs to be reflection info
    try {
        yield axios.post("/api/reflections", action.payload);
    } catch (error) {
        console.error("ERROR in addReflection saga:", error);
    }
}

// edit/PUT saga
function* editReflection(action) {
    // payload needs to be edited info. also needs to include id
    try {
        yield axios.put(`/api/reflections/${action.payload.id}`, action.payload);
    } catch (error) {
        console.error("ERROR in editReflection saga:", error);
    }
}

function* reflectionsSaga() {
    yield takeLatest("GET_SELECTED_REFLECTION", getSelectedReflection);
    yield takeLatest("ADD_REFLECTION", addReflection);
    yield takeLatest("EDIT_REFLECTION", editReflection);
}

export default reflectionsSaga;