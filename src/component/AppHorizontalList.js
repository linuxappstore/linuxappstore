
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
    display: 'inline-block'
  },
  slider: {
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
    shuffleTimer: 0,
    sliderWidth: 0
  };
  
  constructor(props) {
    super(props)
    this.listWrapper = React.createRef()
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
    const { shuffle } = this.props

    window.addEventListener('resize', this.onResize.bind(this))
    this.updateViewport(0)

    if (shuffle) {
      this.interval = setInterval(() => {
        let timer = this.state.shuffleTimer            
        if (timer >= 15) {
            this.updateViewport(0, true)
            this.setState({shuffleTimer: 0});
        } else {
            this.setState({shuffleTimer: timer + 1});
        }
      }, 1000);
    }
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

  updateViewport(position, shuffle = false) {
      const { items } = this.props

      let element = this.listWrapper
      let width = element.current.clientWidth
      let cols = Math.floor(width / (128 + 10))

      let calculatedWidth = (cols * (128 + 10))

      let itemsInViewport = this.state.itemsInViewport

      if (items.length && this.state.position < items.length) {
        let copy = [...items]
        let remaining = items.length - position

        if (shuffle) {
          itemsInViewport = this.getRandomItems(cols, copy)
        } else if (position + cols < items.length) {
          itemsInViewport = copy.splice(position, cols)
        } else {
          itemsInViewport = copy.splice(position, remaining)
        }
        this.setState({itemsInViewport: itemsInViewport, position: position, showPrev: position > 0, showNext: position < items.length - 1, sliderWidth: calculatedWidth})
      } else {
          itemsInViewport = [...items]
          this.setState({itemsInViewport: itemsInViewport, position: 0, showPrev: false, showNext: position < items.length - 1, sliderWidth: calculatedWidth})
      }
  }

  generateRandomNumbers(amount, items) {
    let numbers = []
    let min = Math.min(amount, items.length)
    while(numbers.length < min) {
        let r = Math.floor(Math.random()*items.length);
        if(numbers.indexOf(r) === -1) {
          numbers.push(r)
        }
    }

    return numbers
  }

  getRandomItems(cols, items) {
    let itemsInViewport = []
    let randomIndexes = this.generateRandomNumbers(cols, items)

    for (let i = 0; i < randomIndexes.length; i++) {
      itemsInViewport.push(items[randomIndexes[i]])
    }

    return itemsInViewport
  }

  showPrevControl() {
    const { classes, shuffle } = this.props
    let show = this.state.showPrev && !shuffle
    return (
      show ? 
      <div className={classes.control}>
      <IconButton onClick={this.onPrevious.bind(this)}>
        <ChevronLeftIcon />
      </IconButton>
    </div> : null
    )
  }

  showNextControl() {
    const { classes, shuffle } = this.props
    let show = this.state.showNext && !shuffle
    return (
      show ? <div className={classes.control} style={{ opacity: shuffle ? 0 : 100}}>
      <IconButton onClick={this.onNext.bind(this)}>
        <ChevronRightIcon />
      </IconButton>
    </div> : <div style={{ width: 48 }}></div>
    )
  }

  render() {
    const { classes, category } = this.props
    return (
      <div className={classes.listWrapper} style={{marginLeft: this.state.showPrev ? 0 : 48,
       marginRight: this.state.showNext ? 0 : 48}} ref={this.listWrapper}>

        {this.showPrevControl()}

        <div className={classes.sliderWrapper} style={{ width: this.state.sliderWidth }} >
        <div className={classes.slider}>
        {this.state.itemsInViewport.map((item, idx) => (
          <LinuxApp data={item} key={idx} category={category} />
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