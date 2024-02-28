import React from 'react'
import { useLocation} from 'react-router-dom'
import Pagination from '../Components/Pagination';
import Header from '../Components/Header';
import Blogs from '../Components/Blogs';
import { useNavigate } from 'react-router-dom';


const TagPage = () => {
//humko back bhi aan ahai jiske liye hm navigation ka use krenge
 const navigation=useNavigate();
 const location = useLocation();
 const tag=location.pathname.split("/").at(-1);


  return (
    <div>
        <Header/>
        
        <div>
        <button
        onClick={()=>{
            // navigation -1 se ek pichhe aa jayenge 
            navigation(-1)
        }}>
            back
        </button>
        </div>
        <Blogs/>
        <Pagination/>

      
    </div>
  )
}

export default TagPage
