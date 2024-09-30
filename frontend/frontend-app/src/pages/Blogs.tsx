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
  const [isFetching, setIsFetching] = useState<Boolean>(true)
  const navigate = useNavigate();
  const skeletonArr = [1,2,3,4,5,6,7,8]
  const fetchBlogs = async () => {
    try{
        const response = await axios.get("https://my-app.yoakash6.workers.dev/api/v1/blog/bulk", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setIsFetching(false)
        if(response.status !== 200){
            navigate('/signin');
            return
        }
    
        setBlogs(response?.data?.blogs);
    }catch(err: any){
        setIsFetching(false)
        if(err.status === 403){
            navigate('/signin');
            return
        }
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);


  if(isFetching){
      return <div className="w-screen mt-5">
        <div className="w-1/2 m-auto">
            {
                skeletonArr.map((item, idx)=> {
                    return <BlogSkeleton key = {idx}/>
                })
            }
        </div>
      </div>
  }

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
          })
          }
        </div>
      </div>
  );
};

export default Blogs;

const BlogSkeleton = () => {
    return (
            <div role="status" className="animate-pulse w-full mt-5">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <span className="sr-only">Loading...</span>
                <hr/>
            </div>
    )
}
