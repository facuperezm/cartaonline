import { currentUser } from '@clerk/nextjs/server'
import { ArrowRight, LayoutDashboard, LogOut } from 'lucide-react'
import Link from 'next/link'

import { getUserEmail } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button, buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export async function SiteHeader() {
  const user = await currentUser()

  const initials = `${user?.firstName?.charAt(0) ?? ''} ${
    user?.lastName?.charAt(0) ?? ''
  }`
  const email = getUserEmail(user)

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav isSignedIn={Boolean(user)} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 transition-all hover:ring-primary/40"
                    variant="ghost"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        alt={user.username ?? ''}
                        src={user.imageUrl}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link className="cursor-pointer" href="/dashboard/stores">
                        <LayoutDashboard
                          aria-hidden="true"
                          className="mr-2 h-4 w-4 text-primary"
                        />
                        Panel general
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      className="cursor-pointer text-destructive focus:text-destructive"
                      href="/sign-out"
                    >
                      <LogOut aria-hidden="true" className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className={buttonVariants({
                  size: 'sm',
                  className:
                    'group gap-1 rounded-full px-4 shadow-warm transition-all hover:shadow-warm-lg',
                })}
                href="/sign-in"
              >
                Creá tu tienda
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="sr-only">Iniciar sesión</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
