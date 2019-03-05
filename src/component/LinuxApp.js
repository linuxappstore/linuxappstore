import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import '../css/LinuxApp.css';

const FLATHUB_BASE_URL = 'https://flathub.org'

export class LinuxApp extends Component {

    getDesktopImage(item) {
      return `${FLATHUB_BASE_URL}${item.iconDesktopUrl}`
    }

    getMobileImage(item) {
        return `${FLATHUB_BASE_URL}${item.iconMobileUrl}`
      }

    getUrl(item) {
        return `${FLATHUB_BASE_URL}/apps/details/${item.flatpakAppId}`
    }
  
    render() {
        const { data } = this.props  
        return (
            <Card className="card">
                <Typography className="center title" color="textSecondary" gutterBottom>
                {data.name}
                </Typography>

                <CardContent>
                    <a href={this.getUrl(data)} target="_blank">
                        <img className="icon center" src={this.getDesktopImage(data)} />
                    </a>
                </CardContent>
            </Card>
        )
    }
  }