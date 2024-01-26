"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProduct from "@/components/delete-file";
import EditProduct from "@/components/forms/edit-product";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: "Comida" | "Bebida" | "Postre";
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left font-bold">ID</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left font-bold">Categoría</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="text-center font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right font-bold">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const info = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Configuraciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DeleteProduct id={info.id} />
            <EditProduct id={info.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
