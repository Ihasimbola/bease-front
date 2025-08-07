import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Email non valide" }),
  password: z.string().trim().min(8, { message: "Mot de passe requise" })
})