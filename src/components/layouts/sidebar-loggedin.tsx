import Link from "next/link";

import { Icons } from "../icons";
import { Button } from "../ui/button";

function SideBarLoggedIn() {
  return (
    <>
      <Button variant="ghost" className="w-full space-x-1">
        <Icons.store className="size-4" />
        <Link href="/dashboard/account">Mi cuenta</Link>
      </Button>
      <Button variant="ghost" className="w-full space-x-1">
        <Icons.store className="size-4" />
        <Link href="/dashboard/stores">Mis tiendas</Link>
      </Button>
    </>
  );
}

export default SideBarLoggedIn;
