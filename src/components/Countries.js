import React, { useEffect, useState } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [loader, setLoader] = useState(true)

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
        <Row xs={1} md={4} className="g-3">
        {countries.length && countries.map((country, index) => {
                return (
                    <Container className="py-3">
                        <Col key={index}>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={ country.flags.svg } />
                                <Card.Body> 
                                    <Card.Text className="mb-2"><strong>{country.translations.fra.common}</strong></Card.Text>
                                    <Card.Text className="mb-2 text-muted">Capital : {country.capital}</Card.Text>                              
                                    <Link to={`/countries/${country.name.common}`} className='btn btn-primary'>En savoir plus</Link>                                           
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                )
            })} 
        </Row>
    )
                
            
       

}

export default Countries