import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.scss']
})
export class GoToTopComponent {
  isShow: boolean = false;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPos = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scrollPos >= this.topPosToStartShowing){
      this.isShow = true;
    }
    else{
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  }

}
