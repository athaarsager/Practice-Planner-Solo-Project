const selectedPracticeRecordingReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PRACTICE_RECORDING":
            return action.payload;
        default:
            return state;
    }
}

export default selectedPracticeRecordingReducer;