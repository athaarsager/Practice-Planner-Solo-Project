import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchPlans() {
    try {
        const plansResponse = yield axios.get("/api/practice_plans");
        yield put({ type: "SET_PLANS", payload: plansResponse.data});
    } catch (error) {
        console.error("ERROR in fetchPlans saga:", error);
    }
}

function* addPlan(action) {
    try {
        yield axios.post("/api/practice_plans", action.payload);
        yield put({ type: "FETCH_PLANS"});
    } catch(error) {
        console.error("ERROR in addPlan saga:", error);
    }
}

function* editPlan(action) {
    try {
        // payload needs to be plan's id 
        yield axios.put(`/api/practice_plans/${action.payload}`);
        yield put({ type: "FETCH_PLANS" });
    } catch(error) {
        console.error("ERROR in editPlan saga:", error);
    }
}

function* practicePlansSaga() {
    yield takeLatest("FETCH_PLANS", fetchPlans);
    yield takeLatest("ADD_PLAN", addPlan);
    yield takeLatest("EDIT_PLAN", editPlan);
}

export default practicePlansSaga;