import { Category, PrismaClient, Status, UploadStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n🌱 Starting to seed the database...\n");

  console.time("\n🎉 Seeding finished!");

  console.time(`🌱 Database has been seeded`);

  console.log("🧹 Cleaning up the database...");
  console.time("\n✨ Database cleaned!");

  await prisma.product.deleteMany();
  await prisma.logo.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.store.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();
  console.timeEnd("\n✨ Database cleaned!");

  console.log("\n🌆 Creating cities...");
  console.time("🌆 Cities created!");
  const cities = [
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
  ];

  const createdCities = await Promise.all(
    cities.map((city) => prisma.city.create({ data: city })),
  );

  const cityIds = {
    puerto_iguazu:
      createdCities.find((city) => city.name === "puerto_iguazu")?.id ?? "",
    corrientes:
      createdCities.find((city) => city.name === "corrientes")?.id ?? "",
    posadas: createdCities.find((city) => city.name === "posadas")?.id ?? "",
  } as const;

  if (!cityIds.puerto_iguazu || !cityIds.corrientes || !cityIds.posadas) {
    throw new Error("Failed to create cities");
  }
  console.timeEnd("🌆 Cities created!");

  console.log("\n🏪 Creating stores...");
  console.time("🏪 Stores created!");
  const stores = [
    {
      name: "Empanadas Iguazu",
      address: "Calle 123",
      phone: "123456789",
      description: "Las mejores empanadas de Puerto Iguazú",
      cityId: cityIds.puerto_iguazu,
      slug: "empanadas-iguazu",
      status: Status.ACTIVE,
      logo: {
        create: {
          name: "logo-empanadas",
          key: "logo-empanadas-iguazu",
          url: "https://plus.unsplash.com/premium_photo-1675263778953-97e1aa78e665?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      banner: {
        create: {
          name: "banner-empanadas",
          key: "banner-empanadas-iguazu",
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      user: {
        create: {
          email: "empanadasiguazu@example.com",
          name: "Alice",
          userId: "123",
          imageUrl: "https://source.unsplash.com/random/150x150?person1",
        },
      },
      products: {
        create: [
          {
            name: "Empanadas de carne",
            price: 1000,
            description: "Empanadas de carne cortada a cuchillo",
            category: Category.Comida,
          },
          {
            name: "Empanadas de pollo",
            price: 900,
            description: "Empanadas de pollo con cebolla y morrón",
            category: Category.Comida,
          },
          {
            name: "Empanadas de jamón y queso",
            price: 800,
            description: "Empanadas de jamón y queso",
            category: Category.Comida,
          },
          {
            name: "Empanadas de choclo",
            price: 850,
            description: "Empanadas de choclo cremoso",
            category: Category.Comida,
          },
          {
            name: "Empanadas de espinaca",
            price: 870,
            description: "Empanadas de espinaca con salsa blanca",
            category: Category.Comida,
          },
          {
            name: "Coca cola",
            price: 100,
            description: "Coca cola 500ml",
            category: Category.Bebida,
          },
          {
            name: "Agua sin gas",
            price: 50,
            description: "Agua mineral sin gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Agua con gas",
            price: 50,
            description: "Agua mineral con gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Cerveza Quilmes",
            price: 150,
            description: "Cerveza Quilmes 500ml",
            category: Category.Bebida,
          },
          {
            name: "Vino Tinto",
            price: 200,
            description: "Vino Tinto 500ml",
            category: Category.Bebida,
          },
          {
            name: "Flan con dulce de leche",
            price: 300,
            description: "Flan casero con dulce de leche",
            category: Category.Postre,
          },
          {
            name: "Helado",
            price: 400,
            description: "Helado artesanal",
            category: Category.Postre,
          },
        ],
      },
    },
    {
      name: "Parrilla Iguazu",
      address: "Av. Libertad 456",
      phone: "123456789",
      description:
        "Parrilla tradicional argentina con los mejores cortes de carne a la parrilla.",
      cityId: cityIds.puerto_iguazu,
      slug: "parrilla-iguazu",
      status: Status.ACTIVE,
      logo: {
        create: {
          name: "logo-parrilla",
          key: "logo-parrilla-iguazu",
          url: "https://plus.unsplash.com/premium_photo-1675278299389-4165d19f59d2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      banner: {
        create: {
          name: "banner-parrilla",
          key: "banner-parrilla-iguazu",
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      user: {
        create: {
          email: "parrillaiguazu@example.com",
          name: "Carlos",
          userId: "124",
          imageUrl: "https://source.unsplash.com/random/150x150?person2",
        },
      },
      products: {
        create: [
          {
            name: "Asado",
            price: 2000,
            description: "Asado de tira a la parrilla",
            category: Category.Comida,
          },
          {
            name: "Choripán",
            price: 500,
            description: "Choripán con chimichurri casero",
            category: Category.Comida,
          },
          {
            name: "Morcilla",
            price: 450,
            description: "Morcilla de cerdo a la parrilla",
            category: Category.Comida,
          },
          {
            name: "Provoleta",
            price: 600,
            description: "Provoleta a la parrilla",
            category: Category.Comida,
          },
          {
            name: "Matambre a la pizza",
            price: 1800,
            description: "Matambre de cerdo con salsa de tomate y queso",
            category: Category.Comida,
          },
          {
            name: "Papas fritas",
            price: 800,
            description: "Papas fritas caseras",
            category: Category.Comida,
          },
          {
            name: "Ensalada mixta",
            price: 600,
            description: "Lechuga, tomate y cebolla",
            category: Category.Comida,
          },
          {
            name: "Coca cola",
            price: 100,
            description: "Coca cola 500ml",
            category: Category.Bebida,
          },
          {
            name: "Agua sin gas",
            price: 50,
            description: "Agua mineral sin gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Agua con gas",
            price: 50,
            description: "Agua mineral con gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Cerveza Quilmes",
            price: 150,
            description: "Cerveza Quilmes 500ml",
            category: Category.Bebida,
          },
          {
            name: "Vino Tinto Malbec",
            price: 2500,
            description: "Vino tinto Malbec de Mendoza",
            category: Category.Bebida,
          },
          {
            name: "Flan con dulce de leche",
            price: 300,
            description: "Flan casero con dulce de leche",
            category: Category.Postre,
          },
          {
            name: "Tiramisú",
            price: 400,
            description: "Tiramisú casero",
            category: Category.Postre,
          },
          {
            name: "Helado",
            price: 350,
            description: "Helado artesanal",
            category: Category.Postre,
          },
        ],
      },
    },
    {
      name: "Heladería Iguazu",
      address: "Av. Victoria 789",
      phone: "123456789",
      description: "Los mejores helados artesanales de Puerto Iguazú",
      cityId: cityIds.puerto_iguazu,
      slug: "heladeria-iguazu",
      status: Status.ACTIVE,
      logo: {
        create: {
          name: "logo-heladeria",
          key: "logo-heladeria-iguazu",
          url: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      banner: {
        create: {
          name: "banner-heladeria",
          key: "banner-heladeria-iguazu",
          url: "https://images.unsplash.com/photo-1538489949601-cbabf5b0c105?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      user: {
        create: {
          email: "heladeriaiguazu@example.com",
          name: "Maria",
          userId: "125",
          imageUrl: "https://source.unsplash.com/random/150x150?person3",
        },
      },
      products: {
        create: [
          {
            name: "Helado de Dulce de Leche",
            price: 500,
            description: "Helado artesanal de dulce de leche premium",
            category: Category.Postre,
          },
          {
            name: "Helado de Chocolate",
            price: 500,
            description: "Helado de chocolate belga",
            category: Category.Postre,
          },
          {
            name: "Helado de Vainilla",
            price: 500,
            description: "Helado de vainilla de Madagascar",
            category: Category.Postre,
          },
          {
            name: "Helado de Frutilla",
            price: 500,
            description: "Helado de frutillas frescas",
            category: Category.Postre,
          },
          {
            name: "Helado de Limón",
            price: 500,
            description: "Helado de limón natural",
            category: Category.Postre,
          },
          {
            name: "Banana Split",
            price: 800,
            description:
              "Banana con 3 bochas de helado, crema y salsa de chocolate",
            category: Category.Postre,
          },
          {
            name: "Sundae de Chocolate",
            price: 700,
            description: "Helado con salsa de chocolate, crema y almendras",
            category: Category.Postre,
          },
          {
            name: "Copa Lola",
            price: 900,
            description: "5 bochas de helado con frutas y crema",
            category: Category.Postre,
          },
          {
            name: "Milkshake",
            price: 600,
            description: "Batido de helado con leche y crema",
            category: Category.Bebida,
          },
          {
            name: "Café",
            price: 300,
            description: "Café recién molido",
            category: Category.Bebida,
          },
          {
            name: "Café con Helado",
            price: 450,
            description: "Café con una bocha de helado",
            category: Category.Bebida,
          },
          {
            name: "Agua sin gas",
            price: 50,
            description: "Agua mineral sin gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Agua con gas",
            price: 50,
            description: "Agua mineral con gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Gaseosas",
            price: 100,
            description: "Variedad de gaseosas 500ml",
            category: Category.Bebida,
          },
        ],
      },
    },
    {
      name: "Chamamé Bar",
      address: "Av. 3 de Abril 234",
      phone: "123456789",
      description: "El mejor bar de Corrientes con música en vivo",
      cityId: cityIds.corrientes,
      slug: "chamame-bar",
      status: Status.ACTIVE,
      logo: {
        create: {
          name: "logo-chamame",
          key: "logo-chamame-corrientes",
          url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      banner: {
        create: {
          name: "banner-chamame",
          key: "banner-chamame-corrientes",
          url: "https://images.unsplash.com/photo-1485872299829-c673f5194813?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      user: {
        create: {
          email: "chamame@example.com",
          name: "Juan",
          userId: "126",
          imageUrl: "https://source.unsplash.com/random/150x150?person4",
        },
      },
      products: {
        create: [
          {
            name: "Picada Completa",
            price: 2500,
            description: "Selección de fiambres, quesos y aceitunas",
            category: Category.Comida,
          },
          {
            name: "Empanadas de Carne (6 unidades)",
            price: 1200,
            description: "Empanadas correntinas de carne",
            category: Category.Comida,
          },
          {
            name: "Rabas",
            price: 1800,
            description: "Rabas fritas con limón",
            category: Category.Comida,
          },
          {
            name: "Papas con Cheddar",
            price: 1200,
            description: "Papas fritas con queso cheddar y verdeo",
            category: Category.Comida,
          },
          {
            name: "Hamburguesa Completa",
            price: 1500,
            description: "Hamburguesa con lechuga, tomate, queso y huevo",
            category: Category.Comida,
          },
          {
            name: "Cerveza Quilmes",
            price: 800,
            description: "Cerveza Quilmes tirada 500ml",
            category: Category.Bebida,
          },
          {
            name: "Cerveza Artesanal",
            price: 900,
            description: "Cerveza artesanal local 500ml",
            category: Category.Bebida,
          },
          {
            name: "Fernet con Coca",
            price: 800,
            description: "Fernet Branca con Coca-Cola",
            category: Category.Bebida,
          },
          {
            name: "Gin Tonic",
            price: 1000,
            description: "Gin nacional con tónica",
            category: Category.Bebida,
          },
          {
            name: "Mojito",
            price: 900,
            description: "Mojito clásico con ron",
            category: Category.Bebida,
          },
          {
            name: "Caipirinha",
            price: 900,
            description: "Caipirinha con cachaza",
            category: Category.Bebida,
          },
          {
            name: "Agua sin gas",
            price: 400,
            description: "Agua mineral sin gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Gaseosas",
            price: 500,
            description: "Línea Coca-Cola 500ml",
            category: Category.Bebida,
          },
          {
            name: "Flan Casero",
            price: 600,
            description: "Flan con dulce de leche y crema",
            category: Category.Postre,
          },
          {
            name: "Brownie con Helado",
            price: 800,
            description: "Brownie caliente con helado de vainilla",
            category: Category.Postre,
          },
        ],
      },
    },
    {
      name: "Café del Puerto",
      address: "Costanera 567",
      phone: "123456789",
      description: "Café y pastelería artesanal con vista al río",
      cityId: cityIds.posadas,
      slug: "cafe-del-puerto",
      status: Status.ACTIVE,
      logo: {
        create: {
          name: "logo-cafe",
          key: "logo-cafe-posadas",
          url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1694&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      banner: {
        create: {
          name: "banner-cafe",
          key: "banner-cafe-posadas",
          url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          status: UploadStatus.SUCCESS,
        },
      },
      user: {
        create: {
          email: "cafedelpuerto@example.com",
          name: "Ana",
          userId: "127",
          imageUrl: "https://source.unsplash.com/random/150x150?person5",
        },
      },
      products: {
        create: [
          {
            name: "Café Espresso",
            price: 400,
            description: "Café espresso italiano",
            category: Category.Bebida,
          },
          {
            name: "Cappuccino",
            price: 500,
            description: "Café con leche espumada y cacao",
            category: Category.Bebida,
          },
          {
            name: "Café con Leche",
            price: 450,
            description: "Café con leche cremosa",
            category: Category.Bebida,
          },
          {
            name: "Submarino",
            price: 600,
            description: "Leche caliente con chocolate",
            category: Category.Bebida,
          },
          {
            name: "Té",
            price: 300,
            description: "Variedad de tés",
            category: Category.Bebida,
          },
          {
            name: "Medialunas",
            price: 200,
            description: "Medialunas de manteca",
            category: Category.Comida,
          },
          {
            name: "Tostado Completo",
            price: 800,
            description: "Sándwich de jamón y queso tostado",
            category: Category.Comida,
          },
          {
            name: "Torta de Chocolate",
            price: 700,
            description: "Torta húmeda de chocolate",
            category: Category.Postre,
          },
          {
            name: "Cheesecake",
            price: 800,
            description: "Cheesecake con frutos rojos",
            category: Category.Postre,
          },
          {
            name: "Lemon Pie",
            price: 700,
            description: "Tarta de limón con merengue",
            category: Category.Postre,
          },
          {
            name: "Tarta de Manzana",
            price: 700,
            description: "Tarta de manzana con canela",
            category: Category.Postre,
          },
          {
            name: "Alfajores",
            price: 300,
            description: "Alfajores de maicena caseros",
            category: Category.Postre,
          },
          {
            name: "Licuado de Frutas",
            price: 600,
            description: "Licuado con frutas naturales",
            category: Category.Bebida,
          },
          {
            name: "Agua sin gas",
            price: 300,
            description: "Agua mineral sin gas 500ml",
            category: Category.Bebida,
          },
          {
            name: "Gaseosas",
            price: 400,
            description: "Variedad de gaseosas 500ml",
            category: Category.Bebida,
          },
        ],
      },
    },
    // ... rest of the stores with updated cityId
  ];

  for (const store of stores) {
    console.time(`📍 Creating store: ${store.name}...`);

    // First create the user
    const user = await prisma.user.create({
      data: store.user.create,
    });

    // Then create the store with the user's ID
    const storeData = {
      ...store,
      userId: user.userId,
      user: undefined, // Remove user data as we've already created it
    };

    await prisma.store.create({
      data: storeData,
    });
  }
  console.timeEnd("🏪 Stores created!");

  console.timeEnd("\n🎉 Seeding finished!");

  const storesCount = await prisma.store.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();
  const citiesCount = await prisma.city.count();

  console.log(`📊 Here's a summary:
  - 🌆 ${citiesCount} cities
  - 🏪 ${storesCount} stores
  - 🍽️ ${productsCount} products
  - 👥 ${usersCount} users
  `);
}

main()
  .then(async () => {
    console.timeEnd(`🌱 Database has been seeded`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding the database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
