import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Dominio/Libro';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  //constructor(private service: ServicioService, private router: Router) {} -> Otra inicializacion de elemento service y router
  service = inject (ServicioService);
  router = inject (Router);
  libros : Libro[] = [];

  //En cada inicializacion de este componente ejecutamos...
  ngOnInit() {
    this.service.listar().subscribe(data=> {
      console.log("Datos Recibidos", data);
      if(data.obj.length === 0){
        alert("No existen libros en el registro")
      }else{
        this.libros = data.obj;
      }
    });
  }

  Editar(libro:Libro){
    console.log("Funcion Editar() ejecutandose");
    localStorage.setItem("libro", JSON.stringify(libro));
    this.router.navigate(['editar']);
  }

  Eliminar(libro:Libro){
    console.log("Funcion Eliminar() ejecutandose");
    localStorage.setItem("libro", JSON.stringify(libro));
    this.router.navigate(['eliminar']);
  }
}
