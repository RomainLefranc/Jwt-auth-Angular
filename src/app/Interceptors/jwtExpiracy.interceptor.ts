import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class JwtExpiracyInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url } = request;
    return next.handle(request).pipe(
      catchError((err) => {
        // deconnexion si le jwt n'est plus valide
        if (err.status === 401 && url.startsWith(environment.apiUrl)) {
          this.authService.logout();
          location.reload();
        }
        return throwError(err);
      })
    );
  }
}
