import { NextPage } from "next";
import Head from "next/head";
import { titleProps } from "../types";

const Title = ({ title }: titleProps) => {
  return (
    <Head>
      <title>{title} | INSTAGRAM</title>
    </Head>
  );
};

export default Title;
