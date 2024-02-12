import "./styles.css";
import { useCSVReader } from "react-papaparse";
import { getCategory } from "./utils";
import { styles } from "./csvReaderStyles";
import { createEntry, dataAdditionType } from "./entry";
import { dataUploadTypes } from "./UploadTypeComponent";

export const initialColumnPositions = {
  date: 1,
  debit: 2,
  description: 3,
  credit: undefined,
  isCreditPositionSameAsDebit: true,
  isCreditValueInNegative: true,
  isDebitValueInNegative: false,
};

export const amexColumnPositions = {
  date: 1,
  debit: 6,
  description: 3,
  credit: null,
  isCreditPositionSameAsDebit: true,
  isCreditValueInNegative: true,
  isDebitValueInNegative: false,
};

export const ingColumnPositions = {
  date: 1,
  debit: 4,
  description: 2,
  credit: 3,
  isCreditPositionSameAsDebit: false,
  isCreditValueInNegative: true,
  isDebitValueInNegative: true,
};

const AppCSVReader = ({ setData, selectedUploadType, columnPositions }) => {
  const { CSVReader } = useCSVReader();

  const getDateCostDescriptionAccordingToColumnPosition = (
    csvRow,
    columnPositions
  ) => {
    const date = csvRow[columnPositions.date - 1];
    let debit = Number(csvRow[columnPositions.debit - 1]);
    let credit = 0;
    if (columnPositions.isDebitValueInNegative) debit = Math.abs(debit);
    if (columnPositions.isCreditPositionSameAsDebit) {
      console.log("debit =", debit);
      if (debit < 0) {
        credit = Math.abs(debit);
        debit = 0;
      }
    } else credit = Math.abs(Number(csvRow[columnPositions.credit - 1]));
    const description = csvRow[columnPositions.description - 1];
    return { date, debit, credit, description };
  };

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results) => {
          // console.log("---------------------------");
          // console.log(results);
          if (results.errors.length === 0) {
            const data = [];
            results.data.forEach((csvRow) => {
              const { date, debit, credit, description } =
                getDateCostDescriptionAccordingToColumnPosition(
                  csvRow,
                  columnPositions
                );
              if (description) {
                const entry = createEntry({
                  date,
                  debit,
                  credit,
                  description,
                  category: getCategory(description),
                });
                data.push(entry);
              }
            });
            if (selectedUploadType === dataUploadTypes.add)
              setData((prevData) => {
                return [
                  ...prevData,
                  ...data.sort((a, b) => new Date(a.date) - new Date(b.date)),
                ];
              });
            else {
              setData((currentData) => {
                const currentDataOnlyManualAdditions = currentData.filter(
                  (cd) => cd.type === dataAdditionType.manual
                );

                data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const newData = [...currentDataOnlyManualAdditions, ...data];
                return newData;
              });
            }
          }
          // console.log("---------------------------");
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div style={styles.csvReader}>
              <button
                type="button"
                {...getRootProps()}
                style={styles.browseFile}
              >
                Browse file
              </button>
              <div style={styles.acceptedFile}>
                {acceptedFile && acceptedFile.name}
              </div>
              <button {...getRemoveFileProps()} style={styles.remove}>
                Remove
              </button>
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default AppCSVReader;
