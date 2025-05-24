import "./styles/options.scss";
import Option from "./Option.tsx";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

export default function Options() {
  return (
    <div id={"popup-nav-menu-options"}>
      <Option title={"Home"} icon={<HomeIcon />} />
      <Option title={"Projects"} icon={<StarIcon />} />
      <Option title={"About Me"} icon={<FavoriteIcon />} />
    </div>
  );
}
