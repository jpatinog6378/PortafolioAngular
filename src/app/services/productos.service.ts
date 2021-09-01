import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando =true;
  productos: Producto[]=[];
  productosFiltrado: Producto[]=[];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise((resolve, reject) =>{
      this.http.get('https://prueba--angular--sebas-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        
        console.log(resp);
        this.productos = resp;
        this.cargando = false;
        
      });

    });


  }

  getProducto(id:string){
    return this.http.get(`https://prueba--angular--sebas-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){

    if (this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //se ejecuta despues de tener los productos
        //aplica los filtros
        this.filtrarProductos(termino);
      });

    }else{
      //aplicar el filtro
      this.filtrarProductos(termino);

    }
    this.productosFiltrado = this.productos.filter(producto => {
      return true;
    });

    console.log(this.productosFiltrado);
  }
  private filtrarProductos(termino:string){
    console.log(this.productos);
    // this.productos.forEach(prod  =>{
    //   if (this.prod.categoria.indexOf( termino )>= 0){
    //     this.productosFiltrado.push(prod);
    //   }
    // });
  }

}
