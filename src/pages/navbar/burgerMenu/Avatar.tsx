import "./styles/avatar.scss";
import Me from "../../../assets/278a.png";

export default function Avatar() {
  return (
    <div className={"base-block"}>
      <img className={"burger-menu-avatar"} src={Me} alt={"me"} />
    </div>
  );
}
