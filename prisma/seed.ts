import { Category, City, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing stores and their related data
  await prisma.store.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const stores = [
    // Puerto Iguazu Stores
    {
      name: "Empanadas Iguazu",
      address: "Calle 123",
      city: City.puerto_iguazu,
      slug: "empanadas-iguazu",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675263778953-97e1aa78e665?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        ],
      },
    },
    {
      name: "Parrilla Iguazu",
      address: "Av. Libertad 456",
      city: City.puerto_iguazu,
      slug: "parrilla-iguazu",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675278299389-4165d19f59d2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        ],
      },
    },
    {
      name: "Dulce de Leche Iguazu",
      address: "Calle San Martín 789",
      city: City.puerto_iguazu,
      slug: "dulce-de-leche-iguazu",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675344317761-3ace7cf2362a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "dulcedelecheiguazu@example.com",
          name: "Beatriz",
          userId: "125",
          imageUrl: "https://source.unsplash.com/random/150x150?person3",
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
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675286438306-c228b9c1c636?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "parrillacorrientes@example.com",
          name: "Carlos",
          userId: "126",
          imageUrl: "https://source.unsplash.com/random/150x150?person4",
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
        ],
      },
    },
    {
      name: "Empanadas Corrientes",
      address: "Calle Belgrano 789",
      city: City.corrientes,
      slug: "empanadas-corrientes",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1669075651198-674fab1370b3?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "empanadascorrientes@example.com",
          name: "Daniela",
          userId: "127",
          imageUrl: "https://source.unsplash.com/random/150x150?person5",
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
        ],
      },
    },
    {
      name: "Heladeria Corrientes",
      address: "Calle Rivadavia 123",
      city: City.corrientes,
      slug: "heladeria-corrientes",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675884330914-4f91255343a6?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "heladeriacorrientes@example.com",
          name: "Elena",
          userId: "128",
          imageUrl: "https://source.unsplash.com/random/150x150?person6",
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
            description: "Helado de frutilla fresca",
          },
          {
            name: "Helado de Limón",
            price: 500,
            description: "Helado de limón natural",
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
        ],
      },
    },
    // Posadas Stores
    {
      name: "Parrilla Posadas",
      address: "Av. Mitre 456",
      city: City.posadas,
      slug: "parrilla-posadas",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1708598173791-ccf42a677c47?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "parrillaposadas@example.com",
          name: "Lucas",
          userId: "129",
          imageUrl: "https://source.unsplash.com/random/150x150?person7",
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
          {
            name: "Papitas fritas de la casa",
            price: 300,
            description: "Papitas fritas caseras",
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
        ],
      },
    },
    {
      name: "Empanadas Posadas",
      address: "Calle Belgrano 456",
      city: City.posadas,
      slug: "empanadas-posadas",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675263779035-711f5e6861d8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "empanadasposadas@example.com",
          name: "Mariana",
          userId: "130",
          imageUrl: "https://source.unsplash.com/random/150x150?person8",
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
        ],
      },
    },
    {
      name: "Panaderia Posadas",
      address: "Calle San Martin 789",
      city: City.posadas,
      slug: "panaderia-posadas",
      status: Status.ACTIVE,
      logoUrl:
        "https://plus.unsplash.com/premium_photo-1675344317686-118cc9f89f8a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bannerUrl:
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        create: {
          email: "panaderiaposadas@example.com",
          name: "Sofia",
          userId: "131",
          imageUrl: "https://source.unsplash.com/random/150x150?person9",
        },
      },
      products: {
        create: [
          {
            name: "Medialunas",
            price: 600,
            description: "Medialunas de manteca frescas",
          },
          {
            name: "Pan de campo",
            price: 300,
            description: "Pan de campo artesanal",
          },
          {
            name: "Facturas variadas",
            price: 800,
            description: "Selección de facturas surtidas",
          },
          {
            name: "Torta de frutilla",
            price: 1500,
            description: "Torta de frutilla con crema",
          },
          {
            name: "Chipa",
            price: 500,
            description: "Chipa tradicional",
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
