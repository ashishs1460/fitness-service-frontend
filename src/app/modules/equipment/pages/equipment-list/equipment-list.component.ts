import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../../../../services/services';
import { Router } from '@angular/router';
import { EquipmentResponse, PageResponseEquipmentResponse } from '../../../../services/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent implements OnInit{
  equipmentResponse:PageResponseEquipmentResponse = {};
  page: number = 0;
  size: number = 2;
  pages: any = [];
  message = '';
  level = 'success'

  constructor(
    private equipmentService:EquipmentsService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.findAllEquipments()
  }

  findAllEquipments() {
    this.equipmentService.findAllEquipments({
      page:this.page,
      size:this.size,
    }).subscribe({
      next:(equipments)=>{
        console.log(">>>>>>>>>>>>>",equipments)
        this.equipmentResponse = equipments;
        this.calculatePages();

      },
      error:(err)=>{

      }
    })
   
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllEquipments();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllEquipments();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllEquipments();
  }

  goToLastPage() {
    this.page = this.equipmentResponse.totalPages as number - 1;
    this.findAllEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllEquipments();
  }

  get isLastPage() {
    return this.page === this.equipmentResponse.totalPages as number - 1;
  }
  calculatePages() {
    this.pages = Array.from({ length: this.equipmentResponse.totalPages }, (_, i) => i);
  }
  

borrowEquipment(equipment: EquipmentResponse) {
  this.equipmentService.borrowEquipment({
    'equipment-id': equipment.id as number
  }).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Borrowed!',
        text: 'Equipment successfully added to your list!',
      });
    },
    error: (error) => {
      console.error('Error borrowing equipment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error || 'Failed to borrow equipment!', // Use default message if specific error message unavailable
      });
    }
  });
}


}
