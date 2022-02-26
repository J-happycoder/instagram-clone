import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Input from "../components/input";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login | Instagram</title>
      </Head>
      <Header />
      <form className="form">
        <Input type="email" placeholder="Type your Email." />
        <input type="submit" value="Continue" className="continue-button" />
      </form>
    </div>
  );
};

export default Login;
