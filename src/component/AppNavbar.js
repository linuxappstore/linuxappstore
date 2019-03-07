import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import '../css/AppNavbar.css';
import { InputBase } from '@material-ui/core';

export class AppNavbar extends Component {
    render() {
        return (
            <AppBar className="navbar" position="fixed" color="primary">
                <Toolbar>
                    <Typography className="brand" variant="h6" color="inherit">
                        App Store
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}