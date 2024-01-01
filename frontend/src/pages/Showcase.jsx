import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return <h2 className='mt-5 font-bold text-[#101917] text-x1 uppercase'>{title}</h2>
}

const Showcase = () => {
  const [loading, setLoading] = useState(false)  
  const [allPosts, setAllPosts] = useState(null)

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);


  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dall-e-njrk.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className='max-w-7x1 mx-auto'>
      <div className='border-b-8'>
        <h1 className='font-extrabold text-[#101917] text-[32px]'>La Vitrine</h1>
        <p className='mt-2 text-[#101917] text-[16px] max-w-[500px]'>Trouvez ici toutes les images réalisées par chacun.</p>
      </div>

      <div className='mt-10'>
        <FormField
          labelName="Recherchez une image par nom"
          type="text"
          name="text"
          value={searchText}
          handleChange={handleSearchChange}
        />
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
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards 
                  data={searchedResults}
                  title="Pas de résultats trouvés"
                />
              ) : (
                <RenderCards 
                  data={allPosts}
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

export default Showcase
