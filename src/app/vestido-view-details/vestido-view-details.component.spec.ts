import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidoViewDetailsComponent } from './vestido-view-details.component';

describe('VestidoViewDetailsComponent', () => {
  let component: VestidoViewDetailsComponent;
  let fixture: ComponentFixture<VestidoViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VestidoViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VestidoViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
