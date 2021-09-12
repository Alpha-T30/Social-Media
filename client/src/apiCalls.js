import axios from "axios";

export const loginCall = async (userCredential,dispatch) =>{
    dispatch( {type:"login_start"}) ; 
    try {

        const res = await axios.post("auth/login",userCredential) ; 
        dispatch({type:"login_success", payload:res.data})  ; 
        
    } catch (error) {
        dispatch({type:"login_failure",payload:error}); 
        
    }
}