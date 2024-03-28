export async function getData() {
  const res = await fetch(`http:localhost:3000/api/v1/posts`, {
    next: { tags: ["posts"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
