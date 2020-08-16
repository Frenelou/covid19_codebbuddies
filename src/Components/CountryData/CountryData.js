import React, { Component } from "react";
import { Grid } from "@material-ui/core/";
import Chart from "../Chart";
import DataBar from "../DataBar";
import "./CountryData.css";

import { Card, CardContent, Typography } from "@material-ui/core/";
import CountUp from "react-countup";

class CountryData extends Component {
  render() {
    const { cases, deaths, recovered, country } = this.props.countryDetails;
    return (
      <div>
        {cases && (
          <Grid container>
            {/* <Grid item xs={12} align="center">
        <Card style={{maxWidth:250,marginTop:5}}>
          <CardContent >
            <Typography gutterBottom variant="h6" style={{ color: "black" }}>
              Test
            </Typography>

            <Typography
              variant="h5"
              style={{ color: "black", fontWeight: 600 }}
            >
              <CountUp start={0} end={120} duration={2} separator="," />
            </Typography>
          </CardContent>
      </Card> 
        </Grid> */}

            <Grid item xs={12} sm={6}>
              <Chart deaths={deaths} recovered={recovered} total={cases} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DataBar country={country} />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default CountryData;
