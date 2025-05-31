import Preview from "./Preview";
import PortfolioPreviewImage from "../../../assets/projectPreviews/portfolio-project-preview-image.png";

export default function PortfolioProjectPreview() {
  return (
    <Preview
      title={"Portfolio"}
      concisePreviewText={
        "A portfolio designed to display and explain some of my projects."
      }
      longPreviewText={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu fermentum ex. Curabitur eleifend maximus molestie. Donec maximus leo non velit luctus, quis facilisis tellus cursus. In dignissim odio a nisl scelerisque commodo. Donec euismod bibendum tincidunt. Aenean eu aliquet felis. Ut molestie ante a finibus tincidunt. Nam et purus at velit pretium ullamcorper. Nullam velit tortor, bibendum vitae accumsan non, sagittis ut urna. Integer nunc quam, tincidunt nec blandit non, eleifend at velit. Nullam tristique vel dolor eu porta. Suspendisse at lobortis urna. Aenean elementum justo vitae diam rhoncus dignissim.\n" +
        "\n" +
        "Praesent cursus ante eget arcu sagittis, ut varius ligula rutrum. Fusce nec ligula tortor. Vivamus iaculis dictum sapien mattis aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas luctus velit urna, quis suscipit nibh suscipit non. Donec rhoncus nibh nec tincidunt commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet justo eu erat mattis pharetra. Duis et metus ut nisl pellentesque sollicitudin ac ut turpis. Duis ultrices ultricies libero. Nulla facilisis, lectus ac vestibulum vulputate, augue augue imperdiet elit, sit amet vestibulum tellus ante nec felis. Fusce a faucibus elit."
      }
      previewImage={PortfolioPreviewImage}
      dateCreated={"31/05/2025"}
    />
  );
}
