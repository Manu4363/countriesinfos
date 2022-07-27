import React from 'react'

export default function Filter({searchCountries, searchInput}) {
  return (
    <>
        <form className='form-control'>
            <input 
                type="search" 
                name="search" 
                id="search" 
                size="28"
                placeholder="Rechercher par nom de pays" 
                value={searchInput} 
                onChange={(e) => searchCountries(e.target.value)}
                autoComplete="off"
            />
        </form>
      
    </>
  )
}
