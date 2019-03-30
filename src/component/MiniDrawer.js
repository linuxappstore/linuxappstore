import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import LinuxApp from './LinuxApp.js';
import { Grid } from '@material-ui/core';
import { Collection } from 'react-virtualized';

const drawerWidth = 240;

const baseUrl = 'http://localhost:5000'

const categories = [
  { id: 1, src: './images/appimage.png', name: 'AppImage' },
  { id: 2, src: './images/flatpak.png', name: 'Flatpak' },
  { id: 3, src: './images/snap.png', name: 'Snap' }
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
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingTop: 69
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
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
    appType: 2,
    contentWidth: 0,
    contentHeight: 0
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onCategoryClick = (type) => {
    this.setState({ appType: type })

    let recentlyAdded = `${baseUrl}/api/recentlyAdded?type=${type}&limit=25`
    let recentlyUpdated = `${baseUrl}/api/recentlyUpdated?type=${type}&limit=25`
    let apps = `${baseUrl}/api/apps?type=${type}`

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
        this.setState({ apps: responseJson, filteredApps: [], search: '' })
      })
  };

  onSearch = e => {
    const filteredApps = this.state.apps.filter(item => {
      return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    });

    this.setState({ search: e.target.value, filteredApps: filteredApps })
  }

  componentDidMount() {
    const contentWidth = this.contentElement.clientWidth;
    const contentHeight = this.contentElement.clientHeight;
    this.setState({ contentWidth: contentWidth, contentHeight: contentHeight });

    const recentlyAddedHeight = this.recentlyAddedElement.clientHeight;

    console.log(`content width: ${contentWidth} height: ${contentHeight} recentlyAddedHeight: ${recentlyAddedHeight}`);
  }

  render() {
    const { classes, theme } = this.props;
    const filteredApps = this.state.filteredApps.length === 0 ? this.state.apps : this.state.filteredApps

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
          ref={(appBarElement) => this.appBarElement = appBarElement}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              App Store
            </Typography>

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
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
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
            {categories.map((item) =>
              <ListItem button key={item.name} onClick={() => this.onCategoryClick(item.id)}>
                <img className="icon" src={item.src} alt={item.name} style={{ width: 24, marginRight: 15 }} />
                <ListItemText primary={item.name}></ListItemText>
              </ListItem>
            )}
          </List>
        </Drawer>
        <main className={classes.content} style={{height: '100%'}} ref={(contentElement) => this.contentElement = contentElement}>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{paddingBottom: 5}} ref={(recentlyAddedElement) => this.recentlyAddedElement = recentlyAddedElement}>
              <h3 style={{marginTop: 0, marginBottom: 5}}>Recently Added</h3>
              <AppHorizontalList items={this.state.recentlyAdded} width={this.state.contentWidth - 25} />
            </Grid>

            <Grid item xs={12} style={{paddingBottom: 5}}>
              <h3 style={{marginTop: 0, marginBottom: 5}}>Recently Updated</h3>
              <AppHorizontalList items={this.state.recentlyUpdated} width={this.state.contentWidth - 25} />
            </Grid>

            <Grid item xs={12} style={{paddingBottom: 5, marginRight: 5}}>
            <h3 style={{marginTop: 0, marginBottom: 5}}>{categories[this.state.appType - 1].name}'s</h3>

            <Collection 
                  cellCount={filteredApps.length}
                  cellRenderer={this.cellRenderer.bind(this)}
                  cellSizeAndPositionGetter={this.cellSizeAndPositionGetter.bind(this)}
                  height={this.state.contentHeight - 416 - 69 - 21 + 5}
                  width={this.state.contentWidth - 25}              
              />

            </Grid>
          </Grid>
        </main>
      </div>
    );
  }

  cellRenderer ({ index, key, style }) {
    let apps = this.state.filteredApps.length === 0 ? this.state.apps : this.state.filteredApps
    return (
      <div
        key={key}
        style={style}        
      >

      <LinuxApp data={apps[index]} style={{margin: 1}} />

      </div>
    )
  }
  
  cellSizeAndPositionGetter ({ index }) {
    let cellWidth = 129
    let cellHeight = 129

    let contentWidth = this.state.contentWidth
    let cols = Math.floor(contentWidth / cellWidth)

    let xMod = index % cols
    let xPos = xMod * cellWidth

    let row = Math.floor(index / cols)
    let yPos = row * cellHeight
  
    return {
      height: cellHeight,
      width: cellWidth,
      x: xPos,
      y: yPos
    }
  }

}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);