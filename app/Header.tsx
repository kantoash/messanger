import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";

async function Header() {
  const session = await unstable_getServerSession();
  if (session)
    return (
      <header className="sticky top-0 bg-white z-50 flex justify-between  items-center p-5  shadow-sm">
        <div className="flex space-x-2">
          <Image
            src="https://links.papareact.com/jne"
            height={10}
            width={50}
            alt="Profile pic"
            className="rounded-full mx-2 object-contain"
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-[500] text-lg">{session?.user?.name}</p>
          </div>
          
        </div>
        <div>
                   <LogoutButton />
        </div>
      </header>
    );
  return (
    <header className="sticky top-0 bg-white z-50 justify-center items-center p-10 shadow-md">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center ">
          <Image
            src={"https://links.papareact.com/jne"}
            alt="Logo"
            height={10}
            width={50}
          />
          <p className="text-blue-400 ">Welcome to Meta Messanger</p>
        </div>
        <Link
          href="/auth/signin"
          className="button"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
