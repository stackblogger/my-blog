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
      .set('Authorization', `Bearer ${this.authService.getAccessToken}`)
      .set('Content-type', 'application/json');
  }

  /**
   * Create Blog Post Endpoint
   *
   * @param blog {BlogModel} - Blog Payload
   * @returns {BlogModel} Created Blog Data
   */
  createPost(blog: BlogModel): Observable<BlogModel> {
    return this.httpClient.post<BlogModel>(environment.apiBaseUrl + '/blogs', blog, { headers: this.headers });
  }

  /**
   * Get All Blogs created by the logged in user
   *
   * @param pageSize Page Size used for Pagination
   * @param currentPage Current Page Number
   * @returns {BlogModel[]} Blogs Array
   */
  getAllPosts(pageSize: number, currentPage: number): Observable<BlogModel[]> {
    return this.httpClient.get<BlogModel[]>(
      `${environment.apiBaseUrl}/blogs?pageSize=${pageSize}&currentPage=${currentPage}`,
      { headers: this.headers }
    );
  }

  /**
   * This endpoint is a public url. It doesn't require any authentication mechanism
   *
   * @param slug post slug text
   * @returns {BlogModel} Blog Data
   */
  getSinglePost(slug: string): Observable<BlogModel> {
    return this.httpClient.get<BlogModel>(environment.apiBaseUrl + `/blogs/${slug}`);
  }
}
