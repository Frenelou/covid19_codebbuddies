import React, { Component } from "react";
import "./Chart.css";
import { PieChart } from "react-minimal-pie-chart";
import { Grid } from "@material-ui/core/";

class Chart extends Component {
  render() {
    const { deaths, recovered, total } = this.props;
    const activeCases = total - (deaths + recovered);

    const pieData = [
      { title: "Deaths", value: deaths, color: "rgb(244, 67, 54)" },
      { title: "Recovered", value: recovered, color: "rgb(46, 204, 113)" },
      { title: "Active cases", value: activeCases, color: "#3498db" }
    ];

    const Legende = (props) => (
      <ul>
        {props.data.pieData.map((d) => (
          <li key={d.title}>
            <span
              style={{ backgroundColor: d.color }}
              className={"ChartLegend"}
            ></span>
            <b>{d.title}:</b> {d.value}
          </li>
        ))}
      </ul>
    );

    return (
      <div className={"Chart"}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <PieChart
              style={{ maxHeight: "30vh" }}
              data={pieData}
              totalValue={total}
              lineWidth={50}
              paddingAngle={2}
              animate={true}
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
              labelPosition={112}
              center={[70, 70]}
              y
              viewBoxSize={[140, 140]}
              labelStyle={{
                fill: "#444",
                fontSize: ".4rem",
                fontFamily: "sans-serif"
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <p>
              <b>Total: {total}</b>
            </p>
            <Legende data={{ pieData }} />
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
            <p>
              <b>Total: {total}</b>
            </p>
            <Legende data={{ pieData }} />
          </Grid>
        </Grid> */}
      </div>
    );
  }
}

export default Chart;
