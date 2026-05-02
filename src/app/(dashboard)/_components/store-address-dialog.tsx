'use client'

import { MapPinIcon } from 'lucide-react'
import { useState } from 'react'
import { LoadingButton } from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { updateStore } from '@/lib/actions/store'
import { MapboxAddressSearch } from './mapbox-address-search'

type StoreAddressDialogProps = {
  address: string
  cityName: string
  province: string
  storeId: string
}

export function StoreAddressDialog({
  address,
  cityName,
  province,
  storeId,
}: StoreAddressDialogProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(false)
  const [sessionToken, setSessionToken] = useState(() => crypto.randomUUID())

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          setSelected(false)
          setSessionToken(crypto.randomUUID())
        }
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="gap-2" type="button" variant="outline">
          <MapPinIcon className="size-4" />
          Cambiar dirección
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar dirección</DialogTitle>
          <DialogDescription>
            Seleccioná una dirección de la lista para actualizar ciudad,
            provincia y coordenadas.
          </DialogDescription>
        </DialogHeader>
        <form action={updateStore.bind(null, storeId)} className="space-y-4">
          <div className="rounded-md border bg-muted/40 p-3 text-sm">
            <p className="font-medium">{address}</p>
            <p className="text-muted-foreground">
              {cityName}, {province}
            </p>
          </div>
          <MapboxAddressSearch
            defaultValue={address}
            onSelectedChange={setSelected}
            required
            sessionToken={sessionToken}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <LoadingButton action="update" disabled={!selected}>
              Confirmar dirección
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
