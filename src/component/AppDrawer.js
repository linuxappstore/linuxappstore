import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { ListItem, List, ListItemText, Icon } from '@material-ui/core';
import '../css/AppDrawer.css';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

const categories = [
    { id: 1, class: 'fas fa-home', name: 'Home' },
    { id: 2, class: 'fas fa-trophy', name: 'Ranking' },
    { id: 3, class: 'fas fa-comment-alt', name: 'Chat' },
    { id: 4, class: 'fas fa-music', name: 'Music' },
    { id: 5, class: 'fas fa-video', name: 'Video' },
    { id: 6, class: 'fas fa-gamepad', name: 'Game' },
    { id: 7, class: 'fas fa-book', name: 'Reading' }]

function MenuItemList() {
    const listItems = categories.map((item) =>
        <ListItem button key={item.id.toString()}>
            <Icon className={item.class} />
            <ListItemText primary={item.name}></ListItemText>
        </ListItem>
    )
    return (
        <List>
            {listItems}
        </List>
    )
}

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
                    <MenuItemList />
                </Drawer>
            </React.Fragment>
        )
    }
}