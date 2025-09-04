import z from "zod";

const datetime = z.iso.datetime()

export const CreateMatchValidationSchema = z.object({
  division: z.string().min(1, { message: "Division requise" }),
  teamA: z.string().min(1, { message: "Equipe A requise" }),
  teamB: z.string().min(1, { message: "Equipe B requise" }),
  matchDate: z.date(),
  startTime: z.string().min(1, { message: "Horaire requise" }),
  place: z.string().min(1, { message: "Lieu du match requise" }),
})