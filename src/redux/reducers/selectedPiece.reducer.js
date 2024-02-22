const selectedPieceReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PIECE":
            return action.payload;
        case "CLEAR_SELECTED_PIECE":
            return {};
        default:
            return state;
    }
}

export default selectedPieceReducer;