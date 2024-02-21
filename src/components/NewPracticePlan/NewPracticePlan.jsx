import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewPracticePlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
        <h1>New Practice Plan</h1>
        <form>
            <label htmlFor="section">What section are you working on?</label>
            <input id="section" name="section" type="text" placeholder="Your Answer Here" />
        </form>
        </>
    );
}

export default NewPracticePlan;