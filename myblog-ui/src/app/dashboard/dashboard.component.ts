import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogModel } from '../models/post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: BlogModel[];
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private postService: PostService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.postService.getAllPosts(this.pageSize, this.currentPage).subscribe((data) => {
      this.posts = data;
    });
  }
}
