import { DateFormatterOptions } from 'ngx-bootstrap/chronos/types';

export class DateToSend {
  'startTime': String;
  static date: string;
  constructor(date: String) {
    this.startTime = date;
  }
}
