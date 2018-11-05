import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentaDiariaComponent } from './ventas/venta-diaria/venta-diaria.component';
import { VentaMensualComponent } from './ventas/venta-mensual/venta-mensual.component';
import { VentaAnualComponent } from './ventas/venta-anual/venta-anual.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    VentaDiariaComponent,
    VentaMensualComponent,
    VentaAnualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
