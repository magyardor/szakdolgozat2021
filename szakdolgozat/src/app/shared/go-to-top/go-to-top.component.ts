import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.scss']
})
export class GoToTopComponent implements OnInit {
  isShow: boolean = false;
  topPosToStartShowing = 100;

  constructor() { }

  ngOnInit(): void {
    const content = document.querySelector('.body');
    content?.addEventListener('scroll', () => {
      const scrollPosition =
        window.pageYOffset ||
        content.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollPosition >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
  }

  gotoTop() {
    const content = document.querySelector('.body');
    setTimeout(() => {
      content?.scrollTo({top: 0, behavior: 'smooth'});
    }, 200);
  }

}
