import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  vestidoDetails: Vestido[] = [];
  showLoadButton = false;
  constructor(private vestidoService: VestidoService,
    private imageProcessingService: ImageProcessingService,
    private router : Router) { }

  ngOnInit(): void {
    this.getAllVestidos();
  }

  searchByKeyword(searchkeyword: string){

    this.pageNumber= 0;
    this.vestidoDetails= [];
    this.getAllVestidos(searchkeyword);

  }

  public getAllVestidos(searchKey: string =""){
    this.vestidoService.getAllVestidos(this.pageNumber, searchKey)
    .pipe(
      map((x: Vestido[], i:number) => x.map((vestido: Vestido) => this.imageProcessingService.createImages(vestido)))
    )
    .subscribe(
      (resp: Vestido[]) =>{
        console.log(resp);
        if(resp.length == 8){
          this.showLoadButton = true;
        }else{this.showLoadButton = false}
        resp.forEach(p=> this.vestidoDetails.push(p));
        // this.vestidoDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  public loadMoreVestido(){

    this.pageNumber = this.pageNumber+1;
    this.getAllVestidos();
  }

  showVestidoDetails(vestidoId:number){
    this.router.navigate(['/vestidoViewDetails' , {vestidoId: vestidoId}]);

  }

  

}
