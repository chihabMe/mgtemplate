"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { data, status } = useSession()
  if (status == "loading") return <h1>loading</h1>
  const isAuth = status == "authenticated"
  return (
    <main>
      {isAuth &&
        <h1> hello</h1>
      }
      {!isAuth && <Link href="/accounts/signin">login</Link>}
    </main>
  );
}
