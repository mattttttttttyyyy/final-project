import { DateToSend } from './../date-to-send';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbTimeStruct,
  NgbCalendar,
  NgbTimepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { SendDateService } from './send-date.service';
import { Booking } from '../booking';
import { TimepickerModule, TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

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
  newDate: DateToSend = new DateToSend('', '');
  selectedEndTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  selected: Date = new Date();
  selectedTimeTest: Date = new Date();
  form: FormGroup | undefined;
  DateToSend: DateToSend = new DateToSend('', '');
  Booking = new Booking('', '', '');
  selectedStartTime: string = '';
  selectedEndTimeTest: string = '';

  constructor(
    private calendar: NgbCalendar,
    config: NgbTimepickerConfig,
    private sendDateService: SendDateService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      Time: [],
    });
    const currentDate = new Date();

    // Set the default date to the current date
    this.selectedDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

    // Set the default time to the current time
    this.selectedEndTime = {
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
      second: currentDate.getSeconds(),
    };
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

  newCalendarSelect(date: Date): void {
    this.selected = date;
    console;
  }

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

  createNewReservation(): void {
    console.log(this.selectedStartTime);
    // create date object for selected date
    const date = new Date(
      this.selected.getFullYear(),
      this.selected.getMonth(),
      this.selected.getDate()
    );
    // const startTime = new Date(
    //   this.selected.getFullYear(),
    //   this.selected.getMonth(),
    //   this.selected.getDate(),
    //   this.selectedStartTime.getHours(),
    //   this.selectedStartTime.getMinutes()
    // );
    // const endTime = new Date(
    //   this.selected.getFullYear(),
    //   this.selected.getMonth(),
    //   this.selected.getDate(),
    //   this.selectedEndTimeTest.getHours(),
    //   this.selectedEndTimeTest.getMinutes()
    // );
    console.log(this.selectedStartTime);
    console.log(this.selectedEndTimeTest);

    this.Booking.startTime = this.selectedStartTime;
    this.Booking.endTime = this.selectedEndTimeTest;
    this.Booking.date = date.toJSON();
    this.sendDateService.postDate(this.Booking).subscribe(() => {});
  }

  saveDateTime(): void {
    if (this.selectedDate && this.selectedTime) {
      // Combine the selected date and time
      this.selected.setHours(this.selectedTime.hour);
      this.selected.setMinutes(this.selectedTime.minute);
      this.selected.setSeconds(this.selectedTime.second);
      const dateTime = new Date(
        this.selectedDate.year,
        this.selectedDate.month - 1,
        this.selectedDate.day,
        this.selectedTime.hour,
        this.selectedTime.minute
      );

      const endDateTime = new Date(
        this.selectedDate.year,
        this.selectedDate.month - 1,
        this.selectedDate.day,
        this.selectedEndTime.hour,
        this.selectedEndTime.minute
      );

      const newDate = this.selected;
      console.log(newDate);

      this.newDate.startTime = dateTime.toJSON();
      this.newDate.endTime = endDateTime.toJSON();
      this.sendDateService.postDate(this.newDate).subscribe(() => {});

      // Perform any desired operations with the combined date and time
      console.log('time selected: ' + this.selectedTimeTest.getHours());

      console.log('Date and time selected: ' + this.selected);
      console.log(this.newDate.startTime);
    } else {
      console.log('Date and time not selected');
    }
  }
}
