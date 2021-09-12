import { useContext, useRef } from "react";
import Style from "./login.module.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import  { Redirect ,Link} from 'react-router-dom'; 
import { useHistory } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

const history =useHistory()  ; 

const regpage=() =>{
  history.push("/register") ; 
}
  function handleclick(e) {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  }
  console.log(user);
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
          <form onSubmit={handleclick} className={Style.loginbox}>
            <input
              required
              ref={email}
              id="for_autocomplete"
              type="email"
              placeholder="email"
              className={Style.logininput}
            />
            <input
              required
              minLength="6"
              ref={password}
              type="password"
              placeholder="password"
              className={Style.logininput}
            />
            <button disabled={isFetching} className={Style.loginbtn}>
              {isFetching ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className={Style.forgetpass}>Forgot Password?</span>
            <button onClick={regpage} className={Style.registerbtn}>
              {isFetching ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Create A New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
