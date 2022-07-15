import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../country.css';
import axios from 'axios';

const Country = () => {

  const [country, setCountry] = useState([])
  const [countryBorders, setCountryBorders] = useState([]);
  const {name} = useParams()
  const {cioc} = useParams()
  const url = `https://restcountries.com/v3.1/alpha/`

  const fetchSingleCountry = async() => {
    let newBorders = [];
    const response = await fetch(url + cioc);
    const data = await response.json();
    const borders = data[0].borders;
    
    borders.map(async (border) => {
        
        const response = await fetch(url + border);
        const data = await response.json();
        let borderFullNames = data[0].name.common.toString();
        newBorders.push(borderFullNames)

        setTimeout(() => {
            setCountryBorders(newBorders.sort());
        }, 1000);
        
      });
     
  }
  

  useEffect(() => {
    axios.get(url + cioc).then((res) => setCountry(res.data));
  }, [])


  useEffect(() => {
    try {
        fetchSingleCountry();
    } catch(error) {
        console.log(error);
    }
    
  }, [url])


  return (
    <>
        <section className="country">
            <Link to='/' className='btn btn-light'>Retour</Link>
            {
                country.map((c) => {
                    const {numericCode, flags, name, capital, population, region, subregion, languages, currencies } = c
                    console.log(languages)
                    console.log(currencies)
                    
                    return (
                        <article key={numericCode}>
                            <div className="country-inner">
                                <div className="flag">
                                <img src={flags.svg} alt={name} />
                                </div>

                                <div className="country-details">
                                <div>
                                    <h2>{name.common}</h2>
                                    <h5>Capital : {capital}</h5>
                                    <h5>Population : {population}</h5>
                                    <h5>Région : {region}</h5>
                                    <h5>Sous-région : {subregion}</h5>
                                </div>

                                <div>
                                    <h5>
                                    Monnaie: <span>{
                                        Object.entries(currencies).map(([key, value]) => {
                                            return (
                                                <ul>
                                                    <li>{Object.values(value)[0]}</li>
                                                </ul>
                                            )
                                        })
                                    }
                                    </span>
                                    </h5>
                                    <h5>
                                    Langues: <span>{ Object.values(languages).join(', ')}</span>
                                    </h5>
                                </div>
                                </div>
                            </div>

                            <div>
                                <h3>Frontières communes: </h3>
                                <div className="borders">
                                
                                {
                             
                                  (countryBorders) ?  countryBorders.map((border, index) => {
                                        return (
                                        <ul key={border}>
                                            <li key={index}>{border}</li>
                                        </ul>
                                        )
                                    }) : 'Pas de frontières communes'
                                
                                } 
                                
                                </div>
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