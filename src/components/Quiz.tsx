import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Quiz() {
    const [results, setResults] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [answer, setAnswer] = useState<string>("");

    // State Root
    const { words } = useSelector((state: { root: StateType }) => (
        state.root
    ))

    // Navigate 
    const navigate = useNavigate();

    // Next Handler
    const nextHandler = (): void => {
        setResults((prev) => ([...prev!, answer]))
        setCount((prev) => prev + 1);
        setAnswer("")
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                padding: "1rem",
            }}
        >
            <Typography m={"2rem 0"}>Quiz</Typography>

            <Typography variant={"h3"}>
                {count + 1} - {words[0].word}
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
                        words[count]?.options.map((value,index) => (
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
            >
                {count === words.length - 1 ? "Submit" : "Next"}
            </Button>
        </Container>
    )
}

export default Quiz