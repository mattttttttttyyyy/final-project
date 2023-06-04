import { CorporationService } from './../corporation/corporation.service';
import { Corporation } from './../corporation';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-corporation-main-page',
  templateUrl: './corporation-main-page.component.html',
  styleUrls: ['./corporation-main-page.component.css'],
})
export class CorporationMainPageComponent implements OnInit {
  corporation: Corporation | undefined;
  selectedRoomNumber!: number;

  constructor(
    private route: ActivatedRoute,
    private corporationService: CorporationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const corporationId = params['id'];
      this.corporationService
        .loadCorporation(corporationId)
        .subscribe((corporation: Corporation) => {
          this.corporation = corporation;
        });
    });
  }

  onRoomSelected(event: any): void {
    this.selectedRoomNumber = event;
  }

  openDatePicker() {
    console.log(this.selectedRoomNumber);
    const modalRef = this.modalService.open(
      document.getElementById('datePickerModal') as HTMLElement
    );
    modalRef.componentInstance.roomNumber = this.selectedRoomNumber;
  }
}
