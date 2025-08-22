import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Email non valide" }),
  password: z.string().trim().min(8, { message: "Mot de passe requise" })
})

export const RegisterSchema = z.object({
  firstname: z.string().trim().min(1, {  message: "Nom requis" }),
  lastname: z.string().trim().min(1, { message: "Prénom requis" }),
  email: z.email({ message: "Email non valide" }),
  password: z.string({ message: "Mot de passe requis" }).trim().min(8, { message: "Au moins 8 caractères" }),
  confirmPassword: z.string().trim().min(8, { message: "Veuiller confirmer le mot de passe" })
})

export const AdminSchema  = z.object({
  gender: z.string().trim().min(1, {  message: "Genre requis" }),
  age: z.number().min(1, { message: "Age requis" }),
})

export const ChangePasswordSchema = z.object({
  email: z.email({ message: "Email non valide" }),
  password: z.string({ message: "Mot de passe requis" }).trim().min(8, { message: "Au moins 8 caractères" }),
  confirmPassword: z.string().trim().min(8, { message: "Veuiller confirmer le mot de passe" })
})