import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import NewEventDialog from "../CalendarEventDialogs/NewEventDialog";

function NewPracticePlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pieceId = useParams().id;
    const selectedPiece = useSelector(store => store.selectedPiece);
    const newPlanProblems = useSelector(store => store.newPlanProblems);
    const onPracticePlanScreen = true;
    const selectedDate = "";

    const [addNewEventIsOpen, setAddNewEventIsOpen] = useState(false);

    const closeNewEvent = () => setAddNewEventIsOpen(false);

    const [responses, setResponses] = useState(
        {
            piece_id: pieceId,
            section: "",
            problems: "",
            plan: "",
            goal: ""
        });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setResponses((state) => ({ ...state, [name]: value }));
    }

    const submitPlan = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_PLAN", payload: responses });
        history.goBack();
    }

    useEffect(() => {
        if (newPlanProblems !== "") {
            setResponses((state) => ({ ...state, problems: newPlanProblems}));
        }
        console.log("In NewPracticePlan.jsx. This is the selectedPiece:", selectedPiece);
    }, [newPlanProblems]);

    return (
        <>
            <h1>New Practice Plan for {selectedPiece.title}</h1>
            {/* Use css to inrease size of inputs. Also see what MUI provides */}
            <form onSubmit={submitPlan}>
                <label htmlFor="section">What section are you working on?</label><br />
                <input id="section" name="section" type="text" placeholder="Your Answer Here" size="100" value={responses.section} onChange={handleChange} /><br />
                <label htmlFor="problems">What are the problems you need to solve/issues you need to address in this section?</label><br />
                <input id="problems" name="problems" type="text" placeholder="Your Answer Here" size="100" value={responses.problems} onChange={handleChange} /><br />
                <label htmlFor="plan">How will you solve these problems/address these issues?</label><br />
                <input id="plan" name="plan" type="text" placeholder="Your Answer Here" size="100" value={responses.plan} onChange={handleChange} /><br />
                <label htmlFor="goal">What is your goal for the end of the practice session? e.g. runs without mistakes, target metronome marking, etc.</label><br />
                <input id="goal" name="goal" type="text" placeholder="Your Answer Here" size="100" value={responses.goal} onChange={handleChange} /><br />
                {!selectedPiece.event_exists &&
                <div>
                    <p>Create Calendar Event? Optional</p>
                    <button type="button" onClick={() => setAddNewEventIsOpen(true)}>Yes</button>
                </div>
                    }
                <button type="button" onClick={() => history.goBack()}>Cancel</button>
                <button type="submit">Finish Plan!</button>
            </form>
            <NewEventDialog open={addNewEventIsOpen} closeNewEvent={closeNewEvent} selectedDate={selectedDate} onPracticePlanScreen={onPracticePlanScreen} responses={responses} />
        </>
    );
}

export default NewPracticePlan;