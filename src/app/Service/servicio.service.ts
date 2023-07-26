import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Farmacia } from '../Domain/Farmacia';
import { Respuesta } from '../Domain/Respuesta';
import { Farmaco } from '../Domain/Farmaco';
import { Peticion } from '../Domain/Peticion';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  http = inject(HttpClient);
  //Farmacia
  url_listarFarmacia = 'http://localhost:8010/farmacia/listar';
  url_guardarFarmacia = 'http://localhost:8010/farmacia/guardar';
  url_eliminarFarmacia = 'http://localhost:8010/farmacia/eliminar';
  url_editarFarmacia = 'http://localhost:8010/farmacia/editar';
  url_buscarFarmacia = 'http://localhost:8010/farmacia/buscar';
  //Farmaco
  url_listarFarmaco = 'http://localhost:8010/farmaco/listar';
  url_guardarFarmaco = 'http://localhost:8010/farmaco/guardar';
  url_eliminarFarmaco = 'http://localhost:8010/farmaco/eliminar';
  url_editarFarmaco = 'http://localhost:8010/farmaco/editar';
  url_buscarFarmaco = 'http://localhost:8010/farmaco/buscar';
  //Relaciones
  url_relacionar = 'http://localhost:8010/farmaco/relacionar';
  url_desrelacionar = 'http://localhost:8010/farmaco/desrelacionar';

  listarFarmacia() {
    return this.http.get<Respuesta>(this.url_listarFarmacia);
  }

  guardarFarmacia(farmacia:Farmacia) {
    return this.http.post<Respuesta>(this.url_guardarFarmacia, farmacia);
  }

  editarFarmacia(farmacia:Farmacia) {
    return this.http.post<Respuesta>(this.url_editarFarmacia, farmacia);
  }

  eliminarFarmacia(farmacia:Farmacia) {
    return this.http.post<Respuesta>(this.url_eliminarFarmacia, farmacia);
  }
  
  buscarFarmacia(farmacia:Farmacia) {
    return this.http.post<Respuesta>(this.url_buscarFarmacia, farmacia);
  }

  listarFarmaco() {
    return this.http.get<Respuesta>(this.url_listarFarmaco);
  }

  guardarFarmaco(farmaco:Farmaco) {
    return this.http.post<Respuesta>(this.url_guardarFarmaco, farmaco);
  }

  editarFarmaco(farmaco:Farmaco) {
    return this.http.post<Respuesta>(this.url_editarFarmaco, farmaco);
  }

  eliminarFarmaco(farmaco:Farmaco) {
    return this.http.post<Respuesta>(this.url_eliminarFarmaco, farmaco);
  }
  
  buscarFarmaco(farmaco:Farmaco) {
    return this.http.post<Respuesta>(this.url_buscarFarmaco, farmaco);
  }

  relacionar(peticion:Peticion) {
    return this.http.post<Respuesta>(this.url_relacionar, peticion);
  }

  desrelacionar(peticion:Peticion) {
    return this.http.post<Respuesta>(this.url_desrelacionar, peticion);
  }

  private farmacosSubject = new BehaviorSubject<Farmaco[]>([]);
  public farmacos$ = this.farmacosSubject.asObservable();
  setFarmacos(farmacos: Farmaco[]) {
    this.farmacosSubject.next(farmacos);
  }
}
