import { getPosts } from '@/actions/postServerAction'
import React from 'react'
import DeletePost from './DeletePost';
import EditingPost from './EditingPost';
const ListPost = async() => {
    const posts = await getPosts();    
  return (
    <div className='flex flex-col max-w-[500px] m-auto'>
      {posts.success?.map((post, ind) => (
        <div key={ind} className='my-2 flex items-center gap-3 justify-between  w-full rounded p-2 border-b'>
        <span>{post.title}</span>
        <div className=' flex gap-2 items-center'>
            <EditingPost post={post}/>
            <DeletePost post={post}/>
        </div>
    </div>
      ))}
    </div>
  )
}

export default ListPost
