import Image from "next/image";

interface StoreHeaderProps {
  bannerUrl: string | null;
  name: string;
  address: string;
}

export function StoreHeader({ bannerUrl, name, address }: StoreHeaderProps) {
  return (
    <header className="relative rounded-md">
      <div className="absolute z-10 size-full bg-gradient-to-t from-stone-900 from-5% to-transparent to-90%" />
      <Image
        className="h-40 w-full object-cover md:h-72"
        src={bannerUrl ?? "/images/restaurant.webp"}
        alt={`Banner de ${name}`}
        width={800}
        height={1000}
      />
      <div className="absolute bottom-0 z-20 w-full">
        <h1 className="line-clamp-2 rounded-b-md px-4 text-2xl font-bold text-background md:mx-auto md:max-w-3xl md:pl-8">
          {name ?? "Tienda"}
        </h1>
        <p className="px-4 pb-3 text-base text-muted md:mx-auto md:max-w-3xl md:pl-8">
          {address ?? "Dirección"}
        </p>
      </div>
    </header>
  );
}
