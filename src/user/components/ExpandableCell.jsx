import { useState } from "react";

function ExpandableCell({ shortText, fullText, link }) {
  const [expanded, setExpanded] = useState(false);

  if (link) {
    return (
      <td className="expandable-cell">
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </td>
    );
  }

  return (
    <td className="expandable-cell">
      <span className={expanded ? "hidden" : ""}>{shortText}</span>
      <span className={expanded ? "" : "hidden"}>{fullText}</span>

      <button
        type="button"
        className="read-more"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </td>
  );
}

export default ExpandableCell;