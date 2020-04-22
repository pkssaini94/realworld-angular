import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient
  ) { }


  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json'
    };
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  post(path: string, body: Object = {}): Observable<any> {
    const url = environment.urls.api_url + path;
    return this.http.post(url, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(
        map(resp => resp),
        catchError(this.formatErrors)
      );
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.urls.api_url}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

}
