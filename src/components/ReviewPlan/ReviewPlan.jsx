import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Swal from "sweetalert2";
function ReviewPlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planId = useParams().plan_id;
    const pieceId = useParams().id;
    const selectedPlan = useSelector(store => store.selectedPlan);
    const selectedPiece = useSelector(store => store.selectedPiece);

    const deletePlan = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "DELETE_PLAN", payload: { planId: e.target.dataset.planid, pieceId } });
                history.goBack();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your practice plan has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    useEffect(() => {
        dispatch({ type: "FETCH_SELECTED_PLAN", payload: planId });
        console.log("This is the selectedPlan:", selectedPlan);
    }, []);

    return (
        <div>
            <h1>Review plan for {selectedPiece.title}</h1>
            <p><strong>What section are you working on?</strong></p>
            <p>{selectedPlan.section}</p>
            <p><strong>What are the problems you need to solve/issues you need to address in this section?</strong></p>
            <p>{selectedPlan.problems}</p>
            <p><strong>How will you solve these problems/adderss these issues?</strong></p>
            <p>{selectedPlan.plan}</p>
            <p><strong>What is your goal for the end of the practice session?</strong></p>
            <p>{selectedPlan.goal}</p>
            <button onClick={() => history.goBack()}>Back</button>
            <button data-planid={selectedPlan.id} onClick={deletePlan}>Delete Plan</button>
            <button onClick={() => history.push(`/${pieceId}/practice_entries/review_plan/${planId}/edit`)}>Edit Plan</button>


        </div>
    );
}
export default ReviewPlan;