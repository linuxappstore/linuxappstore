
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import LinuxApp from './LinuxApp'

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
    itemsInViewport: [],
    showPrev: true,
    showNext: true,
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
    if (a.length !== b.length) return false;
    
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

      let itemsInViewport = this.state.itemsInViewport

      if (items.length && this.state.position < items.length) {
        let copy = [...items]
        let remaining = items.length - position

        if (position + cols < items.length) {
          itemsInViewport = copy.splice(position, cols)
        } else {
          itemsInViewport = copy.splice(position, remaining)
        }
        this.setState({itemsInViewport: itemsInViewport, position: position, showPrev: position > 0, showNext: position < items.length - 1})
      } else {
          itemsInViewport = [...items]
          this.setState({itemsInViewport: itemsInViewport, position: 0, showPrev: false, showNext: position < items.length - 1})
      }
  }

  showPrevControl() {
    const { classes } = this.props
    let show = this.state.showPrev
    return (
      show ? 
      <div className={classes.control} >
      <IconButton onClick={this.onPrevious.bind(this)}>
        <ChevronLeftIcon />
      </IconButton>
    </div> : null
    )
  }

  showNextControl() {
    const { classes } = this.props
    let show = this.state.showNext
    return (
      show ? <div className={classes.control} style={{ marginRight: '5px'}}>
      <IconButton onClick={this.onNext.bind(this)}>
        <ChevronRightIcon />
      </IconButton>
    </div> : null
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.listWrapper} style={{marginLeft: this.state.showPrev ? 0 : 48,
       marginRight: this.state.showNext ? 0 : 48}}>

        {this.showPrevControl()}

        <div className={classes.sliderWrapper} ref={this.sliderWrapper} >
        <div className={classes.slider}>
        {this.state.itemsInViewport.map((item, idx) => (
          <LinuxApp data={item} key={idx} />
          ))}
        </div>
        </div>

        {this.showNextControl()}
      </div>
    );
  }
}

AppHorizontalList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHorizontalList);