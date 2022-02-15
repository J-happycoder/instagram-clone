import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../lib/prismaClient";
import type { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

const liStyle: string = "odd:bg-white px-10 even:bg-sky-300";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <title>Home | Instagram</title>
      </Head>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Instagram</a>
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
    </div>
  );
};

export default Home;
