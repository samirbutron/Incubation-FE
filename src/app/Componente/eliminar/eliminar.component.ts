import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/Dominio/Libro';
import { Respuesta } from 'src/app/Dominio/Respuesta';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  constructor(private service: ServicioService, private router: Router) {}
  libro : Libro = new Libro();
  respuesta : Respuesta=new Respuesta();

  ngOnInit() {
    this.libro = JSON.parse(String(localStorage.getItem("libro")));
    };
  
  Eliminar() {
    if (confirm('¿Está seguro que desea eliminar el registro?')){
      this.service.eliminar(this.libro).subscribe(data => {
        this.respuesta = data;
        alert(this.respuesta.mensaje);
        this.router.navigate(['listar']);
      });
    }
  }
}
