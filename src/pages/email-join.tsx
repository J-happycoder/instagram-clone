import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Input from "../components/input";
import { countries } from "country-data-list";
import Fontawesome from "../components/fontawesome";
import Link from "next/link";

const Join: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailJoin = (event: any) => {
    event.preventDefault();
    const emailInput: any = document.querySelector(".emailInput");
    const nameInput: any = document.querySelector(".nameInput");
    const name = nameInput.value;
    const email = emailInput.value;
  };
  return (
    <div>
      <Head>
        <title>Join | Insatgram</title>
      </Head>
      <Header></Header>
      <Fontawesome />
      <form onSubmit={handleEmailJoin} className="form">
        <Input type="email" placeholder="Type your Email." className="emailInput" required />
        <Input type="text" placeholder="Type your Name." className="nameInput" />
        <button type="submit" className="continue-button">
          {isLoading ? (
            <div className="w-5 h-5 m-auto">
              <div className="w-5 h-5 rounded-lg bg-white animate-ping absolute"></div>
              <div className="w-5 h-5 rounded-lg bg-white relative opacity-20"></div>
            </div>
          ) : (
            <span>Send Verification Code</span>
          )}
        </button>
        <Link href="phone-join">
          <span className="text-white cursor-pointer text-sm ml-7 opacity-70 font-light">
            Join with your Phone. &rarr;
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Join;
