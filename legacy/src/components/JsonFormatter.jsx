import React, { useState } from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

const errorRegex = /line ([0-9]+) column ([0-9]+)/;

export default function JsonFormatter() {
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState(null);

  function handleChange(event) {
    if (!event.target.value) {
      setFormatted('');
      return;
    }

    try {
      const data = JSON.parse(event.target.value);
      setFormatted(JSON.stringify(data, null, 2));
      setError(null);
    } catch (e) {
      setError(e.message);
      setFormatted('');
      const result = errorRegex.exec(e.message);
      if (result) {
        const lineNumber = result[1];
        const columnNumber = result[2];
        const lines = event.target.value.split('\n');
        let output = '';
        for (const index in lines) {
          const line = lines[index];
          if (+index + 1 === +lineNumber) {
            let markedLine = '';
            for (const letterIndex in line) {
              const letter = line[letterIndex];
              if (+letterIndex + 1 === +columnNumber) {
                markedLine += `<span className="bad-letter">${letter}</span>`;
              } else {
                markedLine += letter;
              }
            }
            output += `<span className="bad-line">${markedLine}</span>\n`;
          } else {
            output += `${line}\n`;
          }
        }
        setFormatted(parse(output));
      }
    }
  }

  return (
    <StyledJsonFormatter>
      <label htmlFor='input'>JSON</label>
      <textarea id='input' name='input' onChange={handleChange} />
      <label htmlFor='output'>Formatted</label>
      <pre className='output' id='output'>
        {formatted}
      </pre>
      <div className='error-wrapper'>
        {!!error && <p className='error'>{error}</p>}
      </div>
    </StyledJsonFormatter>
  );
}

const StyledJsonFormatter = styled.div`
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

  .output .bad-line {
    background-color: rgba(255, 0, 0, 0.5);
  }

  .output .bad-letter {
    color: red;
    background-color: black;
  }
`;
