import { Pipe, PipeTransform } from '@angular/core';
import { LinuxApp } from '../data/dto/linux-app';

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(apps: LinuxApp[], search: string): LinuxApp[] {
    if (!search) {
        return apps;
    }

    const result = apps.filter(x => search.toLowerCase().includes(search.toLowerCase()));
    return result;
  }
}