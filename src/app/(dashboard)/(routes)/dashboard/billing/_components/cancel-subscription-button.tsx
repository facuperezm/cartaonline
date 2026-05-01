'use client'

import { Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cancelSubscription } from '@/lib/actions/subscription'

export function CancelSubscriptionButton() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await cancelSubscription()
      if (result.success) {
        toast.success('Suscripción cancelada')
        setOpen(false)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="w-full" type="button" variant="outline">
          Cancelar suscripción
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Cancelar tu suscripción Pro?</DialogTitle>
          <DialogDescription>
            Vas a conservar todos los beneficios hasta el final del período que
            ya pagaste.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => setOpen(false)}
            type="button"
            variant="outline"
          >
            Volver
          </Button>
          <Button
            disabled={isPending}
            onClick={handleConfirm}
            type="button"
            variant="destructive"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span>Sí, cancelar</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
