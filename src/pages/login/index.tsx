import { NextPage } from "next";
import Link from "next/link";
import Title from "../../components/title";

const Join: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Title title="Login" />
      <Link href="/login/phone">
        <a className="text-white">Login with Phone Number &rarr;</a>
      </Link>
      <Link href="/login/email">
        <a className="text-white">Login with Email &rarr;</a>
      </Link>
    </div>
  );
};

export default Join;
