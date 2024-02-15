import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../Redux/slice";

function Quiz() {
    const [results, setResults] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [answer, setAnswer] = useState<string>("");

    console.log(answer);
    
    // State Root
    const { words } = useSelector((state: { root: StateType }) => (
        state.root
    ))

    // Navigate 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Next Handler
    const nextHandler = (): void => {
        // Answer Add in result
        setResults((prev) => ([...prev!, answer]));
        setCount((prev) => prev + 1);
        setAnswer("")
    }


    useEffect(() => {

        if(count+1>words.length){
            navigate("/result")
        }
        dispatch(saveResult(results));
    }, [results])

    return (
        <Container
            maxWidth="sm"
            sx={{
                padding: "1rem",
            }}
        >
            <Typography m={"2rem 0"}>Quiz</Typography>

            <Typography variant={"h3"}>
                {count + 1} - {words[count]?.word}
            </Typography>

            <FormControl>
                <FormLabel
                    sx={{
                        mt: "2rem",
                        mb: "1rem",
                    }}
                >
                    Meaning
                </FormLabel>
                <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
                    {
                        words?.[count]?.options.map((value, index) => (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio />}
                                label={value}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>

            <Button
                sx={{
                    margin: "3rem 0",
                }}
                variant="contained"
                fullWidth
                disabled={answer === ""}
                onClick={nextHandler}
            >
                {count === words.length - 1 ? "Submit" : "Next"}
            </Button>
        </Container>
    )
}

export default Quiz