import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Dominio/Libro';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.component.html',
  styleUrls: ['./guardar.component.css']
})
export class GuardarComponent implements OnInit {
  constructor(private service: ServicioService, private router: Router) {}
  libro : Libro = new Libro();

  ngOnInit() {
  }

  Guardar(){
    console.log("Guardando libro"+ JSON.stringify(this.libro));
    if(!this.libro.folio){
      alert("El folio es un campo obligatorio");
    }else if(!this.libro.titulo){
      alert("El titulo es un campo obligatorio ");
    }else if(!this.libro.autor) {
      alert ("Debe ingresar el autor del libro") ;
    }else if(!this.libro.editorial) {
      alert ("Debe ingresar la editorial del libro" ) ;
    }else if(!this.libro.genero){
      alert("Debe ingresar genero") ;
    }else if(!this.libro.precio) {
      alert ( "Ingrese precio de venta") ;
    }else if(!this.libro.paginas){
      alert("Debe indicar las paginas ") ;
    }else{
      this.service.guardar(this.libro).subscribe(data => {
        let respuesta = data;
        if(respuesta.valor === 1){ //Segun API, 1 es exitoso
          alert(respuesta.mensaje);
          this.router.navigate(['listar']);
        }else{
          alert(respuesta.mensaje);
        }
      });
    }
  }
}
