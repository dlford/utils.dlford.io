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
  }, [ascii]);

  function convertToAscii(value = base64) {
    try {
      setAscii(decode(value));
    } catch (e) {
      setIsError(true);
    }
  }

  function convertToBase64(value = ascii) {
    setBase64(encode(value));
  }

  function handleAsciiChange(event) {
    setAscii(event.target.value);
    if (event.target.value) {
      convertToBase64(event.target.value);
    } else {
      setBase64('');
    }
  }

  function handleBase64Change(event) {
    setBase64(event.target.value);
    if (event.target.value) {
      convertToAscii(event.target.value);
    } else {
      setAscii('');
    }
  }

  return (
    <div className='base-64'>
      <label htmlFor='ascii'>ASCII</label>
      <textarea
        id='ascii'
        onChange={handleAsciiChange}
        value={ascii}
        type='text'
      />
      <label htmlFor='base64'>Base64</label>
      <textarea
        id='base64'
        className='output'
        onChange={handleBase64Change}
        value={base64}
        type='text'
      />
      <div className='error-wrapper'>
        {!!isError && (
          <p className='error'>
            Unable to decode - Invalid character
          </p>
        )}
      </div>
    </div>
  );
}
