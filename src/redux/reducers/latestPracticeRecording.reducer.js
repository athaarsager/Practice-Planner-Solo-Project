const latestPracticeRecordingReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_LATEST_PRACTICE_RECORDING":
            return action.payload;
        default:
            return state;
    }
}

export default latestPracticeRecordingReducer;