import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinuxApp } from '../data/dto/linux-app';

@Injectable({
  providedIn: 'root'
})
export class LinuxAppService {

  constructor(
    private http: HttpClient
  ) { }

  getApps(): Observable<LinuxApp[]> {
    return this.http.get<LinuxApp[]>(`http://localhost:5000/api/apps?type=2`);
  }

  getRecentlyAdded(limit: number): Observable<LinuxApp[]> {
    return this.http.get<LinuxApp[]>(`https://linuxappstore.io/api/recentlyAdded?limit=${limit}`);
  }

  getRecentlyUpdated(limit: number): Observable<LinuxApp[]> {
    return this.http.get<LinuxApp[]>(`https://linuxappstore.io/api/recentlyUpdated?limit=${limit}`);
  }

}
