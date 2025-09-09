"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <Link href="/" className="transition-opacity hover:opacity-80">
        <Image
          src="/app-logo/vector/black-logo.svg"
          width={300}
          height={144}
          alt="Press Polish Logo"
          className="w-24"
          priority
        />
      </Link>
    </header>
  );
}
