import { useState } from "react";
import { FirstContext } from "./context";

const Wrapper = ({ children }) => {
    let [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  
    return (
        <FirstContext.Provider value={{ showPassword, togglePasswordVisibility }}>
            <div>
                {children}
            </div>
        </FirstContext.Provider>
    )
}

export default Wrapper;