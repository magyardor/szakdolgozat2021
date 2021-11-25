import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../helper/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          'max-height': '500px',
          opacity: '1',
          visibility: 'visible',
        })
      ),
      state(
        'out',
        style({
          'max-height': '0px',
          opacity: '0',
          visibility: 'hidden',
        })
      ),
      transition('in => out', [
        group([
          animate(
            '200ms ease-in-out',
            style({
              opacity: '0',
            })
          ),
          animate(
            '300ms ease-in-out',
            style({
              'max-height': '0px',
            })
          ),
          animate(
            '700ms ease-in-out',
            style({
              visibility: 'hidden',
            })
          ),
        ]),
      ]),
      transition('out => in', [
        group([
          animate(
            '1ms ease-in-out',
            style({
              visibility: 'visible',
            })
          ),
          animate(
            '200ms ease-in-out',
            style({
              opacity: '1',
            })
          ),
          animate(
            '300ms ease-in-out',
            style({
              'max-height': '500px',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class LanguageSelectorComponent implements OnInit {
  animationState = 'out';
  language!: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      displayName: 'EN',
      flag: './assets/media/flags/012-uk.svg',
    },
    {
      lang: 'hu',
      name: 'Magyar',
      displayName: 'HU',
      flag: './assets/media/flags/hu_lang.svg',
    },
  ];
  constructor(
    private translationService: TranslationService,
    private router: Router
  ) {
    this.setSelectedLanguage();
   }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  setLanguage(lang: any) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

}

interface LanguageFlag {
  lang: string;
  name: string;
  displayName?: string;
  flag: string;
  active?: boolean;
}
