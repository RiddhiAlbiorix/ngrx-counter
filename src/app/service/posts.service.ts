import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modals/post.modal';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPost(): Observable<Post[]>{
    return this.http.get<Post[]>(BASE_URL);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(BASE_URL, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${BASE_URL}/${post.id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete<Post>(`${BASE_URL}/${id}`);
  }
}
