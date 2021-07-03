import Style from "./register.module.css";

export default function Register() {
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
            <input placeholder="Username" className={Style.logininput} />
            <input placeholder="Email" className={Style.logininput} />
            <input placeholder="Password" className={Style.logininput} />
            <input placeholder="Password Again" className={Style.logininput} />
            <button className={Style.loginbtn}>Sign Up</button>
            <span className={Style.forgetpass}>Already Have An Account?</span>
            <button className={Style.registerbtn}>LogIn Here</button>
          </div>
        </div>
      </div>
    </div>
  );
}
