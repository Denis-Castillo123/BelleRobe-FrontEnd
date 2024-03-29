import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddNewVestidoComponent } from './add-new-vestido/add-new-vestido.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowVestidoDetailsComponent } from './show-vestido-details/show-vestido-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShowVestidoImagesDialogComponent } from './show-vestido-images-dialog/show-vestido-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VestidoViewDetailsComponent } from './vestido-view-details/vestido-view-details.component';
import { BuyVestidoComponent } from './buy-vestido/buy-vestido.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewVestidoComponent,
    DragDirective,
    ShowVestidoDetailsComponent,
    ShowVestidoImagesDialogComponent,
    VestidoViewDetailsComponent,
    BuyVestidoComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    OrderDetaisComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
