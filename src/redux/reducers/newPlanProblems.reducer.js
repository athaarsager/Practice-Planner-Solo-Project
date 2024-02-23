const newPlanProblemsReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NEW_PLAN_PROBLEMS":
            return action.payload;
        default:
            return state;
    }
}

export default newPlanProblemsReducer;