import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return <h2 className='mt-5 font-bold text-[#101917] text-x1 uppercase'><span>{title}</span></h2>
}

const Home = () => {
  const [loading, setLoading] = useState(false)  
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('<test a supprimer>')

  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#101917] text-[32px]'>La Vitrine</h1>
        <p className='mt-2 text-[#101917] text-[16px] max-w-[500px]'>parcourez une collection d'images imaginatives et visuellement époustouflantes générées par DALL-E AI</p>
      </div>
      <div className='mt-16'>
        <FormField />
      </div>
      <div className='mt-10 -center'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#101917] text-x1 mb-3]'>
                résultats pour <span>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1  gap-3'>
              {searchText ? (
                <RenderCards 
                  data={[]}
                  title="Pas de résultats trouvés"
                />
              ) : (
                <RenderCards 
                  data={[]}
                  title="Pas de posts trouvés"
                />
              )}
            </div>
          </>
        )}
      </div>     
    </section>
  )
}

export default Home
