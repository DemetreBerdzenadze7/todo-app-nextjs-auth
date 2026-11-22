import Link from "next/link";
import { Suspense } from "react";
import Skeleton from "../skeletonComponent/Skeleton";
import HeaderContent from "./HeaderContent";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-header max-w-page items-center justify-between gap-4 px-gutter tablet:px-gutter-tablet">
        <Link href="/">
          <Logo />
        </Link>

        <Suspense fallback={<Skeleton className="h-9 w-40 rounded-control" />}>
          <HeaderContent />
        </Suspense>
      </div>
    </header>
  );
}
