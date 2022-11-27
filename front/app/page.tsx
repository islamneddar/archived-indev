import NavBar from "../layouts/NavBar";
import BlogsBody from "../layouts/BlogsBody";

export default function Home() {
  return (
    <div className={"bg-secondary h-screen"}>
      <div className={''}>
          <NavBar></NavBar>
          <BlogsBody></BlogsBody>
      </div>
    </div>
  )
}
