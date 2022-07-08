import React from 'react'

const Filter = () => {
  return (
    <section className="filter">
        <form className="form-control" action="">
            <input type="search" name="search" id="search" placeholder="Rechercher un pays" />
        </form>
        <div>
            <select name="select" id="select" className="select">
                <option value="Filtrer par continent">Filtrer par continent</option>
                <option value="Africa">Afrique</option>
                <option value="America">Amérique</option>
                <option value="Asia">Asie</option>
                <option value="Europe">Europe</option>
                <option value="Oceanie">Océanie</option>
            </select>
        </div>
    </section>
  )
}

export default Filter