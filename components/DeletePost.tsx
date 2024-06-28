"use client"

import { deletePost } from '@/actions/postServerAction'
import { Post } from '@prisma/client'
import React, { useState } from 'react'
import { ImSpinner } from 'react-icons/im'
import { MdDelete } from 'react-icons/md'

const DeletePost = ({post}: {post: Post}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const handleClick = async (post: Post) => {
        setLoading(true);
        await deletePost(post)
        setLoading(false)
    }
  return (
    <button onClick={() => handleClick(post)}>
        {loading && <ImSpinner size={20} className=' animate-spin'/>}
        {!loading && <MdDelete size={20}/>}
    </button>
  )
}

export default DeletePost
