export const generateUniqSerial = () => {
  return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
};

export const dataAdditionType = {
  manual: "manual",
  csv: "csv",
};

export const createEntry = (
  { credit, debit, description, date, category, type = dataAdditionType.csv },
  generateKey = true
) => {
  const object = {
    include: true,
    debit,
    credit,
    description,
    date,
    category,
    type,
  };
  if (generateKey) object.key = generateUniqSerial();
  return object;
};
