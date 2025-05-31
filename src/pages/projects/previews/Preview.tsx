import "./styles/preview.scss";

interface PreviewProps {
  previewImage: string;
  title: string;
  dateCreated: string;
  concisePreviewText: string;
  longPreviewText: string;
}

export default function Preview({
  previewImage,
  title,
  dateCreated,
  concisePreviewText,
  longPreviewText,
}: PreviewProps) {
  return (
    <div className={"preview"}>
      <img
        src={previewImage}
        alt={"preview image"}
        className={"preview-image"}
      />
      <div className={"preview-text"}>
        <p className={"preview-date-created"}>{dateCreated}</p>
        <h2 className={"preview-title"}>{title}</h2>
        <p className={"concise-preview-text"}>{concisePreviewText}</p>
        <article className={"long-preview-text"}>{longPreviewText}</article>
      </div>
    </div>
  );
}
