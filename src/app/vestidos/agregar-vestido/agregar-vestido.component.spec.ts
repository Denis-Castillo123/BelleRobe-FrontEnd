import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVestidoComponent } from './agregar-vestido.component';

describe('AgregarVestidoComponent', () => {
  let component: AgregarVestidoComponent;
  let fixture: ComponentFixture<AgregarVestidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarVestidoComponent]
    });
    fixture = TestBed.createComponent(AgregarVestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
