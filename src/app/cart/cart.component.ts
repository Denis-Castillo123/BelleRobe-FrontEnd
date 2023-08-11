import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VestidoService } from '../_services/vestido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'Price' , 'Discounted Price' ,'Action'];
  cartDetails : any[] = [];

  constructor(private vestidoService : VestidoService,
    private router : Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: string) {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este elemento del carrito?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vestidoService.deleteCartItem(cartId).subscribe(
          (resp) => {
            console.log(resp);
            this.getCartDetails();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  

  getCartDetails(){

    this.vestidoService.getCartDetails().subscribe(
      (response : any) => {
        console.log(response)
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout(){
    this.router.navigate(['/buyVestido', {
      isSingleVestidoCheckout: false, id: 0
    }]);
    // this.vestidoService.getVestidoDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   },(error) =>{
    //     console.log(error);
    //   }
    // );
  }

}
