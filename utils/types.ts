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

export type BlogData = {
  [x: string]: any;
  id: string;
  email: string;
  content: string;
};

export interface Item {
  id: number;
  name: string;
};
export interface SubItem {
  id: number;
  name: string;
  catId: number;
};