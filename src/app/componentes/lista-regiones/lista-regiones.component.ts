import { Component, OnInit } from '@angular/core';
import { DatosRegionalesService } from 'src/app/servicios/datos-regionales.service';



@Component({
  selector: 'app-lista-regiones',
  templateUrl: './lista-regiones.component.html',
  styleUrls: ['./lista-regiones.component.scss'],
})
export class ListaRegionesComponent  implements OnInit {
  regiones:any[]=[]

  constructor( private datosRegionalesService: DatosRegionalesService) { }


  ngOnInit() {
    
  }

  obtenerRegiones(){
    this.datosRegionalesService.obtenerRegiones().subscribe(
      (data)=>{
        this.regiones = data.data;
      },
      (error)=>{
        console.error('Error no se pueden obtener las regiones: ', error);

      }
    );

  }
}
