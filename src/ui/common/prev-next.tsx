"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/ui/shadcn/button";

export function PrevNext({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}): JSX.Element {
  const router = useRouter();

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  function prevPage(): void {
    if (hasPrevious) {
      router.back();
    }
  }

  function nextPage(): void {
    if (hasNext) {
      router.push(`/dashboard/catalog?page=${page + 1}`);
    }
  }

  return (
    <form className="ml-auto flex items-center gap-2 align-top">
      <Button
        formAction={prevPage}
        variant="ghost"
        size="sm"
        type="submit"
        disabled={!hasPrevious}
      >
        <ChevronLeft size={14} /> Prev
      </Button>

      <Button
        formAction={nextPage}
        variant="ghost"
        size="sm"
        type="submit"
        disabled={!hasNext}
      >
        Next <ChevronRight size={14} />
      </Button>
    </form>
  );
}
