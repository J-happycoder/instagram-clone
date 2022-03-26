import { NextPage } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { QueryString } from "../../types";

const Profile: NextPage = () => {
  const [id, setId] = useState<QueryString>();
  const router: NextRouter = useRouter();
  useEffect(() => {
    const id: QueryString = router.query.id;
    setId(id);
  }, []);
  return (
    <div>
      <Head>
        <title>Kyle | Instagram</title>
      </Head>
      <Header />
      <div className="w-6/12 m-auto mt-20 flex flex-row justify-between align-center relative">
        <img className="object-cover w-24 h-24 rounded-full" src="/sample.jpeg"></img>
        <div className="flex flex-col ml-3 absolute left-24 mt-3">
          <span className="text-white text-xl block font-bold mb-2">Kyle</span>
          <span className="text-white text-sm text-sky-500">0 Followers</span>
        </div>
        <span className="text-white mr-0 m-auto px-5 py-2 text-sm rounded mr-7 hover:cursor-pointer bg-sky-600">
          Follow
        </span>
      </div>
    </div>
  );
};

export default Profile;
