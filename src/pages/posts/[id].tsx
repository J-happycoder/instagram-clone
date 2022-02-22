import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Fontawesome from "../../components/fontawesome";
import Header from "../../components/header";

const PostDetail: NextPage = () => {
  const router = useRouter();
  const [postId, setId] = useState();
  useEffect(() => {
    const { id } = router.query;
    setId(id);
  });
  return (
    <div>
      <Head>
        <title>Title | Instagram</title>
      </Head>
      <Header />
      <Fontawesome />
      <div className="w-6/12 m-auto mt-20 flex flex-col">
        <h1 className="text-white uppercase font-extrabold text-4xl mb-5 ml-2">Title</h1>
        <img src="/sample.jpeg" className="mb-1 w-8/12 rounded" />
        <i className="fa-solid fa-heart text-white ml-2 mb-3 text-base"></i>
        <span className="text-white text-sm opacity-70  w-7/12 ml-2">
          Hello! This is a Next.JS post detail Page. You can see details about this Item.
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
