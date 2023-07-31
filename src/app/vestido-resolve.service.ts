import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Vestido } from './_model/vestido.model';
import { VestidoService } from './_services/vestido.service';

@Injectable({
  providedIn: 'root'
})
export class VestidoResolveService implements Resolve<Vestido>{

  constructor(private vestidoService: VestidoService,
              private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vestido> {
    const id=route.paramMap.get("vestidoId");

    if(id){
      return this.vestidoService.getVestidoDetailsById(id)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    }else{
      return of(this.getVestidoDetails());

    }

  }

  getVestidoDetails():Vestido{
    return {
    vestidoId: 0,
    vestidoName: "",
    vestidoDescription: "",
    vestidoDiscountedPrice: 0,
    vestidoActualPrice: 0,
    vestidoImages:[],
    };
  }
}
