import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Libro } from '../Dominio/Libro';
import { Respuesta } from '../Dominio/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  http = inject(HttpClient);
  url_listar = 'http://localhost:9001/libros/listar';
  url_guardar = 'http://localhost:9001/libros/guardar';
  url_eliminar = 'http://localhost:9001/libros/eliminar';
  url_editar = 'http://localhost:9001/libros/editar';
  url_buscar = 'http://localhost:9001/libros/buscar';

  listar() {
    return this.http.get<Respuesta>(this.url_listar);
  }

  guardar(libro:Libro) {
    return this.http.post<Respuesta>(this.url_guardar, libro);
  }

  editar(libro:Libro) {
    return this.http.post<Respuesta>(this.url_editar, libro);
  }

  eliminar(libro:Libro) {
    return this.http.post<Respuesta>(this.url_eliminar, libro);
  }
  
  buscar(libro:Libro) {
    return this.http.post<Respuesta>(this.url_buscar, libro);
  }
  constructor() { }
}
