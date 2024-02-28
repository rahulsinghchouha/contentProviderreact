import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner';
import BlogDetails from './BlogDetails';

const Blogs = () => {
  //consume

  const{posts,loading}=useContext(AppContext);
  
  return (
    <div className='w-11/12 max-w-[630px] py-3 flex flex-col gap-y-3 mt-[400px] mb-[400px] h-screen justify-center items-center'>
      {
        loading ? (<Spinner/>):(
          // agr koi nhi post nhi hai to no post found or post hai to by mapping render 
          posts.length===0?(
            <div>
              <p>No Post Found</p>
            </div>):
            (posts.map( (post) => ( 
              <BlogDetails post={post}/>




              )))
        )
      }
    </div>
  )
}

export default Blogs
