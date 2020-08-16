import React, { useState, useEffect } from "react";
import "./DataBar.css";
import { Grid } from "@material-ui/core/";
import { Line } from "react-chartjs-2";
import API from "../../utils/API";

const DataBar = props => {
  const [data, setData] = useState({
    dates: [],
    cases: [],
    deaths: [],
    recovered: [],
    xAxisLabel: ""
  });

  async function fetchData(country) {
    const res = await API.get(`timeline/${country}`);
    // const dataLength = res.data.length;
    const data = res.data.filter(d => d.last_update.includes("T")).reverse();
    // const data =
    //   dataLength < 30
    //     ? res.data
    //     : res.data.filter(d => d.last_update.includes("T")).reverse();
    setData({
      dates: data.map(d =>
        new Date(d.last_update)
          .toDateString()
          .split(" ")
          .splice(1)
          .join(" ")
      ),
      cases: data.map(d => d.cases - d.recovered - d.deaths),
      deaths: data.map(d => d.deaths),
      recovered: data.map(d => d.recovered),
      xAxisLabel:
        new Date(data[2].last_update)
          .toDateString()
          .split(" ")
          .splice(1)
          .join(" ") +
        " - " +
        new Date(data[res.data.length - 1].last_update)
          .toDateString()
          .split(" ")
          .splice(1)
          .join(" ")
    });
  }

  useEffect(() => {
    fetchData(props.country);
  }, [props.country]);

  const { dates, cases, deaths, recovered, xAxisLabel } = data;
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Active Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases
      },
      {
        label: "Deaths",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(244, 67, 54)",
        pointBorderColor: "rgb(244, 67, 54)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: deaths
      },
      {
        label: "Recovered",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(46, 204, 113)",
        pointBorderColor: "rgb(46, 204, 113)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: recovered
      }
    ]
  };
  return (
    <div className={"DataBar"}>
      <Grid item sm={12}>
        <Line
          data={chartData}
          height={250}
          options={{
            legend: { display: false },
            layout: {
              padding: {
                left: 0,
                right: 30,
                top: 30,
                bottom: 0
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    display: false //this will remove only the label
                  },
                  scaleLabel: {
                    display: true,
                    labelString: xAxisLabel
                  }
                }
              ]
            }
          }}
        />
      </Grid>
    </div>
  );
};

export default DataBar;
