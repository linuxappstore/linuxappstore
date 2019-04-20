
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import LinuxApp from './LinuxApp'
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

const styles = theme => ({
  listWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  sliderWrapper: {
    overflow: 'hidden',
    flexGrow: 1,
    display: 'inline-block'
  },
  slider: {
    padding: '5px',
    whiteSpace: 'nowrap'
  },
  control: {
    display: 'inline-block'
  }
});

class AppHorizontalList extends React.Component {

  state = {
    position: 0,
    itemsInViewport: []
  };
  
  constructor(props) {
    super(props)
    this.sliderWrapper = React.createRef()
  }

  onNext() {
    const { items } = this.props;
    
    if (this.state.position + 1 >= items.length) {
      return
    }
    this.updateViewport(this.state.position + 1)
    console.log(`pos=${this.state.position} trans=${this.state.position * 130}`)
  }

  onPrevious() {
    if (this.state.position - 1 < 0) {
      return
    }

    this.updateViewport(this.state.position - 1)
    console.log(`pos=${this.state.position} trans=${this.state.position * 130}`)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this))
    this.updateViewport(this.state.position)
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props
    if (!this.arraysEqual(prevProps.items, items)) {
        this.updateViewport(this.state.position)
    }
  }

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  onResize() {
    this.updateViewport(this.state.position)
  }

  updateViewport(position) {
      const { items } = this.props

      let element = this.sliderWrapper
      let width = element.current.clientWidth
      let cols = Math.floor(width / 129)

      if (items.length && this.state.position < items.length) {
        let copy = [...items]
        let remaining = items.length - position

        let itemsInViewport = this.state.itemsInViewport

        if (position + cols < items.length) {
          itemsInViewport = copy.splice(position, cols)
        } else {
          itemsInViewport = copy.splice(position, remaining)
        }
        this.setState({itemsInViewport: itemsInViewport, position: position})
      }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.listWrapper}>
        <div className={classes.control} >
          <IconButton onClick={this.onPrevious.bind(this)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.sliderWrapper} ref={this.sliderWrapper} >
        <div className={classes.slider}>
        {this.state.itemsInViewport.map(item => (
          <LinuxApp data={item} key={item.id} />
          ))}
        </div>
        </div>
        <div className={classes.control} >
          <IconButton onClick={this.onNext.bind(this)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

AppHorizontalList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHorizontalList);