import React, { useState, useEffect } from 'react';
import { encode, decode } from 'js-base64';
import styled from 'styled-components';

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
    <StyledBase64Converter>
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
    </StyledBase64Converter>
  );
}

const StyledBase64Converter = styled.div`
  display: flex;
  flex-direction: column;

  .error-wrapper {
    min-height: 74px;
  }

  .error {
    color: red;
    width: 80vw;
    max-width: 40rem;
  }

  textarea {
    width: 80vw;
    max-width: 40rem;
    height: 30vh;
    max-height: 12rem;
    background-color: #232c34;
    color: #eee;
    border: none;
    margin-bottom: 2rem;
    padding: 0.25rem;
    resize: none;
    overflow: auto;
  }

  .output {
    width: 80vw;
    max-width: 40rem;
    height: 60vh;
    max-height: 30rem;
    background-color: #232c34;
    color: #eee;
    border: none;
    margin-bottom: 2rem;
    padding: 0.25rem;
    margin-top: 0;
    overflow: auto;
  }
`;
