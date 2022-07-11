import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Countries = () => {

    const continents = ["Africa", "America", "Asia", "Europe", "Oceania"]
    const [countries, setCountries] = useState([])
    const [loader, setLoader] = useState(true)
    const [selectedContinent, setSelectedContinent] = useState()

    const fetchCountryData = async() => {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const countries = await response.json()
        setCountries(countries)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000)

        fetchCountryData()
    }, [])

    return loader ? <Loader /> : (
        <>
            <section className="filter">
        
                <form className="form-control" action="">
                    <input type="search" name="search" id="search" placeholder="Rechercher un pays" />
                </form>
                <ul className='continents'>
                    {
                        continents.map((continent) => 
                            <li>
                                <input 
                                    type="radio" 
                                    name="continent-radio"
                                    className='continent-radio'
                                    checked={continent === selectedContinent} 
                                    id={continent} 
                                    onChange={(e) => setSelectedContinent(e.target.id)} 
                                />
                                <label htmlFor={continent}>{continent}</label>
                            </li>
                        )
                    }
                </ul>
                
            </section>
            <section className='countries'>
                
                {countries
                .filter((country) => selectedContinent ? country.continents[0].includes(selectedContinent) : countries)
                .sort((a, b) => b.population - a.population)
                .map((country) => {
                    return (
                        <article key={country.numericCode}>
                            <div>
                                <img src={country.flags.png} alt={country.name.common} />
                                <div className="details">
                                    <h3>{country.translations.fra.common}</h3>
                                    <h4>Région : <span>{country.region}</span></h4>
                                    <h4>Capitale : <span>{country.capital}</span></h4>
                                    <h4>Population : <span>{country.population.toLocaleString()}</span></h4>
                                    <Link to={`/countries/${country.name.common}`} className='btn btn-primary'>En savoir plus</Link>                                
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section>
        </>
    )
                
            
       

}

export default Countries