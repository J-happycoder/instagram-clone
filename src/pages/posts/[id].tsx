import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import useSWR, { SWRResponse } from "swr";
import Title from "../../components/title";
import { PostData } from "../../types";
import ACCOUNT_HASH from "../../../lib/accountHash";
import { MouseEventHandler, useState } from "react";

const PostDetail: NextPage = () => {
  const router: NextRouter = useRouter();
  const id: string = String(router.query.id ? router.query.id : "");
  const { data }: SWRResponse<PostData> = useSWR({
    url: `/api/posts/${id}`,
    init: { method: "GET" },
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete: MouseEventHandler<HTMLSpanElement> = async () => {
    setIsDeleting(true);
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    await router.push("/");
  };

  if (!data) {
    return (
      <div>
        <Title title="Loading..." />
        <div className="w-6/12 m-auto flex flex-col">
          <div className="bg-zinc-700 w-60 h-10 mb-5 ml-2 rounded animate-pulse"></div>
          <div className="bg-zinc-700 rounded animate-pulse mb-1 w-8/12 h-80"></div>
          <i className="fa-solid fa-heart text-white ml-2 mb-3 text-base"></i>
          <div className="bg-zinc-700 animate-pulse w-7/12 ml-2 h-5 rounded mb-2"></div>
          <div className="bg-zinc-700 animate-pulse w-3/6 ml-2 h-5 rounded mb-2"></div>
          <div className="bg-zinc-700 animate-pulse w-1/4 ml-2 h-5 rounded mb-2"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Title title={data.post.title} />
      <div className="w-6/12 m-auto flex flex-col">
        <div className="z-10 flex flex-row justify-between">
          <h1 className="text-white font-bold text-7xl break-all">{data.post.title}</h1>
          <div className="mt-6">
            <span className="text-white cursor-pointer  px-2 py-1 uppercase ml-5">edit</span>
            <span
              onClick={handleDelete}
              className={`text-rose-500 cursor-pointer uppercase ml-5 border-2 border-rose-500 px-2 py-1 rounded ${
                isDeleting ? "animate-pulse" : ""
              }`}
            >
              delete
            </span>
          </div>
        </div>

        <img
          src={`https://imagedelivery.net/${ACCOUNT_HASH}/${data.post.id}/public`}
          className="mb-1 w-8/12 rounded z-0"
        />
        <i className="fa-solid fa-heart text-white mb-3 text-base"></i>
        <span className="text-white text-sm opacity-70 break-all w-7/12">
          {data.post.description}
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
