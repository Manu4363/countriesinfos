import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import Filter from './Filter';

const Countries = () => {

    const continents = ["Africa", "America", "Antarctic", "Asia", "Europe", "Oceania"]
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [loader, setLoader] = useState(true)
    const [selectedContinent, setSelectedContinent] = useState()

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000)

        axios.get("https://restcountries.com/v3.1/all").then((res) => setCountries(res.data));
        
    }, [])

    const searchCountries = (searchValue) => {
        setSearchInput(searchValue)

        if (searchInput) {
            const filteredCountries = countries.filter((country) => (
                Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase())
            ))
            setFiltered(filteredCountries)
        } else {
            setFiltered(countries)
        }
    }

    return loader ? <Loader /> : (
        <>
            <section className="filter">
                
                <Filter searchCountries={searchCountries} searchInput={searchInput} />
                
                <ul className='continents'>
                    {
                        continents.map((continent, index) => 
                            <li key={index}>
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
            <section className='count'>
                <p>Nombre de pays : <strong>{selectedContinent ? countries.filter((country) => country.region.includes(selectedContinent)).length : countries.length}</strong></p>
            </section>
            {searchInput > 0 ? <section className='countries'>
                
                {filtered
                .filter((country) => selectedContinent ? country.continents[0].includes(selectedContinent) : countries)
                .sort((a, b) => b.population - a.population)
                .map((country, index) => {
                    return (
                        <article key={index}>
                            <div>
                                <img src={country.flags.png} alt={country.name.common} />
                                <div className="details">
                                    <h3 className='country-name'>{country.translations.fra.common}</h3>
                                    <h4>Région : <span>{country.region}</span></h4>
                                    <h4>Capitale : <span>{country.capital}</span></h4>
                                    <h4>Population : <span>{country.population.toLocaleString()}</span></h4>
                                    <Link to={`/countries/${country.cioc}`} className='btn btn-primary'>En savoir plus</Link>                                
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section> : <section className='countries'>
                
                {filtered
                .filter((country) => selectedContinent ? country.continents[0].includes(selectedContinent) : countries)
                .sort((a, b) => b.population - a.population)
                .map((country, index) => {
                    return (
                        <article key={index}>
                            <div>
                                <img src={country.flags.png} alt={country.name.common} />
                                <div className="details">
                                    <h3 className='country-name'>{country.translations.fra.common}</h3>
                                    <h4>Région : <span>{country.region}</span></h4>
                                    <h4>Capitale : <span>{country.capital}</span></h4>
                                    <h4>Population : <span>{country.population.toLocaleString()}</span></h4>
                                    <Link to={`/countries/${country.cioc}`} className='btn btn-primary'>En savoir plus</Link>                                
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section>}
        </>
    )
                
            
       

}

export default Countries