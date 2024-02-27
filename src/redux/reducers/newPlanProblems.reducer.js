const newPlanProblemsReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NEW_PLAN_PROBLEMS":
            return action.payload;
        case "CLEAR_NEW_PLAN_PROBLEMS":
            return "";
        default:
            return state;
    }
}

export default newPlanProblemsReducer;