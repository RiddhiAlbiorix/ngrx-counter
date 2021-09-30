import { Post } from "../../modals/post.modal";

export interface PostsState {
  posts: Post[]
} 

export const initialState: PostsState = {
  posts: []
}