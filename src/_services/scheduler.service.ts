import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class SchedulerService {
  constructor(private http: HttpClient) { }

  FCFS(list: any[]): Observable<any>  {
    const headers = new HttpHeaders({'Content-Type': 'application/json' });
    const body = {
      list,
      type : 'FCFS'
    };
    // tslint:disable-next-line:max-line-length
    return this.http.post(`http://localhost:8000/scheduler/`, JSON.stringify(body), { headers: headers}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  SJF(list: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    const body = {
      list,
      type : 'SJF'
    };

    // tslint:disable-next-line:max-line-length
    return this.http.post(`http://localhost:8000/scheduler/`, JSON.stringify(body), { headers: headers }).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
