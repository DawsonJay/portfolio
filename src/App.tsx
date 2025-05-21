import Home from "./pages/home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import AboutMe from "./pages/aboutMe/AboutMe.tsx";
import Projects from "./pages/projects/Projects.tsx";

function App() {
  return (
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/about-me"} element={<AboutMe />} />
        <Route path={"/projects"} element={<Projects />} />
      </Routes>
  )
}

export default App;
