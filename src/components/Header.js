import React from 'react';
import Toggle from './Toggle';

const Header = () => {
  return (
    <>
        <header className='header'>
            <div>
                <h1>Countries REST API</h1>
            </div>
            <div>
               <i className='fas fa-moon'></i>Dark mode
            </div>
        </header>
      
    </>
  )
}

export default Header