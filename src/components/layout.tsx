import Fontawesome from "./fontawesome";
import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Fontawesome />
      <main>{children}</main>
    </>
  );
};

export default Layout;
