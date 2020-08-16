import React, { Component } from "react";
import "./RssNewsFeed.css";
import {
  List,
  ListItem,
  Link,
  ListItemText,
  Typography
} from "@material-ui/core/";

import { Grid } from "@material-ui/core/";

// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Avatar, ListItemAvatar, Divider } from "@material-ui/core/";

class RssNewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      fetch("https://api.smartable.ai/coronavirus/news/global", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Subscription-Key": "28df145a32954e6ca9cf110af181cdf3"
        }
      })
        .then((response) => response.json())

        .then((response) => {
          this.setState({
            ...this.state,
            feedTitlesAndLinks: response.news
          });
        });
    } catch (e) {
      console.log("Error", e);
    }
  }

  render() {
    const { feedTitlesAndLinks } = this.state;
    // if (feedTitlesAndLinks) console.log(feedTitlesAndLinks[0].images[0].url);
    console.log(this.state);
    return (
      <Grid item xs={12} sm={3} md={12} className="newsFeedContainer">
        <List>
          {feedTitlesAndLinks &&
            feedTitlesAndLinks.map((m, i) => (
              <React.Fragment>
                <ListItem key={`rss${i}`}>
                  {/* {console.log(m.images == null ? "" : m.images[0].url)} */}

                  {/* <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    alt="Remy Sharp"
                    src={m.images == null ? "" : m.images[0].url}
                  />
                </ListItemAvatar> */}
                  <ListItemText
                    className="newsFeedElement"
                    primary={
                      <Link href={m.webUrl} target="_blank">
                        <Typography
                          component="span"
                          variant="body1"
                          color="textPrimary"
                        >
                          {m.title}
                          {/* {` ${m.title.split(" ").slice(0, 10).join(" ")}...`} */}
                        </Typography>
                      </Link>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {m.provider.name}
                        </Typography>
                        {` — ${m.excerpt.split(" ").slice(0, 10).join(" ")}...`}
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {new Date(m.publishedDateTime).toLocaleString()}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      alt={m.title}
                      style={{ height: 75, width: 75 }}
                      src={m.images == null ? "image.jpg" : m.images[0].url}
                    />
                  </ListItemAvatar>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
        </List>
      </Grid>
    );
  }
}

export default RssNewsFeed;
