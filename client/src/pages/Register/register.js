import Style from "./register.module.css";
import { useRef } from 'react';
import  axios  from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Register() {
  console.log(localStorage.getItem("currentuser")) ; 
 
const  history =useHistory() ; 
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);


  const handleclick =async (e) => {
    e.preventDefault();
    if (password.current.value!==passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password not matched!")
    } else {
      const user = {
        username:username.current.value,
        email: email.current.value,
        password: password.current.value 

      }
      try {

      await axios.post("auth/register",user) 
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
        
      } catch (error) {

        console.log(error)
      }
      


    }
     
  }

  const loginpage=()=>{
    history.push("/login") ; 
  }
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
            <input placeholder="Username" required  ref={username} className={Style.logininput} />
            <input placeholder="Email" type="email" required ref={email} className={Style.logininput} />
            <input placeholder="Password" minLength="6"  type="password" required ref={password} className={Style.logininput} />
            <input placeholder="Password Again" type="password" required  ref={passwordAgain} className={Style.logininput} />
            <button type="submit" className={Style.loginbtn}>
            {isFetching ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Sign Up"
              )}
            </button>
            <span className={Style.forgetpass}>Already Have An Account?</span>
            <button onClick={loginpage} className={Style.registerbtn}>LogIn Here</button>
          </form>
        </div>
      </div>
    </div>
  );
}
