import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Vestido } from './_model/vestido.model';
import { VestidoService } from './_services/vestido.service';

@Injectable({
  providedIn: 'root'
})
export class BuyVestidoResolverService implements Resolve<Vestido[]>{

  constructor(private VestidoService: VestidoService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Vestido[] | Observable<Vestido[]> | Promise<Vestido[]> {
    const id= route.paramMap.get("id");
    const isSingleVestidoCheckout = route.paramMap.get("isSingleVestidoCheckout")
    
    if (id === null || isSingleVestidoCheckout === null) {
      // Manejar el caso cuando 'id' o 'isSingleVestidoCheckout' es null
      // Por ejemplo, podrías redirigir a una página de error o realizar cualquier otra acción
      // return null; // O cualquier otro valor o acción apropiada
      throw new Error("'id' o 'isSingleVestidoCheckout' no están presentes en la URL.");
    }
    
    return this.VestidoService.getVestidoDetails(isSingleVestidoCheckout, id)
    .pipe(
      map(
        (x: Vestido[], i)=> x.map((vestido : Vestido) => this.imageProcessingService.createImages(vestido))
      )
    );

  }
}
