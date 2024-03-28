import React from "react";
import AllPosts from "../../components/allposts/AllPosts";
import { getData } from "../../utils/fetchPosts";
import { getBlogs } from "../../utils/fetchBlogs";
import { BlogData } from "../../utils/types";
import AddPost from "../../components/allposts/actions/AddPost";
import Link from "next/link";

const Homepage = async () => {
  const posts = await getData();
  const blogs = await getBlogs();
  // const posts = [];
  return (
    <>
      <div>
        <Link href={"/add-blog"}>Add Blog</Link>
        <AddPost />
      </div>
      <div className="grid lg:grid-cols-2 gap-3 mt-10">
        <AllPosts posts={posts} />
        <div className="grid grid-cols-3 gap-4">
          {blogs?.map((blog: BlogData) => (
            <div key={blog?.id}>
              <p className="text-sm border p-4 ">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



export default Homepage;
