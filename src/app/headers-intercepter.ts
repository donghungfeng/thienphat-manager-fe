import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    var header = 'Bearer ' + token;
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

    return next.handle(request);
  }
}
