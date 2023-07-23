import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Libros';

  //router = inject(Router);  -> Otra forma de instanciar router
  constructor(private router:Router){};

  Listar(){
    //Hacemos que el router navegue a 'listar' (Path especificado en app-routing.module)
    this.router.navigate(['listar']);
  }

  Guardar(){
    this.router.navigate(['guardar']);
  }
}
