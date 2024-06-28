'use server'
import prismadb from "@/lib/db"
import { PostSchema, PostSchemaType } from "@/schemas/postSchema"
import { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createPost = async (values: PostSchemaType) => {    
    const validatedField = PostSchema.safeParse(values)
    if(!validatedField.success){
        return {error: 'Invalid fields'}
    }
    const { title } = validatedField.data
    try {
        await prismadb.post.create({
            data: {
                title
            }
        })
        revalidatePath('/')
        return {success: 'Post created'}
    } catch (error) {
        return {error: 'Internal server error'}
    }
}

export const getPosts = async () => {
    try {
        const posts = await prismadb.post.findMany({
            orderBy: {
                postedAt : 'desc'
            }
        })
        return {success: posts}
    } catch (error) {        
        return {error: 'Internal server error'}
    }
}

export const deletePost = async (post: Post) => {
    try {
        await prismadb.post.delete({
            where: {
                id: post.id
            }
        })
        revalidatePath('/')
        return {success: 'Post deleted'}
    } catch (error) {
        return {error: 'Internal server error'}
    }
}

export const editPost = async (post: Post, title: string) => {
    try {
        await prismadb.post.update({
            where: {
                id: post.id
            },
            data: {
                title
            }
        })
        revalidatePath('/')
        return {success: 'Post edited'}
    } catch (error) {
        return {error: 'Internal server error'}
    }
}