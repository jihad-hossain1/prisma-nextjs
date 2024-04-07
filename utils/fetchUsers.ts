export async function getUser(id: string) {

    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      next: { tags: ["user"] },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
}