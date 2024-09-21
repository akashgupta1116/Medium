import './App.css'
import { createBrowserRouter, RouterProvider } from '../node_modules/react-router-dom/dist/index'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blogs from './pages/Blogs';
import FullBlog from './components/FullBlog';
import DetailedBlog from './pages/DetailedBlog';
import PublishBlog from './pages/PublishBlog';

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
      path: '/blogs',
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

  ])
  return (
    <RouterProvider router = {router}/>
  )
}

export default App


// Introduce Husky 
// Private Public routes
// If logged in go to the blogs other wise sinup page
// Study Storybook 