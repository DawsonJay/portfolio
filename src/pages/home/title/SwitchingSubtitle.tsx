import "./styles/switchingSubtitles.scss";
import { useEffect, useState } from "react";
import cn from "classnames";

export default function SwitchingSubtitle() {
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [firstSubtitle, setFirstSubtitle] = useState("Professional Nerd");
  const [secondSubtitle, setSecondSubtitle] = useState("Trained Dork");

  const firstSubtitleVisibleClass = isFirstVisible ? "visible" : "hidden";
  const secondSubtitleVisibleClass = isFirstVisible ? "hidden" : "visible";

  const professionalSynonyms = [
    "Expert",
    "Skilled",
    "Proficient",
    "Competent",
    "Qualified",
    "Experienced",
    "Specialist",
    "Adept",
    "Practiced",
    "Trained",
    "Knowledgeable",
    "Accomplished",
    "Seasoned",
    "Certified",
    "Talented",
    "Masterful",
    "Capable",
    "Efficient",
    "Reliable",
    "Businesslike",
  ];

  const nerdSynonyms = [
    "Dork",
    "Geekster",
    "Nerdlinger",
    "Brainiac",
    "Bookworm",
    "Techie",
    "Programmer",
    "Dweeb",
    "Poindexter",
    "Squint",
    "Four-eyes",
    "Mouse potato",
    "Code monkey",
    "Pixel pusher",
    "Data junkie",
    "Button masher",
    "Screen addict",
    "Gadgeteer",
    "Cybernaut",
    "Nerdlet",
  ];

  useEffect(() => {
    function getRandomSubtitle() {
      const randomProfessionalSynonym =
        professionalSynonyms[
          Math.floor(Math.random() * professionalSynonyms.length)
        ];
      const randomNerdSynonym =
        nerdSynonyms[Math.floor(Math.random() * nerdSynonyms.length)];
      return `${randomProfessionalSynonym} ${randomNerdSynonym}`;
    }

    function toggleSubtitles() {
      if (isFirstVisible) setSecondSubtitle(getRandomSubtitle());
      else setFirstSubtitle(getRandomSubtitle());
      setIsFirstVisible(!isFirstVisible);
    }

    const intervalId = setInterval(() => {
      toggleSubtitles();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [isFirstVisible, nerdSynonyms, professionalSynonyms]);

  return (
    <div className={"subtitle-container"}>
      <h6 className={cn("subtitle", firstSubtitleVisibleClass)}>
        {firstSubtitle}
      </h6>
      <h6 className={cn("subtitle", secondSubtitleVisibleClass)}>
        {secondSubtitle}
      </h6>
    </div>
  );
}
