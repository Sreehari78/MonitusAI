import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ["Show", "Hide"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};
  return (
    <div>
      <Doughnut data={data} options={options}>
        {" "}
      </Doughnut>
    </div>
  );
};
export default DonutChart;
