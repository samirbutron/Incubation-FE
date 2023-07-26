import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/Domain/Farmacia';
import { Farmaco } from 'src/app/Domain/Farmaco';
import { ServicioService } from 'src/app/Service/servicio.service';

@Component({
  selector: 'app-listarFarmaco',
  templateUrl: './listarFarmaco.component.html',
  styleUrls: ['./listarFarmaco.component.css']
})
export class ListarFarmacoComponent implements OnInit {
  farmacias !: Farmacia[];
  farmacos !: Farmaco[];
  marcaBuscada: string = '';
  farmacosCompletos: Farmaco[] = [];
  constructor(private service : ServicioService, private router : Router ) { }

  ngOnInit() {
    this.service.listarFarmaco().subscribe(data=> {
      console.log("Datos Recibidos", data);
      if(data.obj.length === 0){
        alert("No existen farmacos en el registro")
      }else{
        this.farmacos = data.obj;
        this.farmacosCompletos = data.obj;
      }
    });
  }

  Editar(farmaco:Farmaco){
    console.log("Funcion Editar() en farmaco ejecutandose");
    localStorage.setItem("farmaco", JSON.stringify(farmaco));
    this.router.navigate(['editarFarmaco']);
  }

  Eliminar(farmaco:Farmaco){
    console.log("Funcion Eliminar() en farmaco ejecutandose");
    if (confirm('¿Está seguro que desea eliminar el registro?')){
      this.service.eliminarFarmaco(farmaco).subscribe(data => {
        let respuesta = data;
        alert(respuesta.mensaje);
        this.router.navigate(['listarFarmacos']);
      });
    }
  }

  ListarFarmacias(farmacia:Farmacia[]){
    console.log("Funcion ListarFarmacia() en farmaco ejecutandose");
    this.farmacias = farmacia;
    console.log('Lista de Farmacias:',this.farmacias)
  }

  buscarMarca() {
    console.log("Funcion buscarMarca() ejecutandose");
    if (!this.marcaBuscada) {
      // Si no se ha ingresado ninguna marca, mostrar todos los farmacos
      this.farmacos = this.farmacosCompletos
    } else {
      // Utilizamos la función filter() para obtener una lista de farmacos que coincidan con la marca buscada
      this.farmacos = this.farmacosCompletos.filter(f => f.marca.includes(this.marcaBuscada));
    }
  }

  stockBajo(){
    console.log("Funcion stockBajo() ejecutandose");
    this.farmacos = this.farmacosCompletos.filter(f => f.stock <= 30);
  }

  productoMasCaro() {
    console.log("Funcion productoMasCaro() ejecutandose");
    let farmacoMasCaro = this.farmacosCompletos.reduce((maxFarmaco, currentFarmaco) => {
      return currentFarmaco.precio > maxFarmaco.precio ? currentFarmaco : maxFarmaco;
    });
    this.farmacos = [farmacoMasCaro];
  }


  porCaducar(){
    console.log("Funcion porCaducar() ejecutandose");
  const fechaActual = new Date();
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaActual.getDate() + 60); // 60 dias/ 2 meses aprox

  this.farmacos = this.farmacosCompletos.filter(f => {
    const fechaCaducidad = new Date(f.caducidad);
    return fechaCaducidad >= fechaActual && fechaCaducidad <= fechaLimite;
  });
  }

  cancelarFiltro(){
    console.log("Funcion cancelarFiltro() ejecutandose");
    this.farmacos = this.farmacosCompletos
  }
}
