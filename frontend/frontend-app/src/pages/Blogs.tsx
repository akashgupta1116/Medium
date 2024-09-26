import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { Link, useNavigate } from "../../node_modules/react-router-dom/dist/index";
import Blog from "../components/Blog";

interface BlogType {
    author: Author;
    title: string;
    content: string;
    id: string;
}

interface Author {
    name: string;
    id: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[] | null>(null);
  const navigate = useNavigate()
  const fetchBlogs = async () => {
    try{
        const response = await axios.get("http://localhost:8787/api/v1/blog/bulk", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        
        if(response.status !== 200){
            navigate('/signin');
            return
        }
    
        setBlogs(response?.data?.blogs);
    }catch(err: any){
        if(err.status === 403){
            navigate('/signin');
            return
        }
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
      <div className="w-screen mt-5">
        <div className="w-1/2 m-auto">
          {blogs?.map((item: BlogType) => {
            return (
                <Link key={item.id} to={`/blog/${item.id}`}>
                    <Blog
                        username={item?.author?.name}
                        title={item?.title}
                        content={item?.content}
                    />
                </Link>
            );
          })}
        </div>
      </div>
  );
};

export default Blogs;
