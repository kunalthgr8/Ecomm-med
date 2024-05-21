import React from 'react';
import Log from "../../assets/Aoushadhi-Logo.svg";

function Logo({ width = '100px', height = '100px' }) {
  return (
    <div className='transition duration-400 ease-out hover:ease-in flex justify-center text-center' >
        <img className='transition duration-400 ease-out hover:ease-in transform hover:scale-110' src={Log} alt="Aoushadhi" style={{ width, height }} />
    </div>
  );
}

export default Logo;
