import Page from "../Page.tsx";
import PortfolioProjectPreview from "./previews/PortfolioProjectPreview.tsx";
import WorkingOnItProjectPreview from "./previews/WorkingOnItProjectPreview.tsx";

export default function Projects() {
  return (
    <Page id={"projects-page"}>
      <PortfolioProjectPreview />
      <WorkingOnItProjectPreview />
      <WorkingOnItProjectPreview />
      <WorkingOnItProjectPreview />
    </Page>
  );
}
