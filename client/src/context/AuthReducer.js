const initialState = {} ; 

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("currentuser")) || initialValue;

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login_start":
      return {
        user: false,
        isFetching: true,
        error: false,
      };
    case "login_success":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "login_failure":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "follow":
      return {
        ...state ,
        user:{
          ...state.user,
          following:[...state.user.following,action.payload]
        }
      };
    case "unfollow":
      return {
        ...state ,
        user:{
          ...state.user,
          following:state.user.following.filter((f)=>{
            return f!==action.payload; 
          })
        }
      };
    default:
      return state;
  }
};


 