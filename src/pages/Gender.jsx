import { useNavigate } from "react-router-dom";

const Gender=()=>{
    const navigate = useNavigate();
    return (
        <div>
            <h1>What's your gender?</h1>
            <p>You can change who seesvyour gender on your profile later.</p>
            <div>
                <input type="checkbox" name="Female" id="" />
                <input type="checkbox" name="Male" id="" />
                <input type="checkbox" name="More options" id="" />
            </div>
            <button onClick={()=>navigate('/signup/birthday')}>Next</button>
        </div>
    )
}

export default Gender;