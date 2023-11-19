import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Paracetamol", "Ibuprofen", "Anti-Histamine", "Fenanntyl"],
  datasets: [
    {
      label: "Count",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#3e95cd",
    },
  ],
};

const options = {
  indexAxis: "y",
  responsive: true,
  layout: {
    padding: 50,
  },
};
const BarChart = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
