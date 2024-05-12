import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyEquipmentsComponent } from './pages/my-equipments/my-equipments.component';
import { ManageEquipmentComponent } from './pages/manage-equipment/manage-equipment.component';
import { FormsModule } from '@angular/forms';
import { BorrowedEquipmentListComponent } from './pages/borrowed-equipment-list/borrowed-equipment-list.component';
import { ReturnedEquipmentsComponent } from './pages/returned-equipments/returned-equipments.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    EquipmentListComponent,
    EquipmentCardComponent,
    RatingComponent,
    MyEquipmentsComponent,
    ManageEquipmentComponent,
    BorrowedEquipmentListComponent,
    ReturnedEquipmentsComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    FormsModule
  ]
})
export class EquipmentModule { }
