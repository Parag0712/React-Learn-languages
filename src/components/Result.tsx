import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { clearState } from "../Redux/slice";

function Result() {

    const { words, result } = useSelector((state: { root: StateType }) => {
        return state.root
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count,setCount] = useState<number>();

    console.log(words);
    console.log(result);

    useEffect(()=>{
        const length:number = words.filter((i,idx)=>{
            return i.meaning == result[idx]
        }).length;
        setCount(length);
    })

    const resetHandler = ()=>{
        navigate("/");
        dispatch(clearState());
    }

    return (
        <Container maxWidth={"sm"}>
            <Typography variant="h3" color={"primary"} m={"2rem 0"}>
                Result
            </Typography>
            <Typography m={"1rem"} variant="h6">
                You got {count} right out of {words?.length}
            </Typography>

            <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Stack>
                    <Typography m={"1rem 0"} variant="h5">
                        Your Ans
                    </Typography>
                    <List>
                        {result.map((i, idx) => (
                            <ListItem key={idx}>
                                {idx + 1} - {i} 
                            </ListItem>
                        ))}
                    </List>
                </Stack>
                <Stack>
                    <Typography m={"1rem 0"} variant="h5">
                        Your Ans
                    </Typography>
                    <List>
                        {words?.map((i, idx) => (
                            <ListItem key={idx}  style={{ color: result[idx] !== i.meaning ? 'red' : 'green' }}>
                                {idx + 1} - {result[idx]}
                            </ListItem>
                        ))}
                    </List>
                </Stack>
                <Stack>
                    <Typography m={"1rem 0"} variant="h5">
                        Correct Ans
                    </Typography>
                    <List>
                        {words?.map((i, idx) => (
                            <ListItem key={idx}>
                                {idx + 1} - {i.meaning}
                            </ListItem>
                        ))}
                    </List>
                </Stack>
                
            </Stack>

            <Typography
                m={"1rem"}
                variant="h5"
                // color={percentage > 50 ? "green" : "red"}
            >
                {/* {percentage > 50 ? "Pass" : "Fail"} */}
            </Typography>

            <Button
                onClick={resetHandler}
                sx={{ margin: "1rem" }}
                variant="contained"
            >
                Reset
            </Button>
        </Container>
    )
}

export default Result