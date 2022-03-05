import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/logout");
    setIsLoggingOut(false);
  };
  return (
    <header className="bg-black text-white p-3 border-b border-zinc-800 font-extralight">
      <nav className="w-7/12 mx-auto">
        <ul className="flex flex-row justify-between align-center">
          <li>
            <Link href="/">
              <a>Instagram</a>
            </Link>
          </li>
          <li>
            <Link href="/join">
              <a>Join</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li className="flex flex-row align-center relative">
            {isLoggingOut ? (
              <div className="my-auto absolute right-14 top-0.5">
                <div className="w-5 h-5 rounded-lg bg-white animate-ping absolute"></div>
                <div className="w-5 h-5 rounded-lg bg-white relative opacity-20"></div>
              </div>
            ) : null}
            <a className="ml-2 cursor-pointer" onClick={handleLogout}>
              Logout
            </a>
          </li>
          <li>
            <Link href="/upload">
              <a>Upload</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
