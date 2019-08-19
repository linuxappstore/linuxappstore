import { LinuxApp } from './../../data/dto/linux-app';
import { Component, OnInit, Input } from '@angular/core';

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
