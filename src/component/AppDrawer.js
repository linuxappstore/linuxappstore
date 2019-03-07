import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { ListItem, List, ListItemText } from '@material-ui/core';
import '../css/AppDrawer.scss';

const categories = [
    { id: 1, src: './images/appimage.png', name: 'AppImage' },
    { id: 2, src: './images/flatpak.png', name: 'Flatpak' },
    { id: 3, src: './images/snap.png', name: 'Snap' }
]

function MenuItemList() {
    const listItems = categories.map((item) =>
        <ListItem className="list-item" button key={item.id.toString()}>
            <img className="icon" src={item.src} />
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