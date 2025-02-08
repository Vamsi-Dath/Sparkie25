import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/Home";
import Chatbot from "./pages/chatbot/Chatbot";
import Test from "./pages/test/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Container } from "react-bootstrap";

const PageLayout = () => (
  <>
    <div className="d-flex flex-column vw-100 vh-100">
      <Header />
      <Container fluid className="d-flex bg-light flex-column flex-grow-1">
        <Outlet />
      </Container>
    </div>
  </>
);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/test" element={<Test />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);
