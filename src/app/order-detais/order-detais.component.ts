import { Component, OnInit } from '@angular/core';
import { VestidoService } from '../_services/vestido.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-detais',
  templateUrl: './order-detais.component.html',
  styleUrls: ['./order-detais.component.css']
})
export class OrderDetaisComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Vestido Name', 'Name', 'Address', 'Contact No' ,'Status'];
  dataSource = [] as MyOrderDetails[]; 
  constructor(private vestidoService : VestidoService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.vestidoService.getAllOrderDetailsForAdmin().subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      }, (error) => {
        console.log(error);
      }
    );
  }
}
