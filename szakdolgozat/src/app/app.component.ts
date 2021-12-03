import { Component, OnInit } from '@angular/core';
import { AdminService } from './service/admin.service';
import { TranslationService } from './shared/helper/translation.service';
import { locale as enLang } from './shared/helper/languages/en';
import { locale as huLang } from './shared/helper/languages/hu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'szakdolgozat';

  constructor(
    private service: AdminService,
    private translationService: TranslationService
  ){
    this.translationService.loadTranslations(huLang, enLang);
  }

  ngOnInit() {
    this.service.autoAuthUser();
  }
}
