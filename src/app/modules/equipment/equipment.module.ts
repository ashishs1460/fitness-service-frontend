import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { MainComponent } from './pages/main/main.component';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyEquipmentsComponent } from './pages/my-equipments/my-equipments.component';
import { ManageEquipmentComponent } from './pages/manage-equipment/manage-equipment.component';
import { FormsModule } from '@angular/forms';
import { BorrowedEquipmentListComponent } from './pages/borrowed-equipment-list/borrowed-equipment-list.component';
import { ReturnedEquipmentsComponent } from './pages/returned-equipments/returned-equipments.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    EquipmentListComponent,
    EquipmentCardComponent,
    RatingComponent,
    MyEquipmentsComponent,
    ManageEquipmentComponent,
    BorrowedEquipmentListComponent,
    ReturnedEquipmentsComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    FormsModule
  ]
})
export class EquipmentModule { }
