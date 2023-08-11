import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { ShowVestidoImagesDialogComponent } from '../show-vestido-images-dialog/show-vestido-images-dialog.component';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';
import Swal from 'sweetalert2';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-vestido-details',
  templateUrl: './show-vestido-details.component.html',
  styleUrls: ['./show-vestido-details.component.css']
})
export class ShowVestidoDetailsComponent implements OnInit {

  showLoadMoreVestidoButton = false;
  refreshTableTrigger = 0;
  showTable = false;
  pageNumber: number = 0;
  vestidoDetails : Vestido[] =[];
  displayedColumns: string[] = ['Id', 'Vestido Name', 'Vestido Description', 'Vestido Discounted Price', 'Vestido Actual Price' ,'Actions'];
  constructor(private vestidoService: VestidoService ,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllVestidos();
  }

  searchByKeyword(searchkeyword:string){

    this.pageNumber= 0;
    this.vestidoDetails= [];
    this.getAllVestidos(searchkeyword);

  }

  public getAllVestidos(searchKey: string =""){
    this.showTable = false;
    this.vestidoDetails = []; 
    this.vestidoService.getAllVestidos(this.pageNumber, searchKey)
    .pipe(
      map((x: Vestido[], i) => x.map((vestido: Vestido) => this.imageProcessingService.createImages(vestido)))
    )
    .subscribe(
      (resp: Vestido[]) =>{
        console.log(resp);
        resp.forEach(vestido => this.vestidoDetails.push(vestido));
        this.showTable=true;
        if(resp.length==2){
          this.showLoadMoreVestidoButton=true;
        }else{
          this.showLoadMoreVestidoButton=false;
        }
        // this.vestidoDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
    this.refreshTableTrigger++;
  }

  loadMoreVestido(){
    this.pageNumber= this.pageNumber+1;
    this.getAllVestidos();
  }

  deleteVestido(vestidoId: number) {
    this.vestidoService.deleteVestido(vestidoId).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El vestido fue eliminado exitosamente.',
          timer: 3000,
          timerProgressBar: true,
          position: 'center',
        }).then(() => {
          this.getAllVestidos();
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  

  showImages(vestido: Vestido){
    console.log(vestido);
    this.imagesDialog.open(ShowVestidoImagesDialogComponent, {
      data: {
        images: vestido.vestidoImages
      },
      height: '500px',
      width: '800px'
    });

  }

  editVestidoDetails(vestidoId:number){
    this.router.navigate(['/addNewVestido', {vestidoId: vestidoId}])
  }

  trackByVestidoId(index: number, item: Vestido) {
    return item.vestidoId;
  }

}
