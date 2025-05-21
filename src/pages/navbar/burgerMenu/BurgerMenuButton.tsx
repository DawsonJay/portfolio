import "./styles/burgerMenuButton.scss";
import MenuIcon from "@mui/icons-material/Menu";

interface BurgerMenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

export default function BurgerMenuButton({
  isMenuOpen,
  onClick,
}: BurgerMenuButtonProps) {
  const selectedClass = isMenuOpen ? "selected" : "";

  return (
    <button
      id={"burger-menu-button"}
      onClick={onClick}
      className={selectedClass}
    >
      <MenuIcon className={"icon"} />
    </button>
  );
}
