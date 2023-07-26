import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/Domain/Farmacia';
import { Respuesta } from 'src/app/Domain/Respuesta';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-editarFarmacia',
  templateUrl: './editarFarmacia.component.html',
  styleUrls: ['./editarFarmacia.component.css']
})
export class EditarFarmaciaComponent implements OnInit {
  farmacia : Farmacia = new Farmacia();
  constructor(private service :ServicioService, private router : Router) { }
  respuesta : Respuesta = new Respuesta();

  ngOnInit() {
      this.farmacia = JSON.parse(String(localStorage.getItem("farmacia")));
  }

  Editar(){
    console.log("Editando farmacia"+ JSON.stringify(this.farmacia));
    if(!this.farmacia.id){
      alert("El id es un campo obligatorio");
    }else if(!this.farmacia.ciudad){
      alert("Ciudad es un campo obligatorio ");
    }else if(!this.farmacia.colonia) {
      alert ("Debe ingresar la colonia de la farmacia") ;
    }else if(!this.farmacia.calle) {
      alert ("Debe ingresar la calle de la farmacia" ) ;
    }else if(!this.farmacia.numero){
      alert("Debe ingresar numero") ;
    }else{
      this.service.editarFarmacia(this.farmacia).subscribe(data => {
        this.respuesta = data;
        if(this.respuesta.flag){
          alert(this.respuesta.mensaje);
          this.router.navigate(['listarFarmacias']);
        }else{
          alert(this.respuesta.mensaje);
        }
      });
    }
  }

}