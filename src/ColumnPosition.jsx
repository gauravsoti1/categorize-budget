import { amexColumnPositions, ingColumnPositions } from "./AppCSVReader";
import Collapsible from "./Collapsible";

export const ColumnPositionPresets = ({ setColumnPositions }) => {
  return (
    <div className="mb-4 flex gap-4 items-center">
      <h6>Presets:</h6>
      <button
        className="text-white bg-blue-600 px-6 py-1 rounded"
        onClick={() => setColumnPositions(amexColumnPositions)}
      >
        Amex
      </button>
      <button
        className="bg-orange-500 text-white px-6 py-1 rounded"
        onClick={() => setColumnPositions(ingColumnPositions)}
      >
        Ing
      </button>
    </div>
  );
};

const ColumnPosition = ({ columnPositions, onPositionChange, Presets }) => {
  return (
    <Collapsible title="Column position in csv >">
      {Presets && Presets}
      <div>
        <div>
          <label htmlFor="date">Date </label>
          <input
            type="number"
            id="date"
            value={columnPositions.date}
            onChange={(e) => onPositionChange("date", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="debit">debit </label>
          <input
            type="number"
            id="debit"
            value={columnPositions.debit}
            onChange={(e) => onPositionChange("debit", e.target.value)}
          />
          <input
            type="checkbox"
            id="isDebitValueInNegative"
            value={columnPositions.isDebitValueInNegative}
            checked={columnPositions.isDebitValueInNegative}
            onChange={(e) => {
              onPositionChange("isDebitValueInNegative", e.target.checked);
            }}
          />
          <label htmlFor="isDebitValueInNegative">Is Debit in Negative? </label>
        </div>
        <div>
          <label htmlFor="credit">credit </label>
          <input
            type="number"
            id="credit"
            value={columnPositions.credit}
            disabled={columnPositions.isCreditPositionSameAsDebit}
            onChange={(e) => onPositionChange("credit", e.target.valueAsNumber)}
          />
          <input
            type="checkbox"
            id="isSameAsDebit"
            checked={columnPositions.isCreditPositionSameAsDebit}
            onChange={(e) => {
              onPositionChange("isCreditPositionSameAsDebit", e.target.checked);
            }}
          />
          <label htmlFor="isSameAsDebit">Is Same As Debit? </label>
          <input
            type="checkbox"
            id="isValueInNegative"
            disabled={columnPositions.isCreditPositionSameAsDebit}
            checked={columnPositions.isCreditValueInNegative}
            onChange={(e) =>
              onPositionChange("isCreditValueInNegative", e.target.checked)
            }
          />
          <label htmlFor="isValueInNegatve">Is Value in Negative? </label>
        </div>
        <div>
          <label htmlFor="description">Description </label>
          <input
            type="number"
            id="description"
            value={columnPositions.description}
            onChange={(e) => onPositionChange("description", e.target.value)}
          />
        </div>
      </div>
    </Collapsible>
  );
};

export default ColumnPosition;
