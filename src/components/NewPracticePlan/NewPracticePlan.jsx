import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewPracticePlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <h1>New Practice Plan</h1>
            {/* Use css to inrease size of inputs. Also see what MUI provides */}
            <form>
                <label htmlFor="section">What section are you working on?</label><br />
                <input id="section" name="section" type="text" placeholder="Your Answer Here" size="100" /><br />
                <label htmlFor="problems">What are the problems you need to solve/issues you need to address in this section?</label><br />
                <input id="problems" name="problems" type="text" placeholder="Your Answer Here" size="100" /><br />
                <label htmlFor="plan">How will you solve these problems/address these issues?</label><br />
                <input id="plan" name="plan" type="text" placeholder="Your Answer Here" size="100" /><br />
                <label htmlFor="goal">What is your goal for the end of the practice session?</label><br />
                <input id="goal" name="goal" type="text" placeholder="Your Answer Here" size="100" /><br />
                <div>
                    <p>Create Calendar Event? Optional</p>
                    {/* Do I need two buttons? Probably only need yes... */}
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                </div>
                <button type="button">Cancel</button>
                <button type="submit">Finish Plan!</button>
            </form>
        </>
    );
}

export default NewPracticePlan;