const piecesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PIECES":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default piecesReducer;