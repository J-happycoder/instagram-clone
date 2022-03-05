import Head from "next/head";

const Title = ({ title }: any) => {
  return (
    <Head>
      <title>{title} | INSTAGRAM</title>
    </Head>
  );
};

export default Title;
