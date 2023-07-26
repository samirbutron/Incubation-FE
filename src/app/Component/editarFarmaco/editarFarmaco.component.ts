import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmaco } from 'src/app/Domain/Farmaco';
import { Respuesta } from 'src/app/Domain/Respuesta';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-editarFarmaco',
  templateUrl: './editarFarmaco.component.html',
  styleUrls: ['./editarFarmaco.component.css']
})
export class EditarFarmacoComponent implements OnInit {
  farmaco : Farmaco = new Farmaco();
  constructor(private service :ServicioService, private router : Router) { }
  respuesta : Respuesta = new Respuesta();

  ngOnInit() {
      this.farmaco = JSON.parse(String(localStorage.getItem("farmaco")));
  }

  Editar(){
    console.log("Editando farmaco"+ JSON.stringify(this.farmaco));
    if(!this.farmaco.id){
      alert("El id es un campo obligatorio");
    }else if(!this.farmaco.nombre){
      alert("El nombre es un campo obligatorio ");
    }else if(!this.farmaco.marca) {
      alert ("Debe ingresar la marca del farmaco") ;
    }else if(!this.farmaco.stock) {
      alert ("Debe ingresar el stock del farmaco" ) ;
    }else if(!this.farmaco.precio){
      alert("Debe ingresar precio") ;
    }else if(!this.farmaco.caducidad){
      alert("La caducidad debe ser una fecha valida ") ;
    }else{
      this.service.editarFarmaco(this.farmaco).subscribe(data => {
        this.respuesta = data;
        if(this.respuesta.flag){
          console.log("MENSAJE"+ this.respuesta);
          alert(this.respuesta.mensaje);
          this.router.navigate(['listarFarmacos']);
        }else{
          alert(this.respuesta.mensaje);
        }
      });
    }
  }

}