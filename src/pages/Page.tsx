import "./styles/page.scss";
import { ReactNode } from "react";

interface PageProps {
  children?: ReactNode;
  id: string;
}

export default function Page({ id, children }: PageProps) {
  return (
    <div id={id} className={"page"}>
      {children}
    </div>
  );
}
