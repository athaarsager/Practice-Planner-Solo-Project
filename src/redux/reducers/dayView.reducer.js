const dayViewReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_TO_DAYVIEW":
            return true;
        case "UNSET_TO_DAYVIEW":
            return false;
        default:
            return state;
    }
}

export default dayViewReducer;