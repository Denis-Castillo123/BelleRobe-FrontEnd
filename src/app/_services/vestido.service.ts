import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Vestido } from '../_model/vestido.model';

@Injectable({
  providedIn: 'root'
})
export class VestidoService {

  constructor(private httpClient: HttpClient) { }

  public getAllOrderDetailsForAdmin(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails");
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public deleteCartItem(cartId: string) {
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/" + cartId);
  }

  public addVestido(vestido: FormData) {
    return this.httpClient.post<Vestido>("http://localhost:9090/addNewVestido", vestido);
  }

  public getAllVestidos(pageNumber: number, searchKeyword: string = "") {
    return this.httpClient.get<Vestido[]>("http://localhost:9090/getAllVestidos?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public getVestidoDetailsById(vestidoId: string) {
    return this.httpClient.get<Vestido>("http://localhost:9090/getVestidoDetailsById/" + vestidoId);
  }

  public deleteVestido(vestidoId: number) {
    return this.httpClient.delete("http://localhost:9090/deleteVestidoDetails/" + vestidoId);
  }

  public getVestidoDetails(isSingeVestidoCheckout: string, vestidoId: string) {
    return this.httpClient.get<Vestido[]>("http://localhost:9090/getVestidoDetails/" + isSingeVestidoCheckout + "/" + vestidoId);
  }


  public placeOrder(orderDetails: OrderDetails, isCartCheckout: string) {
    return this.httpClient.post("http://localhost:9090/placeOrder/" + isCartCheckout, orderDetails);
  }

  public addToCart(vestidoId: number) {
    return this.httpClient.get("http://localhost:9090/addToCart/" + vestidoId);
  }

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }


}
