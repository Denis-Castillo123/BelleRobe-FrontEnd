import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVestidoComponent } from './vista-vestido.component';

describe('VistaVestidoComponent', () => {
  let component: VistaVestidoComponent;
  let fixture: ComponentFixture<VistaVestidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaVestidoComponent]
    });
    fixture = TestBed.createComponent(VistaVestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
