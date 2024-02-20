const selectedReferenceRecordingReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_RECORDING":
            return action.payload;
        default:
            return state;
    }
}

export default selectedReferenceRecordingReducer;