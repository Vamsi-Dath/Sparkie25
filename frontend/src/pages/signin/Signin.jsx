import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { sendSigninData, authSession, signout } from "../../api/apiService";
import { Button } from "react-bootstrap";
import { useSession } from "../../components/sessionProvider/SessionProvider";

function Signin() {
  const { session, updateSession } = useSession();

  const responseMessage = async (response) => {
    console.log("SUCCESS!", response);
    const data = await sendSigninData(response);
    updateSession();
    console.log(data.email);
    console.log(data.name);
    console.log(data.picture);
  };

  const testSession = async () => {
    const data = await authSession();
    updateSession();
    console.log(data);
    console.log(data.email);
    console.log(data.name);
    console.log(data.picture);
  };

  const testSignout = async () => {
    const data = await signout();
    updateSession();
    console.log(data);
  };

  const errorMessage = (error) => {
    console.log("FAILURE!", error);
  };
  return (
    <div>
      <h1>Google Login</h1>
      <h1>BLOP: {session?.isSignedIn ? "LOGGED IN" : "LOGGED OUT"}</h1>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <Button onClick={testSession}>TEST SESSION</Button>
      <Button onClick={testSignout}>TEST SIGNOUT</Button>
    </div>
  );
}
export default Signin;
