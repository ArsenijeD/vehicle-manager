import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VehicleManagerService {

  private vehicleAddress = 'http://192.168.4.22'
  
  constructor(private http: HttpClient) { }

  sendPowerToEngines(leftEngine: number, rightEngine: number): Observable<any> {
    return this.http.get(
      `${this.vehicleAddress}/dm`,
      {
        params: {
          lm: leftEngine,
          rm: rightEngine
        }
      }
    )
  }
}
