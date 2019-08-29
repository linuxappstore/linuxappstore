import { LinuxApp } from './../data/dto/linux-app';
import { LinuxAppService } from './../service/linux-app.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  readonly faSearch = faSearch;

  search: string;

  appTypes = [
    {
      type: 0,
      description: 'All',
      icon: '../../assets/icons/app_store.png'
    },
    {
      type: 1,
      description: 'AppImage',
      icon: '../../assets/icons/appimage.png'
    },
    {
      type: 2,
      description: 'Flatpak',
      icon: '../../assets/icons/flatpak.png'
    },
    {
      type: 3,
      description: 'Snap',
      icon: '../../assets/icons/snap.png'
    }
  ]

  apps: LinuxApp[] = [];
  recentlyUpdated: LinuxApp[] = [];
  recentlyAdded: LinuxApp[] = [];

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private service: LinuxAppService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.service.getApps()
    .subscribe(response => {
      this.apps = response;
    });

    this.service.getRecentlyAdded(25)
    .subscribe(response => {
      this.recentlyAdded = response;
    });

    this.service.getRecentlyUpdated(25)
    .subscribe(response => {
      this.recentlyUpdated = response;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getAllLabel(): string {
    let label = 'All';

    if (this.apps) {
      label = `${label} (${this.apps.length})`;
    }

    return label;
  }

}
