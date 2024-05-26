"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProduct from "@/components/forms/delete-product";
import EditProduct from "@/components/forms/edit-product-form";

import { statuses } from "./data";
import { DataTableColumnHeader } from "./data-table-column-header";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("category"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="text-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 size-3.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Descripción</div>,
    cell: ({ row }) => {
      return (
        <div className="mx-auto max-w-24 truncate text-center sm:max-w-[40ch]">
          {row.getValue("description")}
        </div>
      );
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
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuLabel>Configuraciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <EditProduct id={info.id} />
            <DeleteProduct id={info.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
