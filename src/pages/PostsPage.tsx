import { AddPostForm } from "@/features/posts/AddPostForm";
import PostsList from "@/features/posts/PostsList";

export default function PostsPage() {
  return (
    <div>
      <AddPostForm/>
      <hr className="medium-container" style={{ margin: "4rem auto" }}/>
      <PostsList/>
    </div>
  )
}
