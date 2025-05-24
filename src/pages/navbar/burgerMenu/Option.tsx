import "./styles/option.scss";
import { SvgIconProps } from "@mui/material";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toLowercaseDashed } from "../../../utils/stringUtils.ts";
import cn from "classnames";

interface OptionProps {
  title: string;
  icon: ReactElement<SvgIconProps>;
}

export default function Option({ title, icon }: OptionProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedClass = isSelected() ? "selected" : "";

  function isSelected() {
    return pathname.includes(toLowercaseDashed(title));
  }

  function handleClick() {
    const path = `/${toLowercaseDashed(title)}`;
    navigate(path);
  }

  return (
    <button className={cn("option", selectedClass)} onClick={handleClick}>
      <div className={"icon-container"}>{icon}</div>
      <div className={"title-container"}>
        <h3>{title}</h3>
      </div>
    </button>
  );
}
