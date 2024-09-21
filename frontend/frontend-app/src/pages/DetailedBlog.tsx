import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { useParams } from "../../node_modules/react-router-dom/dist/index";
import CircularSpinner from "../components/CircularSpinner";
import FullBlog from "../components/FullBlog";

const DetailedBlog = () => {
  const [blogDetail, setBlogDetail] = useState(null);
  const { blogId } = useParams();

  const fetchBlogDetail = async () => {
    const response = await axios.get(
      "http://localhost:8787/api/v1/blog/" + blogId,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setBlogDetail(response.data.blog);
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
