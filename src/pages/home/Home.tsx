import "./styles/home.scss";
import Page from "../Page.tsx";
import Column from "./Column.tsx";
import Avatar from "./Avatar.tsx";
import ShapesBackground from "./shapesBackground/ShapesBackground.tsx";

export default function Home() {
  return (
    <Page id={"home-page"}>
      <ShapesBackground />
      <Column />
      <Avatar />
    </Page>
  );
}
