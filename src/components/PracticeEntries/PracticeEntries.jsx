import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import PracticeEntriesFooter from "./PracticeEntriesFooter";


function PracticeEntries() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plans = useSelector(store => store.plans);
    const pieceId = useParams().id;

    useEffect(() => {
        dispatch({ type: "FETCH_PLANS", payload: pieceId });
    }, []);

    return (
        <>
            <h2>Practice Plans</h2>
            <button onClick={() => history.push(`/${pieceId}/practice_entries/new_plan`)}>Add a New Practice Plan!</button>
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
                    <button data-planid={plan.id} onClick={(e) => history.push(`/${pieceId}/practice_entries/review_plan/${e.target.dataset.planid}`)}>Review Full Entry</button>
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