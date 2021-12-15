import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/helper/translation.service';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-aszf',
  templateUrl: './aszf.component.html',
  styleUrls: ['./aszf.component.scss']
})
export class AszfComponent implements OnInit {
  language: any;

  constructor(
    private translate: TranslationService,
  ) {
    this.language = this.translate.getSelectedLanguage();
   }

  ngOnInit(): void {
      this.language = this.translate.getSelectedLanguage();
  }

  downloadPdf() {
    const pdfUrl = './assets/aszf.pdf';
    const pdfName = 'aszf';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

}
