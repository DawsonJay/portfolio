import "./styles/page.scss";
import { ReactNode } from "react";
import Navbar from "./navbar/Navbar.tsx";
import Footer from "./Footer.tsx";

interface PageProps {
  children?: ReactNode;
  id: string;
}

export default function Page({ id, children }: PageProps) {
  return (
    <div id={id} className={"page"}>
      <Navbar />
      <div id={"content"}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
