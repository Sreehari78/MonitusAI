import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ["Paracetamol", "Ibuprofen", "Anti-Histamine", "Fenanntyl"],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
      },
    ],
  };

  const options = {};
  return (
    <div className="PieChart">
      <Pie data={data} options={options}>
        {" "}
      </Pie>
    </div>
  );
}
export default PieChart;
