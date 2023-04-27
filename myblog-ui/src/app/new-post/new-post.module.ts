import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewPostRoutingModule } from './new-post-routing.module';
import { NewPostComponent } from './new-post.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [NewPostComponent],
  imports: [CommonModule, NewPostRoutingModule, FormsModule, ReactiveFormsModule, NgxEditorModule]
})
export class NewPostModule {}
