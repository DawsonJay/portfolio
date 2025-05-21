import "./styles/home.scss";
import Page from "../Page.tsx";
import Column from "./Column.tsx";
import Avatar from "./Avatar.tsx";
export default function Home() {
  return (
    <Page id={"home-page"}>
      <Column />
      <Avatar />
    </Page>
  );
}
