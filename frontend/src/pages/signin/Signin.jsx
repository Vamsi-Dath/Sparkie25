import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { sendSigninData, authSession, signout } from "../../api/apiService";
import { Button } from "react-bootstrap";

function Signin() {
  const responseMessage = async (response) => {
    console.log("SUCCESS!", response);
    const data = await sendSigninData(response);
    console.log(data.email);
    console.log(data.name);
    console.log(data.picture);
  };

  const testSession = async () => {
    const data = await authSession();
    console.log(data);
    console.log(data.email);
    console.log(data.name);
    console.log(data.picture);
  };

  const testSignout = async () => {
    const data = await signout();
    console.log(data);
  };

  const errorMessage = (error) => {
    console.log("FAILURE!", error);
  };
  return (
    <div>
      <h1>Google Login</h1>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <Button onClick={testSession}>TEST SESSION</Button>
      <Button onClick={testSignout}>TEST SIGNOUT</Button>
    </div>
  );
}
export default Signin;
