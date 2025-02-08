import { createRoot } from "react-dom/client";
import "./index.css";

import Home from "./pages/home/Home";
import Chatbot from "./pages/chatbot/Chatbot";
import Test from "./pages/test/Test";
import Signin from "./pages/signin/Signin";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from "./components/header/Header";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SessionProvider } from "./components/sessionProvider/SessionProvider";

const PageLayout = () => (
  <>
    <div className="d-flex flex-column vw-100 vh-100 text-dark">
      <Header />
      <Container fluid className="d-flex bg-light flex-column flex-grow-1">
        <Outlet />
      </Container>
    </div>
  </>
);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="659248833719-4229rh1hlv988v34spdm258q7hgqcejl.apps.googleusercontent.com">
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </GoogleOAuthProvider>
);
