import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/Domain/Farmacia';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-guardarFarmacia',
  templateUrl: './guardarFarmacia.component.html',
  styleUrls: ['./guardarFarmacia.component.css']
})
export class GuardarFarmaciaComponent implements OnInit {

  constructor(private service: ServicioService, private router: Router) {}
  farmacia : Farmacia = new Farmacia();

  ngOnInit() {
  }

  Guardar(){
    console.log("Guardando farmacia"+ JSON.stringify(this.farmacia));
    if(!this.farmacia.id){
      alert("El Id es un campo obligatorio");
    }else if(!this.farmacia.ciudad){
      alert("La ciudad es un campo obligatorio ");
    }else if(!this.farmacia.colonia) {
      alert ("La colonia es un campo obligatorio") ;
    }else if(!this.farmacia.calle) {
      alert ("El numero es un campo obligatorio" ) ;
    }else if(!this.farmacia.numero){
      alert("El numero es un campo obligatorio") ;
    }else{
      this.service.guardarFarmacia(this.farmacia).subscribe(data => {
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
}
