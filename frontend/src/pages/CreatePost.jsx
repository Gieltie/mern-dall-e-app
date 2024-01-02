import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }
  
  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('https://dall-e-njrk.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        
        const data = await response.json()
        
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Veuillez entrer un prompt')
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch('https://dall-e-njrk.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...form })
        })

        await response.json()
        alert('Votre image a bien ete envoye')
        navigate('/showcase')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Veuillez generer une image')
    }
  }
  
  return (
    <section className='max-w-7x1 mx-auto'>
       <div className='border-b-8'>
        <h1 className='font-extrabold text-[#101917] text-[32px]'>Cree ton image</h1>
        <p className='mt-2 text-[#101917] text-[16px] max-w-[550px]'>DALL·E 3 te permet de transformer facilement tes idées en images.</p>
      </div>
      <form className='mt-10 max-w-3x1' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Nom"
            type="text"
            name="name"
            placeholder="Jean Dupont"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Ton idée ou"
            type="text"
            name="prompt"
            placeholder="Écris ton idée ici"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-[#5F9B8E] hover:bg-[#6BBCAB] font-medium rounded-md text-sm px-5 py-2.5 text-center w-full shadow-md transform transition-all'
          >
            {generatingImg ? "Creation de l'image..." : "Generer l'image"}
          </button>
        </div>

        <div className='flex flex-col items-center mt-5'>
          <div className='relative bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center mt-5 shadow-xl'>
            {form.photo ? (
              <img 
                src={form.photo} 
                alt={form.prompt} 
                className='object-contain w-full h-full'
              />
            ) : (
              <img 
                src={preview} 
                alt='preview' 
                className='w-9/12 h-9/12 object-contain opacity-40' 
            />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
                <Loader />
              </div>
            )}
          </div>
          
          <div className='mt-10 text-center'>
            <p className='mt-2 text-[14px]'>Placer l'image dans la vitrine</p>
            <button 
              type='submit'
              className='mt-3 bg-[#5F9B8E] hover:bg-[#6BBCAB] text-white hover:text-[#DCEAE7] font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-md transform transition-all'
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>  
          </div>
        </div>
        
      </form>
    </section>
  )
}

export default CreatePost
