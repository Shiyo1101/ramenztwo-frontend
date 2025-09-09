"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={`flex w-full items-center justify-between`}>
      <Link href="/">
        <Image
          src="/app-logo/vector/black-logo.svg"
          width={300}
          height={144}
          alt="logo"
          className="w-24"
        />
      </Link>
    </header>
  );
}
