import Avatar from './Avatar'

interface BlogProps {
    title: string;
    content: string;
    username: string
}

const Blog = ({title, content, username}: BlogProps) => {
    return (
            <div className="p-2">
                <div className = "flex items-center">
                    <Avatar name = {username}/>
                    <p className="ml-2 text-sm">{username}</p>
                </div>
                <p className="text-xl font-bold mt-1">{title}</p>
                <p className="mt-1 mb-5">{content}</p>
                <hr/>
            </div>
    )
}

export default Blog

