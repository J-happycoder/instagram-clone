import { Post } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../../lib/prismaClient";
import Title from "../components/title";
import type { HomePageProps } from "../types";
import ACCOUNT_HASH from "../../lib/accountHash";

const Home: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div>
      <Title title="Home" />
      {posts.map((post: Post) => (
        <div key={post.id} className="min-w-100 w-3/6 mx-auto mt-10 flex flex-col">
          <Link href={"/posts/" + post.id}>
            <a className="text-white font-bold text-7xl z-10">
              {post.title.slice(0, 16)}
              {post.title.length > 16 ? "..." : ""}
            </a>
          </Link>
          <img
            className="object-cover w-8/12 z-0"
            src={`https://imagedelivery.net/${ACCOUNT_HASH}/${post.id}/public`}
          />
          <div className="mt-2">
            {JSON.parse(post.hashTagList).map((hashTag: string) => (
              <span key={post.id} className="text-sky-600 mr-1">
                {hashTag}
              </span>
            ))}
          </div>
          <span className="text-white break-all">{post.description}</span>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await prisma.post.findMany();
  return { props: { posts } };
};

export default Home;
