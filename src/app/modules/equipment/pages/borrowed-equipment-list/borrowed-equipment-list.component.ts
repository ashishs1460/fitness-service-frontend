import { Component, OnInit } from '@angular/core';
import { BorrowedEquipmentResponse, EquipmentResponse, FeedbackRequest, PageResponseBorrowedEquipmentResponse } from '../../../../services/models';
import { EquipmentsService, FeedbacksService } from '../../../../services/services';

@Component({
  selector: 'app-borrowed-equipment-list',
  templateUrl: './borrowed-equipment-list.component.html',
  styleUrl: './borrowed-equipment-list.component.scss'
})
export class BorrowedEquipmentListComponent implements OnInit {
  page = 0;
  size = 5;
  pages: any = [];
  borrowedEquipments: PageResponseBorrowedEquipmentResponse = {};
  selectedEquipment: BorrowedEquipmentResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {equipmentId: 0, comment: '', note: 0};
  constructor(
    private equipmentService: EquipmentsService,
    private feedbackService: FeedbacksService
  ) {
  }
  ngOnInit(): void {
    this.findAllBorrowedEquipments();
  }

  private findAllBorrowedEquipments() {
    this.equipmentService.findAllBorrowedEquipments({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        console.log("Response>>>>",resp);
        
        this.borrowedEquipments = resp;
        this.pages = Array(this.borrowedEquipments.totalPages)
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
    this.page = this.borrowedEquipments.totalPages as number - 1;
    this.findAllBorrowedEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedEquipments();
  }

  get isLastPage() {
    return this.page === this.borrowedEquipments.totalPages as number - 1;
  }

  returnBorrowedEquipment(equipment: BorrowedEquipmentResponse) {
    this.selectedEquipment = equipment;
    this.feedbackRequest.equipmentId = equipment.id as number;
  }

  returnEquipment(withFeedback: boolean) {
    this.equipmentService.returnBorrowedEquipment({
      'equipment-id': this.selectedEquipment?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedEquipment = undefined;
        this.findAllBorrowedEquipments();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }

}
