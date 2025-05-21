import Home from "./pages/home/Home.tsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AboutMe from "./pages/aboutMe/AboutMe.tsx";
import Projects from "./pages/projects/Projects.tsx";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/home");
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path={"/home"} element={<Home />} />
      <Route path={"/about-me"} element={<AboutMe />} />
      <Route path={"/projects"} element={<Projects />} />
    </Routes>
  );
}

export default App;
