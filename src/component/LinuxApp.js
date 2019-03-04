import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import '../css/LinuxApp.css';

const FLATHUB_BASE_URL = 'https://flathub.org'

export class LinuxApp extends Component {

    getImageUrl(item) {
      return `${FLATHUB_BASE_URL}${item.iconDesktopUrl}`
    }

    getUrl(item) {
        return `${FLATHUB_BASE_URL}/apps/details/${item.flatpakAppId}`
    }
  
    render() {
        const { data } = this.props  
        return (
            <Card className="card">
                <Typography className="center" color="textSecondary" gutterBottom>
                {data.name}
                </Typography>

                <CardContent>
                    <a href={this.getUrl(data)} target="_blank">
                        <img className="icon center" src={this.getImageUrl(data)} />
                    </a>
                </CardContent>

                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        )
    }
  }