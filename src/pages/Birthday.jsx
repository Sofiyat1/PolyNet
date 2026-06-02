import { useNavigate } from "react-router-dom";

const Birthday=()=>{
    const navigate =useNavigate();
    return (
        <div>
            <h1>What's your birthday?</h1>
            <p>Choose your date of birth. You can always make this private later. <span>Why do I need to provide my birthday?</span></p>
            <input type="date" name="" id="" />
            <button onClick={()=>navigate("/signup/password")}>Next</button>
        </div>
    )
}
export default Birthday;