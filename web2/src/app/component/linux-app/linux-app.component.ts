import { AppSourceType } from './../../util/enums';
import { LinuxApp } from './../../data/dto/linux-app';
import { Component, OnInit, Input } from '@angular/core';

const appImageIconBaseUrl =
  "https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database";

@Component({
  selector: 'app-linux-app',
  templateUrl: './linux-app.component.html',
  styleUrls: ['./linux-app.component.css']
})
export class LinuxAppComponent implements OnInit {

  @Input()
  app: LinuxApp;

  constructor() { }

  ngOnInit() {
  }

  getDesktopImage() {
    const app = this.app;
    const url = app.icon.toString();

    if (app.type === AppSourceType.AppImage) {
      if (!url) {
        return '../../assets/icons/appimage.png';
      }
      return `${appImageIconBaseUrl}/${url}`;
    } else if (app.type === AppSourceType.Snap) {
      if (!url.startsWith('https')) {
        return '../../assets/icons/missing_snap.svg';
      }
    }

    return url;
  }

  getIconTypeUrl(type: number): string {
    let path: string = '';

    switch(type) {
      case 1:
        path = '../../assets/icons/appimage.png';
        break;

      case 2:
          path = '../../assets/icons/flatpak.png';
        break;

      case 3:
          path = '../../assets/icons/snap.png';
        break;
    }

    return path;
  }

}
