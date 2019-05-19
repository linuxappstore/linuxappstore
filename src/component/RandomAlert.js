import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import classNames from "classnames";

const styles = theme => ({
  content: {
    textAlign: "center"
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  snackBarRoot: {
    position: "inherit",
    transform: "inherit"
  }
});

const refreshRate = 60;

class RandomAlert extends React.Component {
  state = {
    timer: 0,
    msgIdx: 0,
    open: true
  };

  componentDidMount() {
    this.resetTimer()

    this.interval = setInterval(() => {
      let timer = this.state.timer;
      if (timer >= refreshRate) {
        this.resetTimer();
      } else {
        this.setState({ timer: timer + 1 });
      }
    }, 1000);
  }

  resetTimer() {
    let messages = this.messages()

    let pos = Math.floor(Math.random() * messages.length);

    while (pos === this.state.msgIdx) {
      pos = Math.floor(Math.random() * messages.length)
    }

    this.setState({ timer: 0, msgIdx: pos })
  }

  messages() {
    return [
      <React.Fragment>
          Have a bug or want to provide feedback?&nbsp;

        <a
          href="https://github.com/linuxappstore/linuxappstore-frontend/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
        See here
        </a>

      </React.Fragment>,
      <React.Fragment>
        Release&nbsp;<b>1.0.0</b>&nbsp;coming soon!&nbsp;
        <a
          href="https://github.com/linuxappstore/linuxappstore-frontend/milestone/2"
          target="_blank"
          rel="noopener noreferrer"
        >
          See here
        </a>

      </React.Fragment>,
      <React.Fragment>
        Got an app to submit? See docs (
        <a
          href="https://docs.appimage.org/packaging-guide/distribution.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          AppImage
        </a>
        ,
        &nbsp;
        <a
          href="https://github.com/flathub/flathub/wiki/App-Submission"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flatpak
        </a>
        ,
        &nbsp;
        <a
          href="https://docs.snapcraft.io/releasing-your-app/6795"
          target="_blank"
          rel="noopener noreferrer"
        >
          Snap
        </a>
        )
      </React.Fragment>,

      <React.Fragment>
        Want to support us?&nbsp;
        <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=freesunfury@gmail.com&lc=GB&item_name=Linux%20App%20Store&currency_code=USD&no_note=0&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest" target="_blank" rel="noopener noreferrer">
          Donate
        </a>
      </React.Fragment>
    ];
  }

  onClose() {
      this.setState({ open: false })
  }

  render() {
    const {
      classes,
      className,
      message,
      onClose,
      variant,
      ...other
    } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        className={classNames(classes.snackBarRoot)}
      >
        <SnackbarContent
          className={classNames(classes.info, className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <InfoIcon
                className={classNames(classes.icon, classes.iconVariant)}
              />
              {this.messages()[this.state.msgIdx]}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.onClose.bind(this)}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
          {...other}
        />
      </Snackbar>
    );
  }
}

RandomAlert.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RandomAlert);
