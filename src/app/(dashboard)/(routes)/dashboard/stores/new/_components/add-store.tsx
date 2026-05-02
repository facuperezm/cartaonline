'use client'

import { AlertCircle } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { MapboxAddressSearch } from '@/app/(dashboard)/_components/mapbox-address-search'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createStore } from '@/lib/actions/store'

const initialState = {
  success: false,
  error: '',
  message: '',
  formData: undefined as Record<string, FormDataEntryValue> | undefined,
}

export function AddStoreForm() {
  const [state, action, isPending] = useActionState(createStore, initialState)
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: '',
  })

  // Restore form data if there was an error
  useEffect(() => {
    if (state?.formData) {
      setFormData({
        name: (state.formData.name as string) || '',
        phone: (state.formData.phone as string) || '',
        description: (state.formData.description as string) || '',
      })
    }
  }, [state?.formData])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form action={action} className="grid w-full max-w-xl gap-5">
      {state?.error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al crear la tienda</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      {state?.success === true && state?.message ? (
        <Alert className="border-green-500 text-green-700">
          <AlertTitle>¡Éxito!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Label className="flex flex-col gap-2" htmlFor="name">
        Nombre de la tienda
        <Input
          name="name"
          onChange={handleInputChange}
          placeholder="Empanadas Argentas"
          required
          value={formData.name}
        />
      </Label>
      <MapboxAddressSearch required sessionToken={sessionToken} />
      <Label className="flex flex-col gap-2" htmlFor="phone">
        Teléfono
        <Input
          name="phone"
          onChange={handleInputChange}
          placeholder="Tu número de WhatsApp con 54 y la característica (543757123456)"
          required
          type="tel"
          value={formData.phone}
        />
      </Label>
      <Label className="flex flex-col gap-2" htmlFor="description">
        Descripción del negocio
        <Textarea
          autoComplete="false"
          name="description"
          onChange={handleInputChange}
          placeholder="El mejor restaurant de empanadas del planeta tierra"
          value={formData.description}
        />
      </Label>
      <Button
        className="w-fit transition-all"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <>
            <Icons.spinner
              aria-hidden="true"
              className="mr-2 h-4 w-4 animate-spin"
            />{' '}
            Creando tienda....
          </>
        ) : (
          <>
            Crear tienda
            <span className="sr-only">Agregar tienda</span>
          </>
        )}
      </Button>
    </form>
  )
}
