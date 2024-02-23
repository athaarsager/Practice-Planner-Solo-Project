import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

function ReflectionForm() {
    const planId = useParams().plan_id;
    const [wentWell, setWentWell] = useState("");
    const [needsWork, setNeedsWork] = useState("");

    return (
        <>
        <p>Welcome to the Reflection Form for plan: {planId}!</p>
        <form>
            <label htmlFor="went-well">What went well this session?</label><br />
            <input id="went-well" name="went-well" type="text" placeholder="Your Answer Here!" value={wentWell} onChange={(e) => setWentWell(e.target.value)} /><br />
            <label htmlFor="needs_work">What still needs work?</label><br />
            <input id="needs_work" name="needs_work" type="text" placeholder="Your Answer Here!" value={needsWork} onChange={(e) => setNeedsWork(e.target.value)} /><br />
            {/* <button>Export to New Practice Session</button> */}
            <button>Save Reflection!</button>
        </form>
        </>
    );
}

export default ReflectionForm;