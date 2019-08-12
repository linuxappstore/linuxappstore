import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { TextField, Paper, Button } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    display: "block"
  },
  navLink: {
    color: "white",
    "&:hover": {
      color: 'white',
      textDecoration: 'none'
    }
  },
});

export default function Login() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            App Store
          </Typography>

          <div style={{ marginRight: "5px" }}>
            <Link to="/" className={classes.navLink}>Home</Link>
          </div>
        </Toolbar>
      </AppBar>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Paper>
          <div style={{ display: "inline-block", padding: "15px" }}>
            <TextField
              id="usernameTf"
              label="Username"
              className={classes.textField}
              margin="normal"
            />

            <TextField
              id="passwordTf"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />

            <div className={classes.navLink}>
              <Button variant="contained" color="primary" style={{ display: 'block', marginLeft: 'auto' }}>
                Login
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
