import React from "react";
import AllPosts from "../../components/allposts/AllPosts";

async function getData() {
  const res = await fetch(
    `${process.env.URL}/posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Homepage = async () => {
  const posts = await getData();
  // const posts = [];
  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};



export default Homepage;
