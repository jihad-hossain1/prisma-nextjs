"use server";

import { z } from "zod";
import { BlogData } from "../../../../utils/types";
import { customRevidateTag } from "../../../../utils/revalidTags";

const schema = z.object({
  email: z.string({
    invalid_type_error: "invalid email",
  }),
  content: z.string({
    invalid_type_error: "invlalid content",
  }),
});

export async function createBlog(formData: BlogData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    content: formData.get("content"),
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...validatedFields,
    }),
  };

  const response = await fetch(
    "http://localhost:3000/api/v1/blogs",
    requestOptions
  );

  const result = await response.json();
  customRevidateTag("blogs");
  // if (!response.ok) {
  //   return console.log(result.message);
  // }
  console.log(result);
}
