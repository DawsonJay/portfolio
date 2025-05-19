import "./styles/options.scss";
import cn from "classnames";

interface OptionProps {
  title: string;
  isSelected: boolean;
}

function Option({ title, isSelected }: OptionProps) {
  const selectedClass = isSelected ? "selected" : "";
  return <button className={cn("option", selectedClass)}>{title}</button>;
}

export default function Options() {
  return (
    <div id={"navbar-options"}>
      <Option title={"Home"} isSelected={false} />
      <Option title={"Projects"} isSelected={true} />
      <Option title={"About Me"} isSelected={false} />
    </div>
  );
}
