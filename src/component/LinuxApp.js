import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from '@material-ui/core/Fade';

const appImageIconBaseUrl =
  "https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database";

const gridCellWidth = 128;

const styles = theme => ({
  title: {
    textAlign: "center",
    whiteSpace: "normal",
    wordBreak: "break-word",
    marginBottom: "0px",
    position: "absolute",
    top: "0px",
    display: "block",
    width: "100%"
  },
  appItem: {
    width: gridCellWidth,
    display: "inline-block"
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    textAlign: "center"
  },
  icon: {
    width: 64,
    marginTop: "15px"
  },
  appTypeIcon: {
    width: 16,
    position: "absolute",
    left: 5,
    bottom: 5
  },
  card: {
    width: gridCellWidth,
    height: gridCellWidth,
    display: "inline-block",
    marginRight: "10px",
    position: "relative"
  },
  actionArea: {
    height: "100%"
  }
});

class LinuxApp extends Component {
  getDesktopImage(item) {
    let url = item.icon.toString();

    if (item.type === 1) {
      // appimage
      if (!url) {
        return "./icons/appimage.png";
      }
      return `${appImageIconBaseUrl}/${url}`;
    } else if (item.type === 3) {
      // snap
      if (!url.startsWith("https")) {
        return "./icons/missing_snap.svg";
      }
    }

    return url;
  }

  getSrc() {
    const { data } = this.props;
    return data.src;
  }

  getAppTypeIcon() {
    const { data } = this.props;

    if (data.type === 1) {
      return "./icons/appimage.png";
    } else if (data.type === 2) {
      return "./icons/flatpak.png";
    } else if (data.type === 3) {
      return "./icons/snap.png";
    } else {
      return "./icons/app_store.png";
    }
  }

  showAppTypeIcon() {
    const { classes, category } = this.props;
    let show = category === 0;
    return show ? (
      <img
        className={classNames(classes.appTypeIcon, "img-fluid")}
        src={this.getAppTypeIcon()}
        alt="App Type Icon"
      />
    ) : null;
  }

  formatTitle(name) {
    let n = name.toString();

    if (n.length > 32) {
      n = n.substring(0, 29) + "...";
    }

    return n;
  }

  renderCard() {
    const { data, classes } = this.props;
      return (
        <Card className={classNames(classes.card)}>
          {this.showAppTypeIcon()}

          <CardActionArea
            className={classNames(classes.actionArea)}
            onClick={this.onClick.bind(this)}
          >
            <Typography
              className={classNames(classes.title)}
              color="textSecondary"
              gutterBottom
            >
              {this.formatTitle(data.name)}
            </Typography>

            <CardContent>
              <img
                className={classNames(classes.icon, classes.center)}
                src={this.getDesktopImage(data)}
                alt={data.name}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      )
  }

  render() {
    const { data } = this.props;
    const showTooltip = data.name.toString().length > 32
    return (
        showTooltip ?
        <Tooltip title={data.name} placement="top" enterDelay={500} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            {this.renderCard()}
        </Tooltip>
        : this.renderCard()
    );
  }

  onClick() {
    let win = window.open(this.getSrc(), "_blank");

    if (win) {
      win.focus();
    }
  }
}

LinuxApp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinuxApp);
