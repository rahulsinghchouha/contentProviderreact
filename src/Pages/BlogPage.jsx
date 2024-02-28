import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../Components/Header';
import BlogDetails from '../Components/BlogDetails';
import { baseUrl } from '../baseUrl';


const BlogPage = () => {
   const newBaseUrl = "https://codehelp-apis.vercel.app/api/"

    const[blog,setBlog]=useState(null);
    const[relatedblogs,setRelatedBlogs]=useState([]);
    const location = useLocation();
    const navigation =useNavigate();
    const{setLoading,loading}=useContext(AppContext);
    const blogId=location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs()
    {
      setLoading(true);
      let url=`${newBaseUrl}get-blog?blogId=${blogId}`;

      try{
        const res=await fetch(url);
        const data=await res.json();

        setBlog(data.blog);
        setRelatedBlogs(data.relatedblogs);

      }
      catch(error)
      {
        console.log("error in blogpage");
        setBlog(null);
        setRelatedBlogs([]);

      }

      setLoading(false);

    }

    useEffect(()=>{
   //yadi blog id hai to usko call karo
      if(blogId){
        fetchRelatedBlogs();
      }
      //jb jb blogId change hogi tb ye call hoga conditon
    },[location.pathname])



  return (
    <div>
      <Header/>
      <div>
        <button  
        onClick={()=>navigation(-1)}
        >
          Back
        </button>

      </div>

      {
        loading ? <p>Loading</p>:
        blog ?(
          <div>
            <BlogDetails post={blog}/>
            <h2>Related Blogs</h2>
            {
              relatedblogs.map((post)=>(
                <div key={post.id}>
                  <BlogDetails post={post}/>
                  </div>
              ))
            }

            </div>
        ):(
          <div>
            <p>No Blog Found</p>
            </div>
        )
      }



    </div>
  )
}

export default BlogPage
