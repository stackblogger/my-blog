import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, forkJoin, take } from 'rxjs';
import { PostService } from '../post.service';
import { BlogModel } from '../models/post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  obsArray: BehaviorSubject<BlogModel[]> = new BehaviorSubject<BlogModel[]>([]);
  items$: Observable<BlogModel[]> = this.obsArray.asObservable();
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.postService.getAllPosts(this.pageSize, this.currentPage).subscribe((data) => {
      this.obsArray.next(data);
    });

    const content = document.querySelector('.blogs');
    const scroll$ = fromEvent(content!, 'scroll').pipe(
      map(() => {
        return content!.scrollTop;
      })
    );

    scroll$.subscribe((scrollPos) => {
      let limit = content!.scrollHeight - content!.clientHeight;
      if (scrollPos === limit) {
        this.currentPage += this.pageSize;
        forkJoin([this.items$.pipe(take(1)), this.postService.getAllPosts(this.pageSize, this.currentPage)]).subscribe(
          (data: Array<Array<BlogModel>>) => {
            const newArr = [...data[0], ...data[1]];
            this.obsArray.next(newArr);
          }
        );
      }
    });
  }
}
