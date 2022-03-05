import { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import Header from "../components/header";
import Input from "../components/input";
import Title from "../components/title";

const Upload: NextPage = () => {
  return (
    <div>
      <Title title="Upload" />
      <form className="form">
        <Input placeholder="Title" type="text" />
        <Input placeholder="Description" type="text" />
        <input type="text" value="Upload" className="continue-button" />
      </form>
    </div>
  );
};

export default Upload;
