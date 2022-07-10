import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../country.css';

const Country = () => {

  const [country, setCountry] = useState([])
  const {name} = useParams()
  const url = `https://restcountries.com/v2/name/${name}`
  

  useEffect(() => {
    
    const fetchCountryData = async() => {
        const response = await fetch(url)
        const country = await response.json()
        setCountry(country)
        console.log(country);
    }

    fetchCountryData()
  }, [])
  
  return (
    <>
        <section className="country">
            <Link to='/' className='btn btn-secondary'>Retour</Link>
            {
                country.map((c) => {
                    const {fifa, flags, name, capital, population, region, subregion, languages, currencies, borders } = c

                    return (
                        <article key={fifa}>
                            <div className='flag-country'>
                                <img src={flags.svg} alt={name} className="flag" />
                            </div>
                            <div className='country-details'>
                                <h5>Capital : {capital}</h5>
                                <h5>Population : {population}</h5>
                                <h5>Région : {region}</h5>
                                <h5>Sous-région : {subregion}</h5>
                                <h5>Langues : {languages[0].name}</h5>
                                <h5>Monnaie : {currencies[0].name}</h5>
                                <h5>Frontières communes :  
                                    {
                                    borders.join(" | ")
                                    }
                                </h5>
                            </div>
                        </article>
                    )

                })
            }
        </section>

    </>
  )
}

export default Country