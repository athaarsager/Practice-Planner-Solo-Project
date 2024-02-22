import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
function ReviewPlan() {
    const disptach = useDispatch();
    const planId = useParams().plan_id;
    const selectedPlan = useSelector(store => store.selectedPlan);

    useEffect(() => {
        disptach({ type: "FETCH_SELECTED_PLAN", payload: planId });
    }, []);
    return (
        <div>
            <p><strong>What section are you working on?</strong></p>
            <p>{selectedPlan.section}</p>
            <p><strong>What are the problems you need to solve/issues you need to address in this section?</strong></p>
            <p>{selectedPlan.problems}</p>
            <p><strong>How will you solve these problems/adderss these issues?</strong></p>
            <p>{selectedPlan.plan}</p>
            <p><strong>What is your goal for the end of the practice session?</strong></p>
            <p>{selectedPlan.goal}</p>
            <button>Delete Plan</button>
            <button>Edit Plan</button>


        </div>
    );
}
export default ReviewPlan;