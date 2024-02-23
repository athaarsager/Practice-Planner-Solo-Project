import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

function ReflectionForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planId = useParams().plan_id;
    const selectedReflection = useSelector(store => store.selectedReflection);
    const [wentWell, setWentWell] = useState("");
    const [needsWork, setNeedsWork] = useState("");

    const submitReflection = (e) => {
        e.preventDefault();

        if (Object.keys(selectedReflection). length === 0) {
            const payload = {
                went_well: wentWell,
                needs_work: needsWork,
                plan_id: planId,
            }
        dispatch({ type: "ADD_REFLECTION", payload });
        console.log("New reflection dispatched!");
    } else {
        const payload = {
            id: selectedReflection.id,
            went_well: wentWell,
            needs_work: needsWork,
            plan_id: planId
        }
        dispatch({ type: "EDIT_REFLECTION", payload });
        console.log("Edit dispatched!");
    }
        history.goBack();
    }

    useEffect(() => {
        setWentWell(Object.keys(selectedReflection).length === 0 ? "" : selectedReflection.went_well);
        setNeedsWork(Object.keys(selectedReflection).length === 0 ? "" : selectedReflection.needs_work);
    }, [selectedReflection]);

    return (
        <>
            <form onSubmit={submitReflection}>
                <label htmlFor="went-well">What went well this session?</label><br />
                <input id="went-well" name="went-well" type="text" placeholder="Your Answer Here!" value={wentWell} onChange={(e) => setWentWell(e.target.value)} /><br />
                <label htmlFor="needs_work">What still needs work?</label><br />
                <input id="needs_work" name="needs_work" type="text" placeholder="Your Answer Here!" value={needsWork} onChange={(e) => setNeedsWork(e.target.value)} /><br />
                {/* <button>Export to New Practice Session</button> */}
                { Object.keys(selectedReflection).length === 0 ?
                <button>Save Reflection!</button> :
                <button>Save Edits!</button>
}
            </form>
        </>
    );
}

export default ReflectionForm;