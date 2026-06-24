import { useState } from "react";
import { FirstContext, SignUpContext } from "./context";

const Wrapper = ({ children }) => {
    let [showPassword, setShowPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "",
        mobilenumber: "",
        email: "",
    });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <FirstContext.Provider
            value={{
                showPassword, togglePasswordVisibility
            }}>
            <SignUpContext.Provider value={{signupData,setSignupData}}>
                {children}
            </SignUpContext.Provider>
        </FirstContext.Provider>
    )
}

export default Wrapper;