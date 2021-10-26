import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { AlertService } from 'src/app/service/alert.service';
import { NewsService } from 'src/app/service/news/news.service';
import { mimeType } from 'src/app/service/validators/mime-type.validator';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  news!: News;
  isLoading = false;
  form!: FormGroup;
  imagePreview!: string;
  private mode = "create";
  private newsId!: any;

  constructor(
    public newsService: NewsService,
    public route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("newsId")) {
        this.mode = "edit";
        this.newsId = paramMap.get("newsId");
        this.isLoading = true;
        this.newsService.getNew(this.newsId).subscribe(newsData => {
          this.isLoading = false;
          this.news = {id: newsData._id, title: newsData.title, description: newsData.description, imagePath: newsData.imagePath};
          this.form.setValue({
            title: this.news.title,
            description: this.news.description,
            image: this.news.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.newsId = '';
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddNews(): void {
    if(this.form.invalid) {
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.newsService.addNews(this.form.value.title, this.form.value.description, this.form.value.image);
    }
    else {
      this.newsService.updateNews(this.newsId, this.form.value.title, this.form.value.description, this.form.value.image);
    }
    this.form.reset();

  }

}
