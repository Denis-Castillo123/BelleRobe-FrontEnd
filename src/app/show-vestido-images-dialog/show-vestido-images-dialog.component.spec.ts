import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVestidoImagesDialogComponent } from './show-vestido-images-dialog.component';

describe('ShowVestidoImagesDialogComponent', () => {
  let component: ShowVestidoImagesDialogComponent;
  let fixture: ComponentFixture<ShowVestidoImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVestidoImagesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVestidoImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
