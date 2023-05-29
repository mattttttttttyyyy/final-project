import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbTimeStruct,
  NgbCalendar,
  NgbTimepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { SendDateService } from './send-date.service';
import { TimepickerModule, TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DateToSend } from '../date-to-send';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  TimepickerConfig: TimepickerConfig = new TimepickerConfig();
  selectedDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  selectedTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  minDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  minTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  newDate: DateToSend = new DateToSend('');

  constructor(
    private calendar: NgbCalendar,
    config: NgbTimepickerConfig,
    private sendDateService: SendDateService
  ) {
    const currentDate = new Date();

    // Set the default date to the current date
    this.selectedDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

    // Set the default time to the current time
    this.selectedTime = {
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
      second: currentDate.getSeconds(),
    };
    this.minDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };
  }

  ngOnInit(): void {}

  onDateSelect(date: NgbDateStruct): void {
    this.selectedDate = date;
  }

  onTimeChange(time: NgbTimeStruct): void {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30);

    this.minTime = {
      hour: currentTime.getHours(),
      minute: currentTime.getMinutes(),
      second: currentTime.getSeconds(),
    };
  }

  saveDateTime(): void {
    if (this.selectedDate && this.selectedTime) {
      // Combine the selected date and time
      const dateTime = new Date(
        this.selectedDate.year,
        this.selectedDate.month - 1,
        this.selectedDate.day,
        this.selectedTime.hour,
        this.selectedTime.minute
      );
      this.newDate.startTime = dateTime.toJSON();
      this.sendDateService.postDate(this.newDate).subscribe(() => {});

      // Perform any desired operations with the combined date and time
      console.log(this.newDate.startTime);
    } else {
      console.log('Date and time not selected');
    }
  }
}
