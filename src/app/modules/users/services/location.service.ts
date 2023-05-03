import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  getStates() {
    return this.http.get<any[]>(`${environment.API_LOCATION}/estados`);
  }

  getCitiesByState(state: string) {
    return this.http.get<any[]>(`${environment.API_LOCATION}/estados/${state}/municipios`);
  }
}
