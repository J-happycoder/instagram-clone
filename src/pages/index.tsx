import type { NextPage } from "next";
import useUser from "../../lib/useUser";
import Title from "../components/title";

const Home: NextPage = () => {
  const { user, mutateUser } = useUser();
  return (
    <div>
      <Title title="Home" />
      <span className="text-white">{JSON.stringify(user)}</span>
    </div>
  );
};

export default Home;
