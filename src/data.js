export const categories = {
  fuel: ["FUELCO", "BP", "SHELL"],
  "EAT OUT": [
    "GUZMAN Y GOMEZ",
    "UBER EATS",
    "KATHMANDU MO MO HOUSE",
    "NANDO",
    "LILYDAL",
    "YOUFOODZ",
    "GAMI CHICKEN & BEER",
    "DOMINO",
    "CAFE",
    "RESTAURANT",
    "LEBANESE RESTA",
    "SAL'S PIZZA",
    "HUNGRY JACKS",
    "SARAVANAA",
    "KINGS DUMPLING KITCHEN",
    "KIT ESPRESSO",
    "SCHNITZ",
    "MCDONALD",
    "GILL FAMILY KITCHEN",
    "GAMI",
    "MOMO CENTRAL",
    "SAMSAM CHICKEN",
    "PAPPARICH",
  ],
  SHOPPING: [
    "WITCHERY",
    "KATHMANDU",
    "REBEL SPORTS",
    "AMAZON",
    "GUESS",
    "ADIDAS",
    "FILA",
    "MOORABBIN DFO",
    "TEMU",
    "SUSSAN",
    "ADAIRS",
  ],
  MEDICINE: ["CHEMIST WAREHOUSE", "PHARMACY", "MY CHEMIST"],
  TRANSPORTATION: [
    "DIDICHUXING",
    "HEAD OFFICE TOLLS",
    "GM_CABS 00338715 MASCOT",
    "UBER TRIP",
  ],
  GROCERIES: [
    "COLES",
    "SATNAM INDIAN GROCER",
    "WOOLWORTHS",
    "ASHOK BOMBAY",
    "FUNKYFOOD",
  ],
  ALCOHOL: ["BWS", "LIQUORLAND"],
  PHONE: ["TELSTRA"],
  TRAVEL: ["AIR INDIA", "JETSTAR", "HI EXP", "EAST COAST CAR RENTALS"],
  UTILITIES: ["AGLENERGY"],
  PARKING: [
    "WestfieldDoncaster S804 Doncaster",
    "MELBOURNE AIRPORT SERVI TULLAMARINE",
  ],
  MEMORY: ["WWW.GFPEVENTS.COM.AU"],
  FUN: ["SOVEREIGN HILL", "NATURAL ESSENCE OF THAI"],
  HOME: [
    "AFTERPAY",
    "BEDSHED",
    "BUNNINGS WAREHOUSE",
    "FORTY WINKS",
    "TARGET",
    "MYER",
    "BIG W",
    "KMART",
    "THE GOOD GUYS",
    "IKEA",
    "JB HI FI",
  ],
};

const data = [
  "Date,Cost,Description",
  "18/05/2023,14.99,SURFERS PARADISE 24HR C",
  "19/05/2023,15.5, GUZMAN Y GOMEZ SURFERS SURFERS PARADISE",
  "22/05/2023,67.13, EG FUELCO 3421 BLACKBUR DONCASTER",
];
export const parsedData = data.map((d) => d.split(",")).slice(1);

export const categoriesMap = new Map();
Object.entries(categories).forEach(([key, valueArray]) => {
  valueArray.forEach((value) => {
    categoriesMap.set(value, key);
  });
});

// console.log(categoriesMap);
