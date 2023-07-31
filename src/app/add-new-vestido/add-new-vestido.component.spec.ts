import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVestidoComponent } from './add-new-vestido.component';

describe('AddNewVestidoComponent', () => {
  let component: AddNewVestidoComponent;
  let fixture: ComponentFixture<AddNewVestidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewVestidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
