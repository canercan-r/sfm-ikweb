import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@lib-core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, ILoginRequest, User } from '../auth.type';
import { UsersTable } from '../users.table';

enum AuthAPI {
  USERS = 'users'
}

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient, private _configuration: ConfigurationService) { }

  // public methods
  login(req: ILoginRequest): Observable<any> {
    const notFoundError = new Error('Not Found');
    console.log('req', req)
    if (!req.email || !req.password) {
      return of(notFoundError);
    }
    console.log('getAllUsers', this.getAllUsers())
    return this.getAllUsers().pipe(
      map((result: User[]) => {
        console.log('result', result)
        if (result.length <= 0) {
          return notFoundError;
        }

        const user = result.find((u) => {
          return (
            u.email.toLowerCase() === req.email.toLowerCase() &&
            u.password === req.password
          );
        });

        console.log('user', user)
        if (!user) {
          return notFoundError;
        }
        const auth = new Auth();
        console.log('auth', auth)
        auth.accessToken = user.accessToken;
        auth.refreshToken = user.refreshToken;
        auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        return auth;
      })
    );
  }

  createUser(user: User): Observable<any> {
    user.userTypeID = 2; // Manager
    user.accessToken = `${Math.random()}`;
    user.refreshToken = `${Math.random()}`;
    user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    user.image = './assets/avatars/blank.png';

    return this.http.post<User>(
      this._configuration.getAppSettings().ApiPrefix + AuthAPI.USERS,
      user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((result: User[]) => {
        const user = result.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        return user !== undefined;
      })
    );
  }

  getUserByToken(token: string): Observable<User | undefined> {
    const user = UsersTable.users.find((u: User) => {
      return u.accessToken === token;
    });

    if (!user) {
      return of(undefined);
    }

    return of(user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._configuration.getAppSettings().ApiPrefix + AuthAPI.USERS);
  }
}
