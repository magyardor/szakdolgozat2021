/*
Author: Maximilian Schwarzmüller
Github repo: https://github.com/PacktPublishing/Angular-and-Node.js---The-MEAN-Stack-Guide
Udemy video: https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/
*/
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AdminService } from "../admin.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AdminService,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const isAuth = this.authService.getIsAuth();
    if(!isAuth){
      this.router.navigate(['/login']);
      return false;
    }
    return isAuth;
  }

}
