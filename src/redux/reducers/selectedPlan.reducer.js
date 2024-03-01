const selectedPlanReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PLAN":
            return action.payload;
        case "CLEAR_SELECTED_PLAN":
            return {};
        default:
            return state;
    }
}

export default selectedPlanReducer;