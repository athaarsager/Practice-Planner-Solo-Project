import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchPlans(action) {
    try {
        // action.payload needs to be pieceId
        console.log("This is the action.payload being sent to the server:", action.payload);
        const plansResponse = yield axios.get(`/api/practice_plans/${action.payload}`);
        yield put({ type: "SET_PLANS", payload: plansResponse.data });
    } catch (error) {
        console.error("ERROR in fetchPlans saga:", error);
    }
}

function* fetchSelectedPlan(action) {
    try {
        const planResponse = yield axios.get(`/api/practice_plans/plan/${action.payload}`);
        yield put({ type: "SET_SELECTED_PLAN", payload: planResponse.data[0] });
    } catch (error) {
        console.error("ERROR in fetchSinglePlan saga:", error);
    }
}

function* addPlan(action) {
    try {
        const pieceId = action.payload.piece_id;
        yield axios.post("/api/practice_plans", action.payload);
        yield put({ type: "FETCH_PLANS", payload: pieceId });
    } catch (error) {
        console.error("ERROR in addPlan saga:", error);
    }
}

function* addPlanAndEvent(action) {
    // payload is object containing two objects
    try {
        const pieceId = action.payload.newPlan.piece_id;
        yield axios.post("/api/practice_plans/event", action.payload);
        yield put({ type: "FETCH_PLANS", payload: pieceId });
    } catch (error) {
        console.error("ERROR in addPlanAndEvent saga:", error);
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

function* editPlanPiece(action) {
    try {
        yield axios.put(`/api/practice_plans/change_piece/${action.payload.plan_id}`, action.payload);
    } catch (error) {
        console.error("ERROR in editPlanPiece saga:", error);
    }
}

function* deletePlan(action) {
    try {
        yield axios.delete(`/api/practice_plans/${action.payload.planId}`);
        yield put({ type: "FETCH_PLANS", payload: action.payload.pieceId });
    } catch (error) {
        console.error("ERROR in deletePlan saga:", error);
    }
}

function* practicePlansSaga() {
    yield takeLatest("FETCH_PLANS", fetchPlans);
    yield takeLatest("FETCH_SELECTED_PLAN", fetchSelectedPlan);
    yield takeLatest("ADD_PLAN_AND_EVENT", addPlanAndEvent);
    yield takeLatest("ADD_PLAN", addPlan);
    yield takeLatest("EDIT_PLAN", editPlan);
    yield takeLatest("EDIT_PLAN_PIECE");
    yield takeLatest("DELETE_PLAN", deletePlan);
}

export default practicePlansSaga;