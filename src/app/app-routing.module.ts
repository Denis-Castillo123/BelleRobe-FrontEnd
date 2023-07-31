//import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewVestidoComponent } from './add-new-vestido/add-new-vestido.component';
import { AdminComponent } from './admin/admin.component';
import { BuyVestidoResolverService } from './buy-vestido-resolver.service';
import { BuyVestidoComponent } from './buy-vestido/buy-vestido.component';
import { CartComponent } from './cart/cart.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';
import { VestidoResolveService } from './vestido-resolve.service';
import { VestidoViewDetailsComponent } from './vestido-view-details/vestido-view-details.component';
import { RegisterComponent } from './register/register.component';
import { ShowVestidoDetailsComponent } from './show-vestido-details/show-vestido-details.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewVestido', component: AddNewVestidoComponent , canActivate:[AuthGuard], data:{roles:['Admin']},
     resolve: {
            vestido: VestidoResolveService
          }},
  { path: 'showVestidoDetails' , component: ShowVestidoDetailsComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'orderInformation' , component: OrderDetaisComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'vestidoViewDetails', component: VestidoViewDetailsComponent, resolve: { vestido: VestidoResolveService }},
  { path: 'buyVestido' , component: BuyVestidoComponent, canActivate:[AuthGuard], data:{roles:['User']},
  resolve: {
         vestidoDetails: BuyVestidoResolverService} },
  { path: 'cart' , component: CartComponent, canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'orderConfirm', component: OrderConfirmationComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },

  { path: 'myOrders', component: MyOrdersComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
