import "./styles/verticalNavbar.scss"
import {ReactNode} from "react";

export default function VerticalNavbar({options}: {options: ReactNode}) {
    return <nav id={"vertical-navbar"}>{options}</nav>
}