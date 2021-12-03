import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminService } from "../admin.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AdminService
  ) {}

  intercept<T>(request: HttpRequest<T>, next: HttpHandler):  Observable<HttpEvent<T>> {
    const authToken = this.authService.getToken();
    const authRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });
    return next.handle(authRequest);
  }


}
