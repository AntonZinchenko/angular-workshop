import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toStars' })
export class ToStarsPipe implements PipeTransform {
  transform(value: number, max: number): Array<boolean> {
    const result = new Array<boolean>();
    for (let i = 0; i < max; i++) {
      result.push(i < value);
    }
    return result;
  }
}
// может быть переместить в shared?
