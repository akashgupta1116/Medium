import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from '../node_modules/react-router-dom/dist/index'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blogs from './pages/Blogs';
import DetailedBlog from './pages/DetailedBlog';
import PublishBlog from './pages/PublishBlog';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


const AppLayout = () => {

  const isAuthenticated = () => {
    const val = localStorage.getItem("token");
    return !!val
  }
  return <ProtectedRoute isAuthenticated = {isAuthenticated()}>
        <Navbar/>
        <Outlet/>
    </ProtectedRoute>
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '/signin',
      element: <Signin/>
    },
    {
      path: "/",
      element: <AppLayout/>,
      children: [
      {
        path: "/blogs",
        element: <Blogs/>
      },
      {
        path: '/blog/:blogId',
        element: <DetailedBlog/>
      },
      {
        path: '/publish',
        element: <PublishBlog/>
      },
    ]
    }])
  return (
    <RouterProvider router = {router}/>
  )
}

export default App


// Introduce Husky 
// Private Public routes
// If logged in go to the blogs other wise sinup page
// Study Storybook 