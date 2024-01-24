import { updateProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/app/_trpc/client";

export default function EditProduct({ id }: { id: number }) {
  const { data: product } = trpc.getProduct.useQuery({ id });

  console.log(product);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="relative flex h-8 w-full cursor-default select-none items-center justify-start rounded-sm px-2 text-left text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          variant="ghost"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>Cambiar</DialogDescription>
        </DialogHeader>
        <form action={updateProduct.bind(null, id)}>
          <Label htmlFor="link" className="sr-only">
            Nombre del producto
          </Label>

          <Input
            name="name"
            required
            minLength={3}
            maxLength={50}
            placeholder="empanadas"
            defaultValue={product?.name ?? ""}
          />
          <Button type="submit" className="">
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
