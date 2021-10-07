import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss']
})
export class CustomIconComponent {
  @Input() name!: CustomIcon;
  @Input() width: number = 50;
  @Input() color: string = 'currentColor';
  @Input() wrapperClasses: string = '';
  @Input() rotate = 0;
  @Input() transition: string = 'all 0s ease 0s';
  @Input() tooltip: string = '';

}

export enum CustomIcon {
  'check-circled' = 'check-circled',
  'cross' = 'cross',
  'info' = 'info',
  'warning' = 'warning',
  'edit' = 'edit',
  'delete' = 'delete',
  'home' = 'home',
  'logout' = 'logout',
  'add' = 'add',
  'list' = 'list',
  'menu' = 'menu',
}
