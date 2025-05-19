import "./styles/home.scss";
import Page from "../Page.tsx";
import Column from "./Column.tsx";
import Avatar from "./Avatar.tsx";
import Footer from "./Footer.tsx";

export default function Home() {
  return (
    <Page id={"home-page"}>
      <Column />
      <Avatar />
      <Footer />
    </Page>
  );
}
