import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  setAuth(user: User) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type: string, credentials): Observable<User> {

    const login = type === 'login' ? '/login' : '';
    const url = '/users' + login;

    return this.apiService.post(url, { user: credentials }).pipe(
      map(resp => {
        this.setAuth(resp.data);
        return resp;
      }),

      catchError(error => 
        throwError(error))
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
