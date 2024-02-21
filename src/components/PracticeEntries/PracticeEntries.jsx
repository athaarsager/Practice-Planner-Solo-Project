import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import PracticeEntriesFooter from "./PracticeEntriesFooter";

function PracticeEntries() {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPiece = useSelector(store => store.selectedPiece);
    const plans = useSelector(store => store.plans);

    useEffect(() => {
        dispatch({ type: "FETCH_PLANS", payload: selectedPiece });
    }, []);

    return (
        <>
            <h2>Practice Plans</h2>
            <button onClick={() => history.push(`/${selectedPiece}/practice_entries/new_plan`)}>Add a New Practice Plan!</button>
            {plans.map(plan => (
                <div key={plan.id}>
                    <h4>Prior Plan</h4>
                    <p><strong>What section are you working on?</strong></p>
                    <p>{plan.section}</p>
                    <p><strong>What are the problems you need to solve/issues you need to address in this section?</strong></p>
                    <p>{plan.problems}</p>
                    <p><strong>How will you solve these problems/adderss these issues?</strong></p>
                    <p>{plan.plan}</p>
                    <p><strong>What is your goal for the end of the practice session?</strong></p>
                    <p>{plan.goal}</p>
                    <button>Review Full Entry</button>
                    {plan.reflection_written ?
                        <button>Edit Reflection</button> :
                        <button>Write Refelction</button>
                    }

                </div>
            ))}
            <PracticeEntriesFooter />
        </>
    );
}

export default PracticeEntries;