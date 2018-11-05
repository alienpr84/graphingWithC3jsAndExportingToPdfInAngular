import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as c3 from 'c3';
declare var $:any;

@Component({
  selector: 'app-venta-diaria',
  templateUrl: './venta-diaria.component.html',
  styleUrls: ['./venta-diaria.component.scss']
})
export class VentaDiariaComponent implements OnInit, OnChanges {

  @Input() dataSource: any;
  chart: any;

  constructor() {

   }

  ngOnInit() {
    this.chart = c3.generate({
      bindto: "#chartVentaDiaria",
      onrendered: () => {
        this.rebuild();
      },
      data: {
        x:'x',
        columns: [],
        type: 'bar',
        labels: true,
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
    $('#chartVentaDiaria .domain').css('fill','none').css('stroke','black');
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
