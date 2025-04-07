import "./App.scss";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
  return (
    <div id={"app"}>
      <Navbar options={<></>}/>
      <div id={"portfolio-page"}>
        <div id={"portfolio-page-texture"}/>
      </div>
    </div>
  );
}

export default App;
