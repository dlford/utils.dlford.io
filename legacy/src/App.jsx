import React from 'react';

import Frame from './components/Frame';
// import ImageConverter from './components/ImageConverter';
import Base64 from './components/Base64';
import JsonFormatter from './components/JsonFormatter';

export default function App() {
  return (
    <Frame>
      {/* <ImageConverter title='Image Converter'/> */}
      <Base64 title='Base64 Encode/Decode' />
      <JsonFormatter title='JSON Format/Validate' />
    </Frame>
  );
}
