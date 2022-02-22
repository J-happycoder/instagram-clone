import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/header";
import Input from "../components/input";

const Login: NextPage = () => {
  const [isPhoneLogin, setPhoneLogin] = useState(false);
  const handlePhoneLogin = () => {
    if (isPhoneLogin) {
      return setPhoneLogin(false);
    }
    setPhoneLogin(true);
  };
  return (
    <div>
      <Head>
        <title>Login | Instagram</title>
      </Head>
      <Header />
      <form className="form">
        <Input
          type={isPhoneLogin ? "text" : "email"}
          placeholder={isPhoneLogin ? "Type your Phone Number." : "Type your Email."}
        />
        <input type="submit" value="Continue" className="continue-button" />
        <span onClick={handlePhoneLogin} className="text-white text-sm ml-7 cursor-pointer">
          {isPhoneLogin ? "Email Login" : "Phone Login"} &rarr;
        </span>
      </form>
    </div>
  );
};

export default Login;
