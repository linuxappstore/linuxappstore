import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

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


  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
