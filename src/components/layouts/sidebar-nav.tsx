"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { SidebarNavItem } from "@/types";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Icons } from "../icons";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn("flex w-full flex-col gap-2 p-1", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon;
        return (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href!}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                item.href!.includes(String(segment))
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60",
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
