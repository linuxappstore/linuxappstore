import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { ListItem, List, ListItemText, Icon } from '@material-ui/core';
import '../css/AppDrawer.css';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

export class AppDrawer extends Component {

    componentDidMount() {
        loadCSS(
          'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
          document.querySelector('#insertion-point-jss'),
        );
    }   

    render() {
        return (
            <React.Fragment>
                <Drawer
                variant="permanent">
                <List>
                    <ListItem button key={0}>
                    <Icon className='fas fa-home' />
                        <ListItemText primary={"Home"}></ListItemText>
                    </ListItem>

                    <ListItem button key={1}>
                    <Icon className='fas fa-trophy' />
                        <ListItemText primary={"Ranking"}></ListItemText>
                    </ListItem>

                    <ListItem button key={2}>
                    <Icon className='fas fa-comment-alt' />
                        <ListItemText primary={"Chat"}></ListItemText>
                    </ListItem>

                    <ListItem button key={3}>
                    <Icon className='fas fa-music' />
                        <ListItemText primary={"Music"}></ListItemText>
                    </ListItem>

                    <ListItem button key={4}>
                    <Icon className='fas fa-video' />
                        <ListItemText primary={"Video"}></ListItemText>
                    </ListItem>

                    <ListItem button key={5}>
                    <Icon className='fas fa-gamepad' />
                        <ListItemText primary={"Game"}></ListItemText>
                    </ListItem>

                    <ListItem button key={6}>
                    <Icon className='fas fa-book' />
                        <ListItemText primary={"Reading"}></ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            </React.Fragment>
        )
    }
}