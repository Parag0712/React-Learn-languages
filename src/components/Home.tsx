import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    
    const languages: Language[] = [
        {
            name: "japanese",
            code: "ja"
        },
        {
            name: "Hindi",
            code: "hi"
        },
        {
            name: "Spanish",
            code: "es"
        },
        {
            name: "French",
            code: "fr"
        }
    ];

    const languageSelectHandler =(languages:string):void=>{
        navigate(`/learning?languages=${languages}`)
    }

    return (
        <Container maxWidth={"sm"}>
            <Typography variant="h3" p={"2rem"} textAlign={"center"}>
                Welcome Begin your journey of learning.
            </Typography>
            <Stack direction={"row"}  spacing={"2rem"} p={"2rem"} alignItems={"center"} justifyContent={"center"}>
                {
                    languages.map((value) => (
                        <Button 
                            key={value.code} 
                            variant="contained" 
                            onClick={()=>languageSelectHandler(value.name)}>
                            {value.name}
                        </Button>
                    ))
                }
            </Stack>
            <Typography   textAlign={"center"}>
                Choose one languages from above
            </Typography>
        </Container>
    )
}

export default Home