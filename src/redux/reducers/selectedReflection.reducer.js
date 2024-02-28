const selectedReflectionReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_REFLECTION":
            return action.payload;
        case "CLEAR_SELECTED_REFLECTION":
            return {};
        default:
            return state;
    }
}

export default selectedReflectionReducer;