import "./styles/navbar.scss";
import GetInTouchButton from "./GetInTouchButton.tsx";
import Options from "./Options.tsx";
import BurgerMenu from "./burgerMenu/BurgerMenu.tsx";

export default function Navbar() {
  return (
    <div id="navbar">
      <BurgerMenu />
      <Options />
      <GetInTouchButton />
    </div>
  );
}
