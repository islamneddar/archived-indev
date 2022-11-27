import NavBar from "../layouts/NavBar";
import BlogsBody from "../layouts/blog/BlogsBody";

export default function Home() {
  return (
    <div className={"bg-secondary h-screen"}>
      <div className={'flex flex-col h-full'}>
          <NavBar></NavBar>
          <BlogsBody></BlogsBody>
      </div>
    </div>
  )
}
