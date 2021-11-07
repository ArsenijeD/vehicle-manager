import { Component } from '@angular/core'
import { CompactType, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2'
import { JoystickEvent } from 'ngx-joystick'
import { JoystickManagerOptions } from 'nipplejs'
import { VehicleManagerService } from './vehicle-manager.service'

//TODO: Find better way of handling this
declare var require: any;
const diffSteer = require('diff-steer')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: GridsterConfig
  dashboard: Array<GridsterItem>

  joystickOptions: JoystickManagerOptions

  leftEnginePower = 0
  rightEnginePower = 0

  leftEngineLabel = 'Left engine power'
  rightEngineLabel = 'Right engine power'

  speedUpIndicator = ''

  constructor(private vehicleManagerService: VehicleManagerService) {}

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: CompactType.None,
      draggable: {
        enabled: true,
        delayStart: 70 //for better user experience on touch screen
      },
      swap: true
    }

    this.dashboard = [
      {cols: 1, rows: 1, y: 0, x: 0},
      {cols: 1, rows: 1, y: 0, x: 1}
    ]

    this.joystickOptions = {
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'blue',
      size: 300
    }
  }

  resetGaugePower(): void {
    [this.leftEnginePower, this.rightEnginePower] = [0, 0]
  }

  onMoveEngines(event: JoystickEvent): void {
    [this.leftEnginePower, this. rightEnginePower] = diffSteer(event.data.vector.x, -event.data.vector.y)
    if (this.leftEnginePower > 125 || this.rightEnginePower > 125) {
      this.sendPowerToEngines(this.leftEnginePower, this.rightEnginePower)
    }
  }

  onStopEngines(): void {
    this.sendPowerToEngines(0, 0)
    this.resetGaugePower()
  }

  sendPowerToEngines(leftEnginePower: number, rightEnginePower: number): void {
    this.vehicleManagerService.sendPowerToEngines(leftEnginePower, rightEnginePower).subscribe({
      next: () => { 
        console.log('Success');
      },
      error: () => { 
        console.log('Error')
      }
    })
  }
}
