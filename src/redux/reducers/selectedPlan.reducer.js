const selectedPlanReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PLAN":
            return action.payload;
        default:
            return state;
    }
}

export default selectedPlanReducer;