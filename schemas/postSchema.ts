import z from "zod"

export const PostSchema = z.object({
    title: z.string().min(3, {
        message: 'title must be contain three letter'
    }).max(40, {
        message: 'title must be less than 40 letter'
    })
})

export type PostSchemaType = z.infer<typeof PostSchema>