import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchPieces() {
    try{
       const piecesResponse = yield axios.get("/api/pieces");
       yield put({
        type: "SET_PIECES",
        payload: piecesResponse.data
       });
    } catch(error) {
        console.error("ERROR in pieces GET:", error);
    }
}

function* addPiece(action) {
    try {
        yield axios.post("/api/pieces", action.payload);
        yield put({ type: "FETCH_PIECES"});
    } catch(error) {
        console.error("ERROR in pieces POST:", error);
    }
}

function* deletePiece(action) {
    try {
        // action.payload needs to be the pieceId here
        yield axios.delete(`/api/pieces/${action.payload}`);
        yield put({ type: "FETCH_PIECES"});
    } catch(error) {
        console.error("ERROR in pieces DELETE:", error);
    }
}

function* piecesSaga() {
    yield takeLatest("FETCH_PIECES", fetchPieces);
    yield takeLatest("ADD_PIECE", addPiece);
    yield takeLatest("DELETE_PIECE", deletePiece);
}

export default piecesSaga;