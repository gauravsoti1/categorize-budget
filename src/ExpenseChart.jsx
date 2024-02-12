import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";
import { getCost } from "./utils";

ChartJS.register(ArcElement, Tooltip, Legend);
function getRandomColor(count) {
  console.log("count=", count);
  let colors = [];
  for (let i = 0; i < count; i++) {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let x = 0; x < 6; x++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log("color", color);
    colors.push(color);
  }
  return colors;
}

const ExpenseChart = ({ expenses }) => {
  const expensesWithoutDirectDebit = expenses.filter(
    ({ description }) => !description.match(/direct debit received/i)
  );
  const labels = Array.from(
    new Set(expensesWithoutDirectDebit.map(({ category }) => category))
  );
  const datasets = labels.map((category) =>
    getCost(expensesWithoutDirectDebit)(category)
  );

  const backgroundColor = getRandomColor(labels.length);
  // console.log(backgroundColor);

  const data = {
    labels,
    datasets: [{ data: datasets, backgroundColor }],
  };
  // console.log("data", data);

  return (
    <div style={{ height: "300px" }}>
      <Pie
        // width="200px"
        // height="200px"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            autocolors: {
              mode: "data",
            },
          },
        }}
      />
    </div>
  );
};

export default ExpenseChart;
