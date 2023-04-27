import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogModel } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: BlogModel;
  slug: string;
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService, private postService: PostService) {
    this.post = {} as BlogModel;
    this.slug = this.route.snapshot.params['id'];
    this.isLoggedIn = this.authService.isAuthenticated();
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
