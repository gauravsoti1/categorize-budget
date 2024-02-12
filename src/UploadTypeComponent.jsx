import Collapsible from "./Collapsible";

export const dataUploadTypes = { reset: "reset", add: "add" };

const UploadTypeComponent = ({ selectedUploadType, onUploadTypeChange }) => {
  return (
    <Collapsible title="Upload Type >">
      <div>
        {Object.values(dataUploadTypes).map((uploadType) => (
          <span key={uploadType}>
            <input
              type="radio"
              name="data update type"
              value={uploadType}
              id={uploadType}
              checked={selectedUploadType === uploadType}
              onChange={onUploadTypeChange}
            />
            <label for={uploadType}>{uploadType} </label>
          </span>
        ))}
      </div>
    </Collapsible>
  );
};

export default UploadTypeComponent;
