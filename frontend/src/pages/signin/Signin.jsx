import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { sendSigninData, signout } from "../../api/apiService";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useSession } from "../../components/sessionProvider/SessionProvider";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { session, updateSession } = useSession();

  const navigate = useNavigate();

  const responseMessage = async (response) => {
    console.log("SUCCESS!", response);
    await sendSigninData(response);
    updateSession();
    navigate("/");
  };

  const signoutUser = async () => {
    await signout();
    updateSession();
  };

  const errorMessage = (error) => {
    console.log("FAILURE!", error);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Row className="w-50 justify-content-center">
        <Card className="p-4 align-items-center">
          <Card.Title className="mb-4">AgriCulture Signin</Card.Title>

          {!session?.isSignedIn ? (
            <>
              <Card.Text className="mb-4">
                Please sign in to continue.
              </Card.Text>
              <GoogleLogin
                clientId="your-client-id" // Add your client ID
                onSuccess={responseMessage}
                onFailure={errorMessage}
                buttonText="Sign in with Google"
                className="btn btn-danger w-100"
              />
            </>
          ) : (
            <>
              <Card.Text className="mb-4">Do you want to signout?</Card.Text>
              <Button
                style={{ backgroundColor: "orangered" }}
                onClick={signoutUser}
                className="w-100"
              >
                Sign Out
              </Button>
            </>
          )}
        </Card>
      </Row>
    </Container>
  );
}
export default Signin;
