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

  isSingleVestidoCheckout: string = "";
  vestidoDetails: Vestido[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderDressQuantityList: []
  }
  constructor(private activatedRoute: ActivatedRoute,
    private vestidoService: VestidoService,
    private router: Router) { }

  ngOnInit(): void {
    this.vestidoDetails = this.activatedRoute.snapshot.data['vestidoDetails'];

    this.isSingleVestidoCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleVestidoCheckout") || "";
    this.vestidoDetails.forEach(
      x => this.orderDetails.orderDressQuantityList.push(
        {
          vestidoId: x.vestidoId, quantity: 1
        }
      )
    );
    console.log(this.vestidoDetails);
    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.orderDetails.fullName = orderForm.form.value.fullName;
    this.orderDetails.fullAddress = orderForm.form.value.fullAddress;
    this.orderDetails.contactNumber = orderForm.form.value.contactNumber;
    this.orderDetails.alternateContactNumber = orderForm.form.value.alternateContactNumber;

    console.log(this.orderDetails);
    this.vestidoService.placeOrder(this.orderDetails, this.isSingleVestidoCheckout).subscribe(
      (resp) => {
        console.log("Place oder resp");
        console.log(resp);
        orderForm.reset();

        // Mostrar notificación de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La orden se ha realizado exitosamente.',
          timer: 3000, // Tiempo en milisegundos antes de que la notificación se cierre automáticamente
          timerProgressBar: true, // Mostrar barra de progreso en el temporizador
          position: 'top',
        });

        this.router.navigate(['/orderConfirm']);

      },
      (err) => {
        console.log(err);
      }
    );
  }


  getQuantityForVestido(vestidoId: number) {
    const filterVestido = this.orderDetails.orderDressQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity;

  }

  getCalculatedTotal(vestidoId: number, vestidoDiscountedPrice: number) {
    const filterVestido = this.orderDetails.orderDressQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity * vestidoDiscountedPrice;

  }

  onQuantityChanged(q: number, vestidoId: number) {
    this.orderDetails.orderDressQuantityList.filter(
      (orderVestido) => orderVestido.vestidoId === vestidoId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderDressQuantityList.forEach(
      (vestidoQuantity) => {
        const price = this.vestidoDetails.filter(vestido => vestido.vestidoId === vestidoQuantity.vestidoId)[0].vestidoDiscountedPrice
        grandTotal += price * vestidoQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
