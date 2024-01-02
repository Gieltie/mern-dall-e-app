import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { logo, gael } from './assets'
import { CreatePost, Showcase } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-[#DCEAE7] sm:px-8 px-4 py-4 border-b border-b[#e6ebf4]'>
        <Link to='/'>
          <img src={gael} alt='logo' className='w-40 object-contain' />
        </Link>
        <Link to='/showcase' className='font-inter font-medium bg-[#5F9B8E] hover:bg-[#6BBCAB] text-white px-4 py-2 rounded-md transform transition-all'>Vitrine</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#FCFDFD] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<CreatePost />} />
          <Route path='/showcase' element={<Showcase />} />
        </Routes>
      </main>
      <footer className='w-full flex justify-center items-center bg-[#DCEAE7] sm:px-8 px-4 py-4 border-t border-b[#e6ebf4]'>
          <p className='text-sm'>Fait avec</p> 
          <img src={logo} alt='logo' className='ml-1 w-20 object-contain' />
      </footer>
    </BrowserRouter>
  )
}

export default App