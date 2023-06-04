import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ConferenceRoomComponent } from './conference-room.component';
import { BookingComponentModule } from '../booking-component/booking-component.module'; // Update the path to the correct location

@NgModule({
  declarations: [ConferenceRoomComponent],
  exports: [
    ConferenceRoomComponent,
    TimepickerModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    BookingComponentModule, // Import the BookingComponentModule from the correct location
  ],
})
export class ConferenceRoomModule {}
