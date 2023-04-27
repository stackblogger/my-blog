import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  editor: Editor;
  blogForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.editor = new Editor();
    this.blogForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tags: new FormArray([new FormControl()]),
      category: new FormControl('')
    });
  }

  ngOnInit(): void {}

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  private newTag(): FormGroup {
    return this.fb.group('');
  }

  addTag(): void {
    this.tags.push(this.newTag());
  }

  createPost() {
    console.log(this.blogForm.value);
  }
}
