"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface AddStoreFormProps {
  userId: string
}

//store schema
const storeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  address: z.string().min(3, "Address must be at least 3 characters long."),
  logourl: z.string().min(3, "Logo URL must be at least 3 characters long."),
})

type Inputs = z.infer<typeof storeSchema>

export function AddStoreForm({ userId }: AddStoreFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      logourl: "",
    },
  })

  function onSubmit(data: Inputs) {
    toast.success("Store added successfully!")
    router.push("/dashboard/stores")
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type store name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direccion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logourl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loguito</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Store
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  )
}