"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { data, status } = useSession()

  if (status == "loading") return <h1>loading</h1>
  const isAuth = status == "authenticated"
  return (
    <main>
      {isAuth &&
        <div>
          <h1> {JSON.stringify(data.user)}</h1>
          <button onClick={() => signOut()} className="bg-red-400 text-white rounded-md px-2 py-1 cursor-pointer "> logout</button>

        </div>
      }
      {!isAuth && <Link href="/accounts/signin">login</Link>}
    </main>
  );
}
