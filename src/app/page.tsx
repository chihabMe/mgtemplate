"use client";

import { clientApi } from "@/trpc/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { data,status } = useSession()

  if (status == "loading") return <h1>loading</h1>
  const isAuth = status == "authenticated"
  return (
    <main>
      {isAuth &&
        <div>
          <h1>email:{data.user?.email}</h1>
          <h1>username:{data.user.username}</h1>
          <h1>id:{data.user.id}</h1>
          <h1>image:{data.user.image}</h1>
          <h1>role:{data.user.role}</h1>
          <h1>verified:{data.user.verified}</h1>

        </div>
      }
      {!isAuth && <Link href="/auth/signin">login</Link>}
    </main>
  );
}
