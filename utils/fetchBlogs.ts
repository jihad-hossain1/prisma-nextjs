export async function getBlogs() {
  try {
    const res = await fetch("http://localhost:3000/api/v1/blogs", {
      next: { tags: ["blogs"] },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
