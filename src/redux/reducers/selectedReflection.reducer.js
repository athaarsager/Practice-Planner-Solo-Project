const selectedReflectionReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_REFLECTION":
            return action.payload;
        default:
            return state;
    }
}

export default selectedReflectionReducer;