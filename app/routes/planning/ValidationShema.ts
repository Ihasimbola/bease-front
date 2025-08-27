import * as z from "zod"

export const AssingPostSchema = z.object({
  licensedId: z.string().min(1, { message: "Choississez un membre" })
})