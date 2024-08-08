import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostFrom'

function App() {
  const Index = () => {
    return (
      <>
        <Navbar />
        <div className="App">
          <Outlet />
        </div>
      </>)
  }
  const Welcome = () => {
    return (
      <section>
        <h2>Welcome to the Redux Essentials example app!</h2>
      </section>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      children: [
        {
          path: "welcome",
          element: <Welcome />
        },
        {
          index: true,
          element: (
            <>
              <AddPostForm />
              <PostsList />
            </>
          ),
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
