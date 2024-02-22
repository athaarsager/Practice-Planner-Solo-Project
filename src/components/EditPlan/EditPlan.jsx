import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useStat, useEffect } from "react";

function EditPlan() {
    const selectedPlan = useSelector(store => store.selectedPlan);

    useEffect(() => {

    }, []);

    return (
        <>
        <h2>Welcome to the Edit Plan Screen!</h2>
        </>
    );
}

export default EditPlan;