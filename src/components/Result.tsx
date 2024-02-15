import { useSelector } from "react-redux"

function Result() {

    const {words,result} = useSelector((state:{root:StateType})=>{
        return state.root
    })

    console.log(words);
    console.log(result);
    
    return (
        <div>
            Hi
        </div>
    )
}

export default Result