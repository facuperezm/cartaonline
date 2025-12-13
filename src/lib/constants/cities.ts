// Static cities list - hardcoded to avoid DB queries on homepage
// These cities are seeded via prisma/seed.ts and never change
export const CITIES = [
  {
    name: "puerto_iguazu",
    displayName: "Puerto Iguazú",
    state: "Misiones",
    imgUrl: "/images/puertoiguazu.webp",
    active: true,
  },
  {
    name: "corrientes",
    displayName: "Corrientes",
    state: "Corrientes",
    imgUrl: "/images/corrientes.webp",
    active: true,
  },
  {
    name: "posadas",
    displayName: "Posadas",
    state: "Misiones",
    imgUrl: "/images/posadas.webp",
    active: true,
  },
  {
    name: "buenos_aires",
    displayName: "Buenos Aires",
    state: "Buenos Aires",
    imgUrl: "/images/buenosaires.webp",
    active: false,
  },
  {
    name: "cordoba",
    displayName: "Córdoba",
    state: "Córdoba",
    imgUrl: "/images/cordoba.webp",
    active: false,
  },
  {
    name: "ushuaia",
    displayName: "Ushuaia",
    state: "Tierra del Fuego",
    imgUrl: "/images/ushuaia.webp",
    active: false,
  },
] as const;

// Derive types from the constant - single source of truth
export type CityName = (typeof CITIES)[number]["name"];
export const CITY_NAMES = CITIES.map((c) => c.name) as [CityName, ...CityName[]];
export const ACTIVE_CITIES = CITIES.filter((c) => c.active);

// Helper to get city by name
export function getCityByName(name: string) {
  return CITIES.find((c) => c.name === name);
}
