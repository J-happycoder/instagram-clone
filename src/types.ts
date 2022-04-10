import { Post, User } from "@prisma/client";

export type HomePageProps = {
  posts: Post[];
};
export type UploadPageProps = {
  uploadUrl: string;
};
export type layoutProps = {
  children: JSX.Element;
};
export type titleProps = {
  title: string;
};
export type PostData = {
  post: Post;
};
export type UserData = {
  user: User;
};
export type SWRKey = {
  url: string;
  init: RequestInit | undefined;
};
