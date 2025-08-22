import { AddPostForm } from "../components/AddPostForm";
import PostsList from "../components/PostsList";

export default function PostsMainPage() {
  return (
    <div>
      <AddPostForm/>
      <hr className="medium-container" style={{ margin: "4rem auto" }}/>
      <PostsList/>
    </div>
  )
}
