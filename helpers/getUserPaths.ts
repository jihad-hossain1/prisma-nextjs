export async function getUserPath(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      next: { tags: ["user"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const { paths, user } = data as {
      paths: [
        {
          path: string;
          name: string;
          subPath: [{ path: string; name: string }];
        }
      ];
      user: { role: string };
    };

    let path = paths?.map((item) => item.path);
    // let subPath = paths?.map((item) => item.subPath);

    const userPathsInfo = { path, role: user.role };

    console.log(userPathsInfo);

    if (path) {
      return userPathsInfo;
    } else {
      return {};
    }
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
