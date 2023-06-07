import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app/login/login.component';
import { AgregarVestidoComponent } from './vestidos/agregar-vestido/agregar-vestido.component';
import { VistaVestidoComponent } from './vestidos/vista-vestido/vista-vestido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgregarVestidoComponent,
    VistaVestidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
