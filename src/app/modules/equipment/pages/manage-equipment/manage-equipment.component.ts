import { Component, OnInit } from '@angular/core';
import { EquipmentRequest } from '../../../../services/models';
import { EquipmentsService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-equipment',
  templateUrl: './manage-equipment.component.html',
  styleUrl: './manage-equipment.component.scss'
})
export class ManageEquipmentComponent implements OnInit {
  errorMsg: Array<string> = [];
  equipmentRequest: EquipmentRequest = {
    equipmentName: '',
    isbn: '',
    description: '',
    
  };
  selectedEquipmentImage: any;
  selectedPicture: string | undefined;
  

  constructor(
    private equipmentService: EquipmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const equipmentId = this.activatedRoute.snapshot.params['equipmentId'];
    if (equipmentId) {
      this.equipmentService.findEquipmentById({
        'equipment-id': equipmentId
      }).subscribe({
        next: (equipment) => {
         this.equipmentRequest = {
           id: equipment.id,
           equipmentName: equipment.equipmentName as string,
           isbn: equipment.isbn as string,
           description: equipment.description as string,
           sharable: equipment.sharable
         };
         this.selectedPicture='data:image/jpg;base64,' + equipment.image;
        }
      });
    }
  }

  saveEquipment() {
    const validationErrorMap = {
      100: 'Equipment name should not be null',
      101: 'ISBN should not be null',
      102: 'Description should not be null',
      // Add more mappings as needed
    };
    this.equipmentService.saveEquipment({
      body: this.equipmentRequest
    }).subscribe({
      next: (equipmentId) => {
        this.equipmentService.uploadEquipmentImage({
          'equipment-id': equipmentId,
          body: {
            file: this.selectedEquipmentImage
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/my-equipments']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = []; // Initialize an empty array to store error messages
      
        if (err.error && err.error.validationErrors) {
          err.error.validationErrors.forEach(code => {
            const message = validationErrorMap[code];
            if (message) {
              this.errorMsg.push(message);
            } else {
              console.warn(`Error code ${code} not found in validationErrorMap`);
            }
          });
        }
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedEquipmentImage = event.target.files[0];
    console.log(this.selectedEquipmentImage);

    if (this.selectedEquipmentImage) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedEquipmentImage);
    }
  }

}
