import { cache } from "react";

import { unstable_cache } from "@/lib/utils";

import "server-only";

import { db } from "../db";

export const preloadCities = () => {
  void getCities();
};

export const getCities = cache(async () => {
  console.log("getCities");
  return await db.city.findMany();
});

export const cachedCities = unstable_cache(
  async () => {
    return await getCities();
  },
  ["cities"],
  {
    revalidate: 31536000, // 1 year
  },
);
