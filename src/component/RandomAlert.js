
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    content: {
        textAlign: 'center'
    }
  });

const refreshRate = 60

class RandomAlert extends React.Component {

    state = {
        timer: 0,
        msgIdx: 0
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let timer = this.state.timer            
            if (timer >= refreshRate) {
                this.resetTimer()
            } else {
                this.setState({timer: timer + 1});
            }
          }, 1000);
    }

    resetTimer() {
        let messages = this.messages()

        let pos = Math.floor(Math.random()*messages.length)

        while(pos === this.state.msgIdx) {
            pos = Math.floor(Math.random()*messages.length)
        }

        this.setState({timer: 0, msgIdx: pos});
    }

    messages() {
        return [
            (
            <React.Fragment>
                    Have a bug or want to provide feedback?
                    <Alert.Link href="https://github.com/linuxappstore/linuxappstore-frontend/issues" target="_blank"> See here</Alert.Link>
            </React.Fragment> 
            ),
            (
                <React.Fragment>
                Release <b>1.0.0</b> coming soon! See progress <Alert.Link href="https://github.com/linuxappstore/linuxappstore-frontend/milestone/2" target="_blank">here</Alert.Link>
                </React.Fragment>
            ),
            (
                <React.Fragment>
                    Got an app to submit? See docs (
                        <Alert.Link href="https://docs.appimage.org/packaging-guide/distribution.html" target="_blank">
                        AppImage
                    </Alert.Link>,
                    <Alert.Link href="https://github.com/flathub/flathub/wiki/App-Submission" target="_blank"> Flatpak
                    </Alert.Link>,
                    <Alert.Link href="https://docs.snapcraft.io/releasing-your-app/6795" target="_blank"> Snap
                    </Alert.Link>
                    )
                </React.Fragment>

            )
        ]
    }

    render() {
        const { classes, style } = this.props
        return (
            <Alert variant={"primary"} style={style}>
                <div className={classes.content}>
                {this.messages()[this.state.msgIdx]}
                </div>
            </Alert>
        )
    }
    
}

RandomAlert.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(RandomAlert);