import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function PracticeEntries() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_PLANS"})
    }, []);

    return (
        <>
        <h2>Practice Plans</h2>
        <button>Add a New Practice Plan!</button>
        </>
    );
}

export default PracticeEntries;