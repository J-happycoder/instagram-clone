import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";
import Input from "../components/input";

const Upload: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Upload | Instagram</title>
      </Head>
      <Header />
      <form className="form">
        <Input placeholder="Title" type="text" />
        <Input placeholder="Description" type="text" />
        <input type="text" value="Upload" className="continue-button" />
      </form>
    </div>
  );
};

export default Upload;
