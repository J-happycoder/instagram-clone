import { layoutProps } from "../types/layout";
import Fontawesome from "./fontawesome";
import Header from "./header";

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Header />
      <Fontawesome />
      <main>{children}</main>
    </>
  );
};

export default Layout;
