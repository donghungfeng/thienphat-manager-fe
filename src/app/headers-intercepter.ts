import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    var header = "Bearer " + token;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: header,
          "Accept-Language": "vi",
          // "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: header,
            "Accept-Language": "vi",
            // "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(["/login"]);
        }
        return throwError(() => err);
      })
    );
  }
}
