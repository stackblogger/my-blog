import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule]
})
export class PostModule {}
