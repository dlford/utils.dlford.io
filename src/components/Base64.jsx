import React, { useState, useEffect } from 'react';
import { encode, decode } from 'js-base64';

import './Base64.css';

export default function Base64() {
  const [ascii, setAscii] = useState('');
  const [base64, setBase64] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [base64, ascii]);

  function convertToAscii() {
    try {
      setAscii(decode(base64));
    } catch (e) {
      setIsError(true);
    }
  }

  function convertToBase64() {
    setBase64(encode(ascii));
  }

  function handleInputChange(event) {
    switch (event.target.id) {
      case 'ascii':
        setAscii(event.target.value);
        break;
      case 'base64':
        setBase64(event.target.value);
        break;
    }
  }

  return (
    <div className='base-64'>
      <label htmlFor='ascii'>ASCII</label>
      <textarea
        id='ascii'
        onChange={handleInputChange}
        value={ascii}
        type='text'
      />
      <button onClick={convertToBase64}>Convert to Base64</button>
      <label htmlFor='base64'>Base64</label>
      <textarea
        id='base64'
        onChange={handleInputChange}
        value={base64}
        type='text'
      />
      <button onClick={convertToAscii}>Convert to ASCII</button>
      <div className='error-wrapper'>
        {!!isError && (
          <p className='error'>Invalid character in Base64 input</p>
        )}
      </div>
    </div>
  );
}
