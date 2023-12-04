"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpenCheck } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
    </div>
  )
}
