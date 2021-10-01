import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news/news.service';
import { mimeType } from 'src/app/service/validators/mime-type.validator';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  form!: FormGroup;
  imagePreview!: any;
  isLoading = false;
  mode = 'create';
  newsID!: any;
  news!: News;

  constructor(
    private service: NewsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      } )
    });
    this.route.paramMap.subscribe((paramMap => {
      if(paramMap.has('newsID')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.newsID = paramMap.get('newsID');
        this.service.getNew(this.newsID).subscribe(newsData => {
          this.isLoading = false;
          this.news = {id: newsData._id, title: newsData.title, description: newsData.description, imagePath: newsData.imagePath};
          this.form.setValue({
            title: newsData.title,
            description: newsData.description,
            imagePath: newsData.imagePath
          });
        });
      }
      else {
        this.mode = 'create';
        this.newsID = null;
      }
    }));
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddNews(): void {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.service.addNews(this.form.value.title, this.form.value.content, this.form.value.image);
    }
    else {
      this.service.updateNews(this.newsID, this.form.value.title, this.form.value.content, this.form.value.imagePath);
    }
    this.form.reset();

  }

}
