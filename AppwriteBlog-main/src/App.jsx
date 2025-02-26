import React, {useState, useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main className='m-4 p-4 bg-gray-400 rounded shadow-lg'>
        <h1 className='text-4xl font-bold'>THE BLOG</h1> <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ):null

}

export default App
