import Avatar from "./Avatar"
import Navbar from "./Navbar"

interface FullBlogProps {
    title: string;
    content: string;
    username: string
}

const FullBlog = ({title, content, username}: FullBlogProps) => {
    return (
        <>
            <Navbar/>
            <div className="w-screen mt-20">
                <div className ="w-10/12 m-auto flex">
                    <div className="w-9/12 p-20">
                        <p className ="font-bold text-5xl">{title}</p>
                        <p className ="mt-10 text-lg">{content}</p>
                    </div>
                    <div className="w-3/12 p-20">
                        <p className="text-lg">Author</p>
                        <p className = "font-semibold text-2xl mt-3">{username}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBlog