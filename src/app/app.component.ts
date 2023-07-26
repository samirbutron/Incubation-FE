import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './Service/servicio.service';
import { Peticion } from './Domain/Peticion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Farmacias-Farmacos';

  constructor(private router:Router, private service: ServicioService){};

  listarFarmacos(){
    this.router.navigate(['listarFarmacos']);
  }

  listarFarmacias(){
    this.router.navigate(['listarFarmacias']);
  }

  guardarFarmaco(){
    this.router.navigate(['guardarFarmaco']);
  }
  guardarFarmacia(){
    this.router.navigate(['guardarFarmacia']);
  }

  peticion = new Peticion();
  relacionar(){
    console.log(this.peticion);
    this.service.relacionar(this.peticion).subscribe(data => {
      let respuesta = data;
      if(respuesta.flag){
        alert(respuesta.mensaje);
        this.router.navigate(['listarFarmacias']);
      }else{
        alert(respuesta.mensaje);
      }
    });
  }

  desrelacionar(){
    console.log(this.peticion);
    this.service.desrelacionar(this.peticion).subscribe(data => {
      let respuesta = data;
      if(respuesta.flag){
        alert(respuesta.mensaje);
        this.router.navigate(['listarFarmacias']);
      }else{
        alert(respuesta.mensaje);
      }
    });
  }
}
