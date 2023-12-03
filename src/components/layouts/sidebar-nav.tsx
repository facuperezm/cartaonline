"use client"

import { cn } from "@/lib/utils"
import type { SidebarNavItem } from "@/types"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Icons } from "../icons"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const segment = useSelectedLayoutSegment()

  if (!items?.length) return null

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon

        return item.href ? (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "hover:bg-muted hover:text-foreground group flex w-full items-center rounded-md border border-transparent px-2 py-1",
                item.href.includes(String(segment))
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}