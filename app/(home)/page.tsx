import React from "react";
import AllPosts from "../../components/allposts/AllPosts";

async function getData() {
  const res = await fetch("http://localhost:3000/api/v1/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Homepage = async () => {
  const posts = await getData();
  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};



export default Homepage;