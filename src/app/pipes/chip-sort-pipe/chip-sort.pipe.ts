import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chipsort',
  standalone: true
})
export class ChipSortPipe implements PipeTransform {
  transform(value: string[]): string[] {
    let clonedArray = Object.assign([], value);

    return clonedArray.sort();
  }
}
