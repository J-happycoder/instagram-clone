import { NextPage } from "next";
import Link from "next/link";
import Title from "../../components/title";

const Join: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Title title="Join" />
      <Link href="/join/phone">
        <a className="text-white">Join with Phone Number &rarr;</a>
      </Link>
      <Link href="/join/email">
        <a className="text-white">Join with Email &rarr;</a>
      </Link>
    </div>
  );
};

export default Join;
