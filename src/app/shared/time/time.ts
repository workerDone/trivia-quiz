import { Pipe, PipeTransform } from '@angular/core';
import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../time-constants';

@Pipe({
  name: 'time',
})
export class Time implements PipeTransform {
  transform(seconds: number | null): string {
    if (seconds == null || seconds < 0) {
      return '00:00:00';
    }

    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const secs = seconds % SECONDS_IN_MINUTE;

    return [hours, minutes, secs].map((value) => value.toString().padStart(2, '0')).join(':');
  }
}
