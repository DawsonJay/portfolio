import "./styles/burgerMenu.scss";
import BurgerMenuButton from "./BurgerMenuButton.tsx";
import { useState } from "react";
import Avatar from "./Avatar.tsx";
import Options from "./Options.tsx";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <BurgerMenuButton isMenuOpen={isOpen} onClick={onClick} />
      {isOpen ? <PopupMenu /> : <></>}
    </>
  );
}

function PopupMenu() {
  return (
    <div id={"popup-nav-menu"}>
      <Options />
      <Avatar />
    </div>
  );
}
