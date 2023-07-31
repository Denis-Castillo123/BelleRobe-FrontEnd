import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Vestido } from '../_model/vestido.model';
import { VestidoService } from '../_services/vestido.service';

@Component({
  selector: 'app-buy-vestido',
  templateUrl: './buy-vestido.component.html',
  styleUrls: ['./buy-vestido.component.css']
})
export class BuyVestidoComponent implements OnInit {

  isSingleVestidoCheckout : string = "";
  vestidoDetails : Vestido[]=[];
  orderDetails: OrderDetails={
    fullName : '',
	  fullAddress: '',
	  contactNumber : '',
	  alternateContactNumber : '',
	  orderVestidoQuantityList : []
  }
  constructor( private activatedRoute: ActivatedRoute,
    private vestidoService : VestidoService,
    private router: Router) { }

  ngOnInit(): void {
    this.vestidoDetails= this.activatedRoute.snapshot.data['vestidoDetails'];

    this.isSingleVestidoCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleVestidoCheckout")||"";
    this.vestidoDetails.forEach(
      x => this.orderDetails.orderVestidoQuantityList.push(
        {vestidoId: x.vestidoId, quantity: 1
        }
      )
    );
    console.log(this.vestidoDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm : NgForm){
    this.vestidoService.placeOrder(this.orderDetails, this.isSingleVestidoCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"])
      },
      (err) => {
        console.log(err);
      }
    );

  }

  getQuantityForVestido(vestidoId: number){
    const filterVestido = this.orderDetails.orderVestidoQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity;

  }

  getCalculatedTotal(vestidoId: number, vestidoDiscountedPrice: number){
    const filterVestido = this.orderDetails.orderVestidoQuantityList.filter(
      (vestidoQuantity) => vestidoQuantity.vestidoId === vestidoId
    );
    return filterVestido[0].quantity*vestidoDiscountedPrice;

  }

  onQuantityChanged(q:number, vestidoId:number){
    this.orderDetails.orderVestidoQuantityList.filter(
      (orderVestido) => orderVestido.vestidoId === vestidoId
    )[0].quantity=q;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderVestidoQuantityList.forEach(
      (vestidoQuantity) => {
        const price=this.vestidoDetails.filter(vestido => vestido.vestidoId === vestidoQuantity.vestidoId)[0].vestidoDiscountedPrice
        grandTotal+=price*vestidoQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
