const plansReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PLANS":
            return action.payload;
        default:
            return state;
    }
}

export default plansReducer;