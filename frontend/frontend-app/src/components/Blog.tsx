

interface BlogProps {
    name: string;
    title: string;
    content: string
}

const Blog = () => {
    return (
            <div className="p-2">
                <div className = "flex items-center">
                    <Avatar name = {"Akash"}/>
                    <p className="ml-2 text-sm">Akash Gupta</p>
                </div>
                <p className="text-xl font-bold mt-1">How an ugly think can be done</p>
                <p className="mt-1 mb-5">No need to create a fancy and modern website with hundreds of pages to make millions.</p>
                <hr/>
            </div>
    )
}

export default Blog

interface AvatarProps {
    name: string
}
const Avatar = ({name}: AvatarProps) => {
    return (
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-xs text-gray-600 dark:text-gray-300">{name?.[0]}</span>
        </div>
    )
}
