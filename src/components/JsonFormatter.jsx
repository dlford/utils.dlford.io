import React, { useState } from 'react';

import './JsonFormatter.css';

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
      setError(e.toString());
      setFormatted('');
    }
  }

  return (
    <div className='json-formatter'>
      <label htmlFor='input'>Input</label>
      <textarea id='input' name='input' onChange={handleChange} />
      <label htmlFor='output'>Output</label>
      <textarea
        id='output'
        name='output'
        disabled
        value={formatted}
      />
      <div className='error-wrapper'>
        {!!error && <p className='error'>{error}</p>}
      </div>
    </div>
  );
}
