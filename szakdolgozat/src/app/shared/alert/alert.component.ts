import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { Alert, AlertType } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('visible', [
      state(
        'open',
        style({
          right: '-450px'
        })
      ),
      state(
        'close',
        style({
          right: '0px'
        })
      ),
      transition('open => close', [animate('200ms ease-in-out')]),
      transition('close => open', [animate('400ms ease-in-out')]),
    ]),
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  visible = false;
  alerts: Alert[] = [];
  subscription: Subscription = new Subscription();
  type: number = -1;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.subscription = this.alertService.onAlert(this.id).subscribe(alert => {
      if(!alert.message){
        this.alerts.shift();
        if(!this.alerts.length) this.visible = false;
        return;
      }
      this.visible = true;
      this.alerts.push(alert);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if(!alert){
      return null;
    }
    switch(alert.type){
      case AlertType.Success:
        this.type = 0;
        return 'alert alert-success w-100'
      case AlertType.Error:
        this.type = 1;
        return 'alert alert-danger w-100'
      case AlertType.Warning:
        this.type = 2;
        return 'alert alert-warning w-100'
      case AlertType.Info:
        this.type = 3;
        return 'alert alert-info w-100'
    }
  }

}
