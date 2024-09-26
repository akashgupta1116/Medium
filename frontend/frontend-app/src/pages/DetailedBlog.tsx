import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";
import CircularSpinner from "../components/CircularSpinner";
import FullBlog from "../components/FullBlog";

interface DetailedBlog {
    author: Author| null;
    title: string;
    content: string
}

interface Author {
    name: string
}

const DetailedBlog = () => {
  const navigate = useNavigate()
  const [blogDetail, setBlogDetail] = useState<DetailedBlog | null>(null);
  const { blogId } = useParams();

  const fetchBlogDetail = async () => {
    try{
        const response = await axios.get(
          "http://localhost:8787/api/v1/blog/" + blogId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if(response.status !== 200){
            navigate('/signin')
            return 
        }
    
        setBlogDetail(response.data.blog);
    }catch(err: any){
        if(err.status === 403){
            navigate('/signin')
            return 
        }
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  return blogDetail ? (
    <FullBlog
      username={blogDetail?.author?.name || ""}
      title={blogDetail?.title || ""}
      content={blogDetail?.content || ""}
    />
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <CircularSpinner />
    </div>
  );
};

export default DetailedBlog;
