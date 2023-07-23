import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './Componente/listar/listar.component';
import { EditarComponent}  from "./Componente/editar/editar.component";
import { GuardarComponent } from './Componente/guardar/guardar.component';
import { EliminarComponent } from './Componente/eliminar/eliminar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [	
    AppComponent,
    ListarComponent,
    EditarComponent,
    EliminarComponent,
    GuardarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
