const selectedReflectionReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_REFLECTON":
            return action.payload;
        default:
            return state;
    }
}

export default selectedReflectionReducer;