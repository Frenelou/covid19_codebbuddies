import React, { useState, useEffect } from "react";
import "./WorldData.css";

import API from "../../utils/API";
import bluepulse from "./images/blue-pulse.png";
import greenpulse from "./images/green-pulse.png";
import redpulse from "./images/red-pulse.png";
import RssNewsFeed from "../RssNewsFeed";

import CountUp from "react-countup";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core/";

const WorldData = () => {
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });

  const [data, setData] = useState({
    total_deaths: "",
    total_recovered: "",
    total_cases: "",
    total_active: "",
    new_deaths: "",
    new_recovered: "",
    new_cases: ""
  });
  async function fetchData() {
    const res = await API.get("/timeline");
    const data = res.data.slice(0, 2);
    console.log(res.data.slice(0, 2));
    setData({
      total_deaths: data[0].total_deaths,
      total_recovered: data[0].total_recovered,
      total_cases: data[0].total_cases,
      total_active:
        data[0].total_cases - data[0].total_deaths - data[0].total_recovered,
      new_deaths: data[0].total_deaths - data[1].total_deaths,
      new_recovered: data[0].total_recovered - data[1].total_recovered,
      new_cases: data[0].total_cases - data[1].total_cases
    });

    // console.log(...res.data);
    // setData(...res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const {
    total_deaths,
    total_recovered,
    total_cases,
    total_active,
    new_deaths,
    new_recovered,
    new_cases
  } = data;
  const DataCard = (props) => (
    <Grid item xs={12} sm={3} md={12}>
      <Card>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            image={props.image}
            style={{ width: 70 }}
          /> */}
          <CardContent style={{ backgroundColor: props.color }}>
            <Typography gutterBottom variant="h6" style={{ color: "white" }}>
              {props.title}
            </Typography>
            <Typography gutterBottom variant="h7" style={{ color: "white" }}>
              {props.subTitle}
              {props.newValue}
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "white", fontWeight: 600 }}
            >
              <CountUp start={0} end={props.value} duration={2} separator="," />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <div>
      <div className="titleContainer">
        <h2 className="titleStyle">World Cases</h2>
      </div>
      <Grid
        container
        item
        direction={isBigScreen ? "row" : "column"}
        justify="space-between"
        alignItems="stretch"
        spacing={2}
      >
        <DataCard
          title={"Total Cases"}
          value={total_cases}
          subTitle={"New Cases:"}
          newValue={new_cases}
          image={bluepulse}
          color={"rgb(15, 72, 111)"}
        />
        <DataCard
          title={"Total Recovered"}
          value={total_recovered}
          subTitle={"New Recoveries:"}
          newValue={new_recovered}
          image={greenpulse}
          color={"rgb(46, 204, 113)"}
        />
        <DataCard
          title={"Total Deaths"}
          value={total_deaths}
          subTitle={"New Deaths:"}
          newValue={new_deaths}
          image={redpulse}
          color={"rgb(244, 67, 54)"}
        />
        <DataCard
          title={"Active Cases"}
          value={total_active}
          image={bluepulse}
          color={"#3498db"}
        />
        {/* <RssNewsFeed />
      {isBigScreen && <RssNewsFeed />} */}
      </Grid>
    </div>
  );
};

export default WorldData;
