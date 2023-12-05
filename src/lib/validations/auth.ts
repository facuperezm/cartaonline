import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
});
