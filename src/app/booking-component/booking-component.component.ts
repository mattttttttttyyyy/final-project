import { DialogService } from './../dialog-service.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbTimeStruct,
  NgbCalendar,
  NgbTimepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { BookingComponentService } from './booking-component.service';
import { Booking } from './booking';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { Observer, catchError, map, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { handleError } from '../error-handler';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

@Component({
  selector: 'app-date-picker',
  templateUrl: './booking-component.component.html',
  styleUrls: ['./booking-component.component.css'],
})
export class BookingComponentComponent implements OnInit {
  @Input() roomNumber!: number;
  [x: string]: any;
  TimepickerConfig: TimepickerConfig = new TimepickerConfig();
  selectedDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  selectedTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  minDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  minTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  newDate: Booking = new Booking('', '');
  selectedEndTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  selected: Date = new Date();
  selectedTimeTest: Date = new Date();
  form: FormGroup | undefined;
  DateToSend: Booking = new Booking('', '');
  Booking = new Booking('', '');
  selectedStartTime: string = '';
  selectedEndTimeTest: string = '';
  isTimeValid: boolean = true;
  number = 1;
  errorMessage: any;
  testingDate = new Date();
  mission: any;
  bookingsForSelectedDay: Booking[] = [];
  currentDate = new Date();

  constructor(
    private calendar: NgbCalendar,
    config: NgbTimepickerConfig,
    private booking: BookingComponentService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.form = this.formBuilder.group({
      Time: [],
    });
    const currentDate = new Date();

    this.selectedDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

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

  ngOnInit(): void {
    this.getBookingsForSelectedDay(this.currentDate);
  }

  newCalendarSelect(date: Date): void {
    this.selected = date;
    console;
  }

  onDateSelect(date: NgbDateStruct): void {
    console.log(date);
    const dateForCalendar = new Date(
      this.selected.getFullYear(),
      this.selected.getMonth(),
      this.selected.getDate()
    );
    console.log(dateForCalendar);
    this.getBookingsForSelectedDay(dateForCalendar);
  }

  onTimeChange(time: NgbTimeStruct): void {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30);

    this.minTime = {
      hour: currentTime.getHours(),
      minute: currentTime.getMinutes(),
      second: currentTime.getSeconds(),
    };
    const selectedTime = new Date();
    selectedTime.setHours(time.hour);
    selectedTime.setMinutes(time.minute);

    if (selectedTime < currentTime) {
      this.isTimeValid = false;
    } else {
      this.isTimeValid = true;
    }
  }

  createNewReservation(): void {
    console.log(this.selectedStartTime);
    // create date object for selected date
    const date = new Date(
      this.selected.getFullYear(),
      this.selected.getMonth(),
      this.selected.getDate()
    );
    this.Booking.startTime = this.selectedStartTime;
    this.Booking.endTime = this.selectedEndTimeTest;
    this.booking.postDate(this.Booking).subscribe(() => {});
  }
  getBookingsForSelectedDay(selectedDate: Date): void {
    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    );
    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    );

    this.booking.getBookingsByDateAndRoom(startOfDay, this.number).subscribe(
      (bookings: Booking[]) => {
        this.bookingsForSelectedDay = bookings;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  saveDateTime(): void {
    if (this.selectedDate && this.selectedTime) {
      // Combine the selected date and time
      this.selected.setHours(this.selectedTime.hour);
      this.selected.setMinutes(this.selectedTime.minute);
      this.selected.setSeconds(this.selectedTime.second);
      const startDate = new Date(
        this.selected.getFullYear(),
        this.selected.getMonth(),
        this.selected.getDate(),
        this.selectedTime.hour,
        this.selectedTime.minute
      );

      let endDateTime = new Date(
        this.selected.getFullYear(),
        this.selected.getMonth(),
        this.selected.getDate(),
        this.selectedEndTime.hour,
        this.selectedEndTime.minute
      );

      // Check if end time is before start time, indicating it's on the next day
      if (endDateTime < startDate) {
        // Increment the date by one day
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      this.newDate.startTime = startDate.toJSON();
      this.newDate.endTime = endDateTime.toJSON();
      const booking = new Booking(this.newDate.startTime, this.newDate.endTime);
      console.log(booking.endTime);
      this.booking
        .createBooking(booking, this.roomNumber)
        .pipe(
          map((response) => response.uniqueId),
          catchError((error) => {
            handleError(error, this.dialog);
            return throwError(error);
          })
        )
        .subscribe((uniqueId) => {
          console.log('Unique ID:', uniqueId);
          if (uniqueId) {
            const textToSend = 'Your booking ID: ' + uniqueId.toString();
            this.dialogService.openDialog(textToSend);
          }
        });
    }
  }
}
