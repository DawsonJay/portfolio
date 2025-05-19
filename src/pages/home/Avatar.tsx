import Me from "../../assets/278c.png";
import "./styles/avatar.scss";

export default function Avatar() {
  return (
    <div id={"avatar-container"}>
      <img id={"avatar"} src={Me} alt={"me"} />
    </div>
  );
}
