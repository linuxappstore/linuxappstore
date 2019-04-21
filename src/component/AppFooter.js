import React from 'react'
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types'

const styles = theme => ({
    footer: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#fafafa",
        color: "black",
        textAlign: "center"
    }
})

class AppFooter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            version: '0.2.0'
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <footer className={classNames(classes.footer)}><small>&copy; Copyright 2019, StellaSoft - {this.state.version}</small></footer>
        )
    }
}

AppFooter.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(AppFooter)