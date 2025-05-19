import "./styles/navbar.scss";
import GetInTouchButton from "./GetInTouchButton.tsx";
import Options from "./Options.tsx";

export default function Navbar() {
  return (
    <div id="navbar">
      <Options />
      <GetInTouchButton />
    </div>
  );
}
