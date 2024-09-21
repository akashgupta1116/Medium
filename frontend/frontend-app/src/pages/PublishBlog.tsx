import { useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import Navbar from "../components/Navbar";
import axios from 'axios'

interface blogDetail {
  title: string;
  content: string;
}
const PublishBlog = () => {
  const [blogDetail, setBlogDetail] = useState<blogDetail>({
    title: "",
    content: "",
  });

  const navigate = useNavigate()

  const handleChange = (e, key) => {
    setBlogDetail({
      ...blogDetail,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async() => {
      await axios.post("http://localhost:8787/api/v1/blog", {
        title: blogDetail.title,
        content: blogDetail.content
          
      }, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
      })

      navigate('/blogs')
  }
  return (
    <>
      <Navbar />
      <div className="w-6/12 mt-20 mx-auto">
        <input
          value={blogDetail.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Title"
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* <input value={blogDetail.title} onChange={(e)=> handleChange(e, 'title')} placeholder="Title"/> */}
        <textarea
          id="message"
          rows="20"
          value={blogDetail.content}
          onChange={(e) => handleChange(e, "content")}
          className="block p-2.5 w-full mt-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <button
            type="button"
            // onClick = {()=>onSubmit(formInputs)}
            onClick = {handleSubmit}
            className="w-full text-white mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Publish
        </button>
      </div>
    </>
  );
};

export default PublishBlog;
