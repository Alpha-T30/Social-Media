export const LoginStart = (userCredential) => ({
    type:"login_start" ,
    
}) ;

export const LoginSuccess = (user) =>({
    type : "login_success",
    payload :user 
}) ; 


export const LoginFailure = (error) =>({
    type:"login_failure" , 
    payload : error 
}); 


export const Follow =(userid) =>({
    type: "follow" , 
    payload:userid
})

export const Unfollow =(userid) =>({
    type: "unfollow" , 
    payload:userid
})