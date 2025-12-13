import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { deleteProduct } from '@/lib/actions/product'

export default function DeleteProduct({ id }: { id: string }) {
  return (
    <DropdownMenuItem asChild className="">
      <Button
        className="relative flex h-8 w-full cursor-default select-none items-center justify-start rounded-sm px-2 text-left text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        onClick={() => deleteProduct({ productId: id })}
        variant="destructive"
      >
        Borrar producto
      </Button>
    </DropdownMenuItem>
  )
}
