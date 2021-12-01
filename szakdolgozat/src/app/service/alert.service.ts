import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Alert, AlertType } from "../shared/alert/alert.model";

@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  timeout: any;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.keepAfterRouteChange = false;
      }
      else {
        this.clear();
      }
    });
  }

  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  clearByTime(alertId?: string) {
    this.timeout = setTimeout(() => {
      this.subject.next(new Alert({alertId}));
    }, 5000);
  }

  success(message: string, alertId?: string){
    this.alert(new Alert({message, type: AlertType.Success, alertId}));
    this.clearByTime(alertId);
  }

  error(message: string, alertId?: string){
    this.alert(new Alert({message, type: AlertType.Error, alertId}));
    this.clearByTime(alertId);
  }

  info(message: string, alertId?: string){
    this.alert(new Alert({message, type: AlertType.Info, alertId}));
    this.clearByTime(alertId);
  }

  warn(message: string, alertId?: string){
    this.alert(new Alert({message, type: AlertType.Warning, alertId}));
    this.clearByTime(alertId);
  }

  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  clear() {
    this.subject.next(undefined);
  }
}
