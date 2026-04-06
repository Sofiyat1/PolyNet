const Login = () => {
  return (
    <div>
      <div>
        <img src="Logotranspa.png" alt="" />
      </div>
      <form action="">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <button className="LogInBtn">Login</button>
        <p>Forgot Password?</p>
        <button className="CreateAcc">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
