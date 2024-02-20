const referenceRecordingsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_RECORDINGS":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default referenceRecordingsReducer;