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
        backgroundColor: "white",
        color: "black",
        textAlign: "center"
    }
})

class AppFooter extends React.Component {    
    render() {
        const { classes } = this.props;
        return (
            <footer className={classNames(classes.footer)}><small>&copy; Copyright 2019, StellaSoft</small></footer>
        )
    }
}

AppFooter.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(AppFooter)