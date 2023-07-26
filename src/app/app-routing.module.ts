import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFarmaciaComponent } from './Component/listarFarmacia/listarFarmacia.component';
import { ListarFarmacoComponent } from './Component/listarFarmaco/listarFarmaco.component';
import { GuardarFarmaciaComponent } from './Component/guardarFarmacia/guardarFarmacia.component';
import { EditarFarmaciaComponent } from './Component/editarFarmacia/editarFarmacia.component';
import { EditarFarmacoComponent } from './Component/editarFarmaco/editarFarmaco.component';
import { GuardarFarmacoComponent } from './Component/guardarFarmaco/guardarFarmaco.component';

const routes: Routes = [
  //Farmacias
  {path: 'listarFarmacias', component: ListarFarmaciaComponent},
  {path: 'guardarFarmacia', component: GuardarFarmaciaComponent},
  {path: 'editarFarmacia', component: EditarFarmaciaComponent},
  //Farmacos
  {path: 'listarFarmacos', component: ListarFarmacoComponent},
  {path: 'guardarFarmaco', component: GuardarFarmacoComponent},
  {path: 'editarFarmaco', component: EditarFarmacoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
