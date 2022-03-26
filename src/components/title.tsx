import Head from "next/head";

const Title = ({ title }: ) => {
  return (
    <Head>
      <title>{title} | INSTAGRAM</title>
    </Head>
  );
};

export default Title;
