import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as c3 from 'c3';

declare var $:any;

@Component({
  selector: 'app-venta-mensual',
  templateUrl: './venta-mensual.component.html',
  styleUrls: ['./venta-mensual.component.scss']
})
export class VentaMensualComponent implements OnInit, OnChanges {

  @Input() dataSource: any;
  chart: any;

  constructor() {

   }

  ngOnInit() {
    this.chart = c3.generate({
      bindto: "#chartVentaMensual",
      onrendered: () => { 
        this.changeCategories();
        this.rebuild();
      },
      data: {
        x:'x',
        columns: [],
        type: 'bar',
        labels: false,
        colors: {
            Pera: 'orange',
            Manzana: 'red'
        }
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
      },
      axis: {
          x: {
              type: 'category',
              height: 60
          },
          y: {
            tick: {
              format: (d:any) => {
                return '$' + d;
              }
            }
          }
      },
      grid: {
        y: {
          show: true
        }
      }
    });
  }

  rebuild() {
    $('#chartVentaMensual .domain').css('fill','none').css('stroke','black');
  }

  ngOnChanges(change: SimpleChanges) {
    this.dataSource = change.dataSource.currentValue;

    if(this.chart && this.dataSource) {
      this.chart.load({
        columns: this.dataSource
      });
    }
  }

  changeCategories() {
    let $ticks: any;
    let ticksData:any;
    let groupedData:any = [];

    $ticks = $(`#chartVentaMensual .c3-axis.c3-axis-x`).find('.tick'); // obtengo todas las ticks del eje "x"

    ticksData = $ticks.map((index:any, element:any) => { // recorro el arreglo de elementos, los cuales voy manipular para obtener un arreglo personalizado
      let result = element.textContent.split('-');

      return {
        text: element.textContent,
        element: element,
        groupLevel1: result[0],
        groupLevel2: result[1],
      };
    }).get();
    
    ticksData.forEach((element:any) => { // agrupo los datos

      if(!groupedData[element.groupLevel2]) {  
        groupedData[element.groupLevel2] = []; 
      }
    
      groupedData[element.groupLevel2].push(element);
    });
 
    for (let key in groupedData) { // itero sobre groupLevel2

      if(key === 'undefined') return; // si se indefine salgo
      
      let groupLevel2 = groupedData[key];

      if (groupLevel2.length < 2) return;
  
      let addOn = Math.ceil(groupLevel2.length / 2); // para conocer la mitad
      let translates:any = [];
      let index = 0;

      for(let k1 in groupLevel2) { // itero sobre groupLevel1
        let tick = groupLevel2[k1]; // serian groupLevel1
        let $tick = $(tick.element);

        let val = $tick.attr('transform').replace(/[translate,(),]/g, '').split(' ')[0];
    
        translates.push(Number(val));
          
        $tick.find('tspan:eq(0)').text(tick.groupLevel1);
        $tick.find('tspan:not(:eq(0))').remove();
  
        if (index == addOn) { // si estoy en la mitad entonces procedo a insertar un nuevo tick
          let cloned = $tick.clone();

          let pos = (translates[index] + translates[index - 1]) / 2;
          cloned.attr('transform', 'translate(' + pos + ',20)');
            
          cloned.find('tspan').text(tick.groupLevel2);
          cloned.insertAfter($tick);
          $(cloned).find('line').remove();
        }

        index++;
      }

    };
  }


}
