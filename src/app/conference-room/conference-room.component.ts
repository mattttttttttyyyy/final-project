import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConferenceRoomService } from './conference-room.service';
import { ConferenceRoom } from './../conference-room';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.css'],
})
export class ConferenceRoomComponent implements OnInit {
  @Input() corporationId: number | undefined;
  @Output() selectRoom: EventEmitter<number> = new EventEmitter<number>();

  conferenceRooms: ConferenceRoom[] = [];
  conferenceRoom = new ConferenceRoom('');
  selectedRoomNumber: number | undefined;

  constructor(private conferenceRoomService: ConferenceRoomService) {
    this.conferenceRoom = new ConferenceRoom('');
  }

  ngOnInit(): void {
    // Check if corporationId is defined
    if (this.corporationId !== undefined) {
      // Load conference rooms specific to corporationId
      this.loadConferenceRooms();
    } else {
      console.error(
        'Corporation ID is undefined. Unable to load conference rooms.'
      );
    }
  }

  loadConferenceRooms(): void {
    this.conferenceRoomService.getConferenceRooms(this.corporationId).subscribe(
      (list: ConferenceRoom[]) => {
        this.conferenceRooms = list;
      },
      (error) => {
        console.error('Error loading conference rooms:', error);
      }
    );
  }

  createConferenceRoom(): void {
    if (this.corporationId !== undefined) {
      this.conferenceRoomService
        .createConferenceRoom(this.conferenceRoom, this.corporationId)
        .subscribe(() => {
          // Reload conference rooms
          this.loadConferenceRooms();

          // Reset the conference room form
          this.conferenceRoom = new ConferenceRoom('');
        });
    } else {
      console.error(
        'Corporation ID is undefined. Unable to create conference room.'
      );
    }
  }

  onRoomSelected(roomId: number): void {
    console.log('Room selected:', roomId);
    this.selectedRoomNumber = roomId;
    this.selectRoom.emit(roomId);
  }
}
