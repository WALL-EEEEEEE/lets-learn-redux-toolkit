import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider, Outlet, useNavigate, redirect, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { AddPostForm } from './features/posts/AddPostFrom'
import { EditPostForm } from './features/posts/EditPostFrom'
import { LoginPage } from './features/auth/LoginPage'
import { selectCurrentUserName } from './features/auth/authSlice'
import { useAppSelector } from './hooks'
import { ReactNode } from 'react'

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

const ProjectedRoute = () => {
  const username = useAppSelector(selectCurrentUserName)
  if (!username) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      children: [
        {
          element: (<ProjectedRoute />),
          children: [
            {
              path: "posts",
              element: (
                <>
                  <AddPostForm />
                  <PostsList />
                </>
              ),
            },
            {
              path: "welcome",
              element: <Welcome />
            },
            {
              path: "posts/:postId",
              element: <SinglePostPage />
            },
            {
              path: "editPost/:postId",
              element: <EditPostForm />
            }
          ]
        },
        {

          index: true,
          element: <LoginPage />
        },
        {
          path: "login",
          element: <LoginPage />
        },

      ]
    }
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
