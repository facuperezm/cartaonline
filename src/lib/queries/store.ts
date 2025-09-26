import "server-only";

import { db } from "../db";

export const getStoresByCity = async (city: string) => {
  const stores = await db.store.findMany({
    where: {
      city: {
        name: city,
      },
      status: "ACTIVE",
    },
    include: {
      city: true,
      banner: true,
      logo: true,
    },
  });

  return stores;
};

export const getStoreById = async (id: string) => {
  const store = await db.store.findUnique({
    where: { id },
    include: {
      city: true,
      banner: true,
      logo: true,
      products: {
        orderBy: {
          category: "asc",
        },
      },
      promotions: {
        orderBy: { startDate: "desc" },
      },
    },
  });
  return store;
};

export const getStoreByUserId = async (userId: string) => {
  const store = await db.store.findMany({
    where: {
      userId: userId,
    },
  });
  return store;
};
