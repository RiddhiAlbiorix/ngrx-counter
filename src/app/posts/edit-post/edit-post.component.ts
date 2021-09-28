import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/modals/post.modal';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/post.actions';
import { getPostById } from '../state/post.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  postForm!: FormGroup;
  post!: Post
  postSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById, {id}).subscribe(
        (data) => {
          this.post = data;
          this.createForm();
        }
      )
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  get f() {
    return this.postForm.controls;
  }

  ngOnDestroy() {
    if(this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
  
  onUpdatePost() {
    if(!this.postForm.valid) {
      return;
    }
    const post: Post = {
      id: this.post.id,
      title: this.postForm.value.title, 
      description: this.postForm.value.description
    }
    console.log('post', post);
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts'])
  }
}
