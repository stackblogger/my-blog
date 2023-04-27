import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/auth.service';
import { BlogModel } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${authService.getAccessToken}`)
      .set('Content-type', 'application/json');
  }

  createPost(blog: BlogModel): Observable<BlogModel> {
    return this.httpClient.post<BlogModel>(environment.apiBaseUrl + '/blogs', blog, { headers: this.headers });
  }
}
