import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { trpc } from "@/app/_trpc/client";

import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  const { mutate: deleteProduct } = trpc.deleteProduct.useMutation({
    onSuccess: () => {
      toast.success(`Producto ${id} borrado`);
      router.refresh();
    },
  });

  return (
    <DropdownMenuItem onClick={() => deleteProduct({ id })} className="">
      Borrar producto
    </DropdownMenuItem>
  );
}
