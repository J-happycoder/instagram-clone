import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home | Instagram</title>
      </Head>
      <Header></Header>
    </div>
  );
};

export default Home;
