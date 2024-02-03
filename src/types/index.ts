import type { Icons } from "@/components/icons";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface Store {
  id: number;
  name: string;
  address: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  userId: string;
  products?: Product[];
  status: "ACTIVE" | "INACTIVE";
}

export interface Logo {
  id: number;
  url: string;
  storeId: number;
  store: Store;
  status: "ACTIVE" | "INACTIVE";
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  store: Store;
  status: "ACTIVE" | "INACTIVE";
};

export enum City {
  puerto_iguazu,
  posadas,
  cordoba,
  ushuaia,
  corrientes,
  buenos_aires,
}

export type EnumCityFilter = {
  puerto_iguazu: "Puerto Iguazú";
  posadas: "Posadas";
  corrientes: "Corrientes";
  buenos_aires: "Buenos Aires";
  cordoba: "Córdoba";
  ushuaia: "Ushuaia";
};
