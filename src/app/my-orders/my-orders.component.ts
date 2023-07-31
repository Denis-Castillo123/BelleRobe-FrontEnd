import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { VestidoService } from '../_services/vestido.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = ["Name", "Address" , "Contact No" , "Amount" , "Status"];

  myOrderDetails: MyOrderDetails[] =[];
  constructor(private vestidoService : VestidoService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.vestidoService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      }, (err) => {
        console.log(err);
      }
    )
  }

}
