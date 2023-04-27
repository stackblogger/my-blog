import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PostService } from '../post.service';
import { BlogModel } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  editor: Editor;
  blogForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService) {
    this.editor = new Editor();
    this.blogForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tags: new FormArray([this.fb.group({ name: new FormControl() })]),
      category: this.fb.group({
        name: new FormControl('')
      })
    });
  }

  ngOnInit(): void {}

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.group({ name: new FormControl() }));
  }

  createPost() {
    if (this.blogForm.invalid) {
      alert('Some required fields are not filled. Can not submit form.');
      return;
    }
    const payload: BlogModel = this.blogForm.value;
    payload.tags = payload.tags.filter((t) => t.name);

    this.postService.createPost(payload).subscribe((response) => {
      this.router.navigate(['/dashboard']);
    });
  }
}
