import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarFarmacoComponent } from './Component/listarFarmaco/listarFarmaco.component';
import { EditarFarmaciaComponent } from './Component/editarFarmacia/editarFarmacia.component';
import { EditarFarmacoComponent } from './Component/editarFarmaco/editarFarmaco.component';
import { GuardarFarmaciaComponent } from './Component/guardarFarmacia/guardarFarmacia.component';
import { GuardarFarmacoComponent } from './Component/guardarFarmaco/guardarFarmaco.component';
import { ListarFarmaciaComponent } from './Component/listarFarmacia/listarFarmacia.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarFarmaciaComponent,
    ListarFarmacoComponent,
    EditarFarmaciaComponent,
    EditarFarmacoComponent,
    GuardarFarmaciaComponent,
    GuardarFarmacoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
