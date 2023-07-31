import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVestidoDetailsComponent } from './show-vestido-details.component';

describe('ShowVestidoDetailsComponent', () => {
  let component: ShowVestidoDetailsComponent;
  let fixture: ComponentFixture<ShowVestidoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVestidoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVestidoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
