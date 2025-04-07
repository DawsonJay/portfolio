import "./styles/verticalNavbar.scss"
import {ReactNode} from "react";
import {OptionTray} from "./OptionTray.tsx";
import IconBar from "./IconBar.tsx";

export default function VerticalNavbar({options}: {options: ReactNode}) {
    return <nav id={"vertical-navbar"}>
        <OptionTray options={options}/>
        <IconBar options={options}/>
    </nav>
}