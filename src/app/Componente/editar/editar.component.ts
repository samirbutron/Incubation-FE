import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Dominio/Libro';
import { Respuesta } from 'src/app/Dominio/Respuesta';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  constructor(private service: ServicioService, private router: Router) {}
  libro : Libro = new Libro();
  respuesta : Respuesta = new Respuesta();

  ngOnInit() {
      this.libro = JSON.parse(String(localStorage.getItem("libro")));
  }

  Editar(){
    console.log("Editando libro"+ JSON.stringify(this.libro));
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
      this.service.editar(this.libro).subscribe(data => {
        if(this.respuesta.valor === 1){ //Segun API, 1 es exitoso
          alert(this.respuesta.mensaje);
          this.router.navigate(['listar']);
        }else{
          alert(this.respuesta.mensaje);
        }
      });
    }
  }
}
