import { Component, OnInit } from '@angular/core';
import { VentasService } from './ventas.service';
import * as html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'; 


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  data: any;

  constructor(private ventasService: VentasService) { }

  ngOnInit(): any {

   this.ventasService.getData().subscribe(
     result => {
       this.data = result;
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

}
