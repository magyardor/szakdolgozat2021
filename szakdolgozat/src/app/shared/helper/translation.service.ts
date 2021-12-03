import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];

  constructor(
    private translate: TranslateService
  ) {
    this.translate.addLangs(['hu']);
    this.translate.setDefaultLang('hu');
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
  }

  setLanguage(lang: any) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      localStorage.setItem('language', lang);
    }
  }

  getSelectedLanguage(): any {
    return localStorage.getItem('language') || this.translate.getDefaultLang();
  }
}

export interface Locale {
  lang: string;
  data: Object;
}
