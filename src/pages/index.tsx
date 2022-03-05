import type { GetStaticProps, NextPage } from "next";
import prisma from "../../lib/prismaClient";
import Title from "../components/title";

const Home: NextPage = ({ posts }: any) => {
  return (
    <div>
      <Title title="Home" />
      {posts.map((post: any) => (
        <div>
          <span className="text-white">{post.title}</span>
          <span className="text-white">{post.description}</span>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany();
  return { props: { posts } };
};

export default Home;
