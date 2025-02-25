import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  // getUserWatchList(userId: string): Observable<any> {
    // return this.http.get(`http://localhost:3000/users/${userId}/watchList`);
  // }
  // signUp(user: any): Observable<any> {
  //   return this.http.post('http://localhost:3000/users/signUp', user).pipe(
  //     catchError((error) => {
  //       return throwError(
  //         () =>
  //           new Error(error.error?.msg || 'sign up failed. Please try again.')
  //       );
  //     })
  //   );
  // }
  // login(user: any): Observable<any> {
  //   return this.http.post('http://localhost:3000/users/login', user).pipe(
  //     catchError((error) => {
  //       return throwError(
  //         () => new Error(error.error?.msg || 'Login failed. Please try again.')
  //       );
  //     })
  //   );
  // }
  // isAuthonticated(): Observable<boolean> {
  //   const token = this.getCookie();
  //   if (!token) {
  //     return of(false);
  //   }
  //   return this.http
  //     .post<{ valid: boolean }>('http://localhost:3000/users/isAuthenticated', {
  //       token,
  //     })
  //     .pipe(
  //       map((response) => response.valid),
  //       catchError(() => of(false))
  //     );
  // }
  // logout(): Observable<any> {
  //   return this.http.get('http://localhost:3000/users/logout');
  // }

  // setCookie(token: string): void {
  //   this.cookieService.set('jwt', token);
  // }
  // getCookie(): string {
  //   return this.cookieService.get('jwt');
  // }
}
