import "./styles/options.scss";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { toLowercaseDashed } from "../../utils/stringUtils.ts";

interface OptionProps {
  title: string;
}

function Option({ title }: OptionProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedClass = isSelected() ? "selected" : "";

  function isSelected() {
    return pathname.includes(toLowercaseDashed(title));
  }

  function onClick() {
    const path = `/${toLowercaseDashed(title)}`;
    navigate(path);
  }

  return (
    <button className={cn("option", selectedClass)} onClick={onClick}>
      {title}
    </button>
  );
}

export default function Options() {
  return (
    <div id={"navbar-options"}>
      <Option title={"Home"} />
      <Option title={"Projects"} />
      <Option title={"About Me"} />
    </div>
  );
}
