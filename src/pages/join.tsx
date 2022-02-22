import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";
import Input from "../components/input";

const Join: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Join | Insatgram</title>
      </Head>
      <Header></Header>
      <form className="form">
        <Input type="email" placeholder="Type your Email." />
        <Input type="text" placeholder="Type your Name." />
        <input type="submit" value="Continue" className="continue-button"></input>
      </form>
    </div>
  );
};

export default Join;
