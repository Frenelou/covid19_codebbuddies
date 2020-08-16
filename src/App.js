import React from "react";
import "./styles.css";
//import API from "./utils/API";
import CountrySelector from "./Components/CountrySelector";
import WorldData from "./Components/WorldData";

import { Grid, Container } from "@material-ui/core/";

// import CountryData from "./Components/CountryData";

export default function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Container maxWidth="0g">
        {/* <Container > */}
        <Grid container spacing={1}>
          {/* <h1>Covid19 Monitor</h1> */}
          <Grid item xs={12} md={2}>
            {/* <h2>World Data</h2> */}
            <WorldData />
          </Grid>
          <Grid item xs={12} md={10}>
            {/* <h2>Country Details</h2> */}
            <CountrySelector />
          </Grid>

          {/* <br />
          <h2>Select Country</h2>
          <br /> */}

          {/* <CountryList /> */}
        </Grid>
      </Container>
    </div>
  );
}
