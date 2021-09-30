import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { PostsService } from "src/app/service/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";

@Injectable({
  providedIn: 'root'
})

export class PostEffects {

  constructor(
    private action$: Actions,
    private postsService: PostsService) { }

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPost().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts })
          })
        )
      })
    )
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map(data => {
            const post = { ...action.post, id: data.id }
            return addPostSuccess({ post })
          })
        )
      })
    )
  })

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map(data => {
            return updatePostSuccess({ post: action.post })
          })
        )
      })
    )
  })

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(data => {
            return deletePostSuccess({ id: action.id })
          })
        )
      })
    )
  })
}