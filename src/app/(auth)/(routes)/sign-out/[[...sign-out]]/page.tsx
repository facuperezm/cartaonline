import type { Metadata } from 'next'
import { LogOutButtons } from '@/app/(auth)/_components/log-out-buttons'
import { Shell } from '@/components/shell'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  title: 'Cerrar sesión',
  description: 'Cerrá sesión en tu cuenta de Carta Online',
}

export default function Signout() {
  return (
    <Shell className="h-screen max-w-lg">
      <div className="m-auto flex h-screen items-center justify-center">
        <Card className="m-auto bg-background">
          <CardHeader className="">
            <CardTitle className="text-2xl">Queres cerrar sesión?</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <LogOutButtons />
          </CardFooter>
        </Card>
      </div>
    </Shell>
  )
}
