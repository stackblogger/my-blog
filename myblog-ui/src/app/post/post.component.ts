import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogModel } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: BlogModel;
  slug: string;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.post = {} as BlogModel;
    this.slug = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSingleBlog();
  }

  private getSingleBlog() {
    this.postService.getSinglePost(this.slug).subscribe((data) => {
      this.post = data;
    });
  }
}
