import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVestidoComponent } from './buy-vestido.component';

describe('BuyVestidoComponent', () => {
  let component: BuyVestidoComponent;
  let fixture: ComponentFixture<BuyVestidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyVestidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyVestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
