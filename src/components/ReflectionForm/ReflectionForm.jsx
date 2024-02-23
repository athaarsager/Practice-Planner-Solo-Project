import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

function ReflectionForm() {
    const planId = useParams().plan_id;
    return (
        <>
        <p>Welcome to the Reflection Form for plan: {planId}!</p>
        </>
    );
}

export default ReflectionForm;