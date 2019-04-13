import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const appImageIconBaseUrl = "https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database"

const gridCellWidth = 128

const styles = theme => ({
    title: {
        textAlign: 'center'
    },
    appItem: {
        width: gridCellWidth,
        display: 'inline-block'
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        textAlign: 'center'
    },
    icon: {
        width: 64
    },
    card: {
        width: gridCellWidth,
        height: gridCellWidth,
        display: 'inline-block',
        margin: '1px'
    },
    link: {
        textDecoration: 'none'
    }
})

class LinuxApp extends Component {

    getDesktopImage(item) {
        let url = item.icon.toString();

        if (item.type === 1) {
            // appimage
            if (!url) {
                return "./images/appimage.png"
            }
            return `${appImageIconBaseUrl}/${url}`
        } else if (item.type === 3) {
            // snap
            if (!url.startsWith("https")) {
                return "./images/ubuntu_icon.png"
            }
        }

        return url;
    }

    getSrc() {
        const { data } = this.props
        return data.src
    }

    render() {
        const { data, classes } = this.props
        return (
            <Card className={classNames(classes.card)}>
                <CardActionArea>
                    <a className={classNames(classes.link)} href={this.getSrc()} target="_blank" rel={"noopener noreferrer"}>
                        <Typography className={classNames(classes.center, classes.title)} color="textSecondary" gutterBottom>
                            {data.name}
                        </Typography>

                        <CardContent>
                            <img className={classNames(classes.icon, classes.center)} src={this.getDesktopImage(data)} alt={data.name} />
                        </CardContent>
                    </a>
                </CardActionArea>
            </Card>
        )
    }
}

LinuxApp.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(LinuxApp);