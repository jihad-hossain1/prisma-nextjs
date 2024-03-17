export interface Post {
  userId: string;
  title: string;
  slug: string;
  id: string;
  body: string;
}
export interface Props {
  posts: Post[];
}

export interface SinglePostProps {
  post: Post;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  posts: Post[];
  role: string;
}
