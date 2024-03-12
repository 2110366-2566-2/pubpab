import { TRPCError } from "@trpc/server";
// import { QrCode } from "lucide-react";
// import QRcode from "next-qrcode";
import generatePayload from "promptpay-qr";
import QRcode from "qrcode";
import { z } from "zod";

import { router, publicProcedure } from "@/server/trpc";

export const promptpayRouter = router({
  generatePromptPayQRCode: publicProcedure
    .input(z.object({ amount: z.number(), account: z.string() }))
    .query(async ({ input }) => {
      const { amount } = input;

      if (amount === 0) {
        throw new Error("Can't use amount = 0");
      }

      //   const mobileNumber = "0982546225";
      const payload = generatePayload(input.account, { amount });
      const option = {
        color: {
          dark: "#000",
          light: "#fff",
        },
      };

      // Generate the QR code using the QRcode library
      return new Promise((resolve, reject) => {
        QRcode.toDataURL(payload, option, (err, url) => {
          if (err) {
            console.log("Generate failed:", err);
            reject(
              new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Generate failed",
              }),
            );
          } else {
            resolve({ url });
          }
        });
      });
    }),
});
