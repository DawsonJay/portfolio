import "./styles/title.scss";
import SwitchingSubtitle from "./SwitchingSubtitle.tsx";

export default function Title() {
  return (
    <div className={"title-container"}>
      <h1 className={"title"}>James Dawson</h1>
      <SwitchingSubtitle />
    </div>
  );
}
