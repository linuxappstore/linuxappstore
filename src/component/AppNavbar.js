import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import '../css/AppNavbar.scss';

export class AppNavbar extends Component {
    render() {
        return (
            <AppBar className="navbar" position="fixed" color="primary">
                <Toolbar className="toolbar">
                  <img className="logo" src={"./images/app_store.png"} style={{width: "32px"}} />
                    <Typography className="brand" variant="h6" color="inherit">
                        App Store
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}