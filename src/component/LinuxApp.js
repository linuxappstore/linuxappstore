import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import '../css/LinuxApp.scss';

const FLATHUB_BASE_URL = 'https://flathub.org'

export class LinuxApp extends Component {

    getDesktopImage(item) {
        let url = item.iconDesktopUrl.toString();

        if (!url.startsWith("https")) {
            url = `${FLATHUB_BASE_URL}${item.iconDesktopUrl}`;
        }

        return url;
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
                <CardActionArea>
                    <a className="link" href={this.getUrl(data)} target="_blank" rel={"noopener noreferrer"}>
                        <Typography className="center title" color="textSecondary" gutterBottom>
                            {data.name}
                        </Typography>

                        <CardContent>
                            <img className="icon center" src={this.getDesktopImage(data)} alt={data.name} />
                        </CardContent>
                    </a>
                </CardActionArea>
            </Card>
        )
    }
}