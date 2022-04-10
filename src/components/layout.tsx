import { layoutProps } from "../types";
import Fontawesome from "./fontawesome";
import Header from "./header";

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Header />
      <Fontawesome />
      <main className="mb-32 mt-20">{children}</main>
    </>
  );
};

export default Layout;
