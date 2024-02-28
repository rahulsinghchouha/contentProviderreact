import './App.css';
import Pagination from './Components/Pagination';
import Header from './Components/Header';
import Blogs from './Components/Blogs';
import { useContext, useEffect } from 'react';
import { AppContext} from './context/AppContext';
import { useSearchParams } from 'react-router-dom';
import BlogPage from './Pages/BlogPage';
import Home from './Pages/Home';
import TagPage from './Pages/TagPage';
import CategoryPage from './Pages/CategoryPage';
import { Navigation ,Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes } from 'react-router-dom';


function App() {
  const {fetchBlogPosts}= useContext(AppContext);

  const[searchParams,setSearchParams]=useSearchParams();

  const location=useLocation();


   useEffect(()=>{
    const page=searchParams.get("page") ?? 1;

    //yaha pr tag name v category ke base pr call kr rahen hai

    if(location.pathname.includes("tags"))
      {
        //thats means is show the tag wala page 
        const tag=location.pathname.split("/").at(-1).replaceAll("-"," "); 
        fetchBlogPosts(Number(page),tag);
      }
      //agar tag nhi hai to
      else if(location.pathname.includes("categories")){
        const category=location.pathname.split("/").at(-1).replaceAll("-"," "); 
        fetchBlogPosts(Number(page),null,category);

      }
      //agr na to tag n hee category hai to ye normal call hai hm normal call kr denge
      else{
        fetchBlogPosts(Number(page));
      }

   },[location.pathname,location.search])
  

  return (
   <Routes>

    <Route path="/" element = {<Home/>}  />
    <Route path="/blog/:blogId" element = {<BlogPage/>}  />
    <Route path="/tags/:tag" element = {<TagPage/>}  />
    <Route path="/categories/:category" element = {<CategoryPage/>}  />

   </Routes>
  );
}

export default App;
