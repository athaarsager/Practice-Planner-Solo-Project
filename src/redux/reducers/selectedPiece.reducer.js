const selectedPieceReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_SELECTED_PIECE":
            return action.payload;
        default:
            return state;
    }
}

export default selectedPieceReducer;