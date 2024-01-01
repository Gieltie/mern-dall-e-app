import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { logo } from './assets'
import { CreatePost, Showcase } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28 object-contain' />
        </Link>
        <Link to='/showcase' className='font-inter font-medium bg-[#5F9B8E] hover:bg-[#6BBCAB] text-white px-4 py-2 rounded-md transform transition-all'>Vitrine</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#FCFDFD] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<CreatePost />} />
          <Route path='/showcase' element={<Showcase />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App