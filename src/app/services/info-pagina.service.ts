import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
//import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;
  equipo:any[]=[];

  constructor(private http:HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
   }
   private cargarInfo(){
    //console.log('Inicio de servicio infoPagina exitoso');
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
        .subscribe((resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
        });
   }

   private cargarEquipo(){
    //console.log('Inicio de servicio infoPagina exitoso');
    //Leer el archivo JSON
    this.http.get('https://prueba--angular--sebas-default-rtdb.firebaseio.com/equipo.json')
        .subscribe((resp:any) => {
          this.equipo = resp;
          console.log(resp);
        });    
   }
}
