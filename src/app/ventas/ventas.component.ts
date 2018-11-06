import { Component, OnInit } from '@angular/core';
import { VentasService } from './ventas.service';
import * as html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'; 
import { TimerObservable } from 'rxjs/Observable/TimerObservable';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  data: any;
  counter: number;
  alive: boolean;
  
  

  constructor(private ventasService: VentasService) { 
    this.counter = 1;
	  this.alive = true;
  }

  ngOnInit(): any {

   this.ventasService.getData().subscribe(
     result => {
        this.data = result;
        this.refresh();
     }
   )

  

  }

  public captureScreen()  
  {  

   let section = document.getElementById('convertToPdf');

    html2canvas(section).then((canvas: any) => {

      let pdf: any;
      let orientation:string;    
      let width = canvas.width;
      let height = canvas.height;

      if(width>=1000 && height>=1000){
        width = width/10;
        height = height/10;
      }

      orientation = width > height ? 'landscape' : 'portrait';

      pdf = new jspdf({
        orientation: orientation,
        unit: 'mm',
        format: [width, height]
      });
     
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0) 
      pdf.addImage(contentDataURL, 'JPEG', 0, 0, width, height,{pagesplit:true});  
      pdf.save('ventas.pdf'); // Generated PDF  
    });

  }
  
  refresh() {
	  
	  TimerObservable.create(2000, 2000) // se llama al metodo estatico create que toma como parametros un "initial delay" y "period"
		.pipe( // nos permite unir varios eperadores, de esta forma permiten combinar múltiples funciones en una sola función
      takeWhile(()=> this.alive) // se llama al metodo estatico create que toma como parametros un "initial delay" y "period"
    ) 
		.subscribe(() => {
			if(this.counter > 3) this.counter = 1;
      
      this.ventasService.getData(this.counter).subscribe(
        result => {
          this.data.ventaDiaria.dataSource = result;
        }
      );

			this.counter++;
		});
  }

  /*
   * Otra forma de hacerlo
   ************************/

  /*refresh() {
    setTimeout(()=>{

      if(this.counter > 3) this.counter = 1;
      
        this.ventasService.getData(this.counter).subscribe(
          result => this.data.ventaDiaria.dataSource = result
        )
     
      this.counter++;
      this.refresh();

    }, 5000);

  }*/

}
