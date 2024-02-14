import { ArrowBack, ArrowRight, NextPlan, VolumeOff, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";


function Learning() {
    const [count, setCount] = useState<number>(0);
    //Params
    const params = useSearchParams()[0].get("languages") as langType;
    // UseNavigate
    const navigate = useNavigate();
    // next Handler
    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
    }

    return (
        <Container maxWidth="sm" sx={{ padding: "1rem" }}>
            <Button
                variant="contained"
                onClick={
                    count === 0 ? () => navigate("/")
                        : () => setCount((prev) => prev - 1)
                }
            >
                <ArrowBack></ArrowBack>
            </Button>

            <Typography m={"2rem 0"}>
                Leaning Made Easy
            </Typography>

            <Stack direction={"row"} spacing={"1rem"}>
                <Typography variant="h4">
                    {count + 1} - {"Sample"}
                </Typography>
                <Typography color={"purple"} variant="h4">
                    :{"Lol"}
                </Typography>
                <Button sx={{ borderRadius: "50%" }}>
                    <VolumeUp />
                </Button>
            </Stack>
            <Button
                sx={{ margin: "3rem 0" }}
                variant="contained"
                fullWidth 
                onClick={count === 7 ?()=>navigate("/quiz"):()=>setCount(prev=>prev+1)}
                >
                { count ===7 ? "Test":"Next"}
                <ArrowRight />
            </Button>
        </Container>
    )
}

export default Learning