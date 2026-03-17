import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@lib-core';
import { Auth, ILoginRequest, User } from '@mock-api';
import { Observable } from 'rxjs';

enum AuthAPI {
  LOGIN = 'Login',
  CREATE = 'Create',
  FORGOT_PASSWORD = 'ForgotPassword',
  ME = 'Me',
}

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient, private _configuration: ConfigurationService) { }

  // public methods
  login(req: ILoginRequest): Observable<any> {
    return this.http.post<Auth>(
      this._configuration.getAppSettings().ApiPrefix + AuthAPI.LOGIN,
      {
        req
      });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      this._configuration.getAppSettings().ApiPrefix + AuthAPI.CREATE,
      user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(
      this._configuration.getAppSettings().ApiPrefix + AuthAPI.FORGOT_PASSWORD,
      {
        email,
      });
  }

  getUserByToken(token: string): Observable<User> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>(
      this._configuration.getAppSettings().ApiPrefix + AuthAPI.ME,
      {
        headers: httpHeaders,
      });
  }
}
