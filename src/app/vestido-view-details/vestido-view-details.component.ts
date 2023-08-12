import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vestido-view-details',
  templateUrl: './vestido-view-details.component.html',
  styleUrls: ['./vestido-view-details.component.css']
})
export class VestidoViewDetailsComponent implements OnInit {

  selectVestidoIndex = 0;
  vestido!: Vestido;

  constructor(private activatedRoute: ActivatedRoute, private router : Router,
    private vestidoService: VestidoService) { }

  ngOnInit(): void {

   this.vestido = this.activatedRoute.snapshot.data['vestido'];
    
  }

  changeIndex(index:number){
    this.selectVestidoIndex=index;
  }

  buyVestido(vestidoId:number){
    console.log(vestidoId)
    this.router.navigate(['/buyVestido', {
      isSingleVestidoCheckout: true, id: vestidoId
    }]);
  }

  addToCart(vestidoId:number){
    this.vestidoService.addToCart(vestidoId).subscribe(
      (response) => {
        console.log(response);
        // Mostrar notificación de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Vestido agregado a la bolsa.',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });
      },(error) => {
        console.log(error)
      }
    )

  }

}
