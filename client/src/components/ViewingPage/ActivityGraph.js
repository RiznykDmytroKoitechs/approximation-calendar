import { Container } from "@mui/system";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

ChartJS.defaults.color = "#FFF";

function ActivityGraph({ postData }) {
  const labels = [
    moment().subtract(6, "days").format("dddd"),
    moment().subtract(5, "days").format("dddd"),
    moment().subtract(4, "days").format("dddd"),
    moment().subtract(3, "days").format("dddd"),
    moment().subtract(2, "days").format("dddd"),
    moment().subtract(1, "days").format("dddd"),
    moment().format("dddd"),
  ];

  const graphData = [0, 0, 0, 0, 0, 0, 0];
  postData.forEach((element) => {
    if (moment(element.date) > moment().subtract(6, "days").startOf("day")) {
      if (moment(element.date) > moment().startOf("day")) {
        graphData[6] += element.hours;
      } else if (
        moment(element.date) > moment().subtract(1, "days").startOf("day")
      ) {
        graphData[5] += element.hours;
      } else if (
        moment(element.date) > moment().subtract(2, "days").startOf("day")
      ) {
        graphData[4] += element.hours;
      } else if (
        moment(element.date) > moment().subtract(3, "days").startOf("day")
      ) {
        graphData[3] += element.hours;
      } else if (
        moment(element.date) > moment().subtract(4, "days").startOf("day")
      ) {
        graphData[2] += element.hours;
      } else if (
        moment(element.date) > moment().subtract(5, "days").startOf("day")
      ) {
        graphData[1] += element.hours;
      } else {
        graphData[0] += element.hours;
      }
    }
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Productivity chart!",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        data: graphData,
        backgroundColor: "rgba(0, 120, 255, 1)",
      },
    ],
  };

  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
}

export default React.memo(ActivityGraph);
