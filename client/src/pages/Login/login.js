import Style from "./login.module.css";

export default function Login() {
  return (
    <div className={Style.login}>
      <div className={Style.loginwrapper}>
        <div className={Style.loginleft}>
          <h3 className={Style.logo}>Unsocial Media</h3>
          <span className={Style.dec}>
            Be Unsocial and Connect with the Unsocial friends around you on
            Unsocial Media
          </span>
        </div>
        <div className={Style.loginright}>
          <div className={Style.loginbox}>
            <input placeholder="email" className={Style.logininput} />
            <input placeholder="password" className={Style.logininput} />
            <button className={Style.loginbtn}>Log In</button>
            <span className={Style.forgetpass}>Forgot Password?</span>
            <button className={Style.registerbtn}>Create A New Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
