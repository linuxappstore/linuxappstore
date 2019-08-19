import { LinuxApp } from '../../data/dto/linux-app';
import { Component, Input } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent {

  @Input() title: string;

  @Input() apps: LinuxApp[];

  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;

}
