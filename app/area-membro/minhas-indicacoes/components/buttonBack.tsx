"use client"

import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ButtonBack() {
    const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full bg-transparent border-black/10 relative overflow-hidden shadow"
      onClick={() => router.back()}
      >
        <ArrowLeftIcon className="font-bold" />
      </Button>
    </div>
  )
}
