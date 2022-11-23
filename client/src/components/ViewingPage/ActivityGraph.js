import { Container } from "@mui/system";
import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

ChartJS.defaults.color = "#FFF"


function ActivityGraph({postData}){
    const labels = [
        moment().day(-6).format("dddd"), 
        moment().day(-5).format("dddd"),
        moment().day(-4).format("dddd"),
        moment().day(-3).format("dddd"),
        moment().day(-2).format("dddd"),
        moment().day(-1).format("dddd"),
        moment().format("dddd")
    ];

    const graphData = [0,0,0,0,0,0,0]
    postData.forEach(element => {
        if(moment(element.date) > moment().day(-6).startOf('day')){
            if (moment(element.date) > moment().startOf('day')){
                graphData[6]+=element.hours;
            }
            else if (moment(element.date) > moment().day(-1).startOf('day')){
                graphData[5]+=element.hours;
            } 
            else if (moment(element.date) > moment().day(-2).startOf('day')){
                graphData[4]+=element.hours;
            } 
            else if (moment(element.date) > moment().day(-3).startOf('day')){
                graphData[3]+=element.hours;
            }
            else if (moment(element.date) > moment().day(-4).startOf('day')){
                graphData[2]+=element.hours;
            }
            else if(moment(element.date) > moment().day(-5).startOf('day')){
                graphData[1]+=element.hours;
            }
            else {
                graphData[0]+=element.hours;
            }
        }
    });

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Productivity chart!',
          },
        },
      };
      const data = {
        labels,
        datasets: [
          {
            data: graphData,
            backgroundColor: 'rgba(0, 120, 255, 1)',
          },
        ],
      };
    console.log(data)

  return (
    <Container>
        <Bar options={options} data={data} />
    </Container>
  );
}

export default React.memo(ActivityGraph)
