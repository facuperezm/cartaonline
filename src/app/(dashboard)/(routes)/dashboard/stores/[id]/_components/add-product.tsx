'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addProduct } from '@/lib/actions/product'
import { catchError } from '@/lib/utils'
import { AddProductsSchema, type Inputs } from '@/lib/validations/product'

export function AddProductForm({
  setOpen,
  storeId,
}: {
  setOpen: (value: boolean) => void
  storeId: string
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(AddProductsSchema),
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addProduct({ ...data, storeId })
        toast.success('Producto agregado correctamente')
        setOpen(false)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl>
                <Input placeholder="Empanadas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input placeholder="1200" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Empanada de choclo rellena de queso"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bebida">Bebida</SelectItem>
                  <SelectItem value="Postre">Postre</SelectItem>
                  <SelectItem value="Comida">Comida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 w-full transition-all" disabled={isPending}>
          {isPending ? (
            <Icons.spinner
              aria-hidden="true"
              className="mr-2 h-4 w-4 animate-spin"
            />
          ) : null}
          {isPending ? 'Agregando producto' : 'Agregar producto'}
          <span className="sr-only">Agregar producto</span>
        </Button>
      </form>
    </Form>
  )
}
