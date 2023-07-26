import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/Domain/Farmacia';
import { Farmaco } from 'src/app/Domain/Farmaco';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-listarFarmacia',
  templateUrl: './listarFarmacia.component.html',
  styleUrls: ['./listarFarmacia.component.css']
})
export class ListarFarmaciaComponent implements OnInit {
  farmacias !: Farmacia[];
  farmacosFarmacia: Farmaco[] = []; //variable que almacena los farmacos de una farmacia
  constructor(private service : ServicioService, private router : Router ) { }

  ngOnInit() {
    this.service.listarFarmacia().subscribe(data=> {
      console.log("Datos Recibidos", data);
      if(data.obj.length === 0){
        alert("No existen farmacias en el registro")
      }else{
        this.farmacias = data.obj;
      }
    });
  }

  Editar(farmacia:Farmacia){
    console.log("Funcion Editar() en farmacia ejecutandose");
    localStorage.setItem("farmacia", JSON.stringify(farmacia));
    this.router.navigate(['editarFarmacia']);
  }

  Eliminar(farmacia:Farmacia){
    console.log("Funcion Eliminar() en farmacia ejecutandose");
    if (confirm('¿Está seguro que desea eliminar el registro?')){
      this.service.eliminarFarmacia(farmacia).subscribe(data => {
        let respuesta = data;
        alert(respuesta.mensaje);
        this.router.navigate(['listarFarmacias']);
      });
    }
  }

  ListarFarmacos(farmacos:Farmaco[]){
    console.log("Funcion ListarFarmaco() en farmacia ejecutandose");
    this.farmacosFarmacia = farmacos;
    console.log('Lista de Farmacos:',this.farmacosFarmacia)
  }

  Ganancia(farmacos:Farmaco[]){
    console.log("Funcion Ganancia() en farmacia ejecutandose");
    let suma = 0;
    farmacos.forEach(f => {
      suma += f.stock * f.precio;
    });
    return suma;
  }
}
