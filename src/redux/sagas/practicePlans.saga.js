import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchPlans(action) {
    try {
        const plansResponse = yield axios.get(`/api/practice_plans/${action.payload}`);
        yield put({ type: "SET_PLANS", payload: plansResponse.data });
    } catch (error) {
        console.error("ERROR in fetchPlans saga:", error);
    }
}

function* fetchSelectedPlan(action) {
    try {
        const planResponse = yield axios.get(`/api/practice_plans/plan/${action.payload}`);
        yield put({ type: "SET_SELECTED_PLAN", payload: planResponse });
    } catch (error) {
        console.error("ERROR in fetchSinglePlan saga:", error);
    }
}

function* addPlan(action) {
    try {
        yield axios.post("/api/practice_plans", action.payload);
        yield put({ type: "FETCH_PLANS" });
    } catch (error) {
        console.error("ERROR in addPlan saga:", error);
    }
}

function* editPlan(action) {
    try {
        // payload needs to be plan's id 
        yield axios.put(`/api/practice_plans/${action.payload.id}`, action.payload);
        yield put({ type: "FETCH_PLANS" });// This may need to be FETCH_SELECTED_PLAN...based on how I do front-end rendering
    } catch (error) {
        console.error("ERROR in editPlan saga:", error);
    }
}

function* deletePlan(action) {
    try {
        yield axios.delete(`/api/practice_plans/${action.payload}`);
        yield put({ type: "FETCH_PLANS" });
    } catch (error) {
        console.error("ERROR in deletePlan saga:", error);
    }
}

function* practicePlansSaga() {
    yield takeLatest("FETCH_PLANS", fetchPlans);
    yield takeLatest("FETCH_SELECTED_PLAN", fetchSelectedPlan);
    yield takeLatest("ADD_PLAN", addPlan);
    yield takeLatest("EDIT_PLAN", editPlan);
    yield takeLatest("DELETE_PLAN", deletePlan);
}

export default practicePlansSaga;