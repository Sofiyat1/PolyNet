import "./Login.css";
import loginImage from "../assets/login.png";
const Login = () => {
  return (
    <div className="loginGen">
      <div className="imgDiv">
        <img src={loginImage} alt="" />
      </div>
      <form action="" className="formDiv">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" className="inputBackground" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="inputBackground"
          />
        </div>
        <div className="btn">
          <button className="LogInBtn">Login</button>
          <p className="forgot">Forgot Password?</p>
        </div>
        <button className="CreateAcc">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
