import type { User } from "@prisma/client";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import useUser from "../../lib/useUser";

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, mutateUser } = useUser();
  const router: NextRouter = useRouter();
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/logout");
    await mutateUser();
    await router.push("/");
    setIsLoggingOut(false);
  };
  return (
    <header className="bg-black text-white fixed w-full top-0 z-20 p-3 border-b border-zinc-800 font-extralight">
      <nav className="w-7/12 mx-auto">
        <ul className="flex flex-row justify-between align-center">
          <li>
            <Link href="/">
              <a>Instagram</a>
            </Link>
          </li>
          {!user ? (
            <li>
              <Link href="/join">
                <a>Join</a>
              </Link>
            </li>
          ) : null}
          {!user ? (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          ) : null}
          {user ? (
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
          ) : null}
          {user ? (
            <li>
              <Link href="/upload">
                <a>Upload</a>
              </Link>
            </li>
          ) : null}
          {user ? (
            <li>
              <span>{user.name}</span>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
