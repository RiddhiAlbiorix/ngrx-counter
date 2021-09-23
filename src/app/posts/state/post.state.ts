import { Post } from "../../modals/post.modal";

export interface PostsState {
  posts: Post[]
} 

export const initialState: PostsState = {
  posts: [
    {
      id: 1,
      title: "sunt aut facere repellat",
      description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et"
    },
    {
      id: 2,
      title: "qui est esse",
      description: "est rerum tempore vitae\nsequi sint nihil postsData"
    },
    {
      id: 3,
      title: "ea molestias quasi",
      description: "et iusto sed quo iure\nvoluptatem occaecati omnis "
    }
  ]
}