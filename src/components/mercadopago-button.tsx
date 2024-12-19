// "use client";

// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";

// declare global {
//   interface Window {
//     MercadoPago: new (publicKey: string) => {
//       checkout: (options: {
//         preference: { id: string };
//         autoOpen: boolean;
//       }) => void;
//     };
//   }
// }

// interface MercadoPagoButtonProps {
//   items: Array<{
//     title: string;
//     unit_price: number;
//     quantity: number;
//   }>;
//   storeId: number;
//   className?: string;
// }

// export function MercadoPagoButton({
//   items,
//   storeId,
//   className,
// }: MercadoPagoButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Cargar el script de MercadoPago
//     const script = document.createElement("script");
//     script.src = "https://sdk.mercadopago.com/js/v2";
//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           items,
//           storeId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error al crear el checkout");
//       }

//       const { preferenceId } = await response.json();

//       // Inicializar MercadoPago checkout
//       const mp = new window.MercadoPago(
//         process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
//         {
//           locale: "es-AR",
//         },
//       );

//       mp.checkout({
//         preference: {
//           id: preferenceId,
//         },
//         autoOpen: true,
//       });
//     } catch (error) {
//       console.error("[MERCADOPAGO_ERROR]", error);
//       toast.error("Error al procesar el pago");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button onClick={handleCheckout} disabled={isLoading} className={className}>
//       {isLoading ? (
//         <Loader2 className="h-4 w-4 animate-spin" />
//       ) : (
//         "Pagar con MercadoPago"
//       )}
//     </Button>
//   );
// }
