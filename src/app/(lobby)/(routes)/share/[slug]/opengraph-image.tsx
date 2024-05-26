/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";

export const alt = "Carta online";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: number } }) {
  const store = await db.store.findFirst({
    where: { id: Number(params.id) },
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            store?.bannerUrl ??
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,1), transparent)",
          }}
        />
        <div
          style={{
            padding: 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              height: 250,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <img
              src={store?.logoUrl ?? absoluteUrl("/favicon.ico")}
              alt="restaurant logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              fontSize: "36px",
              textAlign: "center",
              lineHeight: "40px",
              letterSpacing: "-0.025em",
              fontWeight: "800",
            }}
          >
            {store?.name ?? "Tienda"}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            lineHeight: "28px",
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "white",
          }}
        >
          {store?.slug
            ? `cartaonline.facupm.dev/share/${store?.slug}`
            : "cartaonline.facupm.dev"}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
