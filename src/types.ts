import { Post, User } from "@prisma/client";

export type QueryString = string | string[] | undefined;
export type HomePageProps = {
  posts: Post[];
};
export type layoutProps = {
  children: JSX.Element;
};
export type PostData = {
  post: Post;
};
export type UserData = {
  user: User;
};
