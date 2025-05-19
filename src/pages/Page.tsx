import "./styles/page.scss";
import { ReactNode } from "react";
import Navbar from "./home/navbar/Navbar.tsx";

interface PageProps {
  children?: ReactNode;
  id: string;
}

export default function Page({ id, children }: PageProps) {
  return (
    <div id={id} className={"page"}>
      <Navbar />
      {children}
    </div>
  );
}
