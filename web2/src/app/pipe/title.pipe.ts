import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'title'})
export class TitlePipe implements PipeTransform {
  transform(s: string): string {
    let value = s;
    value = value.replace(/-/g, ' ');
    value = value.replace('_', ' ');
    value = value.replace(/::/g, ' ');
    return value;
  }
}