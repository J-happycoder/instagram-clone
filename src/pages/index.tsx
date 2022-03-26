import { Post } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../../lib/prismaClient";
import Title from "../components/title";
import type { HomePageProps } from "../types";

const Home: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div>
      <Title title="Home" />
      {posts.map((post: Post, index: number) => (
        <div key={index}>
          <Link href={"/posts/" + post.id}>
            <a className="text-white">{post.title}</a>
          </Link>
          <span className="text-white">{post.description}</span>
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
