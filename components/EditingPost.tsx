'use client'
import { Post } from '@prisma/client'
import React, { useState } from 'react'
import { MdClose, MdEdit } from 'react-icons/md';
import PostForm from './PostForm';

const EditingPost = ({post}: {post: Post}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const openEditHandler = () => {
    setEditing(true)
  }
  const closeEditHandler = () => {
    setEditing(false)
  }
  return (
    <>
      {!editing && (
        <button onClick={openEditHandler}>
          <MdEdit size={20}/>
        </button>
      )}
      {editing && (
            <div className=' absolute top-0 left-0 w-screen h-screen z-2 bg-slate-500 bg-opacity-70 flex items-center justify-center '>
                <div className=' relative bg-white rounded-md p-8 w-full max-w-[600px]'>
                    <button className=' absolute top-3 right-3 text-slate-500'>
                        <MdClose size={28} onClick={closeEditHandler} />
                    </button>
                    <PostForm post={post} closeEditHandler={closeEditHandler}/>
                </div>
            </div>
        )}
    </>
  )
}

export default EditingPost
