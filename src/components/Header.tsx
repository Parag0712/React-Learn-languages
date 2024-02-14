import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Header() {

    const styles= {
        color:"white",
        margin:"0.5rem",
        textDecoration:"none"
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography textTransform={"uppercase"} variant="h5" mr={"auto"} fontSize={"19px"} fontWeight={"500"}>Learn Something</Typography>
                <Link to="/" style={styles}><Typography >
                    Home
                </Typography></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header