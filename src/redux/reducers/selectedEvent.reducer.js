const selectedEventReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_EVENT":
            return action.payload;
        default:
            return state;
    }
}

export default selectedEventReducer;