import Link from "next/link";

const Header = () => {
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
