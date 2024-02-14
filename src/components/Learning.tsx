import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";


function Learning() {
    const [count,setCount] = useState<number>(0);
    const params = useSearchParams()[0].get("languages") as langType;
    const navigate = useNavigate();

    console.log(params);
    
    const nextHandler = ():void=>{
        setCount((prev)=>prev+1);
    }
    return (
        <div>{params} as</div>
    )
}

export default Learning