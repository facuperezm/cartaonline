import { City, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const stores = [
    // Puerto Iguazu Stores
    {
      name: "Empanadas Iguazu",
      address: "Calle 123",
      city: City.puerto_iguazu,
      slug: "empanadas-iguazu",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "empanadasiguazu@example.com",
          name: "Alice",
          userId: "123",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Empanadas de carne",
            price: 1000,
            description: "Empanadas de carne cortada a cuchillo",
          },
          {
            name: "Empanadas de pollo",
            price: 900,
            description: "Empanadas de pollo con cebolla y morrón",
          },
          {
            name: "Empanadas de jamón y queso",
            price: 800,
            description: "Empanadas de jamón y queso",
          },
          {
            name: "Empanadas de choclo",
            price: 850,
            description: "Empanadas de choclo cremoso",
          },
          {
            name: "Empanadas de espinaca",
            price: 870,
            description: "Empanadas de espinaca con salsa blanca",
          },
        ],
      },
    },
    {
      name: "Parrilla Iguazu",
      address: "Av. Libertad 456",
      city: City.puerto_iguazu,
      slug: "parrilla-iguazu",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "parrillaiguazu@example.com",
          name: "Carlos",
          userId: "124",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Asado",
            price: 2000,
            description: "Asado de tira a la parrilla",
          },
          {
            name: "Choripán",
            price: 500,
            description: "Choripán con chimichurri casero",
          },
          {
            name: "Morcilla",
            price: 450,
            description: "Morcilla de cerdo a la parrilla",
          },
          {
            name: "Provoleta",
            price: 600,
            description: "Provoleta a la parrilla",
          },
          {
            name: "Matambre a la pizza",
            price: 1800,
            description: "Matambre de cerdo con salsa de tomate y queso",
          },
        ],
      },
    },
    {
      name: "Dulce de Leche Iguazu",
      address: "Calle San Martín 789",
      city: City.puerto_iguazu,
      slug: "dulce-de-leche-iguazu",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "dulcedelecheiguazu@example.com",
          name: "Beatriz",
          userId: "125",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Dulce de Leche Clásico",
            price: 800,
            description: "Dulce de leche tradicional argentino",
          },
          {
            name: "Dulce de Leche con Chocolate",
            price: 900,
            description: "Dulce de leche con chocolate artesanal",
          },
          {
            name: "Dulce de Leche con Coco",
            price: 850,
            description: "Dulce de leche con coco rallado",
          },
          {
            name: "Dulce de Leche Repostero",
            price: 950,
            description: "Dulce de leche especial para repostería",
          },
          {
            name: "Dulce de Leche Light",
            price: 800,
            description: "Dulce de leche bajo en calorías",
          },
        ],
      },
    },
    // Corrientes Stores
    {
      name: "Parrilla Corrientes",
      address: "Av. Libertad 456",
      city: City.corrientes,
      slug: "parrilla-corrientes",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "parrillacorrientes@example.com",
          name: "Carlos",
          userId: "126",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Asado",
            price: 2000,
            description: "Asado de tira a la parrilla",
          },
          {
            name: "Choripán",
            price: 500,
            description: "Choripán con chimichurri casero",
          },
          {
            name: "Morcilla",
            price: 450,
            description: "Morcilla de cerdo a la parrilla",
          },
          {
            name: "Provoleta",
            price: 600,
            description: "Provoleta a la parrilla",
          },
          {
            name: "Matambre a la pizza",
            price: 1800,
            description: "Matambre de cerdo con salsa de tomate y queso",
          },
        ],
      },
    },
    {
      name: "Empanadas Corrientes",
      address: "Calle Belgrano 789",
      city: City.corrientes,
      slug: "empanadas-corrientes",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "empanadascorrientes@example.com",
          name: "Daniela",
          userId: "127",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Empanadas de carne",
            price: 1000,
            description: "Empanadas de carne cortada a cuchillo",
          },
          {
            name: "Empanadas de pollo",
            price: 900,
            description: "Empanadas de pollo con cebolla y morrón",
          },
          {
            name: "Empanadas de jamón y queso",
            price: 800,
            description: "Empanadas de jamón y queso",
          },
          {
            name: "Empanadas de choclo",
            price: 850,
            description: "Empanadas de choclo cremoso",
          },
          {
            name: "Empanadas de espinaca",
            price: 870,
            description: "Empanadas de espinaca con salsa blanca",
          },
        ],
      },
    },
    {
      name: "Heladeria Corrientes",
      address: "Calle Rivadavia 123",
      city: City.corrientes,
      slug: "heladeria-corrientes",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "heladeriacorrientes@example.com",
          name: "Elena",
          userId: "128",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Helado de Dulce de Leche",
            price: 500,
            description: "Helado de dulce de leche artesanal",
          },
          {
            name: "Helado de Chocolate",
            price: 500,
            description: "Helado de chocolate amargo",
          },
          {
            name: "Helado de Vainilla",
            price: 500,
            description: "Helado de vainilla natural",
          },
          {
            name: "Helado de Frutilla",
            price: 500,
            description: "Helado de frutilla a la crema",
          },
          {
            name: "Helado de Limón",
            price: 500,
            description: "Helado de limón refrescante",
          },
        ],
      },
    },
    // Posadas Stores
    {
      name: "Parrilla Posadas",
      address: "Av. Roca 321",
      city: City.posadas,
      slug: "parrilla-posadas",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "parrillaposadas@example.com",
          name: "Federico",
          userId: "129",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Asado",
            price: 2000,
            description: "Asado de tira a la parrilla",
          },
          {
            name: "Choripán",
            price: 500,
            description: "Choripán con chimichurri casero",
          },
          {
            name: "Morcilla",
            price: 450,
            description: "Morcilla de cerdo a la parrilla",
          },
          {
            name: "Provoleta",
            price: 600,
            description: "Provoleta a la parrilla",
          },
          {
            name: "Matambre a la pizza",
            price: 1800,
            description: "Matambre de cerdo con salsa de tomate y queso",
          },
        ],
      },
    },
    {
      name: "Empanadas Posadas",
      address: "Calle Mitre 567",
      city: City.posadas,
      slug: "empanadas-posadas",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "empanadasposadas@example.com",
          name: "Gisela",
          userId: "130",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Empanadas de carne",
            price: 1000,
            description: "Empanadas de carne cortada a cuchillo",
          },
          {
            name: "Empanadas de pollo",
            price: 900,
            description: "Empanadas de pollo con cebolla y morrón",
          },
          {
            name: "Empanadas de jamón y queso",
            price: 800,
            description: "Empanadas de jamón y queso",
          },
          {
            name: "Empanadas de choclo",
            price: 850,
            description: "Empanadas de choclo cremoso",
          },
          {
            name: "Empanadas de espinaca",
            price: 870,
            description: "Empanadas de espinaca con salsa blanca",
          },
        ],
      },
    },
    {
      name: "Pasteleria Posadas",
      address: "Calle Belgrano 890",
      city: City.posadas,
      slug: "pasteleria-posadas",
      status: Status.ACTIVE,
      logoUrl: "https://source.unsplash.com/random/150x150?restaurant",
      bannerUrl: "https://source.unsplash.com/random/600x400?restaurant",
      user: {
        create: {
          email: "pasteleriaposadas@example.com",
          name: "Hector",
          userId: "131",
          imageUrl: "https://via.placeholder.com/150",
        },
      },
      products: {
        create: [
          {
            name: "Torta de Chocolate",
            price: 1200,
            description: "Torta de chocolate con mousse de chocolate",
          },
          {
            name: "Tarta de Frutilla",
            price: 1000,
            description: "Tarta de frutilla con crema pastelera",
          },
          {
            name: "Alfajores de Maicena",
            price: 700,
            description: "Alfajores de maicena con dulce de leche",
          },
          {
            name: "Medialunas",
            price: 500,
            description: "Medialunas de manteca",
          },
          {
            name: "Chocotorta",
            price: 1100,
            description: "Chocotorta clásica argentina",
          },
        ],
      },
    },
  ];

  for (const store of stores) {
    await prisma.store.upsert({
      update: {},
      where: { id: stores.indexOf(store) + 1 },
      create: store,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
