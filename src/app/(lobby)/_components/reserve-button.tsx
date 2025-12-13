import Link from 'next/link'

import { Icons } from '@/components/icons'

interface ReserveButtonProps {
  phone: string
}

export function ReserveButton({ phone }: ReserveButtonProps) {
  return (
    <Link
      className="sticky bottom-5 z-20 mx-auto mb-6 max-w-3xl gap-2 rounded-3xl bg-lime-500 p-2 px-4 text-center text-white shadow-md transition-all hover:bg-lime-500/90"
      href={`https://wa.me/${phone}?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20realizar%20una%20reserva`}
    >
      <div className="flex gap-2">
        <Icons.whatsapp />
        <span>Reservar</span>
      </div>
    </Link>
  )
}
