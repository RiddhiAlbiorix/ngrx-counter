import { createAction, props } from "@ngrx/store"
import { Post } from "src/app/modals/post.modal"

export const ADD_POST_ACTION = '[post page] add post'

export const addPost = createAction(ADD_POST_ACTION, props<{post: Post}>());