import {ReactNode} from "react";
import CompressedNavbar from "./CompressedNavbar.tsx";
import VerticalNavbar from "./VerticalNavbar";

export default function Navbar({options, isCompressed}: {options: ReactNode, isCompressed?: boolean}) {
    return isCompressed ? <CompressedNavbar options={options}/> : <VerticalNavbar options={options}/>;
}