import Blog from "../components/Blog";
import Navbar from "../components/Navbar";

const arr = [1, 2 ,3 ,4, 5, 6]

const Blogs = () =>{ 
    return (
        <>
            <Navbar/>
            <div className="w-screen mt-5">
                <div className="w-1/2 m-auto">
                    {
                        arr.map(item=> {
                            return <Blog
                                name = {'Akash'}
                                title = {''}
                                content = {''}
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default Blogs