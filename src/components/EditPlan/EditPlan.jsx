import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function EditPlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planId = useParams().plan_id;
    const pieceId = useParams().id;
    const selectedPlan = useSelector(store => store.selectedPlan);

    const [responses, setResponses] = useState(
        {
            id: planId,
            piece_id: pieceId,
            section: selectedPlan.section,
            problems: selectedPlan.problems,
            plan: selectedPlan.plan,
            goal: selectedPlan.goal
        });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setResponses((state) => ({ ...state, [name]: value }));
    }

    const submitEdits = (e) => {
        e.preventDefault();
        dispatch({ type: "EDIT_PLAN", payload: responses });
        history.goBack();
    }

    useEffect(() => {
        dispatch({ type: "FETCH_SELECTED_PLAN", payload: planId });
    }, []);

    return (
        <>
            <h2>Edit Plan</h2>
            <form onSubmit={submitEdits}>
                <label htmlFor="section">What section are you working on?</label><br />
                <input id="section" name="section" type="text" placeholder="Your Answer Here" size="100" value={responses.section} onChange={handleChange} /><br />
                <label htmlFor="problems">What are the problems you need to solve/issues you need to address in this section?</label><br />
                <input id="problems" name="problems" type="text" placeholder="Your Answer Here" size="100" value={responses.problems} onChange={handleChange} /><br />
                <label htmlFor="plan">How will you solve these problems/address these issues?</label><br />
                <input id="plan" name="plan" type="text" placeholder="Your Answer Here" size="100" value={responses.plan} onChange={handleChange} /><br />
                <label htmlFor="goal">What is your goal for the end of the practice session? e.g. runs without mistakes, target metronome marking, etc.</label><br />
                <input id="goal" name="goal" type="text" placeholder="Your Answer Here" size="100" value={responses.goal} onChange={handleChange} /><br />
                <button type="button" onClick={() => history.goBack()}>Back</button>
                <button type="submit">Submit Changes</button>
            </form>
        </>
    );
}

export default EditPlan;