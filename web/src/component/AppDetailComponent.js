import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

})

class AppDetailComponent extends React.Component {

    state = {
        name: '',
        apps: []
    }

    componentDidMount() {
        let baseUrl = process.env.REACT_APP_BASE_URL
        let id = this.props.match.params.id
        let url = `${baseUrl}/api/GetAppDetail?id=${id}`

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({ 
                name: responseJson.apps[0].name,
                apps: responseJson.apps
             })
        })
    }

    render() {
        return (
            <React.Fragment>
            <h1>
                {this.state.name}
            </h1>
            <small>{this.getSummary()}</small>
            {this.state.apps.map((item, index) => 
            <div>
                <p>{item.src} ({item.currentVersion})</p>
            </div>
            )}
            </React.Fragment>
        )
    }

    getSummary() {
        let summary = '';

        for (let app of this.state.apps) {
            if (app.summary) {
                summary = app.summary;
                break;
            }
        }
        return summary.replace(/<[^>]+>/g, '');;
    }

}

export default withStyles(styles)(AppDetailComponent)