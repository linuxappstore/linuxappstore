import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppHorizontalList from './AppHorizontalList.js';
import RandomAlert from './RandomAlert'
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const categories = [
  { id: 0, src: './icons/app_store.png', name: 'All' },
  { id: 1, src: './icons/appimage.png', name: 'AppImage' },
  { id: 2, src: './icons/flatpak.png', name: 'Flatpak' },
  { id: 3, src: './icons/snap.png', name: 'Snap' },
]

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: '5px',
    marginLeft: '10px',
    width: '300px',
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerIcon: {
    width: 24
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarRoot: {
    minWidth: '500px'
  },
  content: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingTop: 69,
    paddingRight: 5,
    paddingBottom: 24,
    overflowX: 'hidden',
    height: '100%'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    apps: [],
    filteredApps: [],
    recentlyAdded: [],
    recentlyUpdated: [],
    search: '',
    appType: 0,
    contentWidth: 0,
    contentHeight: 0,
    searchFlag: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onCategoryClick = (type) => {
    this.setState({ appType: type })
    this.populateData(type)
  };

  showHorizontalList(items, shuffle = false, filterable = false) {
    let show = items.length > 0
    return (
      show ? <AppHorizontalList items={items} category={this.state.appType} shuffle={shuffle} /> : filterable && this.state.searchFlag ? <p style={{ marginLeft: '48px', height: '135px', marginBottom: '0px' }}>No results</p> : null
    )
  }

  populateData(type) {
    let baseUrl = process.env.REACT_APP_BASE_URL

    let recentlyAdded = type === 0 ? `${baseUrl}/api/recentlyAdded?limit=${25}` : `${baseUrl}/api/recentlyAdded?type=${type}&limit=${25}`
    let recentlyUpdated = type === 0 ? `${baseUrl}/api/recentlyUpdated?limit=${25}` : `${baseUrl}/api/recentlyUpdated?type=${type}&limit=${25}`
    let apps = type === 0 ? `${baseUrl}/api/apps` : `${baseUrl}/api/apps?type=${type}`

    fetch(recentlyAdded)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ recentlyAdded: responseJson })
      })

    fetch(recentlyUpdated)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ recentlyUpdated: responseJson })
      })

    fetch(apps)
      .then((response) => response.json())
      .then((responseJson) => {
        let filteredApps = this.getFilteredApps(responseJson, this.state.search)

        this.setState({ apps: responseJson, filteredApps: filteredApps })
      })
  }

  onSearch = e => {
    const filteredApps = this.getFilteredApps(this.state.apps, e.target.value)

    this.setState({ search: e.target.value, filteredApps: filteredApps, searchFlag: true })
  }

  getFilteredApps(apps, search) {
    const filteredApps = apps.filter(item => {
      let result = item.name.toLowerCase().indexOf(search.toLowerCase())

      if (result === -1 && item.summary) {
        result = item.summary.toLowerCase().indexOf(search.toLowerCase())
      }

      return result !== -1
    });

    return filteredApps
  }

  componentDidMount() {
    if (this.state.apps.length === 0) {
      this.populateData(this.state.appType)
    }
  }

  renderSearch(disableSearch, classes) {
    return (
      disableSearch ?
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            autoFocus={true}
            readOnly={true}
          />
        </div>
        :
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={this.onSearch}
            autoFocus={true}
          />
        </div>
    )
  }

  render() {
    const { classes, theme } = this.props;
    const filteredApps = this.state.filteredApps.length === 0 && this.state.search.length === 0 ? this.state.apps : this.state.filteredApps
    let disableSearch = this.state.apps.length === 0

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
          ref={(appBarElement) => this.appBarElement = appBarElement}
        >
          <Toolbar className={clsx(classes.toolbarRoot)} disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              App Store
            </Typography>

            <div className={clsx(classes.searchWrapper)}>
              {this.renderSearch(disableSearch, classes)}
            </div>

            <Button color="inherit" style={{ marginRight: '5px' }}>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {categories.map((item, index) =>
              <ListItem button style={{ backgroundColor: this.state.appType === index ? "rgba(0, 0, 0, 0.08)" : "" }} key={item.name} onClick={() => this.onCategoryClick(index)}>
                <img className="icon" src={item.src} alt={item.name} style={{ width: 24, marginRight: 15 }} />
                <ListItemText primary={item.name} style={{ display: this.state.open ? '' : 'none' }}></ListItemText>
              </ListItem>
            )}
          </List>
        </Drawer>
        <main className={classes.content}>

          <RandomAlert />

          <h3 style={{ marginTop: 15, marginBottom: 15, marginLeft: 48, display: 'inline-block' }}>{categories[this.state.appType].name}</h3> <span>({this.state.apps.length})</span>
          {this.showHorizontalList(filteredApps, false, true)}

          <h3 style={{ marginTop: 15, marginBottom: 15, marginLeft: 48, display: 'inline-block' }}>Recently Added</h3>
          {this.showHorizontalList(this.state.recentlyAdded)}

          <h3 style={{ marginTop: 15, marginBottom: 15, marginLeft: 48, display: 'inline-block' }}>Recently Updated</h3>
          {this.showHorizontalList(this.state.recentlyUpdated)}

          <h3 style={{ marginTop: 15, marginBottom: 15, marginLeft: 48, display: 'inline-block' }}>Discover</h3>
          {this.showHorizontalList(this.state.apps, true, false)}

        </main>
      </div>
    );
  }

}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);