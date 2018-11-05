import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as c3 from 'c3';

declare var $:any;

@Component({
  selector: 'app-venta-anual',
  templateUrl: './venta-anual.component.html',
  styleUrls: ['./venta-anual.component.scss']
})
export class VentaAnualComponent implements OnInit, OnChanges {

  @Input() dataSource: any;
  chart: any;

  constructor() {

   }

  ngOnInit() {
    this.chart = c3.generate({
      bindto: "#chartVentaAnual",
      onrendered: () => {
        this.rebuild();
      },
      data: {
        x:'x',
        columns: [],
        types: {
          Pera: 'bar',
          Manzana: 'bar',
          Maximo: 'line',
        },
        labels: {
          format: function (v, id, i, j) { 
            if(id != 'Maximo' && id != 'Promedio') {
              return v;
            }
          }
        },
        colors: {
            Pera: 'orange',
            Manzana: 'red',
            Maximo: 'green',
            Promedio: 'black'
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
    $('#chartVentaAnual .c3-target-Maximo path.c3-line').css('stroke-width', '4');
    $('#chartVentaAnual .c3-target-Promedio path.c3-line').css('stroke-width', '4').css('fill','none');
    $('#chartVentaAnual .domain').css('fill','none').css('stroke','black');
  }

  ngOnChanges(change: SimpleChanges) {
    this.dataSource = change.dataSource.currentValue;

    if(this.chart && this.dataSource) {
      this.chart.load({
        columns: this.dataSource
      });
    }
  }

}
