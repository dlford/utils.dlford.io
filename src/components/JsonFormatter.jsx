import React, { useState } from 'react';
import parse from 'html-react-parser';

import './JsonFormatter.css';

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
    <div className='json-formatter'>
      <label htmlFor='input'>JSON</label>
      <textarea id='input' name='input' onChange={handleChange} />
      <label htmlFor='output'>Formatted</label>
      <pre className='output' id='output'>
        {formatted}
      </pre>
      <div className='error-wrapper'>
        {!!error && <p className='error'>{error}</p>}
      </div>
    </div>
  );
}
