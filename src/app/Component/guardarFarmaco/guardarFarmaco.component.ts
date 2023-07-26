import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmaco } from 'src/app/Domain/Farmaco';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-guardarFarmaco',
  templateUrl: './guardarFarmaco.component.html',
  styleUrls: ['./guardarFarmaco.component.css']
})
export class GuardarFarmacoComponent implements OnInit {
  constructor(private service: ServicioService, private router: Router) {}
  farmaco : Farmaco = new Farmaco();

  ngOnInit() {
  }

  Guardar(){
    console.log("Guardando farmaco"+ JSON.stringify(this.farmaco));
    if(!this.farmaco.id){
      alert("El Id es un campo obligatorio");
    }else if(!this.farmaco.nombre){
      alert("La ciudad es un campo obligatorio ");
    }else if(!this.farmaco.marca) {
      alert ("La colonia es un campo obligatorio");
    }else if(!this.farmaco.stock) {
      alert ("El numero es un campo obligatorio" );
    }else if(!this.farmaco.precio){
      alert("El numero es un campo obligatorio");
    }else if(!this.farmaco.caducidad){
      alert("La caducidad es un campo obligatorio");
    }
    else{
      this.service.guardarFarmaco(this.farmaco).subscribe(data => {
        let respuesta = data;
        if(respuesta.flag){
          alert(respuesta.mensaje);
          this.router.navigate(['listarFarmacos']);
        }else{
          alert(respuesta.mensaje);
        }
      });
    }
  }

}
