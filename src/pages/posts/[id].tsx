import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import useSWR, { SWRResponse } from "swr";
import Title from "../../components/title";
import { QueryString } from "../../types";
import { PostData } from "../../types";

const PostDetail: NextPage = () => {
  const router: NextRouter = useRouter();
  const id: QueryString = router.query.id ? router.query.id : "";
  const { data }: SWRResponse<PostData> = useSWR(`/api/posts/${id}`);
  if (!data) {
    return (
      <div>
        <Title title="Loading..." />
        <div className="w-6/12 m-auto mt-20 flex flex-col">
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
      <div className="w-6/12 m-auto mt-20 flex flex-col">
        <h1 className="text-white uppercase font-extrabold text-4xl mb-5 ml-2">
          {data.post.title}
        </h1>
        <img src="/sample.jpeg" className="mb-1 w-8/12 rounded" />
        <i className="fa-solid fa-heart text-white ml-2 mb-3 text-base"></i>
        <span className="text-white text-sm opacity-70  w-7/12 ml-2">{data.post.description}</span>
      </div>
    </div>
  );
};

export default PostDetail;
