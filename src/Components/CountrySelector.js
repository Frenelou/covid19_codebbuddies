import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input
} from "@material-ui/core";
import axios from "axios";
import "../styles.css";
import API from "../utils/API";
import CountryData from "./CountryData";
import { Grid, Paper, Container } from "@material-ui/core/";
import RssNewsFeed from "./RssNewsFeed";

class CountrySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      fetchedCountries: [],
      hasError: false,
      currentCountry: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const code = event.target.value;
    axios.get(`https://covid19-api.org/api/status/${code}`).then((res) => {
      this.setState({
        ...this.state,
        selected: code,
        currentCountry: res.data
      });
    });
    // console.log(this.state);
  }

  async componentDidMount() {
    try {
      const currentCountryCode = await axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          return response.data.country;
        });
      const currentCountryDetails = await axios
        .get(`https://covid19-api.org/api/status/${currentCountryCode}`)
        .then((res) => {
          return res.data;
        });
      const countryList = await API.get("/countries/");
      // console.log(countryList.data.slice(0,2));
      const fetchedCountries = countryList.data; // use subset of countries for performance on codesandbox

      this.setState({
        fetchedCountries,
        selected: currentCountryCode,
        currentCountry: currentCountryDetails
        // initialized Selected value
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  render() {
    const { selected, hasError, fetchedCountries, currentCountry } = this.state;
    // console.log(currentCountry);
    return (
      // <Container maxWidth="md" spacing={3}>
      <Container spacing={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className="titleContainer">
              <h2 className="titleStyle">Country Details</h2>
            </div>
            <Paper style={{ padding: "1em", marginTop: "1em" }}>
              <form autoComplete="off">
                <FormControl error={hasError}>
                  <InputLabel htmlFor="name" />
                  <Select
                    name="name"
                    value={selected}
                    onChange={this.handleChange}
                    input={<Input id="name" />}
                  >
                    {fetchedCountries.map((country) => {
                      const { name, alpha2 } = country;

                      return (
                        <MenuItem key={alpha2} value={alpha2}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {currentCountry.cases !== undefined && (
                  <CountryData countryDetails={currentCountry} />
                )}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="titleContainer">
              <h2 className="titleStyle">Latest News</h2>
            </div>
            <Paper style={{ padding: "1em", marginTop: "1em" }}>
              <RssNewsFeed countryDetails={currentCountry} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default CountrySelector;
