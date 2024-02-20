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



function* practicePlansSaga() {
    yield takeLatest("FETCH_PLANS", fetchPlans)
}

export default practicePlansSaga;