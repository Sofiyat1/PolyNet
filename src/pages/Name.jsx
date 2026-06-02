import { useNavigate } from "react-router-dom";

const Name = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>What's your name?</h1>
            <p>Enter the name you use in real life.</p>
            <div>
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" name="" id="" />
            </div>
            <button onClick={()=>navigate('/singup/gender')}>Next</button>
        </div>
    )
}
export default Name;