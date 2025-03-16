import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoSchema } from '../models/UserInfoSchema';
import { IUser } from '../models/IUser';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService:AuthService
    
  ) {}

  setCookie(title: string, token: string): void {
    this.cookieService.set(title, token);
  }

  getCookie(title: string): string {
    return this.cookieService.get(title);
  }

  signUp(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.error?.message || 'sign up failed. Please try again.'
            )
        );
      })
    );
  }

  login(user: IUser): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/user/login`, user).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              error.error.message || 'Login failed ! Please try again later.'
            )
        );
      })
    );
  }

  // getRefreshToken(): Observable<any> {
  //   const token = this.getCookie('accessToken');
  //   console.log(token);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get(`${this.baseUrl}/user/refresh`, { headers }).pipe(
  //     catchError((error) => {
  //       return throwError(
  //         () =>
  //           new Error(
  //             error.error.message ||
  //               'Refreshing your session token failed ! Please login again.'
  //           )
  //       );
  //     })
  //   );
  // }

  logout(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/logout`, user).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.error?.message || 'Logout failed ! Please try again later.'
            )
        );
      })
    );
  }

  addUserInfo(userInfo: UserInfoSchema): Observable<any> {
    const token = this.authService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(`${this.baseUrl}/user/info`, userInfo, { headers })
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                error?.message ||
                  'Adding your information failed ! Please try again.'
              )
          );
        })
      );
  }
}
