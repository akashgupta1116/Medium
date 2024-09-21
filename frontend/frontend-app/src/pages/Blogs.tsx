import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { Link } from "../../node_modules/react-router-dom/dist/index";
import Blog from "../components/Blog";
import Navbar from "../components/Navbar";

const arr = [1, 2, 3, 4, 5, 6];

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:8787/api/v1/blog/bulk", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setBlogs(response?.data?.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="w-screen mt-5">
        <div className="w-1/2 m-auto">
          {blogs?.map((item) => {
            return (
                <Link to={`/blog/${item.id}`}>
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
    </>
  );
};

export default Blogs;
