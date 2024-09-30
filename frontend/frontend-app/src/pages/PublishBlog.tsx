import { ChangeEvent, useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import axios from 'axios'
import Button from "../components/Button";

interface blogDetail {
  title: string;
  content: string;
}

const PublishBlog = () => {
  const [blogDetail, setBlogDetail] = useState<blogDetail>({
    title: "",
    content: "",
  });

  const [isPublishing, setIsPublishing] = useState<Boolean>(false)

  const navigate = useNavigate()


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, key: string | number) => {
    setBlogDetail({
      ...blogDetail,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async() => {
      setIsPublishing(true)
      await axios.post("https://my-app.yoakash6.workers.dev/api/v1/blog", {
        title: blogDetail.title,
        content: blogDetail.content
          
      }, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
      })
      setIsPublishing(false)
      navigate('/blogs')
  }
  return (
      <div className="w-6/12 mt-20 mx-auto">
        <input
          value={blogDetail.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "title")}
          placeholder="Title"
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <textarea
          id="message"
          rows={20}
          value={blogDetail.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e, "content")}
          className="block p-2.5 w-full mt-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Write your thoughts here..."
        ></textarea>
        <Button
            disabled = {isPublishing}
            type="button"
            onClick = {handleSubmit}
        >
           {isPublishing ? "Publishing" : "Publish"}
        </Button>
      </div>
  );
};

export default PublishBlog;
