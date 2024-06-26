import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEquipmentsComponent } from './my-equipments.component';

describe('MyEquipmentsComponent', () => {
  let component: MyEquipmentsComponent;
  let fixture: ComponentFixture<MyEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyEquipmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
