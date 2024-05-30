import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../../../../services/services';
import {  BorrowedEquipmentResponse, PageResponseBorrowedEquipmentResponse } from '../../../../services/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-returned-equipments',
  templateUrl: './returned-equipments.component.html',
  styleUrl: './returned-equipments.component.scss'
})
export class ReturnedEquipmentsComponent implements OnInit {
  page = 0;
  size = 5;
  pages: any = [];
  returnedEquipments: PageResponseBorrowedEquipmentResponse = {};
  message = '';
  level = 'success';
  
  constructor(
    private equipmentService: EquipmentsService,
    
  ) {
  }
  ngOnInit(): void {
    this.findAllBorrowedEquipments();
  }

  private findAllBorrowedEquipments() {
    this.equipmentService.findAllReturnedEquipments({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        console.log("Response>>>>",resp);
        
        this.returnedEquipments = resp;
        this.pages = Array(this.returnedEquipments.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedEquipments();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedEquipments();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedEquipments();
  }

  goToLastPage() {
    this.page = this.returnedEquipments.totalPages as number - 1;
    this.findAllBorrowedEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedEquipments();
  }

  get isLastPage() {
    return this.page === this.returnedEquipments.totalPages as number - 1;
  }


approveEquipmentReturn(equipment: BorrowedEquipmentResponse) {
  if (!equipment.returned) {
    return;
  }

  this.equipmentService.approveReturnBorrowedEquipment({
    'equipment-id': equipment.id as number
  }).subscribe({
    next: () => {
      this.findAllBorrowedEquipments(); // Refresh equipment list after approval
      Swal.fire({
        icon: 'success',
        title: 'Return Approved',
        text: 'Equipment return has been approved!',
      });
    },
    error: (error) => {
      // Handle errors during update
      console.error('Error approving equipment return:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve equipment return!',
      });
    }
  });
}


}
