import ListPost from "@/components/ListPost";
import PostForm from "@/components/PostForm";

export default function Home() {
  return (
    <div className=" max-w-[1950px] mx-auto px-4 py-4 lg:px-20">
      <PostForm />
      <ListPost />
    </div>
  );
}
