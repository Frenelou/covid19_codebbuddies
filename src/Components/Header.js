import React from "react";
import { makeStyles } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import coronaicon from "../images/coronaicon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(0)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: 50, backgroundColor: "#a81414" }}>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <img alt="corona" src={coronaicon} />

          <Typography variant="h6" className={classes.title}>
            <div>
              <span> Covid19 - Data Analysis</span>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
