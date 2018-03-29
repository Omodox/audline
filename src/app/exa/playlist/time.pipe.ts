import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number ): string {
    let result;
    let s, m;
    let minutes = value / 60;
    minutes = Math.floor(minutes);
    let seconds = value % 60;
    seconds = Math.floor(seconds);

    if (seconds < 10) { s = '0' +  seconds; } else { s = seconds; }
    if (minutes < 10) { m = '0' + minutes; }  else { m = minutes; }

    result = m + ':' + s;

    return result;
  }
}
