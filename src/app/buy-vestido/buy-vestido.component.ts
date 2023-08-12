import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-buy-vestido',
  templateUrl: './buy-vestido.component.html',
  styleUrls: ['./buy-vestido.component.css']
})
export class BuyVestidoComponent implements OnInit {
  objeto:any
  isSingleVestidoCheckout: string = "";
  vestidoDetails: Vestido[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderVestidoQuantityList: []
  }
  constructor(private activatedRoute: ActivatedRoute,
    private vestidoService: VestidoService,
    private router: Router) { }

  ngOnInit(): void {
    this.vestidoDetails = this.activatedRoute.snapshot.data['vestidoDetails'];

    this.isSingleVestidoCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleVestidoCheckout") || "";
    this.vestidoDetails.forEach(
      x => this.orderDetails.orderVestidoQuantityList.push(
        {
          vestidoId: x.vestidoId, quantity: 1
        }
      )
    );
    this.objeto = {
      orderDressQuantityList: this.orderDetails.orderVestidoQuantityList
     }
    console.log(this.vestidoDetails);
    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    console.log(this.objeto);
    this.vestidoService.placeOrder(this.objeto, this.isSingleVestidoCheckout).subscribe(
      (resp) => {
        console.log("Place older resp");
        console.log(resp);
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);

        // Mostrar notificación de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La orden se ha realizado exitosamente.',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getQuantityForVestido(vestidoId: number) {
    const filterVestido = this.orderDetails.orderVestidoQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity;

  }

  getCalculatedTotal(vestidoId: number, vestidoDiscountedPrice: number) {
    const filterVestido = this.orderDetails.orderVestidoQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity * vestidoDiscountedPrice;

  }

  onQuantityChanged(q: number, vestidoId: number) {
    this.orderDetails.orderVestidoQuantityList.filter(
      (orderVestido) => orderVestido.vestidoId === vestidoId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderVestidoQuantityList.forEach(
      (vestidoQuantity) => {
        const price = this.vestidoDetails.filter(vestido => vestido.vestidoId === vestidoQuantity.vestidoId)[0].vestidoDiscountedPrice
        grandTotal += price * vestidoQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
