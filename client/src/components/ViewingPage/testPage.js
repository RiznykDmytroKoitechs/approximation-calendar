import { useEffect, useLayoutEffect, useState } from "react"


export default function TestPage() {
    const [state, setState] = useState(0)

    console.log("Yoooooo")
    setState(state=>state+1)
    console.log(state)
    setState(state=>state+1)
    console.log(state)

    /*useEffect(()=>{
        console.log("Yoooooo")
        setState(state=>state+1)
        console.log(state)
        setState(state=>state+1)
        console.log(state)
    },[])*/

    return(
        <div>Lol</div>
    )
}