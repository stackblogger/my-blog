import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPostRoutingModule } from './new-post-routing.module';
import { NewPostComponent } from './new-post.component';


@NgModule({
  declarations: [
    NewPostComponent
  ],
  imports: [
    CommonModule,
    NewPostRoutingModule
  ]
})
export class NewPostModule { }
