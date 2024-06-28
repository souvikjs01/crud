"use client"
import { createPost, editPost } from '@/actions/postServerAction';
import React, { FormEvent, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema, PostSchemaType } from '@/schemas/postSchema';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Post } from '@prisma/client';
import { ImSpinner } from 'react-icons/im';

const PostForm = ({post, closeEditHandler}: {post?: Post, closeEditHandler?: () => void}) => {
    const [success, setSuccess] = useState<string | undefined>('');
    const [err, setErr] = useState<string | undefined>('');
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<PostSchemaType>({
      resolver: zodResolver(PostSchema),
      defaultValues: {title: post ? post.title : ''}
    })

    useEffect(() => {
      if(success){
        form.reset();
        const timer = setTimeout(()=> {
          setSuccess(undefined)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [success])
    
    const onSubmit = (data: PostSchemaType)=> {
      setLoading(true)
      if(post){
        editPost(post, data.title).then(data => {
          setErr(data.error)
          setSuccess(data.success)
          if(data.success && closeEditHandler){
            closeEditHandler()
          }
        }).finally(() => setLoading(false))
      }
      else {
        createPost(data).then(data => {
          setErr(data.error)
          setSuccess(data.success)
        }).finally(() => setLoading(false)) 
      }     
    }
  return (
    <div className=' max-w-[500px] m-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>
        <h1 className=' text-4xl font-bold'>{post ? 'Edit Post' : 'Create Post'}</h1>
          <div className=' space-y-2'>
            <FormField 
              control={form.control}
              name='title'
              render={({ field }) =>  (
                <FormItem>
                  <FormControl>
                    <Input {...field} type='text' placeholder='Title'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {err && (
            <div className='text-sm text-rose-400 font-light'>{err}</div>
          )}
          {success && (
            <div className='text-sm text-green-400 font-light'>{success}</div>
          )}
          <Button type={'submit'} className='bg-gray-900 rounded-md text-white py-3' size={'lg'} >
            {loading ? <ImSpinner size={20} className=' animate-spin'/> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default PostForm
