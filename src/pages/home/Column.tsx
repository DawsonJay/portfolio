import "./styles/column.scss";
import Title from "./title/Title";

export default function Column() {
  return (
    <>
      <div id="column-container">
        <div id="column-shaft">
          <Title />
        </div>
        <div id="column-tip" />
      </div>
    </>
  );
}
