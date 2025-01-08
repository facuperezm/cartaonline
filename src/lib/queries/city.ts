import "server-only";

import { type City } from "@prisma/client";

import { db } from "../db";

export const getCities = async () => {
  const cities = await db.city.findMany();
  return cities.sort((a: City, b: City) => Number(b.active) - Number(a.active));
};
