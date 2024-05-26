import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { trpc } from "@/app/_trpc/client";

import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  const { mutate: deleteProduct } = trpc.deleteProduct.useMutation({
    onSuccess: () => {
      toast.success(`Producto ${id} borrado`);
      router.refresh();
    },
  });

  return (
    <DropdownMenuItem
      asChild
      onClick={() => deleteProduct({ id })}
      className=""
    >
      <Button
        variant="destructive"
        className="relative flex h-8 w-full cursor-default select-none items-center justify-start rounded-sm px-2 text-left text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        Borrar producto
      </Button>
    </DropdownMenuItem>
  );
}
