import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandel } from '../_model/file-handel.model';

@Component({
  selector: 'app-show-vestido-images-dialog',
  templateUrl: './show-vestido-images-dialog.component.html',
  styleUrls: ['./show-vestido-images-dialog.component.css']
})
export class ShowVestidoImagesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
