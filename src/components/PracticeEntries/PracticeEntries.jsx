import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


function PracticeEntries() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plans = useSelector(store => store.plans);
    const selectedPiece = useSelector(store => store.selectedPiece);
    const pieceId = useParams().id;

    // useRef is how you reference a DOM element in React
    const cardRef = useRef(null);

    const [characterLimit, setCharacterLimit] = useState(94);

    // function for updating the character limit based on card width
    const updateCharacterLimit = () => {
        if (cardRef.current) {
            // This line gets the clientWidth of the card element
            const cardWidth = cardRef.current.clientWidth;
            const newCharacterLimit = Math.floor(cardWidth / 4);
            setCharacterLimit(newCharacterLimit);
            console.log("This is the new character limit:", newCharacterLimit);
        }
    }

    // Creating function to limit the characters shown in the responses on this page (courtesy of ChatGPT)
    const truncateText = (text) => {
        // 94 happens to be the response character length that matches the question character length
        // Want these to match for consistent Card widths
        if (text.length > characterLimit) {
            return text.substring(0, characterLimit) + "...";
        }
        return text;
    }

    const goToEditPage = (e) => {
        dispatch({ type: "GET_SELECTED_REFLECTION", payload: e.target.dataset.planid });
        history.push(`/${pieceId}/practice_entries/write_reflection/${e.target.dataset.planid}`);
    }

    const toNewReflection = (e) => {
        dispatch({ type: "CLEAR_SELECTED_REFLECTION" });
        history.push(`/${pieceId}/practice_entries/write_reflection/${e.target.dataset.planid}`)
    }

    // create custom style variable to hide overflow text using css
    const textLimitStyle = {
        overflow: "hidden",
        textOverflow: "ellpises"
    };

    useEffect(() => {
        console.log("This is the selected piece:", selectedPiece);
        dispatch({ type: "FETCH_PLANS", payload: pieceId });
        if (Object.keys(selectedPiece).length === 0) {
            dispatch({ type: "FETCH_SINGLE_PIECE", payload: pieceId });
        }
        console.log("In useEffect, updating character limit")
        updateCharacterLimit();
        // Update the character limit when the window is resized

        window.addEventListener("resize", updateCharacterLimit);

        return () => {
            window.removeEventListener("resize", updateCharacterLimit);
        }
    }, [cardRef]);

    return (
        <Grid container display="flex" flexDirection="column" alignItems="center">
            <Grid item xs={10}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ mb: 2 }} variant="h4">Your Practice Plans for {selectedPiece.title}</Typography>
                    <Button variant="outlined" sx={{ mb: 2 }} onClick={() => history.push(`/${pieceId}/practice_entries/new_plan`)}>Add a New Practice Plan!</Button>
                    {plans.map(plan => (
                        // Need to assign ref to card here so that it actually updates from null
                        <Paper ref={cardRef} sx={{ padding: 5, mb: 2, maxWidth: "700px" }} key={plan.id}>
                            <Typography sx={{ mb: 2 }} variant="h6">Prior Plan</Typography>
                            <Typography variant="body1"><strong>What section are you working on?</strong></Typography>
                            <Typography sx={{ ...textLimitStyle, mb: 1 }} variant="body2">{truncateText(plan.section)}</Typography>
                            <Typography variant="body1"><strong>What are the problems you need to solve/issues you need to address in this section?</strong></Typography>
                            <Typography sx={{ ...textLimitStyle, mb: 1 }} variant="body2">{truncateText(plan.problems)}</Typography>
                            <Typography variant="body1"><strong>How will you solve these problems/adderss these issues?</strong></Typography>
                            <Typography sx={{ ...textLimitStyle, mb: 1 }} variant="body2">{truncateText(plan.plan)}</Typography>
                            <Typography variant="body1"><strong>What is your goal for the end of the practice session?</strong></Typography>
                            <Typography sx={{ ...textLimitStyle, mb: 1 }} variant="body2">{truncateText(plan.goal)}</Typography>
                            <Button color="secondary" data-planid={plan.id} onClick={(e) => history.push(`/${pieceId}/practice_entries/review_plan/${e.target.dataset.planid}`)}>Review Full Plan</Button>
                            {plan.reflection_written ?
                                <Button data-planid={plan.id} onClick={goToEditPage}>Edit Reflection</Button> :
                                <Button data-planid={plan.id} onClick={toNewReflection}>Write Refelction</Button>
                            }
                        </Paper>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

export default PracticeEntries;