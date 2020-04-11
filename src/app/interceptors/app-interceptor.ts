import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const reqClone = req.clone({
      url: environment.apiUrl + '/' + req.url,
    });

    // send cloned request with header to the next handler.
    return next.handle(reqClone);
  }
}
