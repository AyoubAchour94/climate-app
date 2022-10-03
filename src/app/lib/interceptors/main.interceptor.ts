import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor() {}
  //Adding appid param to every call
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloneReq = req.clone({
      params: req.params
      .set(
        "appid",
        environment.appId
      )
      .set("units", "metric"),
    })
    return next.handle(cloneReq);
  }
}
