import { Component, OnInit } from '@angular/core';
import { EquipmentResponse, PageResponseEquipmentResponse } from '../../../../services/models';
import { EquipmentsService } from '../../../../services/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-equipments',
  templateUrl: './my-equipments.component.html',
  styleUrl: './my-equipments.component.scss'
})
export class MyEquipmentsComponent implements OnInit {
  equipmentResponse:PageResponseEquipmentResponse = {};
  page: number = 0;
  size: number = 2;
  pages: any = [];

  constructor(
    private equipmentService:EquipmentsService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.findAllEquipments()
  }

  findAllEquipments() {
    this.equipmentService.findAllEquipmentsByOwner({
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

  archiveEquipment(equipment: EquipmentResponse) {
    this.equipmentService.updateArchivedStatus({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        equipment.archived = !equipment.archived;
  
        const newStatus = equipment.archived ? 'Archived' : 'Unarchived';
        const message = `Equipment "${equipment.equipmentName}" is now ${newStatus}`;
  
        Swal.fire({
          icon: equipment.archived ? 'warning' : 'success', // Set icon based on status
          title: 'Status Updated',
          text: message,
        });
      },
      error: (error) => {
        // Handle errors during update
        console.error('Error updating archived status:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update archived status!',
        });
      }
    });
  }

  shareEquipment(equipment: EquipmentResponse) {
    this.equipmentService.updateShareableStatus({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        equipment.sharable = !equipment.sharable;
        const newStatus = equipment.sharable ? 'Shared' : 'Unshared';
        const message = `Equipment "${equipment.equipmentName}" is now ${newStatus}`;
  
        Swal.fire({
          icon: equipment.sharable ? 'success' : 'info', // Set icon based on status
          title: 'Status Updated',
          text: message,
        });
        
      },
      error: (error) => {
        // Handle errors during update
        console.error('Error updating shareable status:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update shareable status!',
        });
      }
    });
  }

  editEquipment(equipment: EquipmentResponse) {
    this.router.navigate(['equipments', 'manage', equipment.id]);
  }
 
}
