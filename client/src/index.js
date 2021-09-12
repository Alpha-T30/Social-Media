import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  
    <AuthContextProvider >
      <App></App>
    
    </AuthContextProvider>
     
  ,
  document.getElementById("root")
);
