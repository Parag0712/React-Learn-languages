import { ArrowBack, ArrowRight, NextPlan, VolumeOff, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { TranslateWord } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getWordsFail, getWordsRequest, getWordsSuccess } from "../Redux/slice";
import { RootState } from "@reduxjs/toolkit/query";
import { words } from "lodash";
import Loader from "./Loader";



function Learning() {
    const [count, setCount] = useState<number>(0);
    //Params
    
    const params = useSearchParams()[0].get("languages") as langType;
    // UseNavigate
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { result, loading, words, error } = useSelector((state: { root: StateType }) => (
        state.root
    ));

    // next Handler
    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
    }


    useEffect(() => {
        dispatch(getWordsRequest())
        TranslateWord(params || "hi").then((value) => {
            dispatch(getWordsSuccess(value));
        }).catch((err) => {
            console.log(err);
            
            dispatch(getWordsFail(err.message));
        })

        if (error) {
            alert(error)
            dispatch(clearState())
        }
    }, []);


    if (loading) return <Loader />
    else return (
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
                    {count + 1} - {words[count]?.word}
                </Typography>
                <Typography color={"purple"} variant="h4">
                    :{words[count]?.meaning}
                </Typography>
                <Button sx={{ borderRadius: "50%" }}>
                    <VolumeUp />
                </Button>
            </Stack>
            <Button
                sx={{ margin: "3rem 0" }}
                variant="contained"
                fullWidth
                onClick={count === words.length - 1 ? () => navigate("/quiz") : () => setCount(prev => prev + 1)}
            >
                {count === words.length - 1 ? "Test" : "Next"}
                <ArrowRight />
            </Button>
        </Container>
    )
}

export default Learning