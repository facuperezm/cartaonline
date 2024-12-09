import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";

const routeContextSchema = z.object({
  params: z.object({
    storeId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validar el contexto de la ruta
    const { params } = routeContextSchema.parse(context);

    // Validar que el ID sea un número
    const storeId = parseInt(params.storeId);
    if (isNaN(storeId)) {
      return new NextResponse("Invalid store ID", { status: 400 });
    }

    const store = await db.store.findFirst({
      where: { id: storeId },
      select: {
        id: true,
        slug: true,
        city: true,
      },
      // Cachear por 1 hora en producción
      ...(process.env.NODE_ENV === "production" && {
        cacheStrategy: { ttl: 3600 },
      }),
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Configurar headers de cache
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=59",
    );

    return NextResponse.json(store, {
      headers,
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[STORE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
