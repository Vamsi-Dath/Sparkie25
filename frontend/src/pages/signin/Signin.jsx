import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { sendSigninData } from "../../api/apiService";

function Signin() {
  const responseMessage = async (response) => {
    console.log("SUCCESS!", response);
    await sendSigninData(response);
    updateSession();
  };
  const errorMessage = (error) => {
    console.log("FAILURE!", error);
  };
  return (
    <div>
      <h1>Google Login</h1>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}
export default Signin;
