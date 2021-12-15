import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AdminService } from "../admin.service";
import { AlertService } from "../alert.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    return next.handle(request).pipe(catchError(err => {
      if([401].includes(err.status) && this.adminService.user){
        this.adminService.logout();
      }
      else if([403].includes(err.status) && this.adminService.user){
        this.alertService.error('ALERT.ERROR.ACCESS_DENIED');
      }
      else if([400, 500].includes(err.status)){
        let errorMessage;
        if(err.error instanceof ErrorEvent){
          errorMessage = `Error: ${err.error.message}`;
        }
        else {
          errorMessage = `Error code: ${err.status}\n Message: ${err.message}`;
        }
      }

      const error = err?.error?.message || err?.statusText;
      return throwError(err);
    }))
  }
}
