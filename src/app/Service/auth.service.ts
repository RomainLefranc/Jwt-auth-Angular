import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // validation de l'identifiant et du mot de passe et récuperation du jwt
  login(payload: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/local`, payload)
      .subscribe((res) => {
        this.setSession(res);
        console.log(res);
      });
  }

  loginAccessToken(token: string) {
    let queryParams = new HttpParams().append('access_token', token);
    let url = `${environment.apiUrl}/api/auth/facebook/callback`;
    return this.http.get<any>(url, { params: queryParams }).subscribe((res) => {
      //this.setSession(res);
      console.log(res);
    });
  }

  // ajout du jwt en session (local storage)
  private setSession(authResult: { jwt: string }) {
    const decoded = jwt_decode<JwtPayload>(authResult.jwt);
    const expiresAt = moment().add(decoded.exp, 'second');
    localStorage.setItem('id_token', authResult.jwt);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}
