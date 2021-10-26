import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { UserData } from "../models/admin.model";
import { AlertService } from "./alert.service";

@Injectable({providedIn: 'root'})
export class AdminService {
  private token!: string;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private _userSubject: BehaviorSubject<UserData>

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ){
    const local = localStorage.getItem('user');
    this._userSubject = new BehaviorSubject<UserData>(local? JSON.parse(local): null);
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  get user(): UserData {
    return this._userSubject.value;
  }

  async addUser(email: string, password: string){
    const authData: UserData = {email: email, password: password};
    return await this.http.post("http://localhost:3000/api/auth/adduser",authData).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
      this.alert.error(error)
    });
  }

  logIn(email: string, password: string){
    const authData: UserData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/auth/login", authData)
    .subscribe(res => {
      const tokens = res.token;
      this.token = tokens;
      if(tokens){
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(tokens, expirationDate);
        this.router.navigate(["/admin/products-list"]);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/admin/login"]);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
