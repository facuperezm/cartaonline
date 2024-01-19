import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";

export default function ProductPage() {
  return (
    <Shell className="pb-12 md:pb-14">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">Titulo</h2>
            <p className="text-base text-muted-foreground">222</p>
            {/* {store ? (
              <Link
                href={`/products?store_ids=${store.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {store.name}
              </Link>
            ) : null} */}
          </div>
        </div>
      </div>
    </Shell>
  );
}
