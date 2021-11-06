import { Component } from '@angular/core';
import { CompactType, GridsterConfig, GridsterItem, GridType } from 'ngx-gridster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: GridsterConfig
  dashboard: Array<GridsterItem>

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: CompactType.None,
      draggable: {
        enabled: true,
        delayStart: 70 //for better user experience on touch screen
      },
      swap: true
    };

    this.dashboard = [
      {cols: 1, rows: 1, y: 0, x: 0},
      {cols: 1, rows: 1, y: 1, x: 0},
      {cols: 1, rows: 1, y: 0, x: 1},
      {cols: 1, rows: 1, y: 1, x: 1}
    ];
  }
}
