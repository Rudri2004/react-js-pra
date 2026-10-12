
import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters."),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters."),

  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters."),

  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code."),
});
