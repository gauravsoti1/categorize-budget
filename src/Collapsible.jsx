import { useState } from "react";

const Collapsible = ({ title, children }) => {
  const [isSectionOpen, setSectionVisibility] = useState(false);
  const toggleSectionVisibility = () =>
    setSectionVisibility((isSectionOpen) => !isSectionOpen);

  return (
    <div style={{ textAlign: "left" }}>
      <h4
        style={{
          backgroundColor: "lightBlue",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        onClick={toggleSectionVisibility}
      >
        {title}
      </h4>
      {isSectionOpen && (
        <div
          style={{ background: "#fafafa", margin: "0.5rem", padding: "0.5rem" }}
        >
          {children}{" "}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
